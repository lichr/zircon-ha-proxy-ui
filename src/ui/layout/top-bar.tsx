import { hbox } from '../static-styles';
import { ZirconLogoWithTitle } from './zircon-logo';

export function TopBar(
  props: {
    className?: string;
  }
): JSX.Element {
  const { className } = props;

  return (
    <div
      className={className}
      css={[
        hbox,
        {
          padding: '0 36px'
        }
      ]}
    >
      <ZirconLogoWithTitle />
    </div>
  );
}