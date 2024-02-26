import { hbox, p, vbox } from '../ui';
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
      {/* <TopBar css={{}}/> */}
      <DialogContainer />
      <div
        css={[
          vbox,
          {
            alignItems: 'center',
            overflow: 'auto'
          }
        ]}
      >
        <div
          css={[
            hbox,
            {
              width: '100%',
              maxWidth: '1200px'
            }
          ]}
        >
          <PanelContainer />
        </div>
      </div>
    </div>
  );
}
