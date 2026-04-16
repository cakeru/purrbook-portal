"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import {
  PROVIDER_INFO,
  OPERATING_HOURS,
  type DayHours,
  type ProviderInfo,
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

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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

      </main>
    </>
  );
}
