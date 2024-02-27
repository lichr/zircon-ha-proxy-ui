import { useTheme } from '@mui/material';
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
