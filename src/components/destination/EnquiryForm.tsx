"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";

const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
];

const travelerFields = [
  { key: "adults", label: "Adults", hint: "18+" },
  { key: "children", label: "Children", hint: "2–17" },
  { key: "infants", label: "Infants", hint: "0–2" },
  { key: "seniors", label: "Senior Citizens", hint: "60+" },
] as const;

export default function EnquiryForm({
  packageId,
  selectedAttractionIds,
  estimatedPrice,
}: {
  packageId: string;
  selectedAttractionIds: string[];
  estimatedPrice: number;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    travelWindowStart: "",
    travelWindowEnd: "",
    adults: 2,
    children: 0,
    infants: 0,
    seniors: 0,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const handleTravelerChange = (key: (typeof travelerFields)[number]["key"], value: number) => {
    setForm({ ...form, [key]: Math.max(0, value) });
  };

  const [fieldError, setFieldError] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError("");

    if (form.adults < 1) {
      setFieldError("At least 1 adult is required per booking.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          selectedAttractionIds,
          estimatedPrice,
          name: form.name,
          email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          travelWindowStart: form.travelWindowStart,
          travelWindowEnd: form.travelWindowEnd,
          adults: form.adults,
          children: form.children,
          infants: form.infants,
          seniors: form.seniors,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setFieldError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setFieldError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#fdece2] border border-orange/30 rounded-brand px-6 py-8 text-center">
        <p className="text-navy font-semibold mb-1">Thank you, {form.name}!</p>
        <p className="text-[13.5px] text-muted">
          Your enquiry has been received. Our team will get in touch with you
          shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-line rounded-lg px-3.5 py-2.5 text-sm";
  const labelClass = "block text-[12.5px] font-semibold text-navy mb-1.5";

  const totalTravelers = form.adults + form.children + form.infants + form.seniors;

  const todayStr = new Date().toISOString().split("T")[0];
  const oneYearFromNowStr = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split("T")[0];
  })();

  const maxLatestDate = (() => {
    if (!form.travelWindowStart) return oneYearFromNowStr;
    const d = new Date(form.travelWindowStart);
    d.setDate(d.getDate() + 14);
    const capped = d.toISOString().split("T")[0];
    return capped < oneYearFromNowStr ? capped : oneYearFromNowStr;
  })();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-line rounded-brand p-6"
    >
      <h4 className="text-lg text-navy mb-4">Enquire About This Package</h4>
      <div className="space-y-3.5 mb-1">
        <div>
          <label className={labelClass} htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            required
            placeholder="e.g. Ankit Sharma"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone Number
          </label>
          <div className="flex gap-2">
            <select
              value={form.countryCode}
              onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
              className="border border-line rounded-lg px-2 py-2.5 text-sm bg-white shrink-0"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              id="phone"
              required
              type="tel"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              value={form.phone}
              maxLength={10}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Preferred Travel Window</label>
          <p className="text-[11.5px] text-muted mb-2">
            Give us your earliest and latest options — any 3–4 consecutive
            days within this window works.
          </p>
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] text-muted mb-1" htmlFor="travelWindowStart">
                Earliest Date
              </label>
              <input
                id="travelWindowStart"
                type="date"
                value={form.travelWindowStart}
                min={todayStr}
                max={oneYearFromNowStr}
                onChange={(e) =>
                  setForm({ ...form, travelWindowStart: e.target.value, travelWindowEnd: "" })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[11px] text-muted mb-1" htmlFor="travelWindowEnd">
                Latest Date
              </label>
              <input
                id="travelWindowEnd"
                type="date"
                value={form.travelWindowEnd}
                min={form.travelWindowStart || todayStr}
                max={maxLatestDate}
                disabled={!form.travelWindowStart}
                onChange={(e) => setForm({ ...form, travelWindowEnd: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Travelers{" "}
            <span className="font-normal text-muted normal-case">
              ({totalTravelers} total)
            </span>
          </label>
          <div className="border border-line rounded-lg divide-y divide-line overflow-hidden">
            {travelerFields.map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between px-3.5 py-2.5"
              >
                <div>
                  <div className="text-[13.5px] text-navy font-medium">
                    {field.label}
                  </div>
                  <div className="text-[11px] text-muted">{field.hint}</div>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={form[field.key]}
                  onChange={(e) =>
                    handleTravelerChange(field.key, Number(e.target.value))
                  }
                  className="w-16 border border-line rounded-lg px-2 py-1.5 text-sm text-center"
                />
                {field.key === "adults" && form.adults < 1 && (
                  <p className="text-red-600 text-[11px] mt-1">Required — at least 1</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="message">
            Anything Else We Should Know?
          </label>
          <textarea
            id="message"
            placeholder="Special requests, questions about the itinerary, dietary needs, etc."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} min-h-20`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-orange text-white font-semibold rounded-full py-3.5 mt-4 hover:bg-orange-dark transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Enquiry →"}
      </button>
      {fieldError && (
        <p className="text-red-600 text-xs mt-2">{fieldError}</p>
      )}
    </form>
  );
}