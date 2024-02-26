import _ from 'lodash';
import MathCompass from 'mdi-material-ui/MathCompass';
import { IProjectInfo } from '../../../services';
import { ActionLink, B, FeatureSection, P, SG } from '../../../ui';

export function DesignerSection(
  props: {
    projectInfo: IProjectInfo;
  }
): JSX.Element {
  const { projectInfo } = props;

  return (
    <FeatureSection
      icon={MathCompass}
      title="Designer"
    >
      <P>
        <ActionLink external title="Open Designer" onClick={() => { }} />
      </P>
      <SG>
        <P><B>Designer</B> is an application that allows users to <B>edit</B> home plans</P>
        <P li>It requires <B>internet connection</B> in order to work</P>
        <P li>It saves home plan data to <B>local data store</B> or <B>cloud</B> according to project settings </P>
      </SG>
    </FeatureSection>
  );
}
