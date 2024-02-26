import { Button, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import CloudOutline from 'mdi-material-ui/CloudOutline';
import Harddisk from 'mdi-material-ui/Harddisk';
import { ApiStatus, IProjectInfo, useApiGet, usePageCore } from '../../../services';
import { ActionLink, B, FeatureSection, P, PanelSection, Row, SG, Section, center, hbox, vbox } from '../../../ui';
import { DesignerSection } from './designer-section';
import { ViewersSection } from './viewers-sections';

export function ProjectSection(): JSX.Element {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const core = usePageCore();
  const { state: { status, error, result: projectInfo } } = useApiGet<IProjectInfo>('active_project_info');

  if (projectInfo) {
    const { groupId, projectId, onlineBranch, localBranch, name, updateTime } = projectInfo;
    return (
      <>
        <FeatureSection
          icon={onlineBranch ? CloudOutline : Harddisk}
          title="Project"
        >
          <P>
            <ActionLink
              go
              title="Change Active Project"
              onClick={
                () => core.update((state) => { state.currentPanel = 'set-active-project' })
              }
            />
          </P>
          <SG>
            <P>
              <B>Name:</B> {name}
            </P>
            <Row css={{ gap: '36px' }}>
              <P>
                <B>Group ID:</B> {groupId}
              </P>
              <P>
                <B>Project ID:</B> {projectId}
              </P>
            </Row>
            <P>
              <B>Online Branch:</B> {onlineBranch ? 'YES' : 'NO'}
              <ActionLink go css={{ margin: '0 12px' }} title="Delete" />
            </P>
            <P>
              <B>Local Branch:</B> {localBranch ? 'YES' : 'NO'}
              <ActionLink go css={{ margin: '0 12px' }} title="Pull" />
            </P>
            <P>
              <B>Update Time:</B> {updateTime ? DateTime.fromISO(updateTime).toLocaleString(DateTime.DATETIME_MED) : ''}
            </P>
          </SG>

        </FeatureSection>

        <DesignerSection projectInfo={projectInfo} />
        <ViewersSection projectInfo={projectInfo} />
      </>
    );
  } else {
    return (
      <FeatureSection title="Active Project">
        <ApiStatus status={status} error={error} />
        <P>
          No active project.
        </P>
        <Row>
          <Button
            variant='outlined'
            size='small'
            onClick={
              () => core.update((state) => { state.currentPanel = 'set-active-project' })
            }
          >
            Set Active Project
          </Button>
        </Row>
      </FeatureSection>
    )
  }
}
