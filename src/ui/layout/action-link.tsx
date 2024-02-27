import { useTheme } from '@mui/material';
import MenuRight from 'mdi-material-ui/MenuRight';
import OpenInNew from 'mdi-material-ui/OpenInNew';
import { click, clickDisabled } from '../static-styles';

export function ActionLink(
  props: {
    title: string;
    disabled?: boolean;
    external?: boolean;
    go?: boolean;
    className?: string;
    onClick?: () => void;
  }
): JSX.Element {
  const { title, go: dialog, external, disabled, className, onClick } = props;
  const theme = useTheme();
  const color = disabled ? '#666' : theme.palette.primary.main;

  return (
    <div
      css={[
        disabled ? clickDisabled : click,
        {
          display: 'inline-flex',
          alignItems: 'center',
          color,
          fontSize: '12px',
          border: `1px solid ${color}`,
          borderRadius: '3px',
          padding: '2px 6px'
        },
        dialog && {
          padding: '2px 2px 2px 6px'
        },
        external && {
          gap: '4px'
        }
      ]}
      className={className}
      onClick={disabled ? undefined : onClick}
    >
      {title}
      {
        dialog && (
          <MenuRight css={{ color, fontSize: '12px' }} />
        )
      }
      {
        external && (
          <OpenInNew css={{ color, fontSize: '12px' }} />
        )
      }
    </div>
  );

}
