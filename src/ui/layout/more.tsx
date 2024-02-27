import { useTheme } from '@mui/material';
import _ from 'lodash';
import { ReactNode, useState } from 'react';
import { click } from '../static-styles';
import { Row } from './row';

export function More(
  props: {
    children?: ReactNode;
  }
) {
  const { children } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const [expanded, setExpanded] = useState(false);
  const list = expanded ? (_.isArray(children) ? children : [children]) : [];

  return (
    <>
      <Row>
        <div
          css={[
            click,
            {
              fontSize: '14px',
              color
            }
          ]}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Less' : 'More'}
        </div>
      </Row>
      {
        ...list
      }
    </>
  );
}
