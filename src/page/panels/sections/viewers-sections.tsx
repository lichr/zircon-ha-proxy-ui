import _ from 'lodash';
import MonitorDashboard from 'mdi-material-ui/MonitorDashboard';
import { IProjectInfo } from '../../../services';
import { ActionLink, B, FeatureSection, P, SG } from '../../../ui';

export function ViewersSection(
  props: {
    projectInfo: IProjectInfo;
  }
): JSX.Element {
  const { projectInfo } = props;

  return (
    <FeatureSection
      icon={MonitorDashboard}
      title="Viewers"
    >
      <P>
        <ActionLink go title="Go to Viewers" onClick={() => { }} />
      </P>
      <SG>
        <P><B>Viewers</B> are group of versatile applications that visualize your home plan</P>
        <P li>They can show multiple <B>buildings</B> or a single <B>floor</B> in <B>2D</B> or <B>3D</B> views</P>
        <P li>They can also be used to <B>remote control</B> devices</P>
        <P li>Unlike designer, they <B>do not need</B> internet connection</P>
        <P li>They can <B>be embedded</B> into your home assistant dashboard, using web card</P>
      </SG>

    </FeatureSection>
  );
}
