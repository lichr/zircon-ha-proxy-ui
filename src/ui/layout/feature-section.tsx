import { useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { center, hbox, vbox } from '../static-styles';
import { PanelSection } from './panel-section';
import { SvgIcon } from './types';

export function FeatureSection(
  props: {
    title: string;
    side?: ReactNode;
    icon?: SvgIcon;
    className?: string;
    children?: React.ReactNode
  }
): JSX.Element {
  const { title, side, icon: Icon, className, children } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <div
      className={className}
      css={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: `
          "icon title"
          "icon children"
        `,
        gap: '8px 16px'
      }}
    >
      <div css={{ gridArea: 'title', fontSize: '20px' }}>
        {title}
      </div>
      <div css={[center, { gridArea: 'icon', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2196f322' }]}>
        {
          side ?? (
            Icon && <Icon css={{ color, fontSize: '28px' }} />
          )
        }
      </div>
      <div css={[vbox, { gridArea: 'children', gap: '6px' }]}>
        {children}
      </div>
    </div>
  );
}
