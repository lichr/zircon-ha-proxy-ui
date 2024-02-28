export function ZirconLogo(
  props: {
    size: string;
    strokeColor?: string;
  }
) {
  const { size, strokeColor } = props;

  const stroke = {
    stroke: strokeColor ?? '#2196F3',
    strokeOpacity: '1',
    strokeWidth: '48'
  }

  const fill = {
    fill: '#ffffff',
    fillOpacity: '1'
  }

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_2)">
        <path d="M14.1088 279.467L110.431 30.3653L379.345 16.8456L519.532 307.864L487.161 554.974L236.16 511.533L14.1088 279.467Z" {...stroke} {...fill} />
        <path d="M424.372 468.123L486.816 555.012" {...stroke} />
        <path d="M378.336 27.0953L343.275 123.102L120.368 42.5493L126.46 278.922L26.7214 279.793" {...stroke} />
        <path d="M117.16 278.833L436.805 486.28L343.72 116.009" {...stroke} />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="600" height="600" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
}

export function ZirconLogoWithTitle(
  props: {
    size?: string;
    color?: string;
    className?: string;
  }
) {
  const { size, color, className } = props;
  const sz = size ?? '22px';
  const cl = color ?? '#2196f3';

  return (
    <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }} className={className}>
      <ZirconLogo size={sz} strokeColor={cl} />
      <div css={{ color: cl, fontSize: sz }}>Zircon3D</div>
    </div>
  );
}
