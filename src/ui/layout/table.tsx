import _ from 'lodash';
import { ReactNode } from 'react';
import { row } from '../static-styles';

export interface IColumn {
  id?: string;
  label: string;
  width?: string;
}


export function TH(
  props: {
    label: string;
    width?: string;
    className?: string;
  }
) {
  const { label, width, className } = props;
  return (
    <div
      className={className}
      css={[
        row,
        {
          fontWeight: 'bold'
        }
      ]}
    >
      {label}
    </div>
  );
}

export function Table(
  props: {
    columns: IColumn[];
    hideHeader?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
): JSX.Element {
  const { columns, hideHeader, className, children } = props;
  const n = columns.length;

  const header = (hideHeader === true) ?
    null :
    columns.map(
      ({ id, label }) => {
        return (
          <TH key={id ?? _.snakeCase(label)} label={label} />
        );
      }
    );

  const gridTemplateColumns = columns.map(
    ({ width }) => width || 'auto'
  ).join(' ');

  return (
    <div
      className={className}
      css={{
        display: 'grid',
        gridTemplateColumns,
        gap: '8px'
      }}
    >
      {header}
      {children}
    </div>
  );
}
