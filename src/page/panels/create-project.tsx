import { Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { ApiStatus, useApiPut, usePageCore, usePageState } from '../../services';
import { B, Link, P, PanelBase, Row, SG, SelectFormField, mono, switchControl, textControl, vbox } from '../../ui';

interface IFormData {
  groupId: string | null;
  name: string;
  setActive: boolean;
  createOnlineBranch: boolean;
}

export function CreateProject(): JSX.Element {
  const core = usePageCore();
  const handleGoBack = () => {
    core.update((state) => { state.currentPanel = 'project'; });
  }

  // get groups
  const groups = usePageState((state) => state.userInfo?.groups ?? {});
  const defaultGroup = _.first(_.keys(groups));

  // api invoke to create new project
  const { start, state: { result, status, error } } = useApiPut('proxy/api/project');
  const isBusy = status === 'pending' || status === 'start';

  // initialize form
  const form = useForm<IFormData>({
    mode: 'onTouched',
    defaultValues: {
      groupId: defaultGroup,
      name: 'New Project',
      setActive: true,
      createOnlineBranch: true
    }
  });

  const onSubmit = form.handleSubmit(
    async (data) => {
      start(data);
    }
  );

  useEffect(
    () => {
      if (status === 'ok') {
        core.update((state) => { state.currentPanel = 'project'; });
      }
    },
    [core, status]
  )

  return (
    <PanelBase
      title="Create New Project"
      returnDisabled={isBusy}
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
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
        <Row>
          <div>Set as Active Project </div>
          <Controller
            name="setActive"
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
        <SG css={{ gap: '8px' }}>
          <Row>
            <div>Create Online Branch </div>
            <Controller
              name="createOnlineBranch"
              control={form.control}
              render={
                ({ field }) => (
                  <Switch
                    size="small"
                    {...switchControl('create online branch', field)}
                  />
                )
              }
            />
          </Row>

          <SG>
            <P><B>With</B> online branch:</P>
            <P li>You home plan data will be stored both <B>online</B> and <B>locally</B></P>
          </SG>

          <SG>
            <P><B>Without</B> online branch:</P>
            <P li>You home plan data will <B>never leave</B> your local network</P>
            <P li>You take responsibility to keep your home plan data <B>safe</B></P>
          </SG>

          <SG>
            <P>In <B>both</B> cases:</P>
            <P li><B>Internet connection</B> is required to edit the home plan, because <B>designer</B> and <B>resource library</B> are only available online, </P>
            <P li><B>Viewers</B> work without internet connection</P>
          </SG>
        </SG>

        <Row>
          <Button size="small" variant="outlined" disabled={isBusy} onClick={handleGoBack}>Cancel</Button>
          <Button size="small" variant="contained" disabled={isBusy || !form.formState.isValid} onClick={onSubmit}>Submit</Button>
        </Row>
        <ApiStatus status={status} error={error} />
      </div>
    </PanelBase>
  );
}
