import CheckCircle from 'mdi-material-ui/CheckCircle';
import CloudOutline from 'mdi-material-ui/CloudOutline';
import Harddisk from 'mdi-material-ui/Harddisk';
import { usePageCore } from '../../services';
import { B, NaviCard, P, PanelBase, PanelSection, Section, vbox } from '../../ui';

export function ProjectPanel(): JSX.Element {
  const core = usePageCore();

  return (
    <PanelBase>
      <div
        css={[
          vbox,
          {
            flex: '1 1 auto',
            gap: '32px'
          }
        ]}
      >
        <Section title="Set Active Project">
          <div>
            <P>You can create multiple projects.</P>
            <P>Only one project can be actively served by this proxy.</P>
          </div>
          <NaviCard
            icon={CheckCircle}
            title="My Awesome Project"
            onClick={
              () => core.update((state) => { state.currentPanel = 'set-active-project' })
            }
          >
            <P>Project data is stored in cloud data store</P>
          </NaviCard>
        </Section>
        <Section title="Work with Branches">
          <div css={vbox}>
            <P>A <B>Branch</B> is a copy of your home plan data</P>
            <P>You can choose where to store a branch, <B>online store</B>, <B>local store</B> or <B>both</B></P>
          </div>
          <NaviCard
            icon={CloudOutline}
            title="Online Branch"
            onClick={
              () => core.update((state) => { state.currentPanel = 'online-branch' })
            }
          >
            <P>Project data is stored in cloud data store</P>
          </NaviCard>
          <NaviCard
            icon={Harddisk}
            title="Local Branch"
            onClick={
              () => core.update((state) => { state.currentPanel = 'local-branch' })
            }
          >
            <P>Project data is stored in local data store</P>
          </NaviCard>
        </Section>
      </div>
    </PanelBase>
  );
}
