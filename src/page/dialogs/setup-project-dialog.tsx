import { vbox } from '../../ui';

export function SetupProjectDialog(): JSX.Element {
  return (
    <div
      css={[
        vbox,
        {
          padding: '16px 24px'
        }
      ]}
    >
      <h1>Setup Project</h1>
      <p>
        This is the setup project dialog. It is a placeholder for now.
      </p>
    </div>
  );
}
