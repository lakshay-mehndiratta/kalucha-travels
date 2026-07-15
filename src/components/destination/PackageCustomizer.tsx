"use client";

import { useMemo, useState } from "react";
import EnquiryForm from "./EnquiryForm";

type Attraction = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  includedByDefault: boolean;
};

export default function PackageCustomizer({
  packageId,
  basePrice,
  attractions,
}: {
  packageId: string;
  basePrice: number;
  attractions: Attraction[];
}) {
  const defaultAttractions = attractions.filter((a) => a.includedByDefault);
  const optionalAttractions = attractions.filter((a) => !a.includedByDefault);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const estimatedPrice = useMemo(() => {
    const defaultsTotal = defaultAttractions.reduce((sum, a) => sum + a.price, 0);
    const extrasTotal = optionalAttractions
      .filter((a) => selectedIds.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return basePrice + defaultsTotal + extrasTotal;
  }, [selectedIds, defaultAttractions, optionalAttractions, basePrice]);

  return (
    <div>
      <h3 className="text-2xl text-navy mb-4">Customize Your Package</h3>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-navy mb-2.5 uppercase tracking-wide">
          Included
        </h4>
        <div className="space-y-2.5">
          {defaultAttractions.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3 opacity-90"
            >
              <input type="checkbox" checked disabled className="w-4 h-4 accent-orange" />
              <span className="flex-1 text-[14px] text-navy font-medium">{a.name}</span>
              <span className="text-[13px] text-muted">
                ₹{a.price.toLocaleString("en-IN")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-navy mb-2.5 uppercase tracking-wide">
          Optional Add-ons
        </h4>
        <div className="space-y-2.5">
          {optionalAttractions.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3 cursor-pointer hover:border-orange transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(a.id)}
                onChange={() => toggle(a.id)}
                className="w-4 h-4 accent-orange"
              />
              <span className="flex-1 text-[14px] text-navy font-medium">{a.name}</span>
              <span className="text-[13px] text-muted">
                + ₹{a.price.toLocaleString("en-IN")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-navy text-white rounded-brand px-6 py-5 flex items-center justify-between mb-6">
        <span className="text-sm text-[#d7dee1]">Estimated Price (per person)</span>
        <span className="text-2xl font-serif font-bold text-orange">
          ₹{estimatedPrice.toLocaleString("en-IN")}
        </span>
      </div>

      <EnquiryForm
        packageId={packageId}
        selectedAttractionIds={selectedIds}
        estimatedPrice={estimatedPrice}
      />
    </div>
  );
}