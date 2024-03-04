import { Button, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApiStatus, IProjectInfo, useApiDelete, useApiGet, useApiPut, usePageCore } from '../../services';
import { ActionLink, B, Note, P, PanelBase, Row, Table, mono, textControl, vbox } from '../../ui';

interface IDeleteProjectFormData {
  name: string;
}

function DeleteProjectContent(
  props: {
    project: IProjectInfo;
  }
) {
  const { project: { groupId, projectId, name, localOnly } } = props;
  const core = usePageCore();

  const { start, state: { result, status, error } } = useApiDelete(`proxy/api/groups/${groupId}/projects/${projectId}`);
  const isBusy = status === 'pending' || status === 'start';

  const form = useForm<IDeleteProjectFormData>({
    mode: 'onTouched',
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = form.handleSubmit(
    async () => {
      start();
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
      title="Delete Project"
      returnDisabled={isBusy}
    >
      <div css={[vbox, { gap: '16px' }]}>
        <P><B>You are about to delete this project:</B></P>
        <Table
          hideHeader
          columns={[
            { label: 'Property', width: '110px' },
            { label: 'Value', width: '121px' }
          ]}
        >
          <P>ID</P>
          <P>{projectId}</P>
          <P>Name</P>
          <P><B>{name}</B></P>
        </Table>
        <Note warn>
          <P li>This action cannot be <B>undone</B>.</P>
          {
            !localOnly && (
              <P li>Both <B>online branch</B> and <B>local branch</B> will be permanently deleted</P>
            )
          }
        </Note>
        {
          !localOnly && (
            <Note tip>
              <P li>
                If you want to delete <B>online branch</B> but keep <B>local branch</B>
                , please&nbsp;
                <ActionLink
                  go
                  title="Edit"
                  onClick={
                    () => core.switch('edit-project', { groupId, projectId })
                  }
                />
                &nbsp;this project and turn on <B>Local Only</B> mode
              </P>
            </Note>
          )
        }

        <P>Please type project name:</P>
        <Controller
          name="name"
          control={form.control}
          rules={{
            validate: (v) => v === name || 'name does not match'
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

        <Row>
          <Button size="small" variant="outlined" disabled={isBusy} onClick={() => core.goBack()}>Cancel</Button>
          <Button size="small" variant="contained" disabled={isBusy || !form.formState.isValid} onClick={onSubmit}>Delete Project</Button>
        </Row>
        <ApiStatus status={status} error={error} />
      </div>
    </PanelBase>
  )
}

export function DeleteProject(
  props: {
    groupId: string;
    projectId: string;
  }
): JSX.Element {
  const { groupId, projectId } = props;

  const { state: { result, status, error } } = useApiGet<IProjectInfo>(
    `proxy/api/groups/${groupId}/projects/${projectId}`
  );
  const isBusy = status === 'pending' || status === 'start';

  if (result) {
    return (
      <DeleteProjectContent project={result} />
    );
  }

  return (
    <PanelBase
      title="Delete Project"
      returnDisabled={isBusy}
    >
      <ApiStatus status={status} error={error} />
    </PanelBase>
  );
}
