import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline';
import BullhornOutline from 'mdi-material-ui/BullhornOutline';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import InformationOutline from 'mdi-material-ui/InformationOutline';
import LightbulbOnOutline from 'mdi-material-ui/LightbulbOnOutline';
import { center, vbox } from '../static-styles';
import { SvgIcon } from './types';


export type SideSectionType = 'news' | 'tips' | 'error' | 'warning' | 'info';

function SectionIcon(
  props: {
    icon: SvgIcon;
    color: string;
  }
) {
  const { icon: Icon, color } = props;

  return (
    <div css={[center, { width: '20px', height: '20px', borderRadius: '50%', backgroundColor: `${color}22` }]}>
      <Icon css={{ color, fontSize: '20px' }} />
    </div>
  );
}

export function SideSection(
  props: {
    type: SideSectionType;
    title: string;
    children?: React.ReactNode;
  }
): JSX.Element {
  const { type, title, children } = props;

  let icon = null;
  if (type === 'news') {
    icon = <SectionIcon icon={BullhornOutline} color="#2196f3" />;
  } else if (type === 'tips') {
    icon = <SectionIcon icon={LightbulbOnOutline} color="#4caf50" />;
  } else if (type === 'error') {
    icon = <SectionIcon icon={CloseCircle} color="#f44336" />;
  } else if (type === 'warning') {
    icon = <SectionIcon icon={AlertCircleOutline} color="#ff9800" />;
  } else if (type === 'info') {
    icon = <SectionIcon icon={InformationOutline} color="#2196f3" />;
  }

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: '20px 1fr',
        gridTemplateRows: '20px auto',
        gridTemplateAreas: `
          "icon title"
          "empty children"
        `,
        gap: '8px'
      }}
    >
      <div css={{ gridArea: 'icon', alignSelf:'center' }}>{icon}</div>
      <div css={{ gridArea: 'title', alignSelf: 'center', fontWeight: 'bold' }}>{title}</div>
      <div css={[vbox, { gridArea: 'children' }]}>
        {children}
      </div>
    </div>
  );
}
