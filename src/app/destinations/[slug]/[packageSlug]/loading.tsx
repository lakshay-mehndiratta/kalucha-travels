import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Row() {
  return (
    <div className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3">
      <div className="w-4 h-4 rounded bg-line shrink-0" />
      <div className="w-11 h-11 rounded-lg bg-line shrink-0" />
      <div className="h-3.5 flex-1 max-w-[60%] rounded bg-line" />
      <div className="h-3 w-14 rounded bg-line ml-auto" />
    </div>
  );
}

export default function PackageDetailLoading() {
  return (
    <main className="animate-pulse">
      {/* Hero */}
      <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] bg-navy">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,35,0.55),rgba(10,25,35,0.8))]" />
        <Header />
        <Container className="relative z-[3] h-[calc(100%-90px)] flex flex-col justify-end pb-8 lg:pb-10">
          <div className="h-3 w-24 rounded bg-white/25 mb-3" />
          <div className="h-9 lg:h-11 w-56 sm:w-72 rounded bg-white/25" />
          <div className="h-4 w-full max-w-[520px] rounded bg-white/15 mt-3" />
        </Container>
      </div>

      <Container className="py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start">
        {/* Left: package info */}
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="h-7 w-56 rounded bg-line" />
            <div className="h-4 w-28 rounded bg-line" />
          </div>

          <div className="mb-8 lg:mb-10">
            <div className="h-3.5 w-36 rounded bg-line mb-3" />
            <div className="flex flex-wrap gap-2">
              {[88, 104, 72, 96, 80].map((w, i) => (
                <div key={i} className="h-8 rounded-full bg-line" style={{ width: w }} />
              ))}
            </div>
          </div>

          <div>
            <div className="h-3.5 w-24 rounded bg-line mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-line shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 rounded bg-line" />
                    <div className="h-3 w-full rounded bg-line/70" />
                    <div className="h-3 w-4/5 rounded bg-line/70" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: customizer */}
        <div className="lg:sticky lg:top-6">
          <div className="h-7 w-64 rounded bg-line mb-4" />

          <div className="mb-6">
            <div className="h-3.5 w-20 rounded bg-line mb-2.5" />
            <div className="space-y-2.5">
              <Row />
              <Row />
            </div>
          </div>

          <div className="mb-6">
            <div className="h-3.5 w-32 rounded bg-line mb-2.5" />
            <div className="space-y-2.5">
              <Row />
              <Row />
              <Row />
            </div>
          </div>

          <div className="bg-line rounded-brand h-[68px] mb-6" />

          <div className="bg-white border border-line rounded-brand p-5 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-full rounded-lg bg-line" />
            ))}
            <div className="h-11 w-full rounded-full bg-line" />
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}