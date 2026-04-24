"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { api } from "../lib/api";

const NOTIF_ICONS: Record<string, string> = {
  booking: "calendar_month",
  message: "chat",
  payment: "payments",
  staff: "group",
  review: "star",
};

function formatNotifTime(iso: string): string {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffMs / 86400000)}d ago`;
}

type Props = {
  title: string;
  breadcrumb?: string;
  onSearch?: (q: string) => void;
};

export default function DashboardHeader({ title, breadcrumb, onSearch }: Props) {
  const [search, setSearch] = useState("");
  const [notifs, setNotifs] = useState<any[]>([]);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const bellWrapperRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    // Portal doesn't have a dedicated notifications endpoint yet; skip silently
    // api.get<{notifications: any[]}>("/notifications").then(...)
  }, []);

  // Click-outside closes notification panel
  useEffect(() => {
    if (!notifsOpen) return;
    function onMouseDown(e: MouseEvent) {
      if (bellWrapperRef.current && !bellWrapperRef.current.contains(e.target as Node)) {
        setNotifsOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [notifsOpen]);

  const markRead = useCallback((id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  function handleNotifClick(notif: any) {
    markRead(notif.id);
    setNotifsOpen(false);
    if (notif.href) window.location.assign(notif.href);
  }

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
              onChange={(e) => { setSearch(e.target.value); onSearch?.(e.target.value); }}
              placeholder="Search bookings, pets…"
              className="bg-surface-container pl-9 pr-4 py-2 rounded-full text-sm font-body border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all w-56"
            />
          </div>

          {/* Bell + Dropdown */}
          <div ref={bellWrapperRef} className="relative">
            <button
              onClick={() => setNotifsOpen((o) => !o)}
              className="relative w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-all active:scale-95"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                notifications
              </span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border-2 border-surface" />
              )}
            </button>

            {/* Dropdown — always in DOM, toggled via CSS */}
            <div
              className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transition-all duration-150 ${
                notifsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
              style={{ zIndex: 9999 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-stone-800">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs font-['Plus_Jakarta_Sans'] font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-96 overflow-y-auto">
                {notifs.map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => handleNotifClick(notif)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors border-b border-stone-100 last:border-0 hover:bg-stone-50 ${
                      !notif.read ? "bg-amber-50" : "bg-white"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${
                        !notif.read ? "text-amber-700" : "text-stone-400"
                      }`}
                    >
                      {NOTIF_ICONS[notif.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span
                          className={`font-['Plus_Jakarta_Sans'] font-bold text-xs ${
                            !notif.read ? "text-amber-800" : "text-stone-700"
                          }`}
                        >
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-stone-400 shrink-0">
                          {formatNotifTime(notif.timestamp ?? notif.createdAt ?? "")}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                        {notif.body}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
