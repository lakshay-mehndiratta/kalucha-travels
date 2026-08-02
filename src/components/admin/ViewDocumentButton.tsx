"use client";

import { useState } from "react";

export default function ViewDocumentButton({
  documentId,
  label,
}: {
  documentId: string;
  label: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleView = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/visa-documents/${documentId}/signed-url`);
      const data = await res.json();
      if (data.url) window.open(data.url, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
  onClick={handleView}
  disabled={loading}
  className="w-fit text-left text-[12px] font-semibold text-orange-dark hover:underline disabled:opacity-50"
>
  {loading ? "Loading..." : label}
</button>
  );
}