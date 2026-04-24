"use client";

import { useState, useEffect, type FormEvent } from "react";
import { api } from "../lib/api";

type Props = {
  onAdd: (staff: any) => void;
  onClose: () => void;
};

const ROLES = ["Senior Groomer", "Groomer", "Veterinarian", "Boarding Attendant"];
const STATUSES: { value: AvailabilityStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "on_break", label: "On Break" },
  { value: "off_today", label: "Off Today" },
];

export default function AddStaffModal({ onAdd, onClose }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Groomer");
  const [specs, setSpecs] = useState("");
  const [status, setStatus] = useState("available");
  const [error, setError] = useState("");

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Name is required."); return; }
    const specializations = specs.split(",").map((s) => s.trim()).filter(Boolean);
    const res = await api.post<{ staff: any }>("/staff", { name: name.trim(), role, specializations, status }).catch(console.error);
    const created = res?.staff ?? { id: `s-${Date.now()}`, name: name.trim(), role, specializations, status, bookingsToday: 0, joinedDate: new Date().getFullYear().toString() };
    onAdd(created);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <h2 className="font-headline font-bold text-lg text-on-surface">Add Team Member</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">New staff will appear in today's schedule</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block font-label font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="e.g. Sofia Ramos"
              className="w-full bg-surface-container rounded-xl px-4 py-2.5 text-sm font-body border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block font-label font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-1.5">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-surface-container rounded-xl px-4 py-2.5 text-sm font-body border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all appearance-none"
            >
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Specializations */}
          <div>
            <label className="block font-label font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-1.5">
              Specializations
            </label>
            <input
              type="text"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              placeholder="e.g. Double Coat, De-shed, Silk Cut"
              className="w-full bg-surface-container rounded-xl px-4 py-2.5 text-sm font-body border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">Separate with commas</p>
          </div>

          {/* Status */}
          <div>
            <label className="block font-label font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-1.5">
              Today's Status
            </label>
            <div className="flex gap-2">
              {STATUSES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`flex-1 py-2 rounded-xl font-label font-bold text-xs transition-all active:scale-95 border ${
                    status === value
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container text-on-surface-variant border-outline-variant/20 hover:border-primary/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-label font-bold text-sm border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl font-label font-bold text-sm bg-gradient-to-r from-primary to-primary-dim text-on-primary shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
