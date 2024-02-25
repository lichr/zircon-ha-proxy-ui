import { useTheme } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import { click, hbox, vbox } from '../static-styles';
import { SvgIcon } from './types';

export function NaviCard(
  props: {
    icon: SvgIcon;
    title: string;
    onClick?: () => void;
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { icon: Icon, title, onClick, className } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <div
      className={className}
      css={[
        click,
        {
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gridTemplateRows: 'auto 1fr',
          gridTemplateAreas: `
              "icon title action"
              "icon main action"
          `,
          maxWidth: '480px',
          padding: '10px 12px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }
      ]}
      onClick={onClick}
    >
      <Icon
        css={{
          gridArea: 'icon',
          color,
          fontSize: '40px',
          alignSelf: 'center',
          margin: '0 24px 0 0'
        }}
      />
      <div
        css={{
          gridArea: 'title',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {title}
      </div>
      <div
        css={[
          vbox,
          {
            gridArea: 'main',
            padding: '8px 0 0 0',
            gap: '2px'
          }
        ]}
      >
        {props.children}
      </div>
      <ChevronRight css={{ gridArea: 'action', color,  alignSelf: 'center' }} />
    </div>
  );
}
