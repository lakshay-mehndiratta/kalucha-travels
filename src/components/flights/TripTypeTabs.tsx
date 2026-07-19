"use client";

const tripTypes = [
  { value: "ONE_WAY", label: "One Way" },
  { value: "ROUND_TRIP", label: "Round Trip" },
  { value: "MULTI_CITY", label: "Multi City" },
] as const;

export type TripType = (typeof tripTypes)[number]["value"];

export default function TripTypeTabs({
  value,
  onChange,
}: {
  value: TripType;
  onChange: (t: TripType) => void;
}) {
  return (
    <div className="inline-flex bg-white border border-line rounded-full p-1">
      {tripTypes.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            value === t.value ? "bg-orange text-white" : "text-navy hover:bg-cream"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}