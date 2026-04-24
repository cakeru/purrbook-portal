"use client";


const SLOT_H = 56; // px per hour
const START_HOUR = 8;
const END_HOUR = 19;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

const WEEK = [
  { label: "Mon", short: "Apr 13", full: "Apr 13, 2026" },
  { label: "Tue", short: "Apr 14", full: "Apr 14, 2026" },
  { label: "Wed", short: "Apr 15", full: "Apr 15, 2026" },
  { label: "Thu", short: "Apr 16", full: "Apr 16, 2026" },
  { label: "Fri", short: "Apr 17", full: "Apr 17, 2026" },
  { label: "Sat", short: "Apr 18", full: "Apr 18, 2026" },
  { label: "Sun", short: "Apr 19", full: "Apr 19, 2026" },
];

const CAT_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  grooming: { bg: "bg-primary", text: "text-on-primary", border: "border-primary-dim" },
  vet: { bg: "bg-tertiary-container", text: "text-on-tertiary-container", border: "border-tertiary/30" },
  boarding: { bg: "bg-secondary-container", text: "text-on-secondary-container", border: "border-secondary/30" },
};

function parseMin(time: string): number {
  const [tp, period] = time.split(" ");
  const [h, m] = tp.split(":").map(Number);
  let hours = h;
  if (period === "PM" && h !== 12) hours += 12;
  if (period === "AM" && h === 12) hours = 0;
  return hours * 60 + (m || 0);
}

function formatHour(h: number) {
  if (h === 12) return "12 PM";
  if (h > 12) return `${h - 12} PM`;
  return `${h} AM`;
}

function assignLanes(bookings: Booking[]) {
  const sorted = [...bookings].sort((a, b) => parseMin(a.time) - parseMin(b.time));
  const laneEnds: number[] = [];
  const result: { booking: Booking; lane: number }[] = [];

  for (const bk of sorted) {
    const start = parseMin(bk.time);
    const end = start + Math.min(bk.duration, (END_HOUR - START_HOUR) * 60);
    let lane = laneEnds.findIndex((e) => e <= start);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = end;
    result.push({ booking: bk, lane });
  }

  const totalLanes = laneEnds.length;
  return result.map((r) => ({ ...r, totalLanes: Math.max(totalLanes, 1) }));
}

export default function CalendarView({
  bookings,
  onSelect,
}: {
  bookings: Booking[];
  onSelect: (b: Booking) => void;
}) {
  const totalH = (END_HOUR - START_HOUR) * SLOT_H;

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden">
      {/* Day headers */}
      <div className="grid border-b border-outline-variant/10" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
        <div className="border-r border-outline-variant/10" />
        {WEEK.map((day) => {
          const count = bookings.filter((b) => b.date === day.full).length;
          return (
            <div key={day.label} className="px-2 py-3 text-center border-r border-outline-variant/10 last:border-r-0">
              <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-widest">{day.label}</p>
              <p className="text-sm font-headline font-bold text-on-surface mt-0.5">{day.short.split(" ")[1]}</p>
              {count > 0 && (
                <span className="inline-block mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="overflow-y-auto max-h-[600px]">
        <div className="grid relative" style={{ gridTemplateColumns: "56px repeat(7, 1fr)", minHeight: totalH }}>
          {/* Hour labels + horizontal lines */}
          <div className="border-r border-outline-variant/10">
            {HOURS.map((h) => (
              <div
                key={h}
                className="flex items-start justify-end pr-2 text-[10px] text-on-surface-variant font-label"
                style={{ height: SLOT_H }}
              >
                <span className="-mt-2">{formatHour(h)}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {WEEK.map((day) => {
            const dayBookings = bookings.filter((b) => b.date === day.full);
            const lanes = assignLanes(dayBookings);

            return (
              <div
                key={day.label}
                className="border-r border-outline-variant/10 last:border-r-0 relative"
                style={{ height: totalH }}
              >
                {/* Hour grid lines */}
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="absolute w-full border-t border-outline-variant/10"
                    style={{ top: (h - START_HOUR) * SLOT_H }}
                  />
                ))}

                {/* Bookings */}
                {lanes.map(({ booking, lane, totalLanes }) => {
                  const startMin = parseMin(booking.time);
                  const topPx = Math.max(0, (startMin - START_HOUR * 60) / 60 * SLOT_H);
                  const rawH = booking.duration / 60 * SLOT_H;
                  const heightPx = Math.max(28, Math.min(rawH, totalH - topPx));
                  const leftPct = (lane / totalLanes) * 100;
                  const widthPct = (1 / totalLanes) * 100;
                  const colors = CAT_COLOR[booking.category] ?? CAT_COLOR.grooming;
                  const cancelled = booking.status === "cancelled";

                  return (
                    <button
                      key={booking.id}
                      onClick={() => onSelect(booking)}
                      className={`absolute rounded-lg px-1.5 py-1 text-left overflow-hidden transition-all active:scale-95 hover:z-10 hover:shadow-md border ${colors.bg} ${colors.text} ${colors.border} ${cancelled ? "opacity-40" : ""}`}
                      style={{
                        top: topPx + 2,
                        height: heightPx - 4,
                        left: `calc(${leftPct}% + 2px)`,
                        width: `calc(${widthPct}% - 4px)`,
                      }}
                    >
                      <p className="text-[10px] font-label font-bold leading-tight truncate">{booking.petName}</p>
                      {heightPx > 36 && (
                        <p className="text-[9px] opacity-80 truncate leading-tight mt-0.5">{booking.service}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-3 border-t border-outline-variant/10">
        {Object.entries(CAT_COLOR).map(([cat, c]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${c.bg}`} />
            <span className="text-xs font-label text-on-surface-variant capitalize">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
