import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SafeImage from "@/components/ui/SafeImage";

export default async function DestinationPackagesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: {
      packages: {
        select: { slug: true, name: true, image: true, durationDays: true, durationNights: true, basePrice: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!destination || destination.packages.length === 0) {
    notFound();
  }

  return (
    <main>
      <div className="relative h-[280px] sm:h-[320px]">
        <SafeImage
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,25,35,0.55),rgba(10,25,35,0.8))]" />
        <Header />
        <Container className="relative z-[3] h-[calc(100%-90px)] flex flex-col justify-end pb-8 text-white">
          <Eyebrow className="text-[#ffb083]">{destination.country}</Eyebrow>
          <h1 className="text-[30px] sm:text-[36px] text-white">{destination.name}</h1>
        </Container>
      </div>

      <Container className="py-10 lg:py-16">
        <h2 className="text-xl text-navy mb-6">Choose a Package</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destination.packages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/destinations/${slug}/${pkg.slug}`}
              className="bg-white border border-line rounded-brand overflow-hidden hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(14,42,58,0.08)] transition"
            >
              <div className="relative h-40">
                <SafeImage
                  src={pkg.image ?? destination.heroImage}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[16.5px] text-navy mb-1">{pkg.name}</h3>
                <p className="text-[13px] text-muted mb-3">
                  {pkg.durationDays} Days / {pkg.durationNights} Nights
                </p>
                <p className="text-[13px] font-bold text-orange-dark">
                  From ₹{pkg.basePrice.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Footer />
    </main>
  );
}