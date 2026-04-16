import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardHeader from "../../components/DashboardHeader";
import StatusBadge from "../../components/StatusBadge";
import BookingActions from "../components/BookingActions";
import { BOOKINGS, STAFF } from "../../lib/dashboard-data";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = BOOKINGS.find((b) => b.id === id);
  if (!booking) notFound();

  const staff = STAFF.find((s) => s.id === booking.groomerId);

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  }

  return (
    <>
      <DashboardHeader title={`Booking ${booking.id}`} breadcrumb="Bookings" />

      <main className="px-8 py-8 max-w-5xl">

        {/* Back Link */}
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center gap-2 text-on-surface-variant text-sm font-label font-bold uppercase tracking-widest hover:text-on-surface transition-colors active:scale-95 transition-all mb-8"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Bookings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* Left: Main Details */}
          <div className="space-y-5">

            {/* Booking Overview */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow overflow-hidden">
              {/* Status Banner */}
              <div
                className={`px-6 py-3 text-xs font-label font-bold uppercase tracking-widest ${
                  booking.status === "confirmed"
                    ? "bg-tertiary-container text-on-tertiary-container"
                    : booking.status === "pending"
                      ? "bg-secondary-container text-on-secondary-container"
                      : booking.status === "completed"
                        ? "bg-surface-container-highest text-on-surface-variant"
                        : "bg-error/10 text-error"
                }`}
              >
                {booking.status}
              </div>

              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                      {booking.id}
                    </p>
                    <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
                      {booking.service}
                    </h2>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>

                {/* Stat Row */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">
                      Date
                    </p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
                      {booking.date}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">
                      Time
                    </p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
                      {booking.time}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">
                      Duration
                    </p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
                      {booking.duration} min
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-3xl font-headline font-extrabold text-primary">
                  ₱{booking.price.toLocaleString()}
                  <span className="text-sm font-body font-normal text-on-surface-variant ml-2">
                    total
                  </span>
                </p>
              </div>
            </div>

            {/* Pet Information */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Pet Information
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-headline font-bold text-xl ${
                    booking.petSpecies === "dog"
                      ? "bg-tertiary-container text-on-tertiary-container"
                      : "bg-secondary-container text-on-secondary-container"
                  }`}
                >
                  {getInitials(booking.petName)}
                </div>
                <div>
                  <p className="font-headline font-bold text-lg text-on-surface">
                    {booking.petName}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {booking.petBreed} ·{" "}
                    {booking.petSpecies === "dog" ? "Dog" : "Cat"}
                  </p>
                </div>
              </div>
            </div>

            {/* Owner Contact */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Owner Contact
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    person
                  </span>
                  <p className="font-label font-bold text-sm text-on-surface">
                    {booking.ownerName}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    call
                  </span>
                  <p className="text-sm text-on-surface">{booking.ownerPhone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    mail
                  </span>
                  <p className="text-sm text-on-surface">{booking.ownerEmail}</p>
                </div>
              </div>
              <button className="mt-4 border border-outline-variant/30 text-on-surface-variant rounded-full px-4 py-2 text-xs font-label font-bold flex items-center gap-2 hover:border-primary hover:text-primary transition-all active:scale-95">
                <span className="material-symbols-outlined text-base">chat</span>
                Send Message
              </button>
            </div>

            {/* Notes */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                Booking Notes
              </p>
              {booking.notes ? (
                <p className="text-sm text-on-surface leading-relaxed">
                  {booking.notes}
                </p>
              ) : (
                <p className="text-sm text-on-surface-variant italic">
                  No special notes for this booking.
                </p>
              )}
            </div>

          </div>

          {/* Right: Action Panel */}
          <div className="space-y-4 lg:sticky lg:top-24 h-fit">

            {/* Assigned Staff */}
            {staff && (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-5 py-5">
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                  Assigned Staff
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-headline font-bold text-primary text-sm">
                      {getInitials(staff.name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-label font-bold text-sm text-on-surface">
                      {staff.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">{staff.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {staff.specializations.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-label font-bold text-on-surface-variant"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <StatusBadge status={staff.status} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-5 py-5">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Actions
              </p>
              <BookingActions status={booking.status} />
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
