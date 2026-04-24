type Status = string;

const CONFIG: Record<Status, { label: string; className: string }> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-tertiary-container text-on-tertiary-container",
  },
  pending: {
    label: "Pending",
    className: "bg-secondary-container text-on-secondary-container",
  },
  completed: {
    label: "Completed",
    className: "bg-surface-container-highest text-on-surface-variant",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-error/10 text-error",
  },
  available: {
    label: "Available",
    className: "bg-tertiary-container text-on-tertiary-container",
  },
  on_break: {
    label: "On Break",
    className: "bg-secondary-container text-on-secondary-container",
  },
  off_today: {
    label: "Off Today",
    className: "bg-surface-container-highest text-on-surface-variant",
  },
};

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = CONFIG[status as keyof typeof CONFIG] ?? { label: status, className: "bg-surface-container text-on-surface-variant" };
  return (
    <span className={`inline-block px-3 py-1 rounded-full font-label font-bold text-xs ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
