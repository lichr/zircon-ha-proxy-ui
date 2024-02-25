import { Button, CircularProgress, useTheme } from '@mui/material';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import { Fragment, useEffect } from 'react';
import { ApiStatus, useApiGet, useApiPut, usePageCore } from '../../services';
import { P, PanelBase, PanelSection, Row, Section, Table, click, hbox, mono } from '../../ui';

function SetActiveButton(
  props: {
    data: any;
    onSave?: () => void;
  }
) {
  const { data, onSave } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const { start, state: { status, error } } = useApiPut('active_project');

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
      <div css={{ color: '#f00' }}>
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
    <div
      css={[
        click,
        {
          color
        }
      ]}
      onClick={() => start(data)}
    >
      Set Active
    </div>
  );
}

export function SetActiveProject(): JSX.Element {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const core = usePageCore();
  const { state: { result, status, error } } = useApiGet<any[]>('projects');

  let content;
  if (result) {
    content = (
      <Table
        columns={[
          { label: 'Group Id', width: '120px' },
          { label: 'Id', width: '120px' },
          { label: 'Name', width: '200px' },
          { label: 'Branches', width: '200px' },
          { label: 'Active?', width: 'auto' }
        ]}
      >
        {
          result.map(
            (project: any) => (
              <Fragment key={project.projectId}>
                <div css={mono}>{project.groupId}</div>
                <div css={mono}>{project.projectId}</div>
                <div css={{ fontWeight: 'bold' }}>{project.name}</div>
                <div css={[hbox, { gap: '8px' }]}>
                  {project.onlineBranch ? <div>Online</div> : null}
                  {project.localBranch ? <div>Local</div> : null}
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
      title="Set Active Project"
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
    >
      <div css={{ padding: '0 0 16px 0' }}>
        <P>Choose active project</P>
      </div>
      <Section title="Projects">
        <ApiStatus status={status} error={error} />
        {content}
      </Section>
    </PanelBase>
  );
}
