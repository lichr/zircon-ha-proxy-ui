import { Button, CircularProgress, useTheme } from '@mui/material';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import { Fragment, useEffect } from 'react';
import { ApiStatus, useApiGet, useApiPut, usePageCore } from '../../services';
import { ActionLink, P, PanelBase, PanelSection, Row, Section, Table, click, hbox, mono } from '../../ui';

function SetActiveButton(
  props: {
    data: any;
    onSave?: () => void;
  }
) {
  const { data, onSave } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const { start, state: { status, error } } = useApiPut('proxy/api/active_project');

  useEffect(
    () => {
      if (status === 'ok') {
        onSave?.();
      }
    },
    [status, onSave]
  );

  if (status === 'error') {
    return (
      <div css={{ color: '#f00', fontSize: '12px' }}>
        Error: {error?.message}
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <CircularProgress variant="indeterminate" />
    );
  }
  return (
    <ActionLink title="Set Active" onClick={() => start(data)} />
  );
}

export function SetActiveProject(): JSX.Element {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const core = usePageCore();
  const { state: { result, status, error } } = useApiGet<any[]>('proxy/api/projects');

  let content;
  if (result) {
    content = (
      <Table
        css={{ alignItems: 'center' }}
        columns={[
          { label: 'Group Id', width: '110px' },
          { label: 'Id', width: '121px' },
          { label: 'Name', width: '200px' },
          { label: 'Branches', width: '110px' },
          { label: 'Active?', width: 'auto' }
        ]}
      >
        {
          result.map(
            (project: any) => (
              <Fragment key={project.projectId}>
                <div css={[mono, { fontSize: '12px' }]}>{project.groupId}</div>
                <div css={[mono, { fontSize: '12px' }]}>{project.projectId}</div>
                <div css={{ fontSize: '12px', fontWeight: 'bold' }}>{project.name}</div>
                <div css={[hbox, { gap: '8px' }]}>
                  {project.onlineBranch ? <div css={{ fontSize: '12px' }}>Online</div> : null}
                  {project.localBranch ? <div css={{ fontSize: '12px' }}>Local</div> : null}
                </div>
                <Row>
                  {
                    project.active ? (
                      <CheckCircle css={{ fontSize: '16px', color }} />
                    ) : (
                      <SetActiveButton
                        data={{ groupId: project.groupId, projectId: project.projectId }}
                        onSave={
                          () => core.update((state) => {
                            state.currentPanel = 'project';
                          })
                        }
                      />
                    )
                  }
                </Row>
              </Fragment>
            )
          )
        }
      </Table>
    );
  }

  return (
    <PanelBase
      title="Choose Active Project"
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
    >
      <div css={{ padding: '0 0 16px 0' }}>
        <P>Choose active project, or you can &nbsp;
          <ActionLink
            go
            title="Create New Project"
            onClick={
              () => core.update((state) => { state.currentPanel = 'create-project' })
            }
          />
        </P>

      </div>
      <Section title="Projects">
        <ApiStatus status={status} error={error} />
        {content}
      </Section>
    </PanelBase>
  );
}
