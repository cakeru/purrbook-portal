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

export type SharedCareRecord = {
  type: "grooming" | "vet";
  date: string;
  provider: string;
  summary: string;
  attendant: { name: string; role: string };
  services: string[];
  notes: string;
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
  petGender: "male" | "female";
  petAge: string;
  petWeight: string;
  petCoatType: string;
  petSharesRecords?: boolean;
  sharedCareRecords?: SharedCareRecord[];
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
  name: "The Amber Sanctuary",
  type: "Salon",
  contact: "+63 917 555 0192",
  email: "hello@theambersanctuary.ph",
  address: "12 Burgos Street, Brgy. San Vicente, Tarlac City, 2300",
  description:
    "A sensory-driven grooming experience designed for the modern pet. Where botanical treatments meet boutique care.",
};

// ─── Staff ───────────────────────────────────────────────────────────────────

export const STAFF: StaffMember[] = [
  {
    id: "s1",
    name: "Camille Reyes",
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
    service: "Royal Bath & Silk Cut",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 16, 2026",
    time: "09:00 AM",
    duration: 120,
    price: 6800,
    status: "confirmed",
    notes:
      "Client requests lavender shampoo. Barnaby is shy around loud dryers — please use the quiet setting.",
    petGender: "male",
    petAge: "3 years",
    petWeight: "28 kg",
    petCoatType: "Double coat",
    petSharesRecords: true,
    sharedCareRecords: [
      {
        type: "grooming",
        date: "Nov 14, 2024",
        provider: "The Amber Sanctuary",
        summary: "Royal Bath & Silk Cut",
        attendant: { name: "Camille Reyes", role: "Senior Groomer" },
        services: ["Full bath", "Silk cut", "Nail trim", "Ear cleaning", "Teeth brushing"],
        notes: "Barnaby was calm throughout. Coat in excellent condition — no matting detected. Light lavender finish applied.",
      },
      {
        type: "grooming",
        date: "Jul 3, 2024",
        provider: "The Amber Sanctuary",
        summary: "Full Groom + De-shed Treatment",
        attendant: { name: "Camille Reyes", role: "Senior Groomer" },
        services: ["Full bath", "Summer trim", "De-shed treatment", "Nail trim"],
        notes: "Heavy summer undercoat removed. Coat significantly lightened. Recommended monthly de-shed through the season.",
      },
    ],
  },
  {
    id: "BK-002",
    petName: "Luna",
    petSpecies: "cat",
    petBreed: "Persian Cat",
    ownerName: "Jose Reyes",
    ownerPhone: "+63 918 345 6789",
    ownerEmail: "jose.reyes@email.com",
    service: "Editorial Styling",
    category: "grooming",
    groomerId: "s2",
    date: "Apr 16, 2026",
    time: "10:30 AM",
    duration: 120,
    price: 6800,
    status: "confirmed",
    notes: "Last visit Luna was anxious. Please keep session calm and unhurried.",
    petGender: "female",
    petAge: "2 years",
    petWeight: "4 kg",
    petCoatType: "Silky long coat",
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
    price: 1200,
    status: "pending",
    notes: "",
    petGender: "male",
    petAge: "5 years",
    petWeight: "32 kg",
    petCoatType: "Short coat",
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
    price: 2500,
    status: "confirmed",
    notes: "First visit. Owner is concerned about weight gain.",
    petGender: "female",
    petAge: "4 years",
    petWeight: "5 kg",
    petCoatType: "Dense plush coat",
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
    price: 1800,
    status: "completed",
    notes: "Annual booster. No adverse reactions from last year.",
    petGender: "male",
    petAge: "2 years",
    petWeight: "10 kg",
    petCoatType: "Smooth short coat",
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
    price: 1800,
    status: "completed",
    notes: "Coco gets along well with other dogs.",
    petGender: "female",
    petAge: "6 years",
    petWeight: "6 kg",
    petCoatType: "Long silky coat",
  },
  {
    id: "BK-007",
    petName: "Bruno",
    petSpecies: "dog",
    petBreed: "German Shepherd",
    ownerName: "Miguel Cruz",
    ownerPhone: "+63 923 890 1234",
    ownerEmail: "miguel.cruz@email.com",
    service: "Royal Bath & Silk Cut",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 15, 2026",
    time: "02:00 PM",
    duration: 120,
    price: 6800,
    status: "cancelled",
    notes: "Client cancelled — rescheduling next week.",
    petGender: "male",
    petAge: "4 years",
    petWeight: "35 kg",
    petCoatType: "Double coat",
  },
  {
    id: "BK-008",
    petName: "Nala",
    petSpecies: "dog",
    petBreed: "Samoyed",
    ownerName: "Trisha Lopez",
    ownerPhone: "+63 924 901 2345",
    ownerEmail: "trisha.lopez@email.com",
    service: "The Signature Soak",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 14, 2026",
    time: "10:00 AM",
    duration: 60,
    price: 4800,
    status: "completed",
    notes: "Heavy undercoat — allow extra time.",
    petGender: "female",
    petAge: "3 years",
    petWeight: "25 kg",
    petCoatType: "Thick double coat",
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
    price: 3500,
    status: "completed",
    notes: "Mild tartar buildup noted last visit.",
    petGender: "female",
    petAge: "7 years",
    petWeight: "4 kg",
    petCoatType: "Long silky coat",
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
    price: 3500,
    status: "completed",
    notes: "Feed 2x daily. Kibble provided by owner.",
    petGender: "male",
    petAge: "5 years",
    petWeight: "12 kg",
    petCoatType: "Short tricolor coat",
  },
  {
    id: "BK-011",
    petName: "Peanut",
    petSpecies: "dog",
    petBreed: "Pomeranian",
    ownerName: "Ana Ramos",
    ownerPhone: "+63 927 234 5678",
    ownerEmail: "ana.ramos@email.com",
    service: "The Signature Soak",
    category: "grooming",
    groomerId: "s2",
    date: "Apr 17, 2026",
    time: "09:30 AM",
    duration: 60,
    price: 4800,
    status: "pending",
    notes: "",
    petGender: "male",
    petAge: "1 year",
    petWeight: "3 kg",
    petCoatType: "Fluffy double coat",
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
    price: 1800,
    status: "pending",
    notes: "New patient. No prior vaccination records on file.",
    petGender: "male",
    petAge: "1 year",
    petWeight: "7 kg",
    petCoatType: "Semi-long silky coat",
  },
  {
    id: "BK-013",
    petName: "Shadow",
    petSpecies: "dog",
    petBreed: "Border Collie",
    ownerName: "Grace Castillo",
    ownerPhone: "+63 929 456 7890",
    ownerEmail: "grace.castillo@email.com",
    service: "Royal Bath & Silk Cut",
    category: "grooming",
    groomerId: "s1",
    date: "Apr 18, 2026",
    time: "10:00 AM",
    duration: 120,
    price: 6800,
    status: "pending",
    notes: "Prefers no cologne spray.",
    petGender: "male",
    petAge: "2 years",
    petWeight: "20 kg",
    petCoatType: "Rough double coat",
  },
];

// ─── Services ────────────────────────────────────────────────────────────────

export const SERVICES: Service[] = [
  {
    id: "sv1",
    name: "Royal Bath & Silk Cut",
    category: "grooming",
    icon: "water_drop",
    duration: 120,
    price: 6800,
    active: true,
    description:
      "Our signature full grooming ritual — double botanical wash, precision breed-specific cut, blow-dry, and finishing fragrance.",
  },
  {
    id: "sv2",
    name: "Editorial Styling",
    category: "grooming",
    icon: "content_cut",
    duration: 120,
    price: 6800,
    active: true,
    description:
      "Precision hand-scissoring, breed-specific shaping, and finishing fragrance. The gold standard for show-ready coats.",
  },
  {
    id: "sv3",
    name: "The Signature Soak",
    category: "grooming",
    icon: "air",
    duration: 60,
    price: 4800,
    active: true,
    description:
      "Double organic wash, botanical mask, blow-dry, and ear hygiene. Ideal for coats that need deep cleansing.",
  },
  {
    id: "sv4",
    name: "Puppy's First Spa",
    category: "grooming",
    icon: "pets",
    duration: 45,
    price: 3700,
    active: true,
    description:
      "Desensitization-focused session with gentle products and treats. Builds positive grooming associations from the start.",
  },
  {
    id: "sv5",
    name: "Nail Trim & Ear Clean",
    category: "grooming",
    icon: "handyman",
    duration: 30,
    price: 1200,
    active: true,
    description:
      "Precision nail filing and gentle ear cleaning using botanical solutions. Available as a standalone or add-on.",
  },
  {
    id: "sv6",
    name: "Dental Brushing",
    category: "grooming",
    icon: "dentistry",
    duration: 20,
    price: 800,
    active: false,
    description:
      "Gentle teeth brushing with pet-safe enzymatic toothpaste. An essential add-on for oral hygiene.",
  },
  {
    id: "sv7",
    name: "Annual Check-up",
    category: "vet",
    icon: "stethoscope",
    duration: 45,
    price: 2500,
    active: true,
    description:
      "Comprehensive wellness examination by our in-house veterinarian. Includes weight, vitals, and health assessment.",
  },
  {
    id: "sv8",
    name: "Rabies + DHPP Vaccine",
    category: "vet",
    icon: "vaccines",
    duration: 30,
    price: 1800,
    active: true,
    description:
      "Core vaccination package covering rabies, distemper, hepatitis, parainfluenza, and parvovirus.",
  },
  {
    id: "sv9",
    name: "Dental Cleaning",
    category: "vet",
    icon: "medical_services",
    duration: 60,
    price: 3500,
    active: true,
    description:
      "Professional ultrasonic dental scaling and polishing under light sedation. Improves oral health and breath.",
  },
  {
    id: "sv10",
    name: "Daycare Full Day",
    category: "boarding",
    icon: "wb_sunny",
    duration: 480,
    price: 1800,
    active: true,
    description:
      "A full day of supervised play, socialization, and rest in our curated sanctuary environment.",
  },
  {
    id: "sv11",
    name: "Overnight Boarding",
    category: "boarding",
    icon: "nights_stay",
    duration: 1440,
    price: 3500,
    active: true,
    description:
      "Comfortable overnight stay with evening care, morning walk, and a complimentary bath before pickup.",
  },
];

