import _ from 'lodash';
import MathCompass from 'mdi-material-ui/MathCompass';
import { IProjectInfo, usePageCore } from '../../../services';
import { ActionLink, B, FeatureSection, More, P, SG } from '../../../ui';

export function DesignerSection(
  props: {
    projectInfo: IProjectInfo;
  }
): JSX.Element {
  const { projectInfo } = props;
  const core = usePageCore();

  return (
    <FeatureSection
      icon={MathCompass}
      title="Designer"
    >
      <P>
        <ActionLink
          external
          title="Open Designer"
          onClick={
            () => {
              window.open(`${core.config.baseUrl}/active/designer/`, '_blank');
            }
          }
        />
      </P>
      <SG>
        <P><B>Designer</B> is an application that allows users to <B>edit</B> home plans</P>
        <More>
          <P li>It requires <B>internet connection</B> in order to work</P>
          <P li>It saves home plan data to the <B>local data store</B> or <B>cloud</B> based on whether the online branch exists </P>
        </More>
      </SG>
    </FeatureSection>
  );
}
