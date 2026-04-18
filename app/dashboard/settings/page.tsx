"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import {
  PROVIDER_INFO,
  OPERATING_HOURS,
  PAYOUT_INFO,
  PH_BANKS,
  type DayHours,
  type ProviderInfo,
  type PayoutInfo,
  type PayoutMethod,
  type PayoutSchedule,
} from "../lib/dashboard-data";

const NOTIFICATIONS = [
  {
    id: "new_booking",
    label: "New Booking Requests",
    description: "Notify when a customer submits a new appointment",
    defaultOn: true,
  },
  {
    id: "cancellations",
    label: "Booking Cancellations",
    description: "Alert when a customer cancels their appointment",
    defaultOn: true,
  },
  {
    id: "daily_digest",
    label: "Daily Schedule Digest",
    description: "Morning summary of today's appointments",
    defaultOn: true,
  },
  {
    id: "weekly_revenue",
    label: "Weekly Revenue Summary",
    description: "End-of-week earnings and booking report",
    defaultOn: false,
  },
  {
    id: "staff_reminders",
    label: "Staff Availability Reminders",
    description: "Alerts for staff schedule changes and absences",
    defaultOn: false,
  },
];

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProviderInfo>({ ...PROVIDER_INFO });
  const [hours, setHours] = useState<DayHours[]>(
    OPERATING_HOURS.map((h) => ({ ...h }))
  );
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.defaultOn]))
  );
  const [saved, setSaved] = useState(false);
  const [payout, setPayout] = useState<PayoutInfo>({ ...PAYOUT_INFO });
  const [payoutSaved, setPayoutSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handlePayoutSave() {
    setPayoutSaved(true);
    setTimeout(() => setPayoutSaved(false), 2500);
  }

  function toggleHours(idx: number) {
    setHours((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, open: !h.open } : h))
    );
  }

  function updateHours(idx: number, field: "openTime" | "closeTime", value: string) {
    setHours((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [field]: value } : h))
    );
  }

  return (
    <>
      <DashboardHeader title="Settings" breadcrumb="Provider Portal" />

      <main className="px-8 py-8 max-w-3xl space-y-8">

        {/* Business Profile */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10">
            <h2 className="font-headline font-bold text-base text-on-surface tracking-tight">
              Business Profile
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Your public-facing business information
            </p>
          </div>
          <div className="px-6 py-5 space-y-5">

            {/* Name */}
            <div>
              <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                Salon Name
              </label>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>

            {/* Provider Type */}
            <div>
              <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                Provider Type
              </label>
              <div className="flex gap-2">
                {(["Salon", "Vet", "Studio"] as ProviderInfo["type"][]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setProfile((p) => ({ ...p, type }))
                      }
                      className={`flex-1 py-2.5 rounded-xl font-label font-bold text-sm transition-all active:scale-95 ${
                        profile.type === type
                          ? "bg-primary text-on-primary shadow shadow-primary/20"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Contact + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Contact Number
                </label>
                <input
                  value={profile.contact}
                  onChange={(e) => setProfile((p) => ({ ...p, contact: e.target.value }))}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                Address
              </label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                rows={2}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                Description
              </label>
              <textarea
                value={profile.description}
                onChange={(e) => setProfile((p) => ({ ...p, description: e.target.value }))}
                rows={4}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
              />
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className={`px-6 py-2.5 rounded-full font-label font-bold text-sm active:scale-95 transition-all ${
                  saved
                    ? "bg-tertiary-container text-on-tertiary-container"
                    : "bg-gradient-to-r from-primary to-primary-dim text-on-primary shadow-lg shadow-primary/20"
                }`}
              >
                {saved ? "✓ Saved" : "Save Changes"}
              </button>
            </div>
          </div>
        </section>

        {/* Operating Hours */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10">
            <h2 className="font-headline font-bold text-base text-on-surface tracking-tight">
              Operating Hours
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Set your weekly schedule and opening times
            </p>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {hours.map((day, idx) => (
              <div
                key={day.day}
                className="flex items-center gap-4 px-6 py-4"
              >
                {/* Day Label */}
                <p
                  className={`w-24 font-label font-bold text-sm flex-shrink-0 ${
                    day.open ? "text-on-surface" : "text-on-surface-variant line-through"
                  }`}
                >
                  {day.day}
                </p>

                {/* Open/Closed Toggle */}
                <button
                  onClick={() => toggleHours(idx)}
                  className={`relative w-10 h-6 rounded-full transition-all flex-shrink-0 active:scale-95 ${
                    day.open ? "bg-primary" : "bg-surface-container-highest"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      day.open ? "left-5" : "left-1"
                    }`}
                  />
                </button>

                {/* Time Inputs or Closed Label */}
                {day.open ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={day.openTime}
                      onChange={(e) => updateHours(idx, "openTime", e.target.value)}
                      className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-sm font-body w-28 text-center focus:outline-none focus:border-primary transition-all"
                    />
                    <span className="text-xs text-on-surface-variant font-label">
                      to
                    </span>
                    <input
                      type="time"
                      value={day.closeTime}
                      onChange={(e) => updateHours(idx, "closeTime", e.target.value)}
                      className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-1.5 text-sm font-body w-28 text-center focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-label font-bold text-on-surface-variant flex-1">
                    Closed
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10">
            <h2 className="font-headline font-bold text-base text-on-surface tracking-tight">
              Notifications
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Choose which alerts you receive
            </p>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {NOTIFICATIONS.map((notif) => (
              <div
                key={notif.id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <p className="font-label font-bold text-sm text-on-surface">
                    {notif.label}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {notif.description}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [notif.id]: !prev[notif.id],
                    }))
                  }
                  className={`relative w-10 h-6 rounded-full transition-all flex-shrink-0 active:scale-95 ${
                    notifications[notif.id]
                      ? "bg-primary"
                      : "bg-surface-container-highest"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      notifications[notif.id] ? "left-5" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Payout & Payments */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/10">
            <h2 className="font-headline font-bold text-base text-on-surface tracking-tight">
              Payout &amp; Payments
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              How you receive your earnings from PurrBook
            </p>
          </div>
          <div className="px-6 py-5 space-y-5">

            {/* Payout Method */}
            <div>
              <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                Payout Method
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["gcash", "maya", "bank_transfer", "cash"] as PayoutMethod[]).map((method) => {
                  const labels: Record<PayoutMethod, string> = {
                    gcash: "GCash",
                    maya: "Maya",
                    bank_transfer: "Bank Transfer",
                    cash: "Cash",
                  };
                  return (
                    <button
                      key={method}
                      onClick={() => setPayout((p) => ({ ...p, method }))}
                      className={`py-2.5 rounded-xl font-label font-bold text-sm transition-all active:scale-95 ${
                        payout.method === method
                          ? "bg-primary text-on-primary shadow shadow-primary/20"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {labels[method]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditional Detail Fields */}
            {(payout.method === "gcash" || payout.method === "maya") && (
              <div className="pt-4 border-t border-outline-variant/10">
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={payout.mobileNumber ?? ""}
                  onChange={(e) => setPayout((p) => ({ ...p, mobileNumber: e.target.value }))}
                  placeholder="e.g. 0917 123 4567"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>
            )}

            {payout.method === "bank_transfer" && (
              <div className="pt-4 border-t border-outline-variant/10 space-y-4">
                <div>
                  <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                    Bank Name
                  </label>
                  <select
                    value={payout.bankName ?? ""}
                    onChange={(e) => setPayout((p) => ({ ...p, bankName: e.target.value }))}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                  >
                    <option value="">Select a bank…</option>
                    {PH_BANKS.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={payout.accountNumber ?? ""}
                      onChange={(e) => setPayout((p) => ({ ...p, accountNumber: e.target.value }))}
                      placeholder="e.g. 1234567890"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={payout.accountName ?? ""}
                      onChange={(e) => setPayout((p) => ({ ...p, accountName: e.target.value }))}
                      placeholder="e.g. Maria Santos"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {payout.method === "cash" && (
              <div className="pt-4 border-t border-outline-variant/10">
                <div className="flex items-start gap-3 bg-surface-container rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-base mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    info
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Payments are collected manually at the time of appointment. No additional payout details required.
                  </p>
                </div>
              </div>
            )}

            {/* Payout Schedule */}
            <div className="pt-4 border-t border-outline-variant/10">
              <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                Payout Schedule
              </label>
              <div className="flex gap-2">
                {([
                  { value: "weekly", label: "Weekly", sub: "Every Friday" },
                  { value: "bimonthly", label: "Bi-monthly", sub: "1st & 15th" },
                  { value: "monthly", label: "Monthly", sub: "End of month" },
                ] as { value: PayoutSchedule; label: string; sub: string }[]).map(({ value, label, sub }) => (
                  <button
                    key={value}
                    onClick={() => setPayout((p) => ({ ...p, schedule: value }))}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-label font-bold text-sm transition-all active:scale-95 flex flex-col items-center gap-0.5 ${
                      payout.schedule === value
                        ? "bg-primary text-on-primary shadow shadow-primary/20"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {label}
                    <span className={`text-[10px] font-normal ${payout.schedule === value ? "text-on-primary/70" : "text-on-surface-variant/70"}`}>
                      {sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <button
                onClick={handlePayoutSave}
                className={`px-6 py-2.5 rounded-full font-label font-bold text-sm active:scale-95 transition-all ${
                  payoutSaved
                    ? "bg-tertiary-container text-on-tertiary-container"
                    : "bg-gradient-to-r from-primary to-primary-dim text-on-primary shadow-lg shadow-primary/20"
                }`}
              >
                {payoutSaved ? "✓ Saved" : "Save Payout Settings"}
              </button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
