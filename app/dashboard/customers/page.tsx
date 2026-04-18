"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { CUSTOMERS, type PortalCustomer } from "../lib/portal-customers";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function CustomerCard({ customer }: { customer: PortalCustomer }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow">

      {/* Avatar + name + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="font-headline font-bold text-primary text-base">
              {getInitials(customer.name)}
            </span>
          </div>
          <div>
            <p className="font-headline font-bold text-sm text-on-surface leading-tight">
              {customer.name}
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">{customer.phone}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-label font-bold flex-shrink-0 ${
          customer.status === "active"
            ? "bg-tertiary-container text-on-tertiary-container"
            : "bg-surface-container-highest text-on-surface-variant"
        }`}>
          {customer.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Pet pills */}
      <div className="flex flex-wrap gap-1.5">
        {customer.pets.map((pet) => (
          <span
            key={pet.name}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-label font-bold ${
              pet.species === "dog"
                ? "bg-tertiary-container text-on-tertiary-container"
                : "bg-secondary-container text-on-secondary-container"
            }`}
          >
            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {pet.species === "dog" ? "pets" : "set_meal"}
            </span>
            {pet.name}
            <span className="font-normal opacity-70">· {pet.breed}</span>
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container rounded-xl px-3 py-2.5">
          <p className="text-xs text-on-surface-variant font-label">Total Bookings</p>
          <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
            {customer.totalBookings}
          </p>
        </div>
        <div className="bg-surface-container rounded-xl px-3 py-2.5">
          <p className="text-xs text-on-surface-variant font-label">Total Spent</p>
          <p className="font-headline font-bold text-sm text-primary mt-0.5">
            ₱{customer.totalSpent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Last visit */}
      <div className="border-t border-outline-variant/10 pt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-on-surface-variant font-label">Last visit</p>
          <p className="text-sm font-label font-bold text-on-surface mt-0.5">
            {customer.lastVisitDate}
          </p>
          <p className="text-xs text-on-surface-variant truncate max-w-[160px]">
            {customer.lastService}
          </p>
        </div>
        <a
          href="/dashboard/bookings"
          className="text-primary font-label font-bold text-xs hover:underline active:scale-95 transition-all"
        >
          View Bookings →
        </a>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [searchQ, setSearchQ] = useState("");

  const filtered = CUSTOMERS.filter((c) => {
    if (!searchQ.trim()) return true;
    const q = searchQ.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.pets.some((p) => p.name.toLowerCase().includes(q))
    );
  });

  const active = CUSTOMERS.filter((c) => c.status === "active").length;
  const inactive = CUSTOMERS.filter((c) => c.status === "inactive").length;

  return (
    <>
      <DashboardHeader title="Customers" breadcrumb="Provider Portal" onSearch={setSearchQ} />

      <main className="px-8 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
              Client Directory
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              All clients who have booked with your sanctuary
            </p>
          </div>
        </div>

        {/* Summary chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/10 rounded-full px-4 py-2">
            <span className="material-symbols-outlined text-on-surface-variant text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              group
            </span>
            <span className="font-label font-bold text-sm text-on-surface">
              {CUSTOMERS.length} total
            </span>
          </div>
          <div className="flex items-center gap-2 bg-tertiary-container rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            <span className="font-label font-bold text-sm text-on-tertiary-container">
              {active} active
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-outline-variant" />
            <span className="font-label font-bold text-sm text-on-surface-variant">
              {inactive} inactive
            </span>
          </div>
        </div>

        {/* Customer grid */}
        {filtered.length === 0 ? (
          <p className="text-on-surface-variant text-sm py-12 text-center">
            {searchQ.trim() ? `No clients match "${searchQ}".` : "No clients yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        )}

      </main>
    </>
  );
}
