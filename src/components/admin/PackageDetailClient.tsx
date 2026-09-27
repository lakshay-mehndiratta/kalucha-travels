"use client";

import { useState } from "react";
import PackageForm, { PackageData } from "./PackageForm";
import DeletePackageButton from "./DeletePackageButton";

export default function PackageDetailClient({
  destinationId,
  destinationName,
  initialPackage,
  enquiryCount,
}: {
  destinationId: string;
  destinationName: string;
  initialPackage: PackageData;
  enquiryCount: number;
}) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [pkg, setPkg] = useState(initialPackage);

  if (mode === "edit") {
    return (
      <div>
        <button
          onClick={() => setMode("view")}
          className="text-[12.5px] font-semibold text-muted hover:text-navy mb-4"
        >
          ← Cancel
        </button>
        <PackageForm
          mode="edit"
          destinationId={destinationId}
          initialData={pkg}
          onSaved={(updated) => {
            setPkg(updated);
            setMode("view");
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-5">
      <p className="text-sm text-muted -mt-2">
        Package under <span className="font-semibold text-navy">{destinationName}</span>
      </p>

      <div className="bg-white border border-line rounded-brand p-5">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <h2 className="text-xl text-navy">{pkg.name}</h2>
            <p className="text-[12px] text-muted mt-0.5">/{pkg.slug}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMode("edit")}
              className="text-[12.5px] font-semibold text-navy border border-line rounded-full px-3.5 py-1.5 hover:bg-cream transition-colors"
            >
              Edit Details
            </button>
            <DeletePackageButton packageId={pkg.id} packageName={pkg.name} disabled={enquiryCount > 0} />
          </div>
        </div>

        {pkg.image && (
          <div className="relative h-40 rounded-lg overflow-hidden border border-line mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3.5 mb-4">
          <div>
            <div className="text-[11px] text-muted uppercase tracking-wide mb-1">Duration</div>
            <div className="text-sm text-navy font-medium">
              {pkg.durationDays}D / {pkg.durationNights}N
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted uppercase tracking-wide mb-1">Base Price</div>
            <div className="text-sm text-navy font-medium">₹{pkg.basePrice.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div className="text-[11px] text-muted uppercase tracking-wide mb-1">Enquiries</div>
            <div className="text-sm text-navy font-medium">{enquiryCount}</div>
          </div>
        </div>

        <div>
          <div className="text-[11px] text-muted uppercase tracking-wide mb-2">Included Services</div>
          <div className="flex flex-wrap gap-2">
            {pkg.includedServices.map((s) => (
              <span key={s} className="bg-[#fdece2] text-orange-dark text-[12px] font-medium px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-line rounded-brand p-5">
        <div className="text-[11px] text-muted uppercase tracking-wide mb-3">Itinerary</div>
        <div className="space-y-3">
          {pkg.itinerary.map((day, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                D{i + 1}
              </div>
              <div>
                <div className="text-[14px] text-navy font-medium">{day.title}</div>
                <div className="text-[13px] text-muted">{day.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-line rounded-brand p-5">
        <div className="text-[11px] text-muted uppercase tracking-wide mb-3">Attractions</div>
        <div className="space-y-3">
          {pkg.attractions.map((a) => (
            <div key={a.id} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.image} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0 border border-line" />
              <div className="flex-1">
                <div className="text-[13.5px] text-navy font-medium">{a.name}</div>
                <div className="text-[12px] text-muted">{a.description}</div>
              </div>
              <span className="text-[12.5px] text-muted">₹{a.price.toLocaleString("en-IN")}</span>
              {a.includedByDefault && (
                <span className="text-[10.5px] bg-[#fdece2] text-orange-dark px-2 py-0.5 rounded-full font-semibold">
                  Included
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}