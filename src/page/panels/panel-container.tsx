import { ReactElement } from 'react';
import { usePageState } from '../../services';
import { CreateProject } from './create-project';
import { EditProject } from './edit-project';
import { LocalBranch } from './local-branch';
import { ManageProjects } from './manage-projects';
import { OnlineBranch } from './online-branch';
import { ProjectPanel } from './project-panel';
import { SetAccessToken } from './set-access-token';

export function PanelContainer(): ReactElement | null {
  const { id, config } = usePageState(state => state.currentPanel);
  if (id === 'project') {
    return (<ProjectPanel />);
  } else if (id === 'online-branch') {
    return (<OnlineBranch />);
  } else if (id === 'local-branch') {
    return (<LocalBranch />);
  } else if (id === 'manage-projects') {
    return (<ManageProjects />);
  } else if (id === 'create-project') {
    return (<CreateProject />);
  } else if (id === 'edit-project') {
    const { groupId, projectId } = config;
    return (<EditProject groupId={groupId} projectId={projectId} />);
  } else if (id === 'set-access-token') {
    return (<SetAccessToken />);
  }
  return null;
}
