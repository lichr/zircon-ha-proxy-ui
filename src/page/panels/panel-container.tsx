import _ from 'lodash';
import { ReactElement } from 'react';
import { usePageState } from '../../services';
import { CreateProject } from './create-project';
import { DeleteProject } from './delete-project';
import { EditProject } from './edit-project';
import { ManageProjects } from './manage-projects';
import { ProjectPanel } from './project-panel';
import { SetAccessToken } from './set-access-token';

export function PanelContainer(): ReactElement | null {
  const panels = usePageState(state => state.panels);
  const { id, config } = _.last(panels) ?? { id: 'project' };
  if (id === 'project') {
    return (<ProjectPanel />);
  } else if (id === 'manage-projects') {
    return (<ManageProjects />);
  } else if (id === 'create-project') {
    return (<CreateProject />);
  } else if (id === 'edit-project') {
    const { groupId, projectId } = config;
    return (<EditProject groupId={groupId} projectId={projectId} />);
  } else if (id === 'delete-project') {
    const { groupId, projectId } = config;
    return (<DeleteProject groupId={groupId} projectId={projectId} />);
  } else if (id === 'set-access-token') {
    return (<SetAccessToken />);
  }
  return null;
}
