import { font, p, vbox } from '../ui';
import { DialogContainer } from './dialog-container';
import { PanelContainer } from './panel-container';
import { TopBar } from './parts/top-bar';

export function PageContent(): JSX.Element {
  return (
    <div
      css={[
        p,
        vbox,
        {
          width: '100%',
          height: '100%',
          alignItems: 'stretch'
        }
      ]}
    >
      <TopBar css={{}}/>
      <DialogContainer />
      <div css={{ overflow: 'auto' }}>
        <PanelContainer />
      </div>
    </div>
  );
}
