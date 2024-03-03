import { useTheme } from '@mui/material';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline';
import InformationOutline from 'mdi-material-ui/InformationOutline';
import LightbulbOnOutline from 'mdi-material-ui/LightbulbOnOutline';
import { vbox } from '../static-styles';

export function P(
  props: {
    li?: boolean,
    bold?: boolean,
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { li, bold, className } = props;
  const theme = useTheme();
  const color = theme.palette.text;

  return (
    <div
      className={className}
      css={[
        {
          color: color.secondary
        },
        bold && {
          color: color.primary,
          fontWeight: 'bold'
        }
      ]}
    >
      {
        li && (
          <div css={{ display: 'inline', fontWeight: 'bold', color: theme.palette.primary.main, margin: '0 8px 0 0' }}>
            -
          </div>
        )
      }
      {props.children}
    </div>
  );
}

export function SG(
  props: {
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { className } = props;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          gap: '2px'
        }
      ]}
    >
      {props.children}
    </div>
  );
}

export function Note(
  props: {
    warn?: boolean,
    tip?: boolean,
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { warn, tip, className } = props;

  let title = 'Info';
  let color = '#2196f3';
  let Icon = InformationOutline;
  if (warn) {
    title = 'Warning';
    color = '#f16e00';
    Icon = AlertCircleOutline;
  } else if (tip) {
    title = 'Tip';
    color = '#2196f3';
    Icon = LightbulbOnOutline;
  }


  return (
    <div
      className={className}
      css={
        {
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto',
          gridTemplateAreas: `
            "icon title"
            "empty text"
          `,
          alignItems: 'center',
          gap: '8px',
          padding: '8px',
          backgroundColor: `${color}11`,
          borderTop: `1px solid ${color}`,
          borderBottom: `1px solid ${color}`
        }
      }
    >
      <Icon css={{ gridArea: 'icon', color, fontSize: '20px' }} />
      <div css={{ gridArea: 'title', fontWeight: 'bold' }}>{title}</div>
      <div css={[ vbox, { gridArea: 'text', gap: '2px' } ]}>
        {props.children}
      </div>
    </div>
  );
}
