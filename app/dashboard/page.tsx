"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardHeader from "./components/DashboardHeader";
import KpiCard from "./components/KpiCard";
import StatusBadge from "./components/StatusBadge";
import { api } from "./lib/api";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function OverviewPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    api.get<{ bookings: any[] }>("/bookings").then(({ bookings: rows }) => {
      setBookings(rows.map((b: any) => ({
        ...b,
        date: b.scheduledDate ?? b.date,
        time: b.scheduledTime ?? b.time,
        price: b.priceCentavos != null ? b.priceCentavos / 100 : (b.price ?? 0),
      })));
    }).catch(console.error);
    api.get<any>("/analytics").then(setAnalytics).catch(console.error);
  }, []);

  const todayStr = new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
  const todayBookings = bookings
    .filter((b) => b.scheduledDate === new Date().toISOString().slice(0, 10) || b.date === todayStr)
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const monthlyRevenue = analytics?.revenueByMonth?.slice(-1)[0]?.revenue_centavos
    ? Math.round(analytics.revenueByMonth.slice(-1)[0].revenue_centavos / 100)
    : bookings.filter((b) => b.status === "completed").reduce((s, b) => s + b.price, 0);

  const recentOwners = Array.from(
    new Map(
      [...bookings].reverse().slice(0, 10).map((b) => [b.ownerName, b])
    ).values()
  ).slice(0, 7);

  return (
    <>
      <DashboardHeader title="Overview" breadcrumb="Provider Portal" />

      <main className="px-8 py-8 space-y-10">

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon="calendar_month"
            label="Today's Bookings"
            value={String(todayBookings.length)}
          />
          <KpiCard
            icon="payments"
            label="Monthly Revenue"
            value={`₱${monthlyRevenue.toLocaleString()}`}
            deltaPositive
          />
          <KpiCard
            icon="pending_actions"
            label="Pending Confirmations"
            value={String(pendingCount)}
          />
          <KpiCard
            icon="group"
            label="Total Customers"
            value={String(analytics?.totalCustomers ?? "—")}
          />
        </div>

        {/* Today's Schedule */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-headline font-bold text-on-surface tracking-tight">
                Today's Schedule
              </h2>
              <p className="text-sm text-on-surface-variant mt-0.5">{new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
            <Link
              href="/dashboard/bookings"
              className="text-sm font-label font-bold text-primary hover:underline active:scale-95 transition-all"
            >
              View all →
            </Link>
          </div>

          {todayBookings.length === 0 ? (
            <p className="text-on-surface-variant text-sm">
              No bookings scheduled for today.
            </p>
          ) : (
            <div className="space-y-3">
              {todayBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/dashboard/bookings/${booking.id}`}
                  className="flex items-center gap-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 px-5 py-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow active:scale-[0.99]"
                >
                  <div className="w-20 flex-shrink-0">
                    <p className="font-headline font-bold text-sm text-primary">{booking.time}</p>
                    <p className="text-xs text-on-surface-variant">{booking.durationMins ?? booking.duration} min</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface">{booking.petName}</p>
                    <p className="text-xs text-on-surface-variant truncate">{booking.ownerName} · {booking.serviceName ?? booking.service}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-headline font-bold text-on-surface tracking-tight mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/dashboard/bookings"
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow active:scale-[0.99]"
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
                </div>
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-on-primary text-xs font-label font-bold flex items-center justify-center">{pendingCount}</span>
                )}
              </div>
              <div>
                <p className="font-label font-bold text-sm text-on-surface">Confirm Pending</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{pendingCount} booking{pendingCount !== 1 ? "s" : ""} awaiting your confirmation</p>
              </div>
            </Link>

            <Link href="/dashboard/bookings"
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-error text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>event_busy</span>
              </div>
              <div>
                <p className="font-label font-bold text-sm text-on-surface">View Cancellations</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Review recently cancelled appointments</p>
              </div>
            </Link>

            <Link href="/dashboard/settings"
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
              </div>
              <div>
                <p className="font-label font-bold text-sm text-on-surface">Manage Availability</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Update operating hours and time slots</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Recent Customers */}
        {recentOwners.length > 0 && (
          <section>
            <h2 className="text-lg font-headline font-bold text-on-surface tracking-tight mb-5">Recent Customers</h2>
            <div className="flex flex-wrap gap-4">
              {recentOwners.map((booking) => (
                <div key={booking.ownerName} className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="font-headline font-bold text-sm text-on-secondary-container">{getInitials(booking.ownerName ?? "?")}</span>
                  </div>
                  <p className="text-xs font-label font-bold text-on-surface-variant text-center leading-tight max-w-[64px]">
                    {(booking.ownerName ?? "").split(" ")[0]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </>
  );
}
