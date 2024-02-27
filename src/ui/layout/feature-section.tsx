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
    <PanelSection className={className} title={title}>
      <div css={[hbox, { gap: '24px' }]}>
        <div css={[vbox, { flex: '0 0 40px', alignItems: 'center' }]}>
          <div css={[center, { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2196f322' }]}>
            {
              side ?? (
                Icon && <Icon css={{ color, fontSize: '28px' }} />
              )
            }
          </div>
        </div>
        <div css={[vbox, { gap: '6px' }]}>
          {children}
        </div>
      </div>
    </PanelSection>
  );
}
