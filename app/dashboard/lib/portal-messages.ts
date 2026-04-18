export type PortalMessage = {
  id: string;
  sender: "client" | "salon";
  content: string;
  timestamp: string; // ISO
};

export type PortalThread = {
  id: string;
  clientName: string;
  clientPhone: string;
  petName: string;
  petBreed: string;
  lastBookingDate: string;
  messages: PortalMessage[];
  unreadCount: number;
};

export const SEED_PORTAL_THREADS: PortalThread[] = [
  {
    id: "maria-barnaby",
    clientName: "Maria Santos",
    clientPhone: "+63 917 555 0101",
    petName: "Barnaby",
    petBreed: "Golden Retriever",
    lastBookingDate: "Nov 14, 2024",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        sender: "client",
        content: "Hi! We're looking forward to Barnaby's session tomorrow. Any prep we should do tonight?",
        timestamp: "2024-11-13T18:42:00Z",
      },
      {
        id: "m2",
        sender: "salon",
        content: "Hi Maria! Great to hear from you. For Barnaby's Royal Bath & Silk Cut, just make sure he's well-brushed beforehand to reduce any matting. Arrive about 10 minutes early so he can settle in. We have lavender treats ready for him!",
        timestamp: "2024-11-13T18:50:00Z",
      },
      {
        id: "m3",
        sender: "client",
        content: "That's so thoughtful, thank you! We'll be there at 9:50. He's been extra fluffy lately 😄",
        timestamp: "2024-11-13T19:05:00Z",
      },
    ],
  },
  {
    id: "ana-mochi",
    clientName: "Ana Reyes",
    clientPhone: "+63 920 555 0202",
    petName: "Mochi",
    petBreed: "Persian Cat",
    lastBookingDate: "Nov 21, 2024",
    unreadCount: 0,
    messages: [
      {
        id: "m4",
        sender: "client",
        content: "Hello! I'd like to book Mochi for a Persian Silk Coat treatment. Do you have slots next week?",
        timestamp: "2024-11-12T10:15:00Z",
      },
      {
        id: "m5",
        sender: "salon",
        content: "Hi Ana! We have an opening on November 21 at 2:00 PM with Sofia Ramos, our feline specialist. She's wonderful with Persians. Shall I reserve it for Mochi?",
        timestamp: "2024-11-12T10:30:00Z",
      },
    ],
  },
];

export function getSalonAutoReply(clientMessage: string): string {
  const q = clientMessage.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
    return "Our grooming services start from ₱450 for basic bath & brush, and ₱580–₱750 for full breed-specific treatments. Would you like me to send over our full service menu?";
  }
  if (q.includes("cancel") || q.includes("reschedule")) {
    return "No problem! We can reschedule with at least 24 hours' notice. What date works best for you? I'll check our availability right away.";
  }
  if (q.includes("time") || q.includes("long") || q.includes("duration") || q.includes("how long")) {
    return "A full grooming session typically takes 2–3 hours depending on your pet's coat. We'll send you a message when we're about 30 minutes from done so you can be ready!";
  }
  if (q.includes("arrive") || q.includes("early") || q.includes("late")) {
    return "We recommend arriving 5–10 minutes early so your pet has a moment to settle in and get comfortable with our space. Just let us know if you're running late — we'll do our best to accommodate!";
  }
  if (q.includes("thank") || q.includes("great") || q.includes("perfect") || q.includes("wonderful")) {
    return "Thank you so much! We love caring for your companion. See you soon — we'll make sure it's a wonderful experience! 🐾";
  }
  return "Thank you for reaching out! We'll look into this and get back to you shortly. If it's urgent, feel free to call us at +63 917 555 0192.";
}

export function formatPortalMsgTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2024-11-13T20:00:00.000Z");
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDaySep(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
