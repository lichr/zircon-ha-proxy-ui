import { Button, useTheme } from '@mui/material';
import ArrowLeft from 'mdi-material-ui/ArrowLeft';
import { center, click, hbox, row, vbox } from '../static-styles';

export function PanelBase(
  props: {
    title?: string;
    onReturn?: () => void;
    className?: string,
    children?: React.ReactNode
  }
): JSX.Element {
  const { title, onReturn, className, children } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          padding: '24px 36px',
          gap: '16px'
        }
      ]}
    >
      {
        title && (
          <div css={[row, { gap: '12px' }]}>
            {
              onReturn && (
                <div
                  css={[
                    center,
                    click,
                    {
                      padding: '4px',
                      border: `1px solid ${color}`,
                      borderRadius: '50%'
                    }
                  ]}
                  onClick={onReturn}
                >
                  <ArrowLeft css={{ color, fontSize: '22px' }} />
                </div>
              )
            }
            <div css={[{ fontSize: '24px' }]}>
              {title}
            </div>
          </div>
        )
      }
      <div>
        {children}
      </div>
    </div>
  );
}

