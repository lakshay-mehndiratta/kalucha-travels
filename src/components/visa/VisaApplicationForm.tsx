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

const visaTypes = ["Tourist", "Student", "Work", "Business", "Transit"];

export default function VisaApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    destinationCountry: "",
    visaType: "Tourist",
    travelDate: "",
    message: "",
  });
  const [files, setFiles] = useState<{
    passportScan: File | null;
    photo: File | null;
    supportingDocument: File | null;
  }>({ passportScan: null, photo: null, supportingDocument: null });

  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const inputClass = "w-full border border-line rounded-lg px-3.5 py-2.5 text-sm";
  const labelClass = "block text-[12.5px] font-semibold text-navy mb-1.5";

  const handleFileChange = (key: keyof typeof files, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setError(`${file.name} is over 5MB — please choose a smaller file.`);
      return;
    }
    setError("");
    setFiles((f) => ({ ...f, [key]: file }));
  };

  const oneYearFromNowStr = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split("T")[0];
  })();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!files.passportScan || !files.photo) {
      setError("Passport Scan and Photo are both required.");
      return;
    }

    const body = new FormData();
    body.append("name", form.name);
    body.append("email", form.email);
    body.append("phone", `${form.countryCode} ${form.phone}`);
    body.append("destinationCountry", form.destinationCountry);
    body.append("visaType", form.visaType);
    if (form.travelDate) body.append("travelDate", form.travelDate);
    if (form.message) body.append("message", form.message);
    body.append("passportScan", files.passportScan);
    body.append("photo", files.photo);
    if (files.supportingDocument) body.append("supportingDocument", files.supportingDocument);

    setStatus("submitting");
    try {
      const res = await fetch("/api/visa-applications", { method: "POST", body });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#fdece2] border border-orange/30 rounded-brand px-6 py-10 text-center max-w-xl mx-auto">
        <p className="text-navy font-semibold text-lg mb-1">Thank you, {form.name}!</p>
        <p className="text-[14px] text-muted">
          Your visa application has been received. Our team will review your documents and
          get in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
      <div className="bg-white border border-line rounded-brand p-5 space-y-3.5">
        <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-1">
          Applicant Details
        </h4>
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
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
              required
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
              }
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-line rounded-brand p-5 space-y-3.5">
        <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-1">
          Visa Details
        </h4>
        <div>
          <label className={labelClass}>Destination Country</label>
          <input
            required
            placeholder="e.g. United Arab Emirates"
            value={form.destinationCountry}
            onChange={(e) => setForm({ ...form, destinationCountry: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className={labelClass}>Visa Type</label>
            <select
              value={form.visaType}
              onChange={(e) => setForm({ ...form, visaType: e.target.value })}
              className={`${inputClass} bg-white`}
            >
              {visaTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Intended Travel Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              max={oneYearFromNowStr}
              value={form.travelDate}
              onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-line rounded-brand p-5 space-y-3.5">
        <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-3">
          Upload Documents
        </h4>

        <p className="text-[12px] text-muted -mt-2">
          PDF, JPG, or PNG — up to 5MB each. Kept securely and deleted automatically
          after 60 days.
        </p>

        {/* Passport */}
        <div>
          <label className={labelClass}>Passport Scan *</label>

          <label
            htmlFor="passportScan"
            className="mt-1 flex items-center justify-between rounded-lg border border-line px-4 py-3 cursor-pointer hover:border-orange transition-colors"
          >
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium
              border border-line rounded-lg
              bg-white text-navy
              hover:bg-[#f8f6f2]
              transition-colors cursor-pointer"
            >
              Choose File
            </span>

            <span className="ml-4 flex-1 truncate text-right text-sm text-muted">
              {files.passportScan?.name ?? "No file selected"}
            </span>
          </label>

          <input
            id="passportScan"
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              handleFileChange("passportScan", e.target.files?.[0] ?? null)
            }
            className="hidden"
          />
        </div>

        {/* Photo */}
        <div>
          <label className={labelClass}>Passport-size Photo *</label>

          <label
            htmlFor="photo"
            className="mt-1 flex items-center justify-between rounded-lg border border-line px-4 py-3 cursor-pointer hover:border-orange transition-colors"
          >
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium
              border border-line rounded-lg
              bg-white text-navy
              hover:bg-[#f8f6f2]
              transition-colors cursor-pointer"
            >
              Choose File
            </span>

            <span className="ml-4 flex-1 truncate text-right text-sm text-muted">
              {files.photo?.name ?? "No file selected"}
            </span>
          </label>

          <input
            id="photo"
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              handleFileChange("photo", e.target.files?.[0] ?? null)
            }
            className="hidden"
          />
        </div>

        {/* Supporting Document */}
        <div>
          <label className={labelClass}>Supporting Document (optional)</label>

          <label
            htmlFor="supportingDocument"
            className="mt-1 flex items-center justify-between rounded-lg border border-line px-4 py-3 cursor-pointer hover:border-orange transition-colors"
          >
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium
              border border-line rounded-lg
              bg-white text-navy
              hover:bg-[#f8f6f2]
              transition-colors cursor-pointer"
            >
              Choose File
            </span>

            <span className="ml-4 flex-1 truncate text-right text-sm text-muted">
              {files.supportingDocument?.name ?? "No file selected"}
            </span>
          </label>

          <input
            id="supportingDocument"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              handleFileChange(
                "supportingDocument",
                e.target.files?.[0] ?? null
              )
            }
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Anything Else We Should Know?
        </label>
        <textarea
          id="message"
          placeholder="Share any additional information, special requests, previous travel history, or questions that may help us process your application."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} bg-white min-h-[90px]`}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-orange text-white font-semibold rounded-full py-3.5 hover:bg-orange-dark transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Application →"}
      </button>
    </form>
  );
}