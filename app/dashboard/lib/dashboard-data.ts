// ─── Types ──────────────────────────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ServiceCategory = "grooming" | "vet" | "boarding";
export type StaffRole =
  | "Senior Groomer"
  | "Groomer"
  | "Veterinarian"
  | "Boarding Attendant";
export type AvailabilityStatus = "available" | "on_break" | "off_today";

export type ProviderInfo = {
  name: string;
  type: "Salon" | "Vet" | "Studio";
  contact: string;
  email: string;
  address: string;
  description: string;
};

export type Booking = {
  id: string;
  petName: string;
  petSpecies: "dog" | "cat";
  petBreed: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  service: string;
  category: ServiceCategory;
  groomerId: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: BookingStatus;
  notes: string;
};

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  icon: string;
  duration: number;
  price: number;
  active: boolean;
  description: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: StaffRole;
  specializations: string[];
  bookingsToday: number;
  status: AvailabilityStatus;
  joinedDate: string;
};

export type MonthRevenue = {
  month: string;
  revenue: number;
  bookings: number;
};

export type ServiceRanking = {
  name: string;
  count: number;
  revenue: number;
};

export type DayHours = {
  day: string;
  open: boolean;
  openTime: string;
  closeTime: string;
};

// ─── Provider ───────────────────────────────────────────────────────────────

export const PROVIDER_INFO: ProviderInfo = {
  name: "Botanica Paws",
  type: "Salon",
  contact: "+63 917 555 0192",
  email: "hello@botanicapaws.ph",
  address: "12 Burgos Street, Brgy. San Vicente, Tarlac City, 2300",
  description:
    "An editorial-grade grooming sanctuary for discerning pet parents. We blend botanical care rituals with expert grooming craft to deliver a truly curated experience for your beloved companion.",
};

// ─── Staff ───────────────────────────────────────────────────────────────────

export const STAFF: StaffMember[] = [
  {
    id: "s1",
    name: "Carlos Reyes",
    role: "Senior Groomer",
    specializations: ["Double Coat", "Silk Cut", "De-shed"],
    bookingsToday: 3,
    status: "available",
    joinedDate: "Mar 2023",
  },
  {
    id: "s2",
    name: "Ana Magsaysay",
    role: "Groomer",
    specializations: ["Cat Specialist", "Nail Expert", "Small Breeds"],
    bookingsToday: 2,
    status: "available",
    joinedDate: "Aug 2023",
  },
  {
    id: "s3",
    name: "Dr. Ramon Villanueva",
    role: "Veterinarian",
    specializations: ["Vaccines", "Dental", "Internal Medicine"],
    bookingsToday: 2,
    status: "available",
    joinedDate: "Jan 2022",
  },
  {
    id: "s4",
    name: "Marco Dizon",
    role: "Boarding Attendant",
    specializations: ["Dog Boarding", "Cat Boarding", "Daycare"],
    bookingsToday: 0,
    status: "off_today",
    joinedDate: "Nov 2023",
  },
  {
    id: "s5",
    name: "Dr. Sofia Bautista",
    role: "Veterinarian",
    specializations: ["Surgery", "X-ray", "Emergency"],
    bookingsToday: 0,
    status: "on_break",
    joinedDate: "Jun 2022",
  },
];

// ─── Bookings ────────────────────────────────────────────────────────────────

