"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import KpiCard from "../components/KpiCard";
import CssBarChart from "../components/CssBarChart";
import PayoutRequestCard from "./PayoutRequestCard";
import { api } from "../lib/api";

function formatRevenue(v: number) {
  return `₱${(v / 1000).toFixed(0)}k`;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    api.get<any>("/analytics").then(setAnalytics).catch(console.error);
  }, []);

  if (!analytics) {
    return (
      <>
        <DashboardHeader title="Analytics" breadcrumb="Provider Portal" />
        <main className="px-8 py-8 flex items-center justify-center h-64">
          <span className="text-on-surface-variant text-sm font-label">Loading analytics…</span>
        </main>
      </>
    );
  }

  const monthly = (analytics.revenueByMonth ?? []).map((d: any) => ({
    month: d.month as string,
    revenue: Math.round((d.revenue_centavos ?? 0) / 100),
    bookings: d.bookings as number,
  }));
  const topServices = analytics.topServices ?? [];
  const maxServiceCount = topServices.reduce((m: number, s: any) => Math.max(m, s.booking_count ?? 0), 1);
  const lastMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];
  const revenueGrowth = prevMonth && prevMonth.revenue > 0
    ? (((lastMonth?.revenue - prevMonth.revenue) / prevMonth.revenue) * 100).toFixed(1)
    : "0.0";
  const availableBalance = Math.round((analytics.availableBalanceCentavos ?? 0) / 100);

  return (
    <>
      <DashboardHeader title="Analytics" breadcrumb="Provider Portal" />

      <main className="px-8 py-8 space-y-8">

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon="payments"
            label="Avg. Booking Value"
            value={`₱${Math.round((analytics.avgBookingValueCentavos ?? 0) / 100).toLocaleString()}`}
            size="compact"
          />
          <KpiCard
            icon="repeat"
            label="Repeat Customer Rate"
            value={`${(analytics.repeatCustomerRate ?? 0).toFixed(1)}%`}
            deltaPositive
            size="compact"
          />
          <KpiCard
            icon="event_busy"
            label="Cancellation Rate"
            value={`${(analytics.cancellationRate ?? 0).toFixed(1)}%`}
            size="compact"
          />
          <KpiCard
            icon="group"
            label="Total Customers"
            value={String(analytics.totalCustomers ?? 0)}
            deltaPositive
            size="compact"
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight">Monthly Revenue</h3>
              <p className="text-sm text-on-surface-variant mt-0.5">
                {monthly.length > 0 ? `${monthly[0].month} – ${monthly[monthly.length - 1].month}` : ""}
              </p>
            </div>
            {lastMonth && (
              <div className="text-right">
                <p className="text-2xl font-headline font-extrabold text-primary">₱{lastMonth.revenue.toLocaleString()}</p>
                <p className="text-xs font-label font-bold text-tertiary mt-0.5">↑ {revenueGrowth}% from last month</p>
              </div>
            )}
          </div>
          <CssBarChart
            data={monthly.map((d, i) => ({ label: d.month, value: d.revenue, isCurrent: i === monthly.length - 1 }))}
            height={200}
            color="primary"
            formatValue={formatRevenue}
          />
        </div>

        {/* Two Column: Top Services + Booking Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top Services */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight mb-5">Most Popular Services</h3>
            <div className="space-y-4">
              {topServices.slice(0, 5).map((service: any, i: number) => {
                const pct = ((service.booking_count ?? 0) / maxServiceCount) * 100;
                return (
                  <div key={service.service_id ?? i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-xs font-label font-bold text-on-surface-variant flex-shrink-0">{i + 1}</span>
                        <p className="font-label font-bold text-sm text-on-surface">{service.service_name}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xs font-label font-bold text-on-surface">{service.booking_count} bookings</p>
                        <p className="text-xs text-on-surface-variant">₱{Math.round((service.revenue_centavos ?? 0) / 100).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="relative bg-surface-container-high h-2 rounded-full w-full overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-primary-container rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Volume */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight mb-1">Booking Volume</h3>
            <p className="text-sm text-on-surface-variant mb-5">Monthly appointment count</p>
            <CssBarChart
              data={monthly.map((d, i) => ({ label: d.month, value: d.bookings, isCurrent: i === monthly.length - 1 }))}
              height={160}
              color="secondary"
            />
          </div>

        </div>

        {/* Payout */}
        <PayoutRequestCard available={availableBalance} />

        {/* Insight Block */}
        {lastMonth && (
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-base text-on-surface mb-1">Performance Insight</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Revenue grew <span className="font-bold text-primary">{revenueGrowth}%</span> month-over-month, reaching{" "}
                  <span className="font-bold text-primary">₱{lastMonth.revenue.toLocaleString()}</span>.
                  {topServices[0] && (
                    <> Your most booked service — <span className="font-bold text-on-surface">{topServices[0].service_name}</span> — leads with {topServices[0].booking_count} bookings.</>
                  )}
                  {" "}With a <span className="font-bold text-primary">{(analytics.repeatCustomerRate ?? 0).toFixed(1)}%</span> repeat customer rate, you&apos;re building a loyal clientele.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
