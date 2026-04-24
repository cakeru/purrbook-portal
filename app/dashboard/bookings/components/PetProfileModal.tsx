"use client";

import { useState } from "react";
type SharedCareRecord = any;

type PetProfileModalProps = {
  petName: string;
  petSpecies: "dog" | "cat";
  petBreed: string;
  petGender: "male" | "female";
  petAge: string;
  petWeight: string;
  petCoatType: string;
  petSharesRecords?: boolean;
  sharedCareRecords?: SharedCareRecord[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function PetProfileModal({
  petName,
  petSpecies,
  petBreed,
  petGender,
  petAge,
  petWeight,
  petCoatType,
  petSharesRecords,
  sharedCareRecords,
}: PetProfileModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Clickable Pet Info Card */}
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left bg-surface-container-lowest rounded-2xl border border-outline-variant/10 editorial-shadow px-6 py-5 hover:border-primary/30 hover:shadow-md transition-all active:scale-[0.99] group"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
            Pet Information
          </p>
          <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary transition-colors">
            open_in_full
          </span>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-headline font-bold text-xl ${
              petSpecies === "dog"
                ? "bg-tertiary-container text-on-tertiary-container"
                : "bg-secondary-container text-on-secondary-container"
            }`}
          >
            {getInitials(petName)}
          </div>
          <div>
            <p className="font-headline font-bold text-lg text-on-surface">
              {petName}
            </p>
            <p className="text-sm text-on-surface-variant">
              {petBreed} · {petSpecies === "dog" ? "Dog" : "Cat"}
            </p>
          </div>
        </div>

        {/* Pet Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-surface-container-low rounded-xl p-3">
            <p className="text-xs text-on-surface-variant font-label">Gender</p>
            <p className="font-headline font-bold text-sm text-on-surface mt-0.5 capitalize">
              {petGender}
            </p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3">
            <p className="text-xs text-on-surface-variant font-label">Age</p>
            <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
              {petAge}
            </p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3">
            <p className="text-xs text-on-surface-variant font-label">Weight</p>
            <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
              {petWeight}
            </p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-3">
            <p className="text-xs text-on-surface-variant font-label">Coat Type</p>
            <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
              {petCoatType}
            </p>
          </div>
        </div>

        {/* Shared records badge */}
        {petSharesRecords && sharedCareRecords && sharedCareRecords.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-tertiary-container/50 text-on-tertiary-container rounded-full text-xs font-label font-bold">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
            {sharedCareRecords.length} care {sharedCareRecords.length === 1 ? "record" : "records"} shared
          </div>
        )}
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" />

          {/* Modal Panel */}
          <div
            className="relative bg-surface rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/10 sticky top-0 bg-surface rounded-t-3xl z-10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-headline font-bold text-base flex-shrink-0 ${
                    petSpecies === "dog"
                      ? "bg-tertiary-container text-on-tertiary-container"
                      : "bg-secondary-container text-on-secondary-container"
                  }`}
                >
                  {getInitials(petName)}
                </div>
                <div>
                  <h2 className="font-headline font-bold text-lg text-on-surface leading-tight">
                    {petName}
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    {petBreed} · {petSpecies === "dog" ? "Dog" : "Cat"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">

              {/* Profile Stats */}
              <div>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Profile
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Gender</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5 capitalize">
                      {petGender}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Age</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
                      {petAge}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Weight</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
                      {petWeight}
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <p className="text-xs text-on-surface-variant font-label">Coat Type</p>
                    <p className="font-headline font-bold text-sm text-on-surface mt-0.5">
                      {petCoatType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Care History */}
              {petSharesRecords && sharedCareRecords && sharedCareRecords.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                      Shared Care History
                    </p>
                    <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-label font-bold">
                      {sharedCareRecords.length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {sharedCareRecords.map((record, i) => (
                      <div
                        key={i}
                        className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10"
                      >
                        {/* Record Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                record.type === "grooming"
                                  ? "bg-tertiary-container text-on-tertiary-container"
                                  : "bg-secondary-container text-on-secondary-container"
                              }`}
                            >
                              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {record.type === "grooming" ? "content_cut" : "vaccines"}
                              </span>
                            </span>
                            <div>
                              <p className="font-label font-bold text-sm text-on-surface leading-tight">
                                {record.summary}
                              </p>
                              <p className="text-xs text-on-surface-variant">{record.provider}</p>
                            </div>
                          </div>
                          <p className="text-xs text-on-surface-variant font-label flex-shrink-0">
                            {record.date}
                          </p>
                        </div>

                        {/* Services */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {record.services.map((svc) => (
                            <span
                              key={svc}
                              className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-label font-bold text-on-surface-variant"
                            >
                              {svc}
                            </span>
                          ))}
                        </div>

                        {/* Attendant */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-xs text-on-surface-variant">person</span>
                          <p className="text-xs text-on-surface-variant">
                            <span className="font-bold text-on-surface">{record.attendant.name}</span>
                            {" · "}{record.attendant.role}
                          </p>
                        </div>

                        {/* Notes */}
                        {record.notes && (
                          <p className="text-xs text-on-surface-variant italic leading-relaxed border-t border-outline-variant/10 pt-2 mt-2">
                            &ldquo;{record.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-low rounded-2xl p-4 text-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-2xl mb-2 block">history</span>
                  <p className="text-sm text-on-surface-variant">
                    {petSharesRecords === false
                      ? "Owner has not shared this pet's care history."
                      : "No shared care records for this booking."}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
