"use client";

import { useState } from "react";

type Props = {
  title: string;
  breadcrumb?: string;
};

export default function DashboardHeader({ title, breadcrumb }: Props) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-surface/80 glass-header border-b border-outline-variant/10 px-8 py-4">
      <div className="flex items-center justify-between gap-6">

        {/* Page Title */}
        <div>
          {breadcrumb && (
            <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-0.5">
              {breadcrumb}
            </p>
          )}
          <h1 className="text-xl font-headline font-bold text-on-surface tracking-tight">
            {title}
          </h1>
        </div>

        {/* Search + Notifications */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bookings, pets…"
              className="bg-surface-container pl-9 pr-4 py-2 rounded-full text-sm font-body border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all w-56"
            />
          </div>

          <button className="relative w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-all active:scale-95">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              notifications
            </span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container border-2 border-surface" />
          </button>
        </div>

      </div>
    </header>
  );
}
