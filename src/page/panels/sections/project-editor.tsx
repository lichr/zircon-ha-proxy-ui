import { Button, MenuItem, Switch, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApiStatus, IProjectInfo, useApiPut, usePageCore, usePageState } from '../../../services';
import { B, Note, P, PanelBase, Row, SG, SelectFormField, mono, switchControl, textControl, vbox } from '../../../ui';

interface IProjectEditorFormData {
  projectId: string | null;
  groupId: string | null;
  name: string;
  active: boolean;
  localOnly: boolean;
}

export function ProjectEditor(
  props: {
    project?: IProjectInfo;
  }
): JSX.Element {
  const { project } = props;
  const createMode = !project;
  const core = usePageCore();

  // get groups
  const groups = usePageState((state) => state.userInfo?.groups ?? {});
  const defaultGroup = _.first(_.keys(groups));

  // api invoke to create new project
  const { start, state: { result, status, error } } = useApiPut('proxy/api/upsert_project');
  const isBusy = status === 'pending' || status === 'start';

  // initialize form
  const form = useForm<IProjectEditorFormData>({
    mode: 'onTouched',
    defaultValues: project ? {
      projectId: project.projectId,
      groupId: project.groupId,
      name: project.name,
      active: project.active,
      localOnly: project.localOnly
    }: {
      groupId: defaultGroup,
      name: 'New Project',
      active: true,
      localOnly: false
    }
  });

  const localOnly = form.watch('localOnly');

  const onSubmit = form.handleSubmit(
    async (data) => {
      start(data);
    }
  );

  useEffect(
    () => {
      if (status === 'ok') {
        core.goBack();
      }
    },
    [core, status]
  );

  return (
    <PanelBase
      title={createMode ? 'Create Project' : 'Edit Project'}
      returnDisabled={isBusy}
    >
      <div css={[vbox, { gap: '16px' }]}>
        <P>
          NOTE: internet connection is required to create a project (even for creating a local only project).
        </P>
        <Row>
          <SelectFormField
            control={form.control}
            name="groupId"
            label="Group"
            rules={{
              required: true
            }}
            css={{ width: '160px' }}
          >
            {
              _.map(
                groups,
                (group, groupId) => (
                  <MenuItem key={groupId} value={groupId}>{group.info.name}</MenuItem >
                )
              )
            }
          </SelectFormField>

          <Controller
            name="name"
            control={form.control}
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: 'Project name must be at least 3 characters long'
              }
            }}
            render={
              ({ field, fieldState }) => (
                <TextField
                  size="small"
                  inputProps={{ style: { ...mono } }}
                  spellCheck={false}
                  autoComplete='off'
                  autoCorrect='off'
                  css={{ width: '300px' }}
                  variant='outlined'
                  disabled={isBusy}
                  {...textControl('Name', field, fieldState)}
                />
              )
            }
          />
        </Row>
        {
          (createMode || !project.active) && (
            <Row>
              <div>Set as Active Project </div>
              <Controller
                name="active"
                control={form.control}
                render={
                  ({ field }) => (
                    <Switch
                      size="small"
                      {...switchControl('set active', field)}
                    />
                  )
                }
              />
            </Row>
          )
        }

        <SG css={{ gap: '8px' }}>
          <Row>
            <div>Local Only </div>
            <Controller
              name="localOnly"
              control={form.control}
              render={
                ({ field }) => (
                  <Switch
                    size="small"
                    {...switchControl('Local Only', field)}
                  />
                )
              }
            />
          </Row>
          {
            project && project.localOnly !== localOnly && localOnly === false && (
              <Note warn>
                <P>You are removing the project&apos;s <B>local only mode</B>.</P>
                <P>This will <B>allow</B> a copy of your home plan data to be kept in cloud data store.</P>
              </Note>
            )
          }
          {
            project && project.localOnly !== localOnly && localOnly === true && (
              <Note warn>
                <P>You are changing the project to <B>local only mode</B>.</P>
                <P>This will <B>remove</B> home plan data from the cloud data store.</P>
              </Note>
            )
          }
          <SG>
            <P>In <B>Local Only</B> mode:</P>
            <P li>You home plan data will <B>never leave</B> your local network</P>
            <P li>You take responsibility to keep your home plan data <B>safe</B></P>
            <P li><B>Internet connection</B> is still required to edit the home plan, because <B>designer</B> and <B>resource library</B> are only available online, </P>
          </SG>
        </SG>

        <Row>
          <Button size="small" variant="outlined" disabled={isBusy} onClick={() => core.goBack()}>Cancel</Button>
          <Button size="small" variant="contained" disabled={isBusy || !form.formState.isValid} onClick={onSubmit}>{createMode ? 'Create Project' : 'Update Project'}</Button>
        </Row>
        <ApiStatus status={status} error={error} />
      </div>
    </PanelBase>
  );
}
