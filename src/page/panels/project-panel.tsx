import { PanelBase, SideSection, hbox, vbox } from '../../ui';
import { UserSection } from './sections';

export function ProjectPanel(): JSX.Element {

  return (
    <PanelBase css={{ padding: '24px 17px' }}>
      <div
        css={[hbox]}
      >
        <div
          css={[
            vbox,
            {
              flex: '1 1 auto',
              gap: '4px'
            }
          ]}
        >
          <UserSection />
        </div>
        <div
          css={[
            vbox,
            {
              display: 'none',
              flex: '0 0 200px',
              padding: '16px 0 0 0',
              gap: '16px'
            }
          ]}
        >
          <SideSection type="tips" title="Tips">
          </SideSection>
          <SideSection type="news" title="News">
          </SideSection>
          <SideSection type="error" title="Error">
          </SideSection>
          <SideSection type="warning" title="Warning">
          </SideSection>
          <SideSection type="info" title="Info">
          </SideSection>
        </div>
      </div>
    </PanelBase>
  );
}
