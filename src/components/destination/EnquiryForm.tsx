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
    travelDate: "",
    numTravelers: 1,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          travelDate: form.travelDate,
          numTravelers: form.numTravelers,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("error");
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

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={labelClass} htmlFor="travelDate">
              Preferred Travel Date
            </label>
            <input
              id="travelDate"
              type="date"
              value={form.travelDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="numTravelers">
              Number of Travelers
            </label>
            <input
              id="numTravelers"
              type="number"
              min={1}
              max={20}
              value={form.numTravelers}
              onChange={(e) =>
                setForm({ ...form, numTravelers: Number(e.target.value) })
              }
              className={inputClass}
            />
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
      {status === "error" && (
        <p className="text-red-600 text-xs mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}