// ─── Analytics ───────────────────────────────────────────────────────────────

export const REVENUE_DATA: MonthRevenue[] = [
  { month: "Nov", revenue: 186400, bookings: 51 },
  { month: "Dec", revenue: 172800, bookings: 46 },
  { month: "Jan", revenue: 231500, bookings: 63 },
  { month: "Feb", revenue: 214200, bookings: 58 },
  { month: "Mar", revenue: 248900, bookings: 67 },
  { month: "Apr", revenue: 276400, bookings: 74 },
];

export const SERVICE_RANKINGS: ServiceRanking[] = [
  { name: "Royal Bath & Silk Cut", count: 42, revenue: 285600 },
  { name: "The Signature Soak", count: 38, revenue: 182400 },
  { name: "Overnight Boarding", count: 16, revenue: 56000 },
  { name: "Annual Check-up", count: 28, revenue: 70000 },
  { name: "Rabies + DHPP Vaccine", count: 24, revenue: 43200 },
];

export const KEY_STATS = {
  avgBookingValue: 4200,
  repeatCustomerRate: 68,
  cancellationRate: 7,
  totalCustomers: 94,
};

// ─── Operating Hours ─────────────────────────────────────────────────────────

export const OPERATING_HOURS: DayHours[] = [
  { day: "Monday", open: true, openTime: "09:00", closeTime: "19:00" },
  { day: "Tuesday", open: true, openTime: "09:00", closeTime: "19:00" },
  { day: "Wednesday", open: true, openTime: "09:00", closeTime: "19:00" },
  { day: "Thursday", open: true, openTime: "09:00", closeTime: "19:00" },
  { day: "Friday", open: true, openTime: "09:00", closeTime: "19:00" },
  { day: "Saturday", open: true, openTime: "09:00", closeTime: "19:00" },
  { day: "Sunday", open: false, openTime: "09:00", closeTime: "19:00" },
];
