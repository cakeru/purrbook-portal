type BarData = {
  label: string;
  value: number;
  isCurrent?: boolean;
  sublabel?: string;
};

type Props = {
  data: BarData[];
  height?: number;
  color?: "primary" | "secondary";
  formatValue?: (v: number) => string;
};

export default function CssBarChart({
  data,
  height = 180,
  color = "primary",
  formatValue,
}: Props) {
  const max = Math.max(...data.map((d) => d.value));

  const barClass =
    color === "primary"
      ? "bg-primary/35 group-[.current]:bg-primary"
      : "bg-secondary/30 group-[.current]:bg-secondary";

  return (
    <div
      className="flex items-end gap-3 w-full"
      style={{ height: `${height}px` }}
    >
      {data.map((d) => {
        const pct = max > 0 ? (d.value / max) * 100 : 0;
        return (
          <div
            key={d.label}
            className={`flex flex-col items-center gap-1.5 flex-1 h-full justify-end group ${d.isCurrent ? "current" : ""}`}
          >
            {/* Value label */}
            <span className="text-xs font-label font-bold text-on-surface-variant whitespace-nowrap">
              {formatValue ? formatValue(d.value) : d.value}
            </span>

            {/* Bar */}
            <div
              className={`w-full rounded-t-lg transition-all duration-500 ${d.isCurrent ? "bg-primary" : color === "primary" ? "bg-primary/35" : "bg-secondary/30"}`}
              style={{ height: `${pct}%` }}
            />

            {/* Month label */}
            <span
              className={`text-xs font-label font-bold whitespace-nowrap ${d.isCurrent ? "text-primary" : "text-on-surface-variant"}`}
            >
              {d.label}
            </span>
            {d.sublabel && (
              <span className="text-xs text-on-surface-variant">
                {d.sublabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
