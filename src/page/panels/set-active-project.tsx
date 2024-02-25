import { Button } from '@mui/material';
import OpenInNew from 'mdi-material-ui/OpenInNew';
import { usePageCore } from '../../services';
import { P, PanelBase, PanelSection, Row, Section, Table, hbox } from '../../ui';

export function SetActiveProject(): JSX.Element {
  const core = usePageCore();
  return (
    <PanelBase
      title="Set Active Project"
      onReturn={
        () => core.update((state) => { state.currentPanel = 'project' })
      }
    >
      <div  css={{ padding: '0 0 16px 0' }}>
        <P>Choose active project</P>
      </div>
      <Section title="Projects">
        <Table
          columns={[
            { label: 'Group Id', width: '120px' },
            { label: 'Id', width: '120px' },
            { label: 'Name', width: '200px' },
            { label: 'Tags', width: '200px' },
            { label: 'Actions', width: 'auto' }
          ]}
        >
          <div>xxx</div>
          <div>yyy</div>
          <div>My Awesome Project</div>
          <div>
            <div>Online</div>
            <div>Local</div>
          </div>
          <Row>
            <Button sx={{ backgroundColor: '#fff' }} size="small" variant="outlined">Set Active</Button>
          </Row>
        </Table>
      </Section>
    </PanelBase>
  );
}
