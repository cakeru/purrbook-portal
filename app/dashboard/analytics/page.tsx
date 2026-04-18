import DashboardHeader from "../components/DashboardHeader";
import KpiCard from "../components/KpiCard";
import CssBarChart from "../components/CssBarChart";
import PayoutRequestCard from "./PayoutRequestCard";
import { REVENUE_DATA, SERVICE_RANKINGS, KEY_STATS } from "../lib/dashboard-data";

const maxRevenue = Math.max(...REVENUE_DATA.map((d) => d.revenue));
const maxBookings = Math.max(...REVENUE_DATA.map((d) => d.bookings));
const maxServiceCount = Math.max(...SERVICE_RANKINGS.map((s) => s.count));

function formatRevenue(v: number) {
  return `₱${(v / 1000).toFixed(0)}k`;
}

export default function AnalyticsPage() {
  const revenueGrowth = (
    ((REVENUE_DATA[5].revenue - REVENUE_DATA[4].revenue) /
      REVENUE_DATA[4].revenue) *
    100
  ).toFixed(1);

  return (
    <>
      <DashboardHeader title="Analytics" breadcrumb="Provider Portal" />

      <main className="px-8 py-8 space-y-8">

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            icon="payments"
            label="Avg. Booking Value"
            value={`₱${KEY_STATS.avgBookingValue.toLocaleString()}`}
            size="compact"
          />
          <KpiCard
            icon="repeat"
            label="Repeat Customer Rate"
            value={`${KEY_STATS.repeatCustomerRate}%`}
            delta="vs 61% last quarter"
            deltaPositive
            size="compact"
          />
          <KpiCard
            icon="event_busy"
            label="Cancellation Rate"
            value={`${KEY_STATS.cancellationRate}%`}
            delta="vs 9% last quarter"
            deltaPositive
            size="compact"
          />
          <KpiCard
            icon="group"
            label="Total Customers"
            value={String(KEY_STATS.totalCustomers)}
            delta="12 new this month"
            deltaPositive
            size="compact"
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight">
                Monthly Revenue
              </h3>
              <p className="text-sm text-on-surface-variant mt-0.5">
                Nov 2025 – Apr 2026
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-headline font-extrabold text-primary">
                ₱{REVENUE_DATA[5].revenue.toLocaleString()}
              </p>
              <p className="text-xs font-label font-bold text-tertiary mt-0.5">
                ↑ {revenueGrowth}% from last month
              </p>
            </div>
          </div>

          <CssBarChart
            data={REVENUE_DATA.map((d, i) => ({
              label: d.month,
              value: d.revenue,
              isCurrent: i === REVENUE_DATA.length - 1,
            }))}
            height={200}
            color="primary"
            formatValue={formatRevenue}
          />
        </div>

        {/* Two Column: Top Services + Booking Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top Services */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight mb-5">
              Most Popular Services
            </h3>
            <div className="space-y-4">
              {SERVICE_RANKINGS.map((service, i) => {
                const pct = (service.count / maxServiceCount) * 100;
                return (
                  <div key={service.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center text-xs font-label font-bold text-on-surface-variant flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="font-label font-bold text-sm text-on-surface">
                          {service.name}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xs font-label font-bold text-on-surface">
                          {service.count} bookings
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          ₱{service.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {/* Percentage Bar */}
                    <div className="relative bg-surface-container-high h-2 rounded-full w-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-primary-container rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Volume */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
            <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight mb-1">
              Booking Volume
            </h3>
            <p className="text-sm text-on-surface-variant mb-5">
              Monthly appointment count
            </p>
            <CssBarChart
              data={REVENUE_DATA.map((d, i) => ({
                label: d.month,
                value: d.bookings,
                isCurrent: i === REVENUE_DATA.length - 1,
              }))}
              height={160}
              color="secondary"
            />
          </div>

        </div>

        {/* Payout */}
        <PayoutRequestCard available={REVENUE_DATA[5].revenue} />

        {/* Insight Block */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-primary text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                insights
              </span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-on-surface mb-1">
                Performance Insight
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Revenue grew{" "}
                <span className="font-bold text-primary">{revenueGrowth}%</span>{" "}
                from March to April, reaching a 6-month high of{" "}
                <span className="font-bold text-primary">
                  ₱{REVENUE_DATA[5].revenue.toLocaleString()}
                </span>
                . Your most booked service — <span className="font-bold text-on-surface">Full Bath &amp; Silk Cut</span> — drives{" "}
                {Math.round(
                  (SERVICE_RANKINGS[0].revenue /
                    SERVICE_RANKINGS.reduce((s, r) => s + r.revenue, 0)) *
                    100
                )}
                % of total tracked revenue. With a{" "}
                <span className="font-bold text-primary">
                  {KEY_STATS.repeatCustomerRate}%
                </span>{" "}
                repeat customer rate, Botanica Paws is building a loyal clientele.
              </p>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
