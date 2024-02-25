import { vbox } from '../static-styles';

export function SideCard(
  props: {
    title: string;
    className?: string;
    children?: React.ReactNode
  }
): JSX.Element {
  const { title, className, children } = props;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          padding: '16px 24px'
        }
      ]}
    >
      {children}
    </div>
  );
}
