
import { useTheme } from '@mui/material';
import OpenInNew from 'mdi-material-ui/OpenInNew';
import { ReactNode } from 'react';

export function Link(
  props: {
    href?: string;
    external?: boolean;
    className?: string;
    children?: ReactNode;
  }
) {
  const { href, external, children, className } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <a
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        color,
        textDecoration: 'none'
      }}
      target={external ? '_blank' : '_self'}
      href={href} rel="noreferrer"
    >
      {children}
      {
        external && (
          <OpenInNew
            sx={{
              color,
              fontSize: '14px',
              padding: '0 0 0 4px'
            }}
          />
        )
      }
    </a>
  );
}
