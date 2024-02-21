import { vbox } from '../static-styles';

export function Section(
  props: {
    title: string;
    children: React.ReactNode
  }
): JSX.Element {
  return (
    <div
      css={[
        vbox,
        {
          padding: '16px 24px'
        }
      ]}
    >
      {props.children}
    </div>
  );
}
