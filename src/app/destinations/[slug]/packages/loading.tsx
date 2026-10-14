import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PackagesLoading() {
  return (
    <main className="animate-pulse">
      <div className="relative h-[280px] sm:h-[320px] bg-navy">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,35,0.55),rgba(10,25,35,0.8))]" />
        <Header />
        <Container className="relative z-[3] h-[calc(100%-90px)] flex flex-col justify-end pb-8">
          <div className="h-3 w-24 rounded bg-white/25 mb-3" />
          <div className="h-9 w-56 sm:w-72 rounded bg-white/25" />
        </Container>
      </div>

      <Container className="py-10 lg:py-16">
        <div className="h-6 w-44 rounded bg-line mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-line rounded-brand overflow-hidden">
              <div className="h-40 bg-line" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 rounded bg-line" />
                <div className="h-3 w-1/2 rounded bg-line/70" />
                <div className="h-3.5 w-24 rounded bg-line" />
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Footer />
    </main>
  );
}