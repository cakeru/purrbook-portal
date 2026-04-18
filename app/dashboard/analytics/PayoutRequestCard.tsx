"use client";

import { useState } from "react";
import { PAYOUT_INFO } from "../lib/dashboard-data";

const METHOD_LABEL: Record<string, string> = {
  gcash: "GCash",
  maya: "Maya",
  bank_transfer: "Bank Transfer",
  cash: "Cash",
};

const METHOD_ICON: Record<string, string> = {
  gcash: "phone_android",
  maya: "credit_card",
  bank_transfer: "account_balance",
  cash: "payments",
};

export default function PayoutRequestCard({ available }: { available: number }) {
  const [state, setState] = useState<"idle" | "confirming" | "requested">("idle");

  const methodLabel = METHOD_LABEL[PAYOUT_INFO.method] ?? PAYOUT_INFO.method;
  const methodIcon = METHOD_ICON[PAYOUT_INFO.method] ?? "payments";
  const destination = PAYOUT_INFO.mobileNumber ?? PAYOUT_INFO.accountNumber ?? "—";

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface tracking-tight">Payout</h3>
          <p className="text-sm text-on-surface-variant mt-0.5">Available earnings ready for withdrawal</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-3xl font-headline font-extrabold text-primary">₱{available.toLocaleString()}</p>
          <p className="text-xs text-on-surface-variant mt-0.5 font-label">Current period</p>
        </div>
      </div>

      {/* Payout method info */}
      <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-base">{methodIcon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-label font-bold text-on-surface">{methodLabel}</p>
          <p className="text-xs text-on-surface-variant">{destination}</p>
        </div>
        <p className="text-xs font-label font-bold text-on-surface-variant capitalize">{PAYOUT_INFO.schedule}</p>
      </div>

      {/* Action area */}
      {state === "idle" && (
        <button
          onClick={() => setState("confirming")}
          className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Request Payout
        </button>
      )}

      {state === "confirming" && (
        <div className="space-y-3">
          <p className="text-sm font-label font-bold text-on-surface text-center">
            Send ₱{available.toLocaleString()} to {methodLabel} ({destination})?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setState("requested")}
              className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Confirm
            </button>
            <button
              onClick={() => setState("idle")}
              className="flex-1 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant font-label font-bold text-sm hover:bg-surface-container active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {state === "requested" && (
        <div className="flex items-center gap-3 py-3 px-4 bg-tertiary-container rounded-full">
          <span className="material-symbols-outlined text-on-tertiary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-sm font-label font-bold text-on-tertiary-container">
            Payout requested — processing in 1–2 business days
          </p>
        </div>
      )}
    </div>
  );
}
