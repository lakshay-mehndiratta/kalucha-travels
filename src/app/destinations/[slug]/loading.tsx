import Header from "@/components/layout/Header";

export default function DestinationLoading() {
  return (
    <main>
      <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] bg-navy-deep">
        <Header />
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 pb-8 lg:pb-10 max-w-[1200px] mx-auto animate-pulse">
          <div className="h-3.5 w-32 bg-white/15 rounded mb-3" />
          <div className="h-10 w-56 bg-white/20 rounded mb-3" />
          <div className="h-4 w-72 max-w-full bg-white/10 rounded" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12">
        <div className="space-y-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-7 w-44 bg-line rounded-lg" />
            <div className="h-4 w-28 bg-line rounded" />
          </div>

          <div>
            <div className="h-3 w-32 bg-line rounded mb-3" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 w-24 bg-line rounded-full" />
              ))}
            </div>
          </div>

          <div>
            <div className="h-3 w-24 bg-line rounded mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-line shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3.5 w-40 bg-line rounded" />
                    <div className="h-3 w-full max-w-md bg-line rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-line rounded-brand p-6 animate-pulse space-y-5">
          <div className="h-6 w-44 bg-line rounded" />
          <div className="space-y-2.5">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-12 bg-line/60 rounded-xl" />
            ))}
          </div>
          <div className="space-y-2.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-line/60 rounded-xl" />
            ))}
          </div>
          <div className="h-16 bg-navy/20 rounded-brand" />
          <div className="h-40 bg-line/40 rounded-brand" />
        </div>
      </div>
    </main>
  );
}