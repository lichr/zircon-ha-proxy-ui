import { font, p, vbox } from '../ui';
import { TopBar } from './parts/top-bar';

export function PageContent(): JSX.Element {
  return (
    <div
      css={[p, vbox, { alignItems: 'stretch' }]}
    >
      <TopBar css={{}}/>
      <div
        css={[
          {
            padding: '16px 24px'
          }
        ]}
      >Page Content</div>
    </div>
  );
}
