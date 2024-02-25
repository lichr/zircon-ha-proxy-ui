import { Modal } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { usePageState } from '../services';
import { SetupProjectDialog } from './dialogs';

export function DialogContainer(): ReactElement | null {
  const dialogConfig = usePageState(state => state.dialog);
  let dialog: ReactNode = null;
  if (dialogConfig) {
    const { type, config } = dialogConfig;
    if (type === 'setup-dialog') {
      dialog = (<SetupProjectDialog />);
    }
  }
  if (dialog) {
    return (
      <Modal
        open={true}
      >
        <div style={{ width: '100%', height: '100%' }}>
          {dialog}
        </div>
      </Modal>
    );
  }
  return null;
}
