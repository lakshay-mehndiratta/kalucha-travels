"use client";

import { FaChevronDown } from "react-icons/fa6";

const classes = [
  { value: "ECONOMY", label: "Economy" },
  { value: "PREMIUM_ECONOMY", label: "Premium Economy" },
  { value: "BUSINESS", label: "Business" },
  { value: "FIRST", label: "First Class" },
] as const;

export type TravelClass = (typeof classes)[number]["value"];

export type Travelers = {
  adults: number;
  children: number;
  infants: number;
};

export default function TravelersClassPicker({
  travelers,
  onTravelersChange,
  travelClass,
  onClassChange,
}: {
  travelers: Travelers;
  onTravelersChange: (t: Travelers) => void;
  travelClass: TravelClass;
  onClassChange: (c: TravelClass) => void;
}) {
  const total = travelers.adults + travelers.children + travelers.infants;

  const fields: { key: keyof Travelers; label: string; hint: string; min: number }[] = [
    { key: "adults", label: "Adults", hint: "12+ yrs", min: 1 },
    { key: "children", label: "Children", hint: "2–11 yrs", min: 0 },
    { key: "infants", label: "Infants", hint: "Under 2 yrs", min: 0 },
  ];

  const update = (key: keyof Travelers, delta: number) => {
    const field = fields.find((f) => f.key === key)!;
    const next = Math.max(field.min, Math.min(9, travelers[key] + delta));
    onTravelersChange({ ...travelers, [key]: next });
  };

  return (
    <div className="bg-white border border-line rounded-brand p-5">
      <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-3.5">
        Travellers &amp; Class ({total} total)
      </h4>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        {fields.map((f) => (
          <div key={f.key} className="border border-line rounded-lg px-2 sm:px-3 py-2.5">
            <div className="text-[13px] text-navy font-medium">{f.label}</div>
            <div className="text-[11px] text-muted mb-2">{f.hint}</div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => update(f.key, -1)}
                className="w-7 h-7 rounded-full border border-line text-navy hover:bg-cream flex items-center justify-center"
              >
                −
              </button>
              <span className="text-sm font-semibold text-navy">{travelers[f.key]}</span>
              <button
                type="button"
                onClick={() => update(f.key, 1)}
                className="w-7 h-7 rounded-full border border-line text-navy hover:bg-cream flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-[12.5px] font-semibold text-navy mb-1.5">
          Travel Class
        </label>
        <div className="relative">
          <select
            value={travelClass}
            onChange={(e) => onClassChange(e.target.value as TravelClass)}
            className="w-full border border-line rounded-lg pl-3.5 pr-9 py-2.5 text-sm bg-white cursor-pointer"
          >
            {classes.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted pointer-events-none" />
        </div>
      </div>
    </div>
  );
}