export const BOOKINGS: Booking[] = [
  {
    id: "BK-001",
    petName: "Barnaby",
    petSpecies: "dog",
    petBreed: "Golden Retriever",
    ownerName: "Maria Santos",
    ownerPhone: "+63 917 234 5678",
    ownerEmail: "maria.santos@email.com",
    service: "Full Bath & Silk Cut",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 16, 2026",
    time: "09:00 AM",
    duration: 90,
    price: 850,
    status: "confirmed",
    notes:
      "Client requests lavender shampoo. Barnaby is shy around loud dryers — please use the quiet setting.",
  },
  {
    id: "BK-002",
    petName: "Luna",
    petSpecies: "cat",
    petBreed: "Maine Coon",
    ownerName: "Jose Reyes",
    ownerPhone: "+63 918 345 6789",
    ownerEmail: "jose.reyes@email.com",
    service: "Breed-Specific Cut",
    category: "grooming",
    groomerId: "s2",
    date: "Apr 16, 2026",
    time: "10:30 AM",
    duration: 75,
    price: 650,
    status: "confirmed",
    notes: "Last visit Luna was anxious. Please keep session calm and unhurried.",
  },
  {
    id: "BK-003",
    petName: "Max",
    petSpecies: "dog",
    petBreed: "Labrador Retriever",
    ownerName: "Carmen Garcia",
    ownerPhone: "+63 919 456 7890",
    ownerEmail: "carmen.garcia@email.com",
    service: "Nail Trim & Ear Clean",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 16, 2026",
    time: "01:45 PM",
    duration: 30,
    price: 250,
    status: "pending",
    notes: "",
  },
  {
    id: "BK-004",
    petName: "Mochi",
    petSpecies: "cat",
    petBreed: "Scottish Fold",
    ownerName: "Lena Dela Cruz",
    ownerPhone: "+63 920 567 8901",
    ownerEmail: "lena.delacruz@email.com",
    service: "Annual Check-up",
    category: "vet",
    groomerId: "s3",
    date: "Apr 16, 2026",
    time: "03:00 PM",
    duration: 45,
    price: 500,
    status: "confirmed",
    notes: "First visit. Owner is concerned about weight gain.",
  },
  {
    id: "BK-005",
    petName: "Oreo",
    petSpecies: "dog",
    petBreed: "French Bulldog",
    ownerName: "Patrick Tan",
    ownerPhone: "+63 921 678 9012",
    ownerEmail: "patrick.tan@email.com",
    service: "Rabies + DHPP Vaccine",
    category: "vet",
    groomerId: "s3",
    date: "Apr 15, 2026",
    time: "11:00 AM",
    duration: 30,
    price: 750,
    status: "completed",
    notes: "Annual booster. No adverse reactions from last year.",
  },
  {
    id: "BK-006",
    petName: "Coco",
    petSpecies: "dog",
    petBreed: "Shih Tzu",
    ownerName: "Rosa Mendoza",
    ownerPhone: "+63 922 789 0123",
    ownerEmail: "rosa.mendoza@email.com",
    service: "Daycare Full Day",
    category: "boarding",
    groomerId: "s4",
    date: "Apr 15, 2026",
    time: "08:00 AM",
    duration: 480,
    price: 600,
    status: "completed",
    notes: "Coco gets along well with other dogs.",
  },
  {
    id: "BK-007",
    petName: "Bruno",
    petSpecies: "dog",
    petBreed: "German Shepherd",
    ownerName: "Miguel Cruz",
    ownerPhone: "+63 923 890 1234",
    ownerEmail: "miguel.cruz@email.com",
    service: "Full Bath & Silk Cut",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 15, 2026",
    time: "02:00 PM",
    duration: 90,
    price: 850,
    status: "cancelled",
    notes: "Client cancelled — rescheduling next week.",
  },
  {
    id: "BK-008",
    petName: "Nala",
    petSpecies: "dog",
    petBreed: "Samoyed",
    ownerName: "Trisha Lopez",
    ownerPhone: "+63 924 901 2345",
    ownerEmail: "trisha.lopez@email.com",
    service: "De-shed Treatment",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 14, 2026",
    time: "10:00 AM",
    duration: 60,
    price: 550,
    status: "completed",
    notes: "Heavy undercoat — allow extra time.",
  },
  {
    id: "BK-009",
    petName: "Kitty",
    petSpecies: "cat",
    petBreed: "Persian",
    ownerName: "Donna Bautista",
    ownerPhone: "+63 925 012 3456",
    ownerEmail: "donna.bautista@email.com",
    service: "Dental Cleaning",
    category: "vet",
    groomerId: "s3",
    date: "Apr 14, 2026",
    time: "03:30 PM",
    duration: 60,
    price: 1200,
    status: "completed",
    notes: "Mild tartar buildup noted last visit.",
  },
  {
    id: "BK-010",
    petName: "Biscuit",
    petSpecies: "dog",
    petBreed: "Beagle",
    ownerName: "Carlo Santos",
    ownerPhone: "+63 926 123 4567",
    ownerEmail: "carlo.santos@email.com",
    service: "Overnight Boarding",
    category: "boarding",
    groomerId: "s4",
    date: "Apr 13, 2026",
    time: "06:00 PM",
    duration: 1440,
    price: 1200,
    status: "completed",
    notes: "Feed 2x daily. Kibble provided by owner.",
  },
  {
    id: "BK-011",
    petName: "Peanut",
    petSpecies: "dog",
    petBreed: "Pomeranian",
    ownerName: "Ana Ramos",
    ownerPhone: "+63 927 234 5678",
    ownerEmail: "ana.ramos@email.com",
    service: "Bath & Blow-dry",
    category: "grooming",
    groomerId: "s2",
    date: "Apr 17, 2026",
    time: "09:30 AM",
    duration: 60,
    price: 450,
    status: "pending",
    notes: "",
  },
  {
    id: "BK-012",
    petName: "Tofu",
    petSpecies: "cat",
    petBreed: "Ragdoll",
    ownerName: "Ben Flores",
    ownerPhone: "+63 928 345 6789",
    ownerEmail: "ben.flores@email.com",
    service: "Rabies + DHPP Vaccine",
    category: "vet",
    groomerId: "s3",
    date: "Apr 17, 2026",
    time: "11:00 AM",
    duration: 30,
    price: 750,
    status: "pending",
    notes: "New patient. No prior vaccination records on file.",
  },
  {
    id: "BK-013",
    petName: "Shadow",
    petSpecies: "dog",
    petBreed: "Border Collie",
    ownerName: "Grace Castillo",
    ownerPhone: "+63 929 456 7890",
    ownerEmail: "grace.castillo@email.com",
    service: "Full Bath & Silk Cut",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 18, 2026",
    time: "10:00 AM",
    duration: 90,
    price: 850,
    status: "pending",
    notes: "Prefers no cologne spray.",
  },
];

// ─── Services ────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: "sv1",
    name: "Full Bath & Silk Cut",
    category: "grooming",
    icon: "water_drop",
    duration: 90,
    price: 850,
    active: true,
    description:
      "A full botanical bath ritual followed by a precision breed-specific cut. Includes blow-dry and finishing spritz.",
  },
  {
    id: "sv2",
    name: "Breed-Specific Cut",
    category: "grooming",
    icon: "content_cut",
    duration: 75,
    price: 650,
    active: true,
    description:
      "Expert styling tailored to your pet's breed standard. Ideal for cats and small dogs.",
  },
  {
    id: "sv3",
    name: "Nail Trim & Ear Clean",
    category: "grooming",
    icon: "handyman",
    duration: 30,
    price: 250,
    active: true,
    description:
      "Precision nail filing and gentle ear cleaning using botanical solutions.",
  },
  {
    id: "sv4",
    name: "De-shed Treatment",
    category: "grooming",
    icon: "air",
    duration: 60,
    price: 550,
    active: true,
    description:
      "Intensive de-shedding bath and brush-out. Ideal for double-coat breeds like Samoyeds and Huskies.",
  },
  {
    id: "sv5",
    name: "Dental Brushing",
    category: "grooming",
    icon: "dentistry",
    duration: 20,
    price: 180,
    active: false,
    description:
      "Gentle teeth brushing with pet-safe enzymatic toothpaste. An essential add-on for oral hygiene.",
  },
  {
    id: "sv6",
    name: "Annual Check-up",
    category: "vet",
    icon: "stethoscope",
    duration: 45,
    price: 500,
    active: true,
    description:
      "Comprehensive wellness examination by our in-house veterinarian. Includes weight, vitals, and health assessment.",
  },
  {
    id: "sv7",
    name: "Rabies + DHPP Vaccine",
    category: "vet",
    icon: "vaccines",
    duration: 30,
    price: 750,
    active: true,
    description:
      "Core vaccination package covering rabies, distemper, hepatitis, parainfluenza, and parvovirus.",
  },
  {
    id: "sv8",
    name: "Dental Cleaning",
    category: "vet",
    icon: "medical_services",
    duration: 60,
    price: 1200,
    active: true,
    description:
      "Professional ultrasonic dental scaling and polishing under light sedation. Improves oral health and breath.",
  },
  {
    id: "sv9",
    name: "Daycare Full Day",
    category: "boarding",
    icon: "wb_sunny",
    duration: 480,
    price: 600,
    active: true,
    description:
      "A full day of supervised play, socialization, and rest in our curated sanctuary environment.",
  },
  {
    id: "sv10",
    name: "Overnight Boarding",
    category: "boarding",
    icon: "nights_stay",
    duration: 1440,
    price: 1200,
    active: true,
    description:
      "Comfortable overnight stay with evening care, morning walk, and a complimentary bath before pickup.",
  },
];

// ─── Analytics ───────────────────────────────────────────────────────────────

export const REVENUE_DATA: MonthRevenue[] = [
  { month: "Nov", revenue: 42300, bookings: 51 },
  { month: "Dec", revenue: 38900, bookings: 46 },
  { month: "Jan", revenue: 51200, bookings: 63 },
  { month: "Feb", revenue: 47800, bookings: 58 },
  { month: "Mar", revenue: 55400, bookings: 67 },
  { month: "Apr", revenue: 61200, bookings: 74 },
];

export const SERVICE_RANKINGS: ServiceRanking[] = [
  { name: "Full Bath & Silk Cut", count: 42, revenue: 35700 },
  { name: "Annual Check-up", count: 28, revenue: 14000 },
  { name: "Rabies + DHPP Vaccine", count: 24, revenue: 18000 },
  { name: "De-shed Treatment", count: 19, revenue: 10450 },
  { name: "Overnight Boarding", count: 16, revenue: 19200 },
];

export const KEY_STATS = {
  avgBookingValue: 820,
  repeatCustomerRate: 68,
  cancellationRate: 7,
  totalCustomers: 94,
};

// ─── Operating Hours ─────────────────────────────────────────────────────────

export const OPERATING_HOURS: DayHours[] = [
  { day: "Monday", open: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Tuesday", open: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Wednesday", open: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Thursday", open: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Friday", open: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Saturday", open: true, openTime: "09:00", closeTime: "17:00" },
  { day: "Sunday", open: false, openTime: "09:00", closeTime: "17:00" },
];
