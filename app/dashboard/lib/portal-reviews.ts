export type ReviewStatus = "published" | "flagged";

export type PortalReview = {
  id: string;
  bookingId: string;
  ownerName: string;
  petName: string;
  petSpecies: "dog" | "cat";
  service: string;
  date: string;
  rating: number;
  body: string;
  staffName: string;
  status: ReviewStatus;
};

export const PORTAL_REVIEWS: PortalReview[] = [
  {
    id: "rv-001",
    bookingId: "BK-009",
    ownerName: "Maria Santos",
    petName: "Barnaby",
    petSpecies: "dog",
    service: "Royal Bath & Silk Cut",
    date: "Nov 14, 2024",
    rating: 5,
    body: "Barnaby came home looking absolutely regal. Camille clearly understood his double coat — no tugging, no stress. The lavender finish was a lovely touch. We'll be regulars.",
    staffName: "Camille Reyes",
    status: "published",
  },
  {
    id: "rv-002",
    bookingId: "BK-010",
    ownerName: "Jose Reyes",
    petName: "Luna",
    petSpecies: "cat",
    service: "Editorial Styling",
    date: "Nov 21, 2024",
    rating: 5,
    body: "Luna usually hates being groomed anywhere, but she came back visibly calm. The team's feline-specialist approach made all the difference. Her coat is silky and gorgeous.",
    staffName: "Ana Magsaysay",
    status: "published",
  },
  {
    id: "rv-003",
    bookingId: "BK-011",
    ownerName: "Carmen Garcia",
    petName: "Max",
    petSpecies: "dog",
    service: "Full Groom + De-shed Treatment",
    date: "Oct 5, 2024",
    rating: 4,
    body: "Great service overall. Max's coat looked wonderful post-de-shed. Took a bit longer than expected but the result was worth it. Would book again.",
    staffName: "Camille Reyes",
    status: "published",
  },
  {
    id: "rv-004",
    bookingId: "BK-012",
    ownerName: "Lena Dela Cruz",
    petName: "Mochi",
    petSpecies: "cat",
    service: "Annual Check-up",
    date: "Mar 22, 2026",
    rating: 5,
    body: "Dr. Ramon was thorough, gentle, and took the time to explain everything. Mochi barely flinched during the exam. Highly recommend for anxious cats.",
    staffName: "Dr. Ramon Villanueva",
    status: "published",
  },
  {
    id: "rv-005",
    bookingId: "BK-013",
    ownerName: "Andres Tan",
    petName: "Kiko",
    petSpecies: "dog",
    service: "Nail Trim & Ear Clean",
    date: "Apr 2, 2026",
    rating: 3,
    body: "Service was fine but waiting time was a bit long for a quick trim. Staff were friendly though.",
    staffName: "Ana Magsaysay",
    status: "published",
  },
  {
    id: "rv-006",
    bookingId: "BK-014",
    ownerName: "Sofia Mendoza",
    petName: "Biscuit",
    petSpecies: "dog",
    service: "Royal Bath & Silk Cut",
    date: "Apr 10, 2026",
    rating: 5,
    body: "Every visit feels like a luxury ritual. Biscuit is always happy and fresh. The attention to detail is unmatched — they even noticed a small skin irritation before I did.",
    staffName: "Camille Reyes",
    status: "published",
  },
];
