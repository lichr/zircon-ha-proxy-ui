import { Button, useTheme } from '@mui/material';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import { useState } from 'react';
import { center, click, vbox } from '../static-styles';
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
  const Icon = expanded ? ChevronDown : ChevronRight;

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
      <Row css={{ gap: '8px' }}>
        <div
          css={[
            center,
            click,
            {
              width: '28px',
              height: '28px'
            }
          ]}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon css={{ color, fontSize: '24px' }} />
        </div>
        <div
          css={{
            fontSize: '18px',
            userSelect: 'none'
          }}
        >
          {title}
        </div>
      </Row>
      {
        expanded && (
          <div
            css={[
              vbox,
              {
                padding: '0 0 16px 36px',
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
