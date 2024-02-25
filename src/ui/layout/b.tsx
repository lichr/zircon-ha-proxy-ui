import { useTheme } from '@mui/material';

export function B(
  props: {
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { className } = props;
  const theme = useTheme();
  const color = theme.palette.text.primary;

  return (
    <div
      className={className}
      css={{
        display: 'inline',
        fontWeight: 'bold',
        color
      }}
    >
      {props.children}
    </div>
  );
}
