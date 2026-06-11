type DemoTooltipProps = {
  filterName: string;
};
function DemoTooltip({ filterName }: DemoTooltipProps) {
  return (
    <div
      title={`This ${filterName} filter is for demo purpose only. It will have no effect on actual result`}
    >
      <svg
        version='1.1'
        viewBox='0 0 32 32'
        enable-background='new 0 0 32 32'
        width='1em'
        height='1em'
      >
        <rect x='15' y='14' width='2' height='8' />
        <rect x='15' y='10' width='2' height='2' />
        <circle
          fill='none'
          stroke='#000000'
          stroke-width='2'
          stroke-miterlimit='10'
          cx='16'
          cy='16'
          r='12'
        />
      </svg>
    </div>
  );
}

export default DemoTooltip;
