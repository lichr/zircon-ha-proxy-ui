import _ from 'lodash';
import { ApiStatus, IProjectInfo, useApiGet, usePageCore } from '../../services';
import { PanelBase } from '../../ui';
import { ProjectEditor } from './sections';

export function EditProject(
  props: {
    groupId: string;
    projectId: string;
  }
): JSX.Element {
  const { groupId, projectId } = props;

  const { state: { result, status, error } } = useApiGet<IProjectInfo>(`proxy/api/groups/${groupId}/projects/${projectId}`);
  const isBusy = status === 'pending' || status === 'start';

  if (result) {
    return (
      <ProjectEditor project={result} />
    );
  }

  return (
    <PanelBase
      title="Edit Project"
      returnDisabled={isBusy}
    >
    <ApiStatus status={status} error={error} />
    </PanelBase>
  );
}
