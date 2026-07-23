import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DestinationForm from "@/components/admin/DestinationForm";

export const dynamic = "force-dynamic";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const destination = await prisma.destination.findUnique({
    where: { id },
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

  if (!destination) notFound();

  return <DestinationForm mode="edit" destination={destination} />;
}