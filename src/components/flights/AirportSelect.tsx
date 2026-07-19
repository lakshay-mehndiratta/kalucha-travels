"use client";

import { useEffect, useRef, useState } from "react";

export type Airport = {
  code: string;
  city: string;
  name: string;
  country: string;
};

export default function AirportSelect({
  label,
  value,
  onChange,
  placeholder = "City or airport",
}: {
  label: string;
  value: Airport | null;
  onChange: (airport: Airport) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(value ? `${value.city} (${value.code})` : "");
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value ? `${value.city} (${value.code})` : "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    if (value && query === `${value.city} (${value.code})`) return;

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(
            query
          )}&locale=en&types[]=airport&types[]=city`
        );
        const data = await res.json();

        // NOTE: verify these field names with a console.log(data) on first real test —
        // mapped from Travelpayouts' documented example response.
        const airports: Airport[] = data
          .filter((item: Record<string, unknown>) => item.code)
          .map((item: Record<string, string>) => ({
            code: item.code,
            city: item.type === "city" ? item.name : item.city_name ?? item.name,
            name: item.type === "airport" ? item.name : item.main_airport_name ?? item.name,
            country: item.country_name,
          }));
        setResults(airports.slice(0, 8));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, value]);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-[12.5px] font-semibold text-navy mb-1.5">
        {label}
      </label>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full border border-line rounded-lg px-3.5 py-2.5 text-sm"
        autoComplete="off"
      />
      {open && (loading || results.length > 0) && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-line rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {loading && (
            <div className="px-3.5 py-2.5 text-[13px] text-muted">Searching...</div>
          )}
          {!loading &&
            results.map((airport) => (
              <button
                key={`${airport.code}-${airport.name}`}
                type="button"
                onClick={() => {
                  onChange(airport);
                  setQuery(`${airport.city} (${airport.code})`);
                  setOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 hover:bg-cream transition-colors border-b border-line last:border-b-0"
              >
                <div className="text-[13.5px] text-navy font-medium">
                  {airport.city}{" "}
                  <span className="text-muted font-normal">({airport.code})</span>
                </div>
                <div className="text-[11.5px] text-muted">
                  {airport.name}, {airport.country}
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}