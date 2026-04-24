"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import DashboardHeader from "../../components/DashboardHeader";
import StatusBadge from "../../components/StatusBadge";
import BookingActions from "../components/BookingActions";
import { api } from "../../lib/api";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ booking: any }>(`/bookings/${id}`).then(({ booking: b }) => {
      setBooking({
        ...b,
        date: b.scheduledDate ?? b.date,
        time: b.scheduledTime ?? b.time,
        duration: b.durationMins ?? b.duration,
        price: b.priceCentavos != null ? b.priceCentavos / 100 : (b.price ?? 0),
        service: b.serviceName ?? b.service,
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <DashboardHeader title="Booking" breadcrumb="Bookings" />
        <main className="px-8 py-8 flex items-center justify-center h-64">
          <span className="text-on-surface-variant text-sm font-label">Loading…</span>
        </main>
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <DashboardHeader title="Booking Not Found" breadcrumb="Bookings" />
        <main className="px-8 py-8">
          <p className="text-on-surface-variant">Booking not found.</p>
          <Link href="/dashboard/bookings" className="text-primary text-sm font-label font-bold mt-4 inline-block">← Back to Bookings</Link>
        </main>
      </>
    );
  }

  const STATUS_BANNER: Record<string, string> = {
    confirmed: "bg-tertiary-container text-on-tertiary-container",
    pending: "bg-secondary-container text-on-secondary-container",
    completed: "bg-surface-container-highest text-on-surface-variant",
    cancelled: "bg-error/10 text-error",
  };

  return (
    <>
      <DashboardHeader title={`Booking ${booking.refNumber ?? booking.id}`} breadcrumb="Bookings" />

      <main className="px-8 py-8 max-w-5xl">

        <Link href="/dashboard/bookings"
          className="inline-flex items-center gap-2 text-on-surface-variant text-sm font-label font-bold uppercase tracking-widest hover:text-on-surface transition-colors active:scale-95 mb-8"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Bookings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* Left: Main Details */}
          <div className="space-y-5">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow overflow-hidden">
              <div className={`px-6 py-3 text-xs font-label font-bold uppercase tracking-widest ${STATUS_BANNER[booking.status] ?? "bg-surface-container text-on-surface-variant"}`}>
                {booking.status}
              </div>
              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-1">{booking.refNumber ?? booking.id}</p>
                    <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">{booking.service}</h2>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Date</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">{booking.date}</p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Time</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">{booking.time}</p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Duration</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">{booking.duration} min</p>
                  </div>
                </div>
                <p className="text-3xl font-headline font-extrabold text-primary">
                  ₱{booking.price.toLocaleString()}
                  <span className="text-sm font-body font-normal text-on-surface-variant ml-2">total</span>
                </p>
              </div>
            </div>

            {/* Pet */}
            {booking.petName && (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5">
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">Companion</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-headline font-bold ${booking.petSpecies === "cat" ? "bg-secondary-container text-on-secondary-container" : "bg-tertiary-container text-on-tertiary-container"}`}>
                    {getInitials(booking.petName)}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">{booking.petName}</p>
                    <p className="text-sm text-on-surface-variant">{booking.petBreed} · {booking.petSpecies}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Owner Contact */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">Owner Contact</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">person</span>
                  <p className="font-label font-bold text-sm text-on-surface">{booking.ownerName}</p>
                </div>
                {booking.ownerPhone && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-base">call</span>
                    <p className="text-sm text-on-surface">{booking.ownerPhone}</p>
                  </div>
                )}
                {booking.ownerEmail && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-base">mail</span>
                    <p className="text-sm text-on-surface">{booking.ownerEmail}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Booking Notes</p>
              {booking.notes ? (
                <p className="text-sm text-on-surface leading-relaxed">{booking.notes}</p>
              ) : (
                <p className="text-sm text-on-surface-variant italic">No special notes for this booking.</p>
              )}
            </div>
          </div>

          {/* Right: Action Panel */}
          <div className="space-y-4 lg:sticky lg:top-24 h-fit">
            {booking.staffName && (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-5 py-5">
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">Assigned Staff</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-headline font-bold text-primary text-sm">{getInitials(booking.staffName)}</span>
                  </div>
                  <div>
                    <p className="font-label font-bold text-sm text-on-surface">{booking.staffName}</p>
                    <p className="text-xs text-on-surface-variant">{booking.staffRole ?? "Groomer"}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-5 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">Actions</p>
              <BookingActions status={booking.status} bookingId={booking.id} onStatusChange={(status) => setBooking((b: any) => ({ ...b, status }))} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
