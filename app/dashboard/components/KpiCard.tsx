type Props = {
  icon: string;
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  size?: "default" | "compact";
};

export default function KpiCard({
  icon,
  label,
  value,
  delta,
  deltaPositive,
  size = "default",
}: Props) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 editorial-shadow flex flex-col gap-3">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <span
          className="material-symbols-outlined text-primary text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>

      {/* Value */}
      <div>
        <p
          className={`font-headline font-extrabold text-primary leading-none ${size === "compact" ? "text-2xl" : "text-3xl"}`}
        >
          {value}
        </p>
        <p className="text-xs text-on-surface-variant font-label font-bold mt-1.5">
          {label}
        </p>
      </div>

      {/* Delta */}
      {delta && (
        <p
          className={`text-xs font-label font-bold ${deltaPositive ? "text-tertiary" : "text-error"}`}
        >
          {deltaPositive ? "↑" : "↓"} {delta}
        </p>
      )}
    </div>
  );
}
