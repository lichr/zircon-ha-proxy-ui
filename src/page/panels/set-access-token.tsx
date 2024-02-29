import { Button, TextField } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApiStatus, useApiPut, usePageCore } from '../../services';
import { Link, P, PanelBase, Row, mono, textControl, vbox } from '../../ui';

interface IFormData {
  accessToken: string;
}

export function SetAccessToken(): JSX.Element {
  const core = usePageCore();
  const handleGoBack = () => {
    core.update((state) => { state.currentPanel = 'project'; });
  }

  const { start, state: { result, status, error } } = useApiPut('proxy/api/access_token');
  const isBusy = status === 'pending' || status === 'start';
  const form = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      accessToken: ''
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
      title="Set Active Project"
      returnDisabled={isBusy}
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
    >
      <div css={[vbox, { gap: '16px' }]}>
        <P>
          You can create an access token from&nbsp;
          <Link external href="https://zircon3d.com/user/profile#access-tokens">user profile</Link>
        </P>

        <Controller
          name="accessToken"
          control={form.control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9]{12}\.[a-zA-Z0-9]{32}$/,
              message: 'incorrect token format'
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
                css={{ width: '600px' }}
                variant='outlined'
                disabled={isBusy}
                {...textControl('access token', field, fieldState)}
              />
            )
          }
        />
        <Row>
          <Button size="small" variant="outlined" disabled={isBusy} onClick={handleGoBack}>Cancel</Button>
          <Button size="small" variant="contained" disabled={isBusy || !form.formState.isValid} onClick={onSubmit}>Submit</Button>
        </Row>
        <ApiStatus status={status} error={error} />
      </div>
    </PanelBase>
  );
}
