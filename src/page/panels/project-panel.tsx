import { useTheme } from '@mui/material';
import { P, SideSection, hbox, vbox } from '../../ui';
import { ZirconLogoWithTitle } from '../parts';
import { UserSection } from './sections';

export function ProjectPanel(): JSX.Element {
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
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
            padding: '16px 0 0 0',
            gap: '16px'
          }
        ]}
      >
        <div css={{ padding: '0 0 8px 0', borderBottom: `solid 1px ${color}` }}>
          <ZirconLogoWithTitle />
        </div>
        <SideSection type="news" title="Beta2">
          <P>Zircon3D Beta2 has been released.</P>
        </SideSection>
        <SideSection type="tips" title="Embed into HA Dashboard" image="https://static.zircon.app/zircon3d.embed.png">
          <P>Zircon3D viewers can be embedded into your home assistant dashboard, using web page card.</P>
        </SideSection>
      </div>
    </div>
  );
}
