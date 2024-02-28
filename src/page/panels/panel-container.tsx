import { ReactElement } from 'react';
import { usePageState } from '../../services';
import { CreateProject } from './create-project';
import { LocalBranch } from './local-branch';
import { OnlineBranch } from './online-branch';
import { ProjectPanel } from './project-panel';
import { SetAccessToken } from './set-access-token';
import { SetActiveProject } from './set-active-project';

export function PanelContainer(): ReactElement | null {
  const currentPanel = usePageState(state => state.currentPanel);
  if (currentPanel === 'project') {
    return (<ProjectPanel />);
  } else if (currentPanel === 'online-branch') {
    return (<OnlineBranch />);
  } else if (currentPanel === 'local-branch') {
    return (<LocalBranch />);
  } else if (currentPanel === 'set-active-project') {
    return (<SetActiveProject />);
  } else if (currentPanel === 'create-project') {
    return (<CreateProject />);
  } else if (currentPanel === 'set-access-token') {
    return (<SetAccessToken />);
  }
  return null;
}
