import { TopBar, p, vbox } from '../ui';
import { DialogContainer } from './dialog-container';
import { PanelContainer } from './panels';

export function PageContent(): JSX.Element {
  return (
    <div
      css={[
        p,
        vbox,
        {
          alignItems: 'stretch'
        }
      ]}
    >
      <DialogContainer />
      <div
        css={[
          vbox,
          {
            position: 'sticky',
            top: 0,
            height: '55px',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            backgroundColor: '#fffc',
            borderBottom: '1px solid #0003',
            backdropFilter: 'blur(8px)'
          }
        ]}
      >
        <div
          css={[
            vbox,
            {
              alignSelf: 'center',
              width: '100%',
              maxWidth: '1200px'
            }
          ]}
        >
          <TopBar />
        </div>
      </div>
      <div
        css={[
          vbox,
          {
            alignSelf: 'center',
            width: '100%',
            maxWidth: '1200px'
          }
        ]}
      >
        <PanelContainer />
      </div>
    </div>
  );
}
