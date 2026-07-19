import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PackageCustomizer from "@/components/destination/PackageCustomizer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: {
      packages: {
        include: {
          itinerary: { orderBy: { dayNumber: "asc" } },
          attractions: true,
        },
        take: 1,
      },
    },
  });

  if (!destination || destination.packages.length === 0) {
    notFound();
  }

  const pkg = destination.packages[0];

  return (
    <main>
      <div className="relative h-[320px] sm:h-[380px] lg:h-[420px]">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,25,35,0.55),rgba(10,25,35,0.8))]" />

        <Header />

        <Container className="relative z-[3] h-[calc(100%-90px)] flex flex-col justify-end pb-8 lg:pb-10 text-white">
          <Eyebrow className="text-[#ffb083]">{destination.country}</Eyebrow>
          <h1 className="text-[30px] sm:text-[36px] lg:text-[42px] text-white">
            {destination.name}
          </h1>
          <p className="text-[#e7edf0] max-w-full sm:max-w-[520px] mt-2 text-[14px] sm:text-base">
            {destination.shortDescription}
          </p>
        </Container>
      </div>

      <Container className="py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start">
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-xl sm:text-2xl text-navy">{pkg.name}</h2>
            <span className="text-sm text-muted">
              {pkg.durationDays} Days / {pkg.durationNights} Nights
            </span>
          </div>

          <div className="mb-8 lg:mb-10">
            <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-3">
              Included Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {pkg.includedServices.map((s) => (
                <span
                  key={s}
                  className="bg-[#fdece2] text-orange-dark text-[13px] font-medium px-3.5 py-1.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4">
              Itinerary
            </h3>
            <div className="space-y-4">
              {pkg.itinerary.map((day) => (
                <div key={day.id} className="flex gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-navy text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0">
                    D{day.dayNumber}
                  </div>
                  <div>
                    <h4 className="text-[14.5px] sm:text-[15px] text-navy mb-1">
                      {day.title}
                    </h4>
                    <p className="text-[13px] sm:text-[13.5px] text-muted">
                      {day.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-6">
          <PackageCustomizer
            packageId={pkg.id}
            basePrice={pkg.basePrice}
            attractions={pkg.attractions}
          />
        </div>
      </Container>

      <Footer />
    </main>
  );
}