"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROVIDER_INFO } from "../lib/dashboard-data";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "dashboard", label: "Overview" },
  { href: "/dashboard/bookings", icon: "calendar_month", label: "Bookings" },
  { href: "/dashboard/services", icon: "spa", label: "Services" },
  { href: "/dashboard/staff", icon: "group", label: "Staff" },
  { href: "/dashboard/analytics", icon: "bar_chart", label: "Analytics" },
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-surface-container-low flex flex-col z-40 border-r border-outline-variant/15">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-outline-variant/10">
        <Link
          href="/"
          className="flex items-center gap-2.5 active:scale-95 transition-all"
        >
          <img
            src="/purrbook.png"
            alt="PurrBook logo"
            data-alt="Illustrated paw icon in warm amber tones representing PurrBook brand"
            className="h-7 w-auto"
          />
          <span className="font-headline font-extrabold text-lg text-primary italic">
            PurrBook
          </span>
        </Link>
      </div>

      {/* Provider Badge + Business Name */}
      <div className="px-5 pt-4 pb-2 border-b border-outline-variant/10">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-bold uppercase tracking-widest">
          {PROVIDER_INFO.type} Portal
        </span>
        <p className="font-headline font-bold text-sm text-on-surface mt-2 leading-tight">
          {PROVIDER_INFO.name}
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-label font-bold text-sm transition-all active:scale-95 ${
                active
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px] leading-none"
                style={{
                  fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Owner Profile Footer */}
      <div className="px-5 py-4 border-t border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="font-headline font-bold text-primary text-sm">
              MS
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label font-bold text-xs text-on-surface truncate">
              Maria Santos
            </p>
            <p className="text-xs text-on-surface-variant truncate">Owner</p>
          </div>
          <Link
            href="/"
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-[18px] active:scale-95"
            title="Back to consumer app"
          >
            logout
          </Link>
        </div>
      </div>
    </aside>
  );
}
