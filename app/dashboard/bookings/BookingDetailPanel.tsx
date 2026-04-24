"use client";

import { api } from "../lib/api";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary-container text-on-secondary-container",
  confirmed: "bg-tertiary-container text-on-tertiary-container",
  completed: "bg-surface-container-highest text-on-surface-variant",
  cancelled: "bg-error/10 text-error",
};

export default function BookingDetailPanel({
  booking,
  onClose,
  onStatusChange,
}: {
  booking: any | null;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-inverse-surface/30 z-40 transition-opacity duration-200 ${booking ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface-container-lowest border-l border-outline-variant/15 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${booking ? "translate-x-0" : "translate-x-full"}`}
      >
        {!booking ? null : (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="font-headline font-bold text-lg text-on-surface">{booking.petName}</p>
                <p className="text-sm text-on-surface-variant mt-0.5">{booking.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-label font-bold capitalize ${STATUS_STYLES[booking.status]}`}>
                  {booking.status}
                </span>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

              {/* Pet Info */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Companion</p>
                <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-headline font-bold text-base ${booking.petSpecies === "dog" ? "bg-tertiary-container text-on-tertiary-container" : "bg-secondary-container text-on-secondary-container"}`}>
                    {getInitials(booking.petName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-on-surface">{booking.petName}</p>
                    <p className="text-sm text-on-surface-variant">{booking.petBreed} · {booking.petGender} · {booking.petAge}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{booking.petWeight} · {booking.petCoatType}</p>
                  </div>
                </div>
              </section>

              {/* Owner Info */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Owner</p>
                <div className="bg-surface-container-low rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">person</span>
                    <span className="text-sm font-label font-bold text-on-surface">{booking.ownerName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">call</span>
                    <span className="text-sm text-on-surface-variant">{booking.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">mail</span>
                    <span className="text-sm text-on-surface-variant truncate">{booking.ownerEmail}</span>
                  </div>
                </div>
              </section>

              {/* Appointment */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Appointment</p>
                <div className="bg-surface-container-low rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Service</span>
                    <span className="text-sm font-label font-bold text-on-surface">{booking.service}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Date & Time</span>
                    <span className="text-sm font-label font-bold text-on-surface">{booking.date} · {booking.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Duration</span>
                    <span className="text-sm font-label font-bold text-on-surface">{booking.duration} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-on-surface-variant">Assigned to</span>
                    <span className="text-sm font-label font-bold text-on-surface">{booking.staffName ?? "—"}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3">
                    <span className="text-sm font-bold text-on-surface">Total</span>
                    <span className="text-lg font-headline font-extrabold text-primary">₱{booking.price.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              {/* Notes */}
              {booking.notes && (
                <section>
                  <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Owner Notes</p>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed italic">&ldquo;{booking.notes}&rdquo;</p>
                  </div>
                </section>
              )}

              {/* Shared care records */}
              {booking.petSharesRecords && booking.sharedCareRecords && booking.sharedCareRecords.length > 0 && (
                <section>
                  <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Shared Care History</p>
                  <div className="space-y-3">
                    {booking.sharedCareRecords.map((rec, i) => (
                      <div key={i} className="bg-surface-container-low rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-label font-bold text-sm text-on-surface">{rec.summary}</p>
                          <p className="text-xs text-on-surface-variant">{rec.date}</p>
                        </div>
                        <p className="text-xs text-on-surface-variant mb-2">{rec.attendant.name} · {rec.attendant.role}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.services.map((svc) => (
                            <span key={svc} className="px-2 py-0.5 bg-surface-container rounded-full text-xs font-label text-on-surface-variant">
                              {svc}
                            </span>
                          ))}
                        </div>
                        {rec.notes && (
                          <p className="text-xs text-on-surface-variant mt-2 italic">{rec.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Actions */}
            {(booking.status === "pending" || booking.status === "confirmed") && (
              <div className="px-6 py-5 border-t border-outline-variant/10 flex gap-3 flex-shrink-0">
                {booking.status === "pending" && (
                  <button
                    onClick={() => { onStatusChange(booking.id, "confirmed"); onClose(); }}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
                  >
                    Confirm Booking
                  </button>
                )}
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => { onStatusChange(booking.id, "completed"); onClose(); }}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
                  >
                    Mark as Complete
                  </button>
                )}
                <button
                  onClick={() => { onStatusChange(booking.id, "cancelled"); onClose(); }}
                  className="px-5 py-3 rounded-full border border-outline-variant/30 text-error font-label font-bold text-sm hover:bg-error/5 active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
