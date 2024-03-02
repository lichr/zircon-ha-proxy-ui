import { Button, CircularProgress, useTheme } from '@mui/material';
import CheckCircle from 'mdi-material-ui/CheckCircle';
import { Fragment, ReactElement, useEffect } from 'react';
import { ApiStatus, IProjectInfo, useApiGet, useApiPut, usePageCore } from '../../services';
import { ActionLink, Chip, P, PanelBase, PanelSection, Row, Section, Table, click, hbox, mono } from '../../ui';

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

export function ProjectRow(props: { project: IProjectInfo }) {
  const { project: { groupId, projectId, name, active, localOnly } } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const core = usePageCore();

  const features: ReactElement[] = [];
  const actions: ReactElement[] = [
    <ActionLink
      key={projectId}
      go
      title="Edit"
      onClick={
        () => core.update((state) => { state.currentPanel = { id: 'edit-project', config: { groupId, projectId } }; })
      }
    />
  ];

  if (active) {
    features.push(<Chip key="active" color="#de3b6e" label="Active" />);
  } else {
    actions.push(
      <SetActiveButton
        key="set-active"
        data={{ groupId, projectId }}
        onSave={() => window.location.reload()}
      />
    );
  }

  if (localOnly) {
    features.push(<Chip key="local" color="#1aae28" label="Local" />);
  }

  return (
    <>
      <div css={[mono, { fontSize: '12px' }]}>{groupId}</div>
      <div css={[mono, { fontSize: '12px' }]}>{projectId}</div>
      <div css={{ fontSize: '12px', fontWeight: 'bold' }}>{name}</div>
      <Row css={{ gap: '2px' }}>
        {features}
      </Row>
      <Row>
        {actions}
      </Row>
    </>
  );
}

export function ManageProjects(): JSX.Element {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const core = usePageCore();
  const { state: { result, status, error } } = useApiGet<IProjectInfo[]>('proxy/api/projects');

  let content;
  if (result) {
    content = (
      <Table
        css={{ alignItems: 'center' }}
        columns={[
          { label: 'Group Id', width: '110px' },
          { label: 'Id', width: '121px' },
          { label: 'Name', width: '200px' },
          { label: 'Features', width: '110px' },
          { label: 'Actions', width: 'auto' }
        ]}
      >
        {
          result.map(
            (project: IProjectInfo) => (
              <ProjectRow key={project.projectId} project={project} />
            )
          )
        }
      </Table>
    );
  }

  return (
    <PanelBase
      title="Manage Projects"
      onReturn={
        () => core.update((state) => { state.currentPanel = { id: 'project' }; })
      }
    >
      <div css={{ padding: '0 0 16px 0' }}>
        <ActionLink
          go
          title="Create New Project"
          onClick={
            () => core.update((state) => { state.currentPanel = { id: 'create-project' }; })
          }
        />
      </div>
      <Section title="Projects">
        <ApiStatus status={status} error={error} />
        {content}
      </Section>
    </PanelBase>
  );
}
