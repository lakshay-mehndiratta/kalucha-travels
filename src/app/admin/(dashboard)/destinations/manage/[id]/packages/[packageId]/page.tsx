import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PackageDetailClient from "@/components/admin/PackageDetailClient";

export const dynamic = "force-dynamic";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string; packageId: string }>;
}) {
  const { id, packageId } = await params;

  const pkg = await prisma.package.findFirst({
    where: { id: packageId, destinationId: id },
    include: {
      destination: { select: { name: true } },
      itinerary: { orderBy: { dayNumber: "asc" } },
      attractions: true,
      _count: { select: { enquiries: true } },
    },
  });

  if (!pkg) notFound();

  return (
    <PackageDetailClient
      destinationId={id}
      destinationName={pkg.destination.name}
      enquiryCount={pkg._count.enquiries}
      initialPackage={{
        id: pkg.id,
        name: pkg.name,
        slug: pkg.slug,
        image: pkg.image,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        basePrice: pkg.basePrice,
        includedServices: pkg.includedServices,
        itinerary: pkg.itinerary.map((d) => ({ title: d.title, description: d.description })),
        attractions: pkg.attractions,
      }}
    />
  );
}