"use client";

import { useState } from "react";
import type { BookingStatus } from "../../lib/dashboard-data";

export default function BookingActions({ status }: { status: BookingStatus }) {
  const [confirmed, setConfirmed] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  if (status === "completed") {
    return (
      <div className="space-y-3">
        <button className="w-full border-2 border-outline-variant text-on-surface rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base">history</span>
          View Care Record
        </button>
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="space-y-3">
        <button className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20">
          Rebook Appointment
        </button>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="space-y-3">
        <div className="w-full bg-tertiary-container text-on-tertiary-container rounded-full py-3 font-label font-bold text-sm flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          Booking Confirmed
        </div>
        <button className="w-full bg-surface-container-highest text-on-surface rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all">
          Reschedule
        </button>
      </div>
    );
  }

  if (cancelled) {
    return (
      <div className="space-y-3">
        <div className="w-full bg-error/10 text-error rounded-full py-3 font-label font-bold text-sm flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            cancel
          </span>
          Booking Cancelled
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {status === "pending" && (
        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Confirm Booking
        </button>
      )}

      {status === "confirmed" && (
        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Mark as Complete
        </button>
      )}

      <button
        onClick={() => setCancelled(true)}
        className="w-full border-2 border-error text-error rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all"
      >
        Cancel Booking
      </button>

      <button className="w-full bg-surface-container-highest text-on-surface rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all">
        Reschedule
      </button>
    </div>
  );
}
