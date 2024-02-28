import { useTheme } from '@mui/material';
import { P, SideSection, TopBar, hbox, vbox } from '../../ui';
import { UserSection } from './sections';

export function ProjectPanel(): JSX.Element {
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <>
      <div
        css={[hbox, { padding: '24px 36px' }]}
      >
        <div
          css={[
            vbox,
            {
              flex: '2 2 auto',
              gap: '30px'
            }
          ]}
        >
          <UserSection />
        </div>
        <div
          css={[
            vbox,
            {
              flex: '0 1 260px',
              gap: '16px'
            }
          ]}
        >
          <SideSection type="news" title="Beta2">
            <P>Zircon3D Beta2 has been released.</P>
          </SideSection>
          <SideSection type="tips" title="Embed into HA Dashboard" image="https://static.zircon.app/zircon3d.embed.png">
            <P>Zircon3D viewers can be embedded into your home assistant dashboard, using web page card.</P>
          </SideSection>
        </div>
      </div>
    </>
  );
}
