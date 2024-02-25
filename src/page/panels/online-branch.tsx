import { Button } from '@mui/material';
import OpenInNew from 'mdi-material-ui/OpenInNew';
import { usePageCore } from '../../services';
import { P, PanelBase, PanelSection, Row, Section, hbox } from '../../ui';

export function OnlineBranch(): JSX.Element {
  const core = usePageCore();
  return (
    <PanelBase
      title="Online Branch"
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
    >
      <PanelSection title="Online Branch">
        <div css={[hbox, { gap: '16px' }]}>
          <Button size="small" variant="outlined" endIcon={<OpenInNew />}>Edit Online Branch</Button>
        </div>
        <Section title="Advanced" warning defaultCollapsed>
          <P>Remove Project Data from Cloud Data Store</P>
          <P bold>Removed project can not restored</P>
          <Row>
            <Button size="small" variant="outlined" color="warning">Remove</Button>
          </Row>
        </Section>
      </PanelSection>
    </PanelBase>
  );
}
