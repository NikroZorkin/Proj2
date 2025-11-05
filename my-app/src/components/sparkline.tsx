interface SparklineProps {
  prices: number[];
  width?: number;
  height?: number;
}

export function Sparkline({
  prices,
  width = 200,
  height = 40,
}: SparklineProps) {
  if (!prices || prices.length === 0) {
    return (
      <svg width={width} height={height} className="shrink-0">
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-400"
        />
      </svg>
    );
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const padding = 2;

  const points = prices.map((price, index) => {
    const x = (index / (prices.length - 1 || 1)) * (width - padding * 2) + padding;
    const y =
      height -
      padding -
      ((price - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const isUp = prices[prices.length - 1] > prices[0];
  const strokeColor = isUp ? "var(--up)" : "var(--down)";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
      aria-hidden="true"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

