"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { SERVICES, type Service, type ServiceCategory } from "../lib/dashboard-data";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  grooming: "Grooming",
  vet: "Vet & Health",
  boarding: "Boarding & Daycare",
};

const ICON_OPTIONS = [
  "water_drop", "content_cut", "handyman", "air", "dentistry",
  "stethoscope", "vaccines", "medical_services", "wb_sunny", "nights_stay",
  "spa", "favorite",
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [searchQ, setSearchQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ duration: "", price: "" });
  const [newService, setNewService] = useState({
    name: "",
    category: "grooming" as ServiceCategory,
    icon: "spa",
    duration: "",
    price: "",
    description: "",
  });

  function toggleActive(id: string) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setEditForm({ duration: String(service.duration), price: String(service.price) });
  }

  function handleSaveEdit(id: string) {
    if (!editForm.duration || !editForm.price) return;
    setServices((prev) =>
      prev.map((s) => s.id === id ? { ...s, duration: Number(editForm.duration), price: Number(editForm.price) } : s)
    );
    setEditingId(null);
  }

  function handleAdd() {
    if (!newService.name || !newService.duration || !newService.price) return;
    const service: Service = {
      id: `sv${Date.now()}`,
      name: newService.name,
      category: newService.category,
      icon: newService.icon,
      duration: Number(newService.duration),
      price: Number(newService.price),
      active: true,
      description: newService.description,
    };
    setServices((prev) => [...prev, service]);
    setAddOpen(false);
    setNewService({ name: "", category: "grooming", icon: "spa", duration: "", price: "", description: "" });
  }

  return (
    <>
      <DashboardHeader title="Services" breadcrumb="Provider Portal" onSearch={setSearchQ} />

      <main className="px-8 py-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">
              Service Catalogue
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Manage your offered services and pricing
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-5 py-2.5 rounded-full font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Service
          </button>
        </div>

        {/* Category Sections */}
        {(["grooming", "vet", "boarding"] as ServiceCategory[]).map(
          (category) => {
            const categoryServices = services.filter(
              (s) => s.category === category &&
                (!searchQ.trim() || s.name.toLowerCase().includes(searchQ.toLowerCase()) || s.description.toLowerCase().includes(searchQ.toLowerCase()))
            );
            if (categoryServices.length === 0) return null;
            return (
              <div key={category} className="mb-10">
                <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                  {CATEGORY_LABELS[category]}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all duration-200 editorial-shadow"
                    >
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span
                              className="material-symbols-outlined text-primary text-xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {service.icon}
                            </span>
                          </div>
                          <p className="font-headline font-bold text-sm text-on-surface leading-tight">
                            {service.name}
                          </p>
                        </div>

                        {/* Toggle Switch */}
                        <button
                          onClick={() => toggleActive(service.id)}
                          className={`relative w-10 h-6 rounded-full transition-all flex-shrink-0 active:scale-95 ${
                            service.active ? "bg-primary" : "bg-surface-container-highest"
                          }`}
                          title={service.active ? "Deactivate" : "Activate"}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                              service.active ? "left-5" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                        {service.description}
                      </p>

                      {/* Meta Row */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-outline-variant/10 gap-2">
                        {editingId === service.id ? (
                          <>
                            <div className="flex items-center gap-1.5 flex-1">
                              <span className="material-symbols-outlined text-on-surface-variant text-base">schedule</span>
                              <input
                                type="number"
                                value={editForm.duration}
                                onChange={(e) => setEditForm((p) => ({ ...p, duration: e.target.value }))}
                                className="w-16 py-1 px-2 text-sm rounded-lg border border-outline-variant/30 bg-surface-container-low focus:border-primary focus:outline-none font-label font-bold text-on-surface"
                                min="1"
                              />
                              <span className="text-xs text-on-surface-variant font-label">min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-label font-bold text-on-surface-variant">₱</span>
                              <input
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm((p) => ({ ...p, price: e.target.value }))}
                                className="w-20 py-1 px-2 text-sm rounded-lg border border-outline-variant/30 bg-surface-container-low focus:border-primary focus:outline-none font-headline font-bold text-primary"
                                min="0"
                              />
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button
                                onClick={() => handleSaveEdit(service.id)}
                                className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 active:scale-95 transition-all"
                              >
                                <span className="material-symbols-outlined text-sm">check</span>
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high active:scale-95 transition-all"
                              >
                                <span className="material-symbols-outlined text-sm">close</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 text-sm font-label font-bold text-on-surface">
                              <span className="material-symbols-outlined text-on-surface-variant text-base">
                                schedule
                              </span>
                              {service.duration} min
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="font-headline font-bold text-sm text-primary">
                                ₱{service.price.toLocaleString()}
                              </p>
                              <button
                                onClick={() => startEdit(service)}
                                className="w-7 h-7 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high active:scale-95 transition-all"
                                title="Edit price & duration"
                              >
                                <span className="material-symbols-outlined text-sm">edit</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}

      </main>

      {/* Add Service Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
            onClick={() => setAddOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-7 py-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                New Service
              </h3>
              <button
                onClick={() => setAddOpen(false)}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-base">
                  close
                </span>
              </button>
            </div>

            <div className="px-7 py-6 space-y-5">
              {/* Name */}
              <div>
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Service Name
                </label>
                <input
                  value={newService.name}
                  onChange={(e) =>
                    setNewService((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Full Bath & Silk Cut"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Category
                </label>
                <div className="flex gap-2">
                  {(["grooming", "vet", "boarding"] as ServiceCategory[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() =>
                          setNewService((p) => ({ ...p, category: cat }))
                        }
                        className={`flex-1 py-2.5 rounded-xl font-label font-bold text-sm transition-all active:scale-95 ${
                          newService.category === cat
                            ? "bg-primary text-on-primary shadow shadow-primary/20"
                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                      >
                        {CATEGORY_LABELS[cat]}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Duration + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                    Duration
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={newService.duration}
                      onChange={(e) =>
                        setNewService((p) => ({ ...p, duration: e.target.value }))
                      }
                      placeholder="60"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 pr-12 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-label font-bold text-on-surface-variant">
                      min
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-label font-bold text-on-surface-variant">
                      ₱
                    </span>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService((p) => ({ ...p, price: e.target.value }))
                      }
                      placeholder="850"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-8 pr-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) =>
                    setNewService((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe this service…"
                  rows={3}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                />
              </div>

              {/* Icon Picker */}
              <div>
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
                  Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() =>
                        setNewService((p) => ({ ...p, icon }))
                      }
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                        newService.icon === icon
                          ? "bg-primary text-on-primary shadow shadow-primary/20"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-7 py-5 border-t border-outline-variant/10 flex gap-3">
              <button
                onClick={() => setAddOpen(false)}
                className="flex-1 border border-outline-variant/30 text-on-surface-variant rounded-full py-3 font-label font-bold text-sm hover:border-primary hover:text-primary transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full py-3 font-label font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
