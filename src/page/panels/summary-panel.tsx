import { vbox } from '../../ui';

export function SummaryPanel(props: { children: React.ReactNode }): JSX.Element {
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
