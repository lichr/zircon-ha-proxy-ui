import { DateTime } from 'luxon';
import CloudOutline from 'mdi-material-ui/CloudOutline';
import Harddisk from 'mdi-material-ui/Harddisk';
import Help from 'mdi-material-ui/Help';
import { ApiStatus, IProjectInfo, useApiGet, usePageCore } from '../../../services';
import { ActionLink, B, FeatureSection, More, P, Row, SG } from '../../../ui';
import { DesignerSection } from './designer-section';
import { ViewersSection } from './viewers-sections';

export function ProjectSection(): JSX.Element {
  const core = usePageCore();
  const { state: { status, error, result: projectInfo } } = useApiGet<IProjectInfo>('proxy/api/active_project_info');

  let projectPart = null;
  let Icon = Help;
  let next = null;

  if (projectInfo) {
    const { groupId, projectId, localOnly, onlineBranch, localBranch, name, updateTime } = projectInfo;
    Icon = onlineBranch ? CloudOutline : Harddisk;
    projectPart = (
      <>
        <SG>
          <P>
            <B>Name:</B> {name}
          </P>
          <Row css={{ gap: '36px' }}>
            <P>
              <B>Data Store :</B> {localOnly ? 'Local Only' : 'Local & Cloud'}
            </P>
          </Row>
          <More>
            <Row css={{ gap: '36px' }}>
              <P>
                <B>Group ID:</B> {groupId}
              </P>
              <P>
                <B>Project ID:</B> {projectId}
              </P>
            </Row>
            <P>
              <B>Update Time:</B> {updateTime ? DateTime.fromISO(updateTime).toLocaleString(DateTime.DATETIME_MED) : ''}
            </P>
          </More>
        </SG>
      </>
    );
    next = (
      <>
        <DesignerSection projectInfo={projectInfo} />
        <ViewersSection projectInfo={projectInfo} />
      </>
    );
  } else {
    projectPart = (
      <P>
        No active project.
      </P>
    );
  }

  return (
    <>
      <FeatureSection
        icon={Icon}
        title="Active Project"
      >
        <ApiStatus status={status} error={error} hideError />
        <Row>
          {
            projectInfo && (
              <ActionLink
                go
                title="Edit"
                onClick={
                  () => core.go(
                    'edit-project',
                    {
                          groupId: projectInfo.groupId,
                          projectId: projectInfo.projectId
                    }
                  )
                }
              />
            )
          }
          <ActionLink
            go
            title="Create Project"
            onClick={
              () => core.go('create-project')
            }
          />
          <ActionLink
            go
            title="Manage Projects"
            onClick={
              () => core.go('manage-projects')
            }
          />
        </Row>
        {projectPart}
      </FeatureSection>
      {next}
    </>
  );
}
