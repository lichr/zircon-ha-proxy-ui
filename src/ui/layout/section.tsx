import { Button } from '@mui/material';
import { ReactNode, useState } from 'react';
import { hbox, vbox } from '../static-styles';

export function Section(
  props: {
    title: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    warning?: boolean;
    className?: string;
    children?: ReactNode
  }
): JSX.Element {
  const { title, defaultCollapsed, collapsible, warning, className, children } = props;
  const [expanded, setExpanded] = useState(defaultCollapsed === true ? false : true);
  const blue = '#2196f3';
  const orange = '#F1C40F';
  const color = warning ? orange : blue;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          gap: '8px'
        }
      ]}
    >
      <div
        css={[
          hbox,
          {
            alignItems: 'center',
            gap: '16px'
          }
        ]}
      >
        <div
          css={{
            fontSize: '16px'
          }}
        >
          {title}
        </div>
        {
          (collapsible || defaultCollapsed) && (
            <Button size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
          )
        }
      </div>
      {
        expanded && (
          <div
            css={[
              vbox,
              {
                gap: '8px'
              },
              defaultCollapsed && {
                borderTop: `1px solid ${color}`,
                borderBottom: `1px solid ${color}`,
                backgroundColor: `${color}11`,
                padding: '16px 16px'
              }
            ]}>
            {children}
          </div>
        )
      }
    </div>
  );
}
