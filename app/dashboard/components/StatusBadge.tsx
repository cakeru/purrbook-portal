import type { BookingStatus, AvailabilityStatus } from "../lib/dashboard-data";

type Status = BookingStatus | AvailabilityStatus;

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
  const { label, className } = CONFIG[status];
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full font-label font-bold text-xs ${className}`}
    >
      {label}
    </span>
  );
}
