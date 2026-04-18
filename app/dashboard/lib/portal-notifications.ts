export type PortalNotifType = "booking" | "message" | "payment" | "staff";

export type PortalNotification = {
  id: string;
  type: PortalNotifType;
  title: string;
  body: string;
  timestamp: string; // ISO
  read: boolean;
  href?: string;
};

export const SEED_PORTAL_NOTIFICATIONS: PortalNotification[] = [
  {
    id: "pn1",
    type: "booking",
    title: "New Booking Request",
    body: "Barnaby · Royal Bath & Silk Cut · Nov 14 at 10:00 AM. Awaiting your confirmation.",
    timestamp: "2024-11-13T09:30:00.000Z",
    read: false,
    href: "/dashboard/bookings",
  },
  {
    id: "pn2",
    type: "message",
    title: "New Message",
    body: "Maria Santos sent a message about Barnaby's upcoming appointment.",
    timestamp: "2024-11-13T08:55:00.000Z",
    read: false,
    href: "/dashboard/messages",
  },
  {
    id: "pn3",
    type: "payment",
    title: "Payment Received",
    body: "₱650 received for Luna's Breed-Specific Cut on Nov 21.",
    timestamp: "2024-11-12T16:00:00.000Z",
    read: true,
  },
  {
    id: "pn4",
    type: "booking",
    title: "Booking Confirmed",
    body: "Booking #B-2847 has been confirmed by the client. All set for Nov 21.",
    timestamp: "2024-11-12T14:20:00.000Z",
    read: true,
  },
  {
    id: "pn5",
    type: "staff",
    title: "Staff Availability Update",
    body: "Camille Reyes has marked herself available for today's schedule.",
    timestamp: "2024-11-13T07:00:00.000Z",
    read: true,
  },
];

export const NOTIF_ICONS: Record<PortalNotifType, string> = {
  booking: "calendar_month",
  message: "chat",
  payment: "payments",
  staff: "group",
};

export function formatPortalNotifTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2024-11-13T12:00:00.000Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
