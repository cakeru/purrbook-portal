import { BOOKINGS, type Booking } from "./dashboard-data";

export type CustomerStatus = "active" | "inactive";

export type PortalCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalBookings: number;
  totalSpent: number;
  lastVisitDate: string;
  lastService: string;
  favoriteService: string;
  pets: { name: string; species: "dog" | "cat"; breed: string }[];
  status: CustomerStatus;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Months ordered for rough date comparison (seed data uses "Mon DD, YYYY" format)
const MONTH_ORDER: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseSeedDate(dateStr: string): number {
  // "Apr 16, 2026" → sortable number YYYYMMDD
  const parts = dateStr.split(/[\s,]+/);
  if (parts.length < 3) return 0;
  const [mon, day, year] = parts;
  return parseInt(year) * 10000 + (MONTH_ORDER[mon] ?? 0) * 100 + parseInt(day);
}

export function buildCustomers(bookings: Booking[]): PortalCustomer[] {
  const map = new Map<string, {
    name: string; phone: string; email: string;
    bookings: Booking[];
  }>();

  for (const b of bookings) {
    const key = slugify(b.ownerName);
    if (!map.has(key)) {
      map.set(key, { name: b.ownerName, phone: b.ownerPhone, email: b.ownerEmail, bookings: [] });
    }
    map.get(key)!.bookings.push(b);
  }

  const today = parseSeedDate("Apr 18, 2026");

  return Array.from(map.entries()).map(([id, { name, phone, email, bookings: bks }]) => {
    const completed = bks.filter((b) => b.status === "completed" || b.status === "confirmed");
    const totalSpent = completed.reduce((s, b) => s + b.price, 0);

    const sorted = [...bks].sort((a, b) => parseSeedDate(b.date) - parseSeedDate(a.date));
    const latest = sorted[0];

    // Favorite service: most frequent service name
    const serviceCounts = new Map<string, number>();
    for (const b of bks) serviceCounts.set(b.service, (serviceCounts.get(b.service) ?? 0) + 1);
    const favoriteService = [...serviceCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";

    // Unique pets per owner
    const petMap = new Map<string, { name: string; species: "dog" | "cat"; breed: string }>();
    for (const b of bks) {
      if (!petMap.has(b.petName)) {
        petMap.set(b.petName, { name: b.petName, species: b.petSpecies, breed: b.petBreed });
      }
    }

    // Active: has booking within 60 days of today
    const daysDiff = (today - parseSeedDate(latest.date)) / 100;
    const status: CustomerStatus = Math.abs(daysDiff) <= 60 ? "active" : "inactive";

    return {
      id,
      name,
      phone,
      email,
      totalBookings: bks.length,
      totalSpent,
      lastVisitDate: latest.date,
      lastService: latest.service,
      favoriteService,
      pets: Array.from(petMap.values()),
      status,
    };
  }).sort((a, b) => parseSeedDate(b.lastVisitDate) - parseSeedDate(a.lastVisitDate));
}

export const CUSTOMERS = buildCustomers(BOOKINGS);
