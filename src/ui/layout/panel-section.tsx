import { Button, useTheme } from '@mui/material';
import { useState } from 'react';
import { vbox } from '../static-styles';
import { Row } from './row';

export function PanelSection(
  props: {
    title: string;
    className?: string;
    children?: React.ReactNode
  }
): JSX.Element {
  const { title, className, children } = props;
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          gap: '12px'
        }
      ]}
    >
      <Row>
        <div
          css={{
            fontSize: '20px'
          }}
        >
          {title}
        </div>
        <Button size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </Row>
      {
        expanded && (
          <div
            css={[
              vbox,
              {
                padding: '0 0 24px 0',
                gap: '24px'
              }
            ]}
          >
            {children}
          </div>
        )
      }
    </div>
  );
}
