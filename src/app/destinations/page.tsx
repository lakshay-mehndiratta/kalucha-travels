import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import SafeImage from "@/components/ui/SafeImage";

export default async function AllDestinationsPage() {
  const destinations = await prisma.destination.findMany({
    include: {
      packages: {
        select: { basePrice: true },
        orderBy: { basePrice: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <main className="bg-cream py-14">
        <Container>
          <div className="text-center mb-10">
            <Eyebrow className="justify-center">All Destinations</Eyebrow>
            <h1 className="text-[34px] leading-tight text-navy">
              Explore Every <span className="text-orange">Destination</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="bg-white border border-line rounded-brand overflow-hidden hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(14,42,58,0.08)] transition"
              >
                <div className="relative h-48">
                  <SafeImage
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-navy mb-1">{dest.name}</h3>
                  <p className="text-[13px] text-muted mb-2">{dest.country}</p>
                  {dest.packages[0] && (
                    <p className="text-[13px] font-bold text-orange-dark">
                      From ₹{dest.packages[0].basePrice.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
            {destinations.length === 0 && (
              <p className="text-muted col-span-full text-center py-10">
                No destinations available yet.
              </p>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}