import { Button, useTheme } from '@mui/material';
import ArrowLeft from 'mdi-material-ui/ArrowLeft';
import { center, click, clickDisabled, hbox, row, vbox } from '../static-styles';

export function PanelBase(
  props: {
    title: string;
    returnDisabled?: boolean;
    onReturn?: () => void;
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { title, returnDisabled, onReturn, className, children } = props;
  const theme = useTheme();
  const color = returnDisabled ? '#666' : theme.palette.primary.main;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto auto',
          gridTemplateAreas: `
            "icon title"
            "empty children"
          `,
          gap: '8px 16px',
          padding: '24px 36px'
        }
      ]}
    >
      {
        onReturn && (
          <div
            css={[
              center,
              returnDisabled ? clickDisabled : click,
              {
                gridArea: 'icon',
                padding: '4px',
                border: `1px solid ${color}`,
                borderRadius: '50%'
              }
            ]}
            onClick={returnDisabled ? undefined : onReturn}
          >
            <ArrowLeft css={{ color, fontSize: '22px' }} />
          </div>
        )
      }
      <div css={[{ gridArea: 'title', fontSize: '24px' }]}>
        {title}
      </div>
      <div css={[vbox, { gridArea: 'children' }]}>
        {children}
      </div>
    </div>
  );
}

