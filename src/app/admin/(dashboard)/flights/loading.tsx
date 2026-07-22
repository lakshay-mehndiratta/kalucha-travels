export default function FlightEnquiriesLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-56 bg-line rounded mb-6" />

      <div className="flex items-center justify-between mb-5">
        <div className="h-4 w-32 bg-line rounded" />
        <div className="h-10 w-36 bg-line rounded-lg" />
      </div>

      <div className="flex gap-2 mb-5">
        {["All", "New", "Contacted", "Converted", "Closed"].map((label) => (
          <div key={label} className="h-9 w-20 bg-line rounded-full" />
        ))}
      </div>

      <div className="bg-white border border-line rounded-brand overflow-hidden">
        <div className="grid grid-cols-8 gap-4 bg-[#f3ede4] px-5 py-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 bg-line rounded" />
          ))}
        </div>

        {Array.from({ length: 5 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-8 gap-4 px-5 py-5 border-t border-line"
          >
            <div className="space-y-2">
              <div className="h-3.5 w-24 bg-line rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-28 bg-line rounded" />
              <div className="h-3 w-20 bg-line/70 rounded" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-16 bg-line rounded" />
              <div className="h-3 w-16 bg-line/70 rounded" />
            </div>
            <div className="h-3.5 w-14 bg-line rounded" />
            <div className="h-3.5 w-16 bg-line rounded" />
            <div className="h-3.5 w-20 bg-line rounded" />
            <div className="h-7 w-24 bg-line rounded-full" />
            <div className="h-3.5 w-16 bg-line rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}