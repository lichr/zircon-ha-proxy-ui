import { ReactElement } from 'react';
import { usePageState } from '../services';
import { LocalBranch, OnlineBranch, ProjectPanel, SetActiveProject } from './panels';

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
  }
  return null;
}
