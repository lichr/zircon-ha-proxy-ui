import { usePageCore } from '../../services';
import { hbox, border, noneBorder } from '../../ui';

export function TopBarTab(
  props: {
    id: string;
    title: string;
    current?: boolean;
    className?: string;
  }
) {
  const { id, title, current, className } = props;
  const core = usePageCore();

  return (
    <div
      css={[
        hbox,
        {
          alignItems: 'center',
          cursor: 'pointer'
        },
        current ? {
          padding: '0 36px',
          borderLeft: border,
          borderRight: border,
          borderBottom: noneBorder,
          backgroundColor: '#fff'
        } : {
          borderBottom: border,
          padding: '0 20px'
        }
      ]}
      className={className}
      onClick={() => {
        core.update((state) => { state.panels.currentPanel = id; });
      }}
    >
      {title}
    </div>
  );
}
