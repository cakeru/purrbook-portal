"use client";

import Link from "next/link";
import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatusBadge from "../components/StatusBadge";
import { BOOKINGS, STAFF, type BookingStatus } from "../lib/dashboard-data";

const TABS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function getStaffName(groomerId: string) {
  return STAFF.find((s) => s.id === groomerId)?.name ?? "—";
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");

  const filtered =
    activeTab === "all"
      ? BOOKINGS
      : BOOKINGS.filter((b) => b.status === activeTab);

  function countFor(tab: BookingStatus | "all") {
    return tab === "all"
      ? BOOKINGS.length
      : BOOKINGS.filter((b) => b.status === tab).length;
  }

  return (
    <>
      <DashboardHeader title="Bookings" breadcrumb="Provider Portal" />

      <main className="px-8 py-8">

        {/* Tab Bar */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-1 inline-flex gap-1 mb-6 flex-wrap">
          {TABS.map((tab) => {
            const active = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-label font-bold text-sm transition-all active:scale-95 ${
                  active
                    ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {tab.label}
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-label font-bold ${
                    active
                      ? "bg-on-primary/20 text-on-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {countFor(tab.value)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Booking List */}
        {filtered.length === 0 ? (
          <p className="text-on-surface-variant text-sm py-12 text-center">
            No bookings in this category.
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 px-5 py-4 flex items-center gap-4 editorial-shadow hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Pet Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-headline font-bold text-sm ${
                    booking.petSpecies === "dog"
                      ? "bg-tertiary-container text-on-tertiary-container"
                      : "bg-secondary-container text-on-secondary-container"
                  }`}
                >
                  {getInitials(booking.petName)}
                </div>

                {/* Pet + Breed */}
                <div className="w-36 flex-shrink-0 min-w-0">
                  <p className="font-headline font-bold text-sm text-on-surface truncate">
                    {booking.petName}
                  </p>
                  <p className="text-xs text-on-surface-variant truncate">
                    {booking.petBreed}
                  </p>
                </div>

                {/* Owner */}
                <div className="w-36 flex-shrink-0 min-w-0 hidden md:block">
                  <p className="font-label font-bold text-sm text-on-surface truncate">
                    {booking.ownerName}
                  </p>
                  <p className="text-xs text-on-surface-variant truncate">
                    {booking.ownerPhone}
                  </p>
                </div>

                {/* Service */}
                <div className="flex-1 min-w-0 hidden lg:block">
                  <p className="font-label font-bold text-sm text-on-surface truncate">
                    {booking.service}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {booking.duration} min · ₱{booking.price.toLocaleString()}
                  </p>
                </div>

                {/* Date + Time */}
                <div className="w-36 flex-shrink-0 hidden sm:block">
                  <p className="font-label font-bold text-sm text-on-surface">
                    {booking.date}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {booking.time}
                  </p>
                </div>

                {/* Groomer */}
                <div className="w-28 flex-shrink-0 hidden xl:flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-headline font-bold text-primary">
                      {getInitials(getStaffName(booking.groomerId))}
                    </span>
                  </div>
                  <p className="text-xs font-label font-bold text-on-surface-variant truncate">
                    {getStaffName(booking.groomerId).split(" ")[0]}
                  </p>
                </div>

                {/* Status */}
                <StatusBadge status={booking.status} />

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {booking.status === "pending" && (
                    <Link
                      href={`/dashboard/bookings/${booking.id}`}
                      className="px-4 py-2 bg-primary text-on-primary rounded-full font-label font-bold text-xs active:scale-95 transition-all shadow shadow-primary/20"
                    >
                      Confirm
                    </Link>
                  )}
                  <Link
                    href={`/dashboard/bookings/${booking.id}`}
                    className="px-4 py-2 border border-outline-variant/30 text-on-surface-variant rounded-full font-label font-bold text-xs hover:border-primary hover:text-primary transition-all active:scale-95"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </>
  );
}
