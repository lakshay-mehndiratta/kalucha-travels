"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteDestinationButton({
  destinationId,
  destinationName,
  disabled,
}: {
  destinationId: string;
  destinationName: string;
  disabled: boolean;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (disabled) return;
    const confirmed = window.confirm(
      `Delete "${destinationName}"? This also removes its package, itinerary, and attractions. This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/destinations/${destinationId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete.");
        setDeleting(false);
        return;
      }
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
        title={
          disabled ? "Cannot delete — existing enquiries reference this destination" : undefined
        }
        className="text-[12.5px] font-semibold text-red-600 hover:text-red-700 disabled:text-muted disabled:cursor-not-allowed"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}