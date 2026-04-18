"use client";

import { useState } from "react";
import { SERVICES, STAFF, type Booking, type BookingStatus } from "../lib/dashboard-data";

const TIME_SLOTS = [
  "08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM",
  "02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM",
  "05:00 PM","05:30 PM","06:00 PM",
];

const BREED_OPTIONS: Record<"dog" | "cat", string[]> = {
  dog: ["Labrador Retriever","Golden Retriever","German Shepherd","Bulldog","Beagle","French Bulldog","Poodle","Shih Tzu","Pomeranian","Samoyed","Siberian Husky","Border Collie","Aspin (Asong Pinoy)","Other"],
  cat: ["Persian","Siamese","Maine Coon","Ragdoll","Scottish Fold","British Shorthair","Puspin (Pusang Pinoy)","Other"],
};

const COAT_OPTIONS = ["Short coat","Double coat","Long silky coat","Fluffy double coat","Rough double coat","Dense plush coat","Semi-long silky coat","Smooth short coat","Thick double coat","Other"];

function genId() {
  return `BK-${String(Math.floor(Math.random() * 900) + 100).padStart(3,"0")}`;
}

type Form = {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  petName: string;
  petSpecies: "dog" | "cat";
  petBreed: string;
  petGender: "male" | "female";
  petAge: string;
  petWeight: string;
  petCoatType: string;
  serviceId: string;
  groomerId: string;
  date: string;
  time: string;
  notes: string;
};

const EMPTY: Form = {
  ownerName: "", ownerPhone: "", ownerEmail: "",
  petName: "", petSpecies: "dog", petBreed: "", petGender: "male",
  petAge: "", petWeight: "", petCoatType: "",
  serviceId: "", groomerId: "", date: "", time: "", notes: "",
};

export default function NewBookingDrawer({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (booking: Booking) => void;
}) {
  const [form, setForm] = useState<Form>(EMPTY);

  function set<K extends keyof Form>(key: K, val: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  const activeStaff = STAFF.filter((s) => s.status !== "off_today");
  const selectedService = SERVICES.find((s) => s.id === form.serviceId);

  function canSubmit() {
    return !!(
      form.ownerName && form.ownerPhone && form.ownerEmail &&
      form.petName && form.petBreed && form.petAge && form.petWeight && form.petCoatType &&
      form.serviceId && form.groomerId && form.date && form.time
    );
  }

  function handleSubmit() {
    if (!selectedService) return;
    const booking: Booking = {
      id: genId(),
      petName: form.petName,
      petSpecies: form.petSpecies,
      petBreed: form.petBreed,
      ownerName: form.ownerName,
      ownerPhone: form.ownerPhone,
      ownerEmail: form.ownerEmail,
      service: selectedService.name,
      category: selectedService.category,
      groomerId: form.groomerId,
      date: form.date,
      time: form.time,
      duration: selectedService.duration,
      price: selectedService.price,
      status: "pending" as BookingStatus,
      notes: form.notes,
      petGender: form.petGender,
      petAge: form.petAge,
      petWeight: form.petWeight,
      petCoatType: form.petCoatType,
    };
    onAdd(booking);
    setForm(EMPTY);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-inverse-surface/30 z-40 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[520px] bg-surface-container-lowest border-l border-outline-variant/15 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-headline font-bold text-lg text-on-surface">New Booking</p>
            <p className="text-sm text-on-surface-variant mt-0.5">Walk-in or phone reservation</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-lg">close</span>
          </button>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Owner */}
          <section>
            <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Owner</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                value={form.ownerName}
                onChange={(e) => set("ownerName", e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.ownerPhone}
                  onChange={(e) => set("ownerPhone", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.ownerEmail}
                  onChange={(e) => set("ownerEmail", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Pet */}
          <section>
            <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Companion</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Pet name"
                  value={form.petName}
                  onChange={(e) => set("petName", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                />
                {/* Species toggle */}
                <div className="flex gap-2">
                  {(["dog","cat"] as const).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => { set("petSpecies", sp); set("petBreed", ""); }}
                      className={`flex-1 py-3 rounded-xl text-sm font-label font-bold transition-all active:scale-95 ${form.petSpecies === sp ? "bg-primary text-on-primary" : "bg-surface-container-low border border-outline-variant/20 text-on-surface-variant"}`}
                    >
                      {sp === "dog" ? "🐶 Dog" : "🐱 Cat"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.petBreed}
                  onChange={(e) => set("petBreed", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Breed</option>
                  {BREED_OPTIONS[form.petSpecies].map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select
                  value={form.petGender}
                  onChange={(e) => set("petGender", e.target.value as "male" | "female")}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Age (e.g. 2 years)"
                  value={form.petAge}
                  onChange={(e) => set("petAge", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="text"
                  placeholder="Weight (e.g. 5 kg)"
                  value={form.petWeight}
                  onChange={(e) => set("petWeight", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                />
                <select
                  value={form.petCoatType}
                  onChange={(e) => set("petCoatType", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Coat type</option>
                  {COAT_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Service */}
          <section>
            <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Service</p>
            <div className="space-y-2">
              {SERVICES.filter((s) => s.active).map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => set("serviceId", svc.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all active:scale-95 border ${form.serviceId === svc.id ? "bg-primary/5 border-primary text-primary" : "bg-surface-container-low border-outline-variant/20 text-on-surface"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-base ${form.serviceId === svc.id ? "text-primary" : "text-on-surface-variant"}`}>{svc.icon}</span>
                    <div>
                      <p className="text-sm font-label font-bold">{svc.name}</p>
                      <p className="text-xs text-on-surface-variant">{svc.duration} min</p>
                    </div>
                  </div>
                  <p className="text-sm font-headline font-bold text-primary">₱{svc.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section>
            <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Schedule</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Date (e.g. Apr 20, 2026)"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                />
                <select
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Time slot</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <select
                value={form.groomerId}
                onChange={(e) => set("groomerId", e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Assign to staff member</option>
                {activeStaff.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} · {s.role}</option>
                ))}
              </select>
            </div>
          </section>

          {/* Notes */}
          <section>
            <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Notes</p>
            <textarea
              placeholder="Special instructions, allergies, temperament notes…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface font-label placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-outline-variant/10 flex gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant font-label font-bold text-sm hover:bg-surface-container active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:pointer-events-none"
          >
            Create Booking
          </button>
        </div>
      </div>
    </>
  );
}
