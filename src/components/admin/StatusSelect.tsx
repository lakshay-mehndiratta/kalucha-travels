"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

type Status = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

const statusStyles: Record<Status, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-200",
  CONVERTED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function StatusSelect({
  enquiryId,
  currentStatus,
}: {
  enquiryId: string;
  currentStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [saving, setSaving] = useState(false);

  const handleChange = async (newStatus: Status) => {
    const previous = status;
    setStatus(newStatus);
    setSaving(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setStatus(previous);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={status}
        disabled={saving}
        onChange={(e) => handleChange(e.target.value as Status)}
        className={`text-[12px] font-semibold border rounded-lg pl-3 pr-7 py-1.5 cursor-pointer ${statusStyles[status]}`}
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="CONVERTED">Converted</option>
        <option value="CLOSED">Closed</option>
      </select>
      <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none" />
    </div>
  );
}