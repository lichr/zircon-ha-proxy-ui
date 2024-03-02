import { useTheme } from '@mui/material';
import { hbox } from '../static-styles';

export function Chip(
  props: {
    label: string;
    color: string;
    className?: string;
  }
): JSX.Element {
  const { label: label, color, className } = props;

  return (
    <div
      css={[
        hbox,
        {
          display: 'inline-flex',
          alignItems: 'center',
          color: '#fff',
          backgroundColor: color,
          fontSize: '12px',
          borderRadius: '50vmin',
          padding: '2px 6px'
        }
      ]}
      className={className}
    >
      {label}
    </div>
  );
}
