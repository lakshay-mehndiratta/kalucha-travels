import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PackageForm from "@/components/admin/PackageForm";

export const dynamic = "force-dynamic";

export default async function NewPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const destination = await prisma.destination.findUnique({
    where: { id },
    select: { id: true, name: true },
  });

  if (!destination) notFound();

  return (
    <div>
      <p className="text-sm text-muted mb-6">
        Adding a new package to{" "}
        <span className="font-semibold text-navy">{destination.name}</span>
      </p>
      <PackageForm mode="create" destinationId={destination.id} />
    </div>
  );
}