import { useTheme } from '@mui/material';

export function P(
  props: {
    bold?: boolean,
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { bold, className } = props;
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
      {props.children}
    </div>
  );
}
