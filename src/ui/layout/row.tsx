import { hbox } from '../static-styles';

export function Row(
  props: {
    className?: string,
    children?: React.ReactNode
  }
  ): JSX.Element {
  const { className } = props;
  return (
    <div
      className={className}
      css={[hbox, { alignItems: 'center', gap: '16px' }]}
    >
      {props.children}
    </div>
  );
}
