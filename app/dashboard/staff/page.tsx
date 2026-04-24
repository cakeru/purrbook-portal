"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatusBadge from "../components/StatusBadge";
import AddStaffModal from "../components/AddStaffModal";
import { api } from "../lib/api";

type AvailabilityStatus = "available" | "on_break" | "off_today";

const STATUS_OPTIONS: { value: AvailabilityStatus; label: string; dot: string; chip: string }[] = [
  { value: "available", label: "Available", dot: "bg-tertiary", chip: "bg-tertiary-container text-on-tertiary-container" },
  { value: "on_break", label: "On Break", dot: "bg-secondary", chip: "bg-secondary-container text-on-secondary-container" },
  { value: "off_today", label: "Off Today", dot: "bg-outline-variant", chip: "bg-surface-container-highest text-on-surface-variant" },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [searchQ, setSearchQ] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get<{ staff: any[] }>("/staff").then(({ staff }) => {
      setStaffList(staff.map((m: any) => ({
        ...m,
        joinedDate: m.joinedDate ?? new Date(m.joinedAt ?? "").getFullYear(),
        specializations: m.specializations ?? [],
        bookingsToday: m.bookingsToday ?? 0,
        status: m.status ?? "available",
      })));
    }).catch(console.error);
  }, []);

  function handleAdd(newMember: any) {
    setStaffList((prev) => [...prev, newMember]);
  }

  async function handleStatusChange(id: string, status: AvailabilityStatus) {
    await api.patch(`/staff/${id}`, { status }).catch(console.error);
    setStaffList((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
  }

  const available = staffList.filter((s) => s.status === "available").length;
  const onBreak = staffList.filter((s) => s.status === "on_break").length;
  const offToday = staffList.filter((s) => s.status === "off_today").length;

  return (
    <>
      <DashboardHeader title="Staff" breadcrumb="Provider Portal" onSearch={setSearchQ} />

      <main className="px-8 py-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
              Your Team
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Manage groomers, vets, and attendants
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-5 py-2.5 rounded-full font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Team Member
          </button>
        </div>

        {/* Summary Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/10 rounded-full px-4 py-2">
            <span className="material-symbols-outlined text-on-surface-variant text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              group
            </span>
            <span className="font-label font-bold text-sm text-on-surface">
              {staffList.length} total
            </span>
          </div>
          <div className="flex items-center gap-2 bg-tertiary-container rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            <span className="font-label font-bold text-sm text-on-tertiary-container">
              {available} available
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary-container rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-label font-bold text-sm text-on-secondary-container">
              {onBreak} on break
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-outline-variant" />
            <span className="font-label font-bold text-sm text-on-surface-variant">
              {offToday} off today
            </span>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {staffList.filter((m) =>
            !searchQ.trim() ||
            m.name.toLowerCase().includes(searchQ.toLowerCase()) ||
            m.role.toLowerCase().includes(searchQ.toLowerCase())
          ).map((member) => (
            <div
              key={member.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 flex flex-col gap-5 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow relative"
            >
              {/* Availability Badge — top right (display only) */}
              <div className="absolute top-5 right-5">
                <StatusBadge status={member.status} />
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-4 pr-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-headline font-bold text-primary text-2xl">
                    {getInitials(member.name)}
                  </span>
                </div>
                <div>
                  <p className="font-headline font-bold text-lg text-on-surface leading-tight">
                    {member.name}
                  </p>
                  <p className="text-sm text-on-surface-variant mt-0.5">{member.role}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Since {member.joinedDate}</p>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1.5">
                {member.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-label font-bold text-on-surface"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Status Picker */}
              <div className="flex gap-1.5">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleStatusChange(member.id, opt.value)}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-xs font-label font-bold transition-all active:scale-95 ${
                      member.status === opt.value
                        ? opt.chip
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${member.status === opt.value ? opt.dot : "bg-outline-variant"}`} />
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Divider + Stats */}
              <div className="border-t border-outline-variant/10 pt-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-on-surface-variant text-base">calendar_today</span>
                <p className="text-sm font-label font-bold text-on-surface">
                  {member.bookingsToday} booking{member.bookingsToday !== 1 ? "s" : ""} today
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>

      {showModal && (
        <AddStaffModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
