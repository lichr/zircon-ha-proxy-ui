import { vbox } from '../static-styles';
import { Row } from './row';

export function PanelSection(
  props: {
    title: string;
    className?: string;
    children?: React.ReactNode
  }
): JSX.Element {
  const { title, className, children } = props;

  return (
    <div
      className={className}
      css={[
        vbox,
        {
          gap: '12px'
        }
      ]}
    >
      <Row css={{ gap: '8px' }}>
        <div
          css={{
            fontSize: '20px',
            userSelect: 'none'
          }}
        >
          {title}
        </div>
      </Row>
      <div
        css={[
          vbox,
          {
            gap: '24px'
          }
        ]}
      >
        {children}
      </div>
    </div>
  );
}
