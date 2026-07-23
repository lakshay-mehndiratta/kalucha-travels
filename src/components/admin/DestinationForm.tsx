"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";

type Attraction = {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  includedByDefault: boolean;
};

type ItineraryRow = { title: string; description: string };

type DestinationWithPackage = {
  id: string;
  name: string;
  slug: string;
  country: string;
  heroImage: string;
  shortDescription: string;
  packages: {
    id: string;
    name: string;
    durationDays: number;
    durationNights: number;
    basePrice: number;
    includedServices: string[];
    itinerary: { title: string; description: string }[];
    attractions: Attraction[];
  }[];
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function DestinationForm({
  mode,
  destination,
}: {
  mode: "create" | "edit";
  destination?: DestinationWithPackage;
}) {
  const router = useRouter();
  const pkg = destination?.packages[0];

  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [form, setForm] = useState({
    name: destination?.name ?? "",
    slug: destination?.slug ?? "",
    country: destination?.country ?? "",
    heroImage: destination?.heroImage ?? "",
    shortDescription: destination?.shortDescription ?? "",
    packageName: pkg?.name ?? "",
    durationDays: pkg?.durationDays ?? 5,
    durationNights: pkg?.durationNights ?? 4,
    basePrice: pkg?.basePrice ?? 0,
  });
  const [includedServices, setIncludedServices] = useState<string[]>(
    pkg?.includedServices ?? []
  );
  const [serviceInput, setServiceInput] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryRow[]>(
    pkg?.itinerary.map((d) => ({ title: d.title, description: d.description })) ?? [
      { title: "", description: "" },
    ]
  );
  const [attractions, setAttractions] = useState<Attraction[]>(
    pkg?.attractions ?? [
      { name: "", description: "", price: 0, image: "", includedByDefault: true },
    ]
  );

  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const inputClass = "w-full border border-line rounded-lg px-3.5 py-2.5 text-sm";
  const labelClass = "block text-[12.5px] font-semibold text-navy mb-1.5";

  const handleNameChange = (value: string) => {
    setForm((f) => ({
      ...f,
      name: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setIncludedServices((s) => [...s, serviceInput.trim()]);
      setServiceInput("");
    }
  };
  const removeService = (i: number) =>
    setIncludedServices((s) => s.filter((_, idx) => idx !== i));

  const addItineraryDay = () => setItinerary((d) => [...d, { title: "", description: "" }]);
  const removeItineraryDay = (i: number) => {
    if (itinerary.length <= 1) return;
    setItinerary((d) => d.filter((_, idx) => idx !== i));
  };
  const updateItineraryDay = (i: number, patch: Partial<ItineraryRow>) =>
    setItinerary((d) => d.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const addAttraction = () =>
    setAttractions((a) => [
      ...a,
      { name: "", description: "", price: 0, image: "", includedByDefault: false },
    ]);
  const removeAttraction = (i: number) => {
    if (attractions.length <= 1) return;
    setAttractions((a) => a.filter((_, idx) => idx !== i));
  };
  const updateAttraction = (i: number, patch: Partial<Attraction>) =>
    setAttractions((a) => a.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (includedServices.length === 0) return setError("Add at least one included service.");
    if (itinerary.some((d) => !d.title || !d.description))
      return setError("Every itinerary day needs a title and description.");
    if (attractions.some((a) => !a.name || !a.description || !a.image))
      return setError("Every attraction needs a name, description, and image URL.");

    const payload = {
      name: form.name,
      slug: form.slug,
      country: form.country,
      heroImage: form.heroImage,
      shortDescription: form.shortDescription,
      package: {
        name: form.packageName,
        durationDays: Number(form.durationDays),
        durationNights: Number(form.durationNights),
        basePrice: Number(form.basePrice),
        includedServices,
        itinerary,
        attractions,
      },
    };

    setStatus("submitting");
    try {
      const url =
        mode === "create"
          ? "/api/admin/destinations"
          : `/api/admin/destinations/${destination!.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      router.push("/admin/destinations/manage");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="bg-white border border-line rounded-brand p-5 space-y-3.5">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-1">
          Destination Details
        </h3>
        <div>
          <label className={labelClass}>Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug (URL: /destinations/{form.slug || "..."})</label>
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: slugify(e.target.value) });
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input
            required
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Hero Image URL</label>
          <input
            required
            type="url"
            placeholder="https://..."
            value={form.heroImage}
            onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Short Description</label>
          <textarea
            required
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            className={`${inputClass} min-h-[70px]`}
          />
        </div>
      </div>

      <div className="bg-white border border-line rounded-brand p-5 space-y-3.5">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-1">
          Package Details
        </h3>
        <div>
          <label className={labelClass}>Package Name</label>
          <input
            required
            value={form.packageName}
            onChange={(e) => setForm({ ...form, packageName: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-3 gap-3.5">
          <div>
            <label className={labelClass}>Days</label>
            <input
              required
              type="number"
              min={1}
              value={form.durationDays}
              onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Nights</label>
            <input
              required
              type="number"
              min={0}
              value={form.durationNights}
              onChange={(e) => setForm({ ...form, durationNights: Number(e.target.value) })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Base Price (₹)</label>
            <input
              required
              type="number"
              min={0}
              max={1e8}
              step={100}
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Included Services</label>
          <div className="flex gap-2 mb-2">
            <input
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addService();
                }
              }}
              placeholder="e.g. Return Flights"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addService}
              className="shrink-0 bg-navy text-white text-sm font-semibold px-4 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {includedServices.map((s, i) => (
              <span
                key={i}
                className="bg-[#fdece2] text-orange-dark text-[13px] font-medium pl-3.5 pr-2 py-1.5 rounded-full flex items-center gap-1.5"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeService(i)}
                  className="text-orange-dark/70 hover:text-orange-dark"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide">Itinerary</h3>
        {itinerary.map((day, i) => (
          <div key={i} className="bg-white border border-line rounded-brand p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-navy">Day {i + 1}</span>
              {itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItineraryDay(i)}
                  className="text-[12px] text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2.5">
              <input
                required
                placeholder="Title"
                value={day.title}
                onChange={(e) => updateItineraryDay(i, { title: e.target.value })}
                className={inputClass}
              />
              <textarea
                required
                placeholder="Description"
                value={day.description}
                onChange={(e) => updateItineraryDay(i, { description: e.target.value })}
                className={`${inputClass} min-h-[60px]`}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItineraryDay}
          className="w-full border-2 border-dashed border-line rounded-brand py-3 text-[13px] font-semibold text-orange-dark hover:border-orange transition-colors"
        >
          + Add Day
        </button>
      </div>

      <div className="space-y-3.5">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide">Attractions</h3>
        {attractions.map((attraction, i) => (
          <div key={attraction.id ?? `new-${i}`} className="bg-white border border-line rounded-brand p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-navy">Attraction {i + 1}</span>
              {attractions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAttraction(i)}
                  className="text-[12px] text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2.5">
              <input
                required
                placeholder="Name"
                value={attraction.name}
                onChange={(e) => updateAttraction(i, { name: e.target.value })}
                className={inputClass}
              />
              <textarea
                required
                placeholder="Description"
                value={attraction.description}
                onChange={(e) => updateAttraction(i, { description: e.target.value })}
                className={`${inputClass} min-h-[50px]`}
              />
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={labelClass}>Price (₹)</label>
                  <input
                    required
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={1e8}
                    step={100}
                    placeholder="e.g. 2500"
                    value={attraction.price === 0 ? "" : attraction.price}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/^0+(?=\d)/, "");
                      if (raw === "") {
                        updateAttraction(i, { price: 0 });
                        return;
                      }
                      const num = Math.min(Number(raw), 1e8);
                      updateAttraction(i, { price: num });
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Image URL</label>
                  <input
                    required
                    type="url"
                    placeholder="https://..."
                    value={attraction.image}
                    onChange={(e) => updateAttraction(i, { image: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-[13px] text-navy">
                <input
                  type="checkbox"
                  checked={attraction.includedByDefault}
                  onChange={(e) =>
                    updateAttraction(i, { includedByDefault: e.target.checked })
                  }
                  className="w-4 h-4 accent-orange"
                />
                Included by default (locked, not an optional add-on)
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAttraction}
          className="w-full border-2 border-dashed border-line rounded-brand py-3 text-[13px] font-semibold text-orange-dark hover:border-orange transition-colors"
        >
          + Add Attraction
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-orange text-white font-semibold rounded-full py-3.5 hover:bg-orange-dark transition-colors disabled:opacity-60"
      >
        {status === "submitting"
          ? "Saving..."
          : mode === "create"
          ? "Create Destination"
          : "Save Changes"}
      </button>
    </form>
  );
}