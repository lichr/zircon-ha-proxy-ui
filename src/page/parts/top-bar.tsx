import { usePageState } from '../../services';
import { hbox, border } from '../../ui';
import { TopBarTab } from './top-bar-tab';
import { ZirconLogo } from './zircon-logo';

export function TopBar(
  props: {
    className?: string;
  }
): JSX.Element {
  const { className } = props;
  const currentTab = usePageState((state) => state.currentTab);

  return (
    <div
      css={[
        hbox,
        {
          minHeight: '56px',
          alignItems: 'stretch',
          backgroundColor: '#f8f8f8'
        }
      ]}
      className={className}
    >
      <div
        css={[
          hbox,
          {
            alignItems: 'center',
            borderBottom: border,
            padding: '0 60px 0 22px'
          }
        ]}
      >
        <div css={[hbox, { alignItems: 'center', gap: '8px' }]}>
          <ZirconLogo size="20px" />
          <div css={{ color: '#2196f3', fontSize: '20px' }}>Zircon3D</div>
        </div>
      </div>
      <TopBarTab id="project" title="Project" current={currentTab === 'project'} />
      <TopBarTab id="help" title="Help" current={currentTab === 'help'} />
      <div css={{ flex: '1 1 auto',  borderBottom: border }} />
    </div>
  );
}
