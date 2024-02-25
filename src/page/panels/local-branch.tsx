import { Button } from '@mui/material';
import OpenInNew from 'mdi-material-ui/OpenInNew';
import { usePageCore } from '../../services';
import { B, P, PanelBase, PanelSection, Row, Section, hbox } from '../../ui';

export function LocalBranch(): JSX.Element {
  const core = usePageCore();
  return (
    <PanelBase
      title="Local Branch"
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
    >
      <PanelSection title="Local Branch">
        <Section title="Edit Home Plan">
          <P><B>Data Safety: </B>Home plan data never leave your home network</P>
          <P><B>Need Internet:</B> Still need internet connection to access designer app and resource library</P>
          <Row>
            <Button size="small" variant="outlined" endIcon={<OpenInNew />}>Edit Local Branch</Button>
          </Row>
        </Section>
        <Section title="Sync With Online Branch">
          <P><B>Push:</B> Upload home plan from local data store to cloud data store</P>
          <P><B>Pull:</B> Download home plan from cloud data store to local data store</P>
          <Row>
            <Button size="small" variant="outlined">Push</Button>
            <Button size="small" variant="outlined">Pull</Button>
          </Row>
        </Section>
        <Section title="Advanced" warning defaultCollapsed>
          <P>Remove Project Data from Local Data Store</P>
          <P bold>Removed project can not restored</P>
          <Row>
            <Button size="small" variant="outlined" color="warning">Remove</Button>
          </Row>
        </Section>
      </PanelSection>
    </PanelBase>
  );
}
