"use client";

import StatusBadge from "../components/StatusBadge";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function CustomerDetailPanel({
  customer,
  onClose,
}: {
  customer: any | null;
  onClose: () => void;
}) {
  const bookings = customer?.recentBookings ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-inverse-surface/30 z-40 transition-opacity duration-200 ${customer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface-container-lowest border-l border-outline-variant/15 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${customer ? "translate-x-0" : "translate-x-full"}`}
      >
        {!customer ? null : (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-headline font-bold text-primary text-base">{getInitials(customer.name)}</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-lg text-on-surface leading-tight">{customer.name}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-label font-bold mt-0.5 ${customer.status === "active" ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-highest text-on-surface-variant"}`}>
                    {customer.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-lg">close</span>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

              {/* Contact */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Contact</p>
                <div className="bg-surface-container-low rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">call</span>
                    <span className="text-sm font-label font-bold text-on-surface">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">mail</span>
                    <span className="text-sm text-on-surface-variant truncate">{customer.email}</span>
                  </div>
                </div>
              </section>

              {/* Pets */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Companions</p>
                <div className="flex flex-wrap gap-2">
                  {customer.pets.map((pet) => (
                    <span
                      key={pet.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-label font-bold ${pet.species === "dog" ? "bg-tertiary-container text-on-tertiary-container" : "bg-secondary-container text-on-secondary-container"}`}
                    >
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {pet.species === "dog" ? "pets" : "set_meal"}
                      </span>
                      {pet.name}
                      <span className="font-normal opacity-70">· {pet.breed}</span>
                    </span>
                  ))}
                </div>
              </section>

              {/* Stats */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Overview</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <p className="text-xs text-on-surface-variant font-label">Total Bookings</p>
                    <p className="text-2xl font-headline font-bold text-on-surface mt-1">{customer.totalBookings}</p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <p className="text-xs text-on-surface-variant font-label">Total Spent</p>
                    <p className="text-2xl font-headline font-bold text-primary mt-1">₱{customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-4 col-span-2">
                    <p className="text-xs text-on-surface-variant font-label">Favourite Service</p>
                    <p className="text-sm font-label font-bold text-on-surface mt-1">{customer.favoriteService}</p>
                  </div>
                </div>
              </section>

              {/* Booking history */}
              <section>
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Booking History</p>
                {bookings.length === 0 ? (
                  <p className="text-sm text-on-surface-variant text-center py-4">No bookings found.</p>
                ) : (
                  <div className="space-y-2">
                    {bookings.map((b) => (
                      <div key={b.id} className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-label font-bold text-on-surface truncate">{b.service}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{b.date} · {b.time}</p>
                          <p className="text-xs text-on-surface-variant">{b.petName} · {b.petBreed}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <StatusBadge status={b.status} />
                          <p className="text-xs font-headline font-bold text-primary">₱{b.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

            </div>
          </>
        )}
      </div>
    </>
  );
}
