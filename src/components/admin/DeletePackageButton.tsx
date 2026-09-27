"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePackageButton({
  packageId,
  packageName,
  disabled,
}: {
  packageId: string;
  packageName: string;
  disabled: boolean;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (disabled) return;
    const confirmed = window.confirm(
      `Delete "${packageName}"? This also removes its itinerary and attractions. This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/packages/${packageId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete.");
        setDeleting(false);
        return;
      }
      router.push("/admin/destinations/manage");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="inline-block">
      <button
        onClick={handleDelete}
        disabled={disabled || deleting}
        title={disabled ? "Cannot delete — existing enquiries reference this package" : undefined}
        className="text-[12.5px] font-semibold text-red-600 hover:text-red-700 disabled:text-muted disabled:cursor-not-allowed"
      >
        {deleting ? "Deleting..." : "Remove Package"}
      </button>
      {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}