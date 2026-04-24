"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { api } from "../lib/api";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`material-symbols-outlined text-base ${n <= rating ? "text-tertiary" : "text-outline-variant"}`}
          style={{ fontVariationSettings: n <= rating ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function ReviewCard({ review }: { review: any }) {
  const petColor =
    review.petSpecies === "cat"
      ? "bg-secondary-container text-on-secondary-container"
      : "bg-tertiary-container text-on-tertiary-container";

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="font-headline font-bold text-primary text-sm">
              {getInitials(review.ownerName)}
            </span>
          </div>
          <div>
            <p className="font-headline font-bold text-sm text-on-surface leading-tight">
              {review.ownerName}
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Body */}
      <p className="text-sm text-on-surface-variant font-body leading-relaxed italic">
        &ldquo;{review.body}&rdquo;
      </p>

      {/* Footer */}
      <div className="border-t border-outline-variant/10 pt-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-label font-bold ${petColor}`}
          >
            <span
              className="material-symbols-outlined text-[11px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {review.petSpecies === "dog" ? "pets" : "set_meal"}
            </span>
            {review.petName}
          </span>
          <span className="text-xs text-on-surface-variant bg-surface-container rounded-full px-2.5 py-1 font-label font-bold">
            {review.service}
          </span>
        </div>
        <p className="text-xs text-on-surface-variant">
          by <span className="font-bold text-on-surface">{review.staffName}</span>
        </p>
      </div>
    </div>
  );
}

type SortKey = "date" | "rating_high" | "rating_low";
type FilterStaff = "all" | string;

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [searchQ, setSearchQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [filterStaff, setFilterStaff] = useState<FilterStaff>("all");

  useEffect(() => {
    api.get<{ reviews: any[] }>("/reviews").then(({ reviews: rows }) => {
      setReviews(rows.map((r: any) => ({
        ...r,
        ownerName: r.consumerName ?? r.ownerName,
        staffName: r.staffName ?? "—",
        petSpecies: r.petSpecies ?? "dog",
      })));
    }).catch(console.error);
  }, []);

  const staffNames = Array.from(new Set(reviews.map((r) => r.staffName).filter(Boolean)));

  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  let filtered = reviews.filter((r) => {
    const q = searchQ.toLowerCase();
    if (q && !r.ownerName.toLowerCase().includes(q) && !r.petName.toLowerCase().includes(q) && !r.body.toLowerCase().includes(q)) return false;
    if (filterStaff !== "all" && r.staffName !== filterStaff) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortKey === "rating_high") return b.rating - a.rating;
    if (sortKey === "rating_low") return a.rating - b.rating;
    return 0;
  });

  return (
    <>
      <DashboardHeader title="Reviews" breadcrumb="Provider Portal" onSearch={setSearchQ} />

      <main className="px-8 py-8">

        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
            Client Reviews
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            What your clients are saying about their sanctuary experience
          </p>
        </div>

        {/* Summary chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/10 rounded-full px-4 py-2">
            <span
              className="material-symbols-outlined text-tertiary text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label font-bold text-sm text-on-surface">
              {avgRating.toFixed(1)} avg rating
            </span>
          </div>
          <div className="flex items-center gap-2 bg-tertiary-container rounded-full px-4 py-2">
            <span className="font-label font-bold text-sm text-on-tertiary-container">
              {reviews.length} total reviews
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest rounded-full px-4 py-2">
            <span className="font-label font-bold text-sm text-on-surface-variant">
              {fiveStars} five-star
            </span>
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Staff filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
              Staff:
            </span>
            <button
              onClick={() => setFilterStaff("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-label font-bold transition-all active:scale-95 ${
                filterStaff === "all"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              All
            </button>
            {staffNames.map((name) => (
              <button
                key={name}
                onClick={() => setFilterStaff(name)}
                className={`px-3 py-1.5 rounded-full text-xs font-label font-bold transition-all active:scale-95 ${
                  filterStaff === name
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {name.split(" ").slice(-1)[0]}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
              Sort:
            </span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-full px-3 py-1.5 text-xs font-label font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="date">Most Recent</option>
              <option value="rating_high">Highest Rated</option>
              <option value="rating_low">Lowest Rated</option>
            </select>
          </div>
        </div>

        {/* Reviews grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <span
              className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <p className="text-on-surface-variant font-label font-bold">No reviews match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

      </main>
    </>
  );
}
