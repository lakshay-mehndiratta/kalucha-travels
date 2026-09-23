"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { countryCodes } from "@/lib/countryCodes";
import { FaChevronDown } from "react-icons/fa6";

export default function PhoneInput({
  dialCode,
  onDialCodeChange,
  number,
  onNumberChange,
  id,
}: {
  dialCode: string;
  onDialCodeChange: (dial: string) => void;
  number: string;
  onNumberChange: (digits: string) => void;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected =
    countryCodes.find((c) => c.dial === dialCode) ??
    countryCodes.find((c) => c.iso2 === "IN")!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countryCodes;
    return countryCodes.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q)
    );
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-2">
      <div className="relative shrink-0" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 border border-line rounded-lg pl-2.5 pr-2 py-2.5 text-sm bg-white h-full"
        >
          <span>{selected.flag}</span>
          <span className="text-navy font-medium">{selected.dial}</span>
          <FaChevronDown className="text-[10px] text-muted" />
        </button>

        {open && (
          <div className="absolute z-30 mt-1 w-72 bg-white border border-line rounded-lg shadow-lg">
            <div className="p-2 border-b border-line">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="w-full border border-line rounded-md px-2.5 py-1.5 text-sm"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((c) => (
                <button
                  key={c.iso2}
                  type="button"
                  onClick={() => {
                    onDialCodeChange(c.dial);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-cream transition-colors flex items-center gap-2.5 text-[13px]"
                >
                  <span>{c.flag}</span>
                  <span className="flex-1 text-navy">{c.name}</span>
                  <span className="text-muted">{c.dial}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-4 text-[13px] text-muted text-center">
                  No matches
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <input
        id={id}
        required
        type="tel"
        inputMode="numeric"
        maxLength={10}
        placeholder="10-digit mobile number"
        value={number}
        onChange={(e) => onNumberChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        className="flex-1 border border-line rounded-lg px-3.5 py-2.5 text-sm"
      />
    </div>
  );
}