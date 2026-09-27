import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DestinationRouterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const destination = await prisma.destination.findUnique({
    where: { slug },
    select: {
      packages: { select: { slug: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!destination || destination.packages.length === 0) {
    notFound();
  }

  if (destination.packages.length === 1) {
    redirect(`/destinations/${slug}/${destination.packages[0].slug}`);
  }

  redirect(`/destinations/${slug}/packages`);
}