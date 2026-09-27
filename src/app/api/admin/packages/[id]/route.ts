import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const itineraryDaySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const attractionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().min(0),
  image: z.url(),
  includedByDefault: z.boolean(),
});

const updatePackageSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Package slug must be lowercase letters, numbers, and hyphens only"),
  image: z.url().optional(),
  durationDays: z.number().int().min(1),
  durationNights: z.number().int().min(0),
  basePrice: z.number().int().min(0),
  includedServices: z.array(z.string().min(1)).min(1),
  itinerary: z.array(itineraryDaySchema).min(1),
  attractions: z.array(attractionSchema).min(1),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updatePackageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message, issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.package.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  const conflictingSlug = await prisma.package.findFirst({
    where: { destinationId: existing.destinationId, slug: parsed.data.slug, NOT: { id } },
  });
  if (conflictingSlug) {
    return NextResponse.json(
      { error: `A package with the slug "${parsed.data.slug}" already exists for this destination.` },
      { status: 400 }
    );
  }

  const { itinerary, attractions, ...pkgFields } = parsed.data;

  await prisma.$transaction(async (tx) => {
    await tx.package.update({ where: { id }, data: pkgFields });

    await tx.itineraryDay.deleteMany({ where: { packageId: id } });
    await tx.itineraryDay.createMany({
      data: itinerary.map((day, i) => ({ ...day, dayNumber: i + 1, packageId: id })),
    });

    const existingAttractions = await tx.attraction.findMany({ where: { packageId: id } });
    const submittedIds = attractions.filter((a) => a.id).map((a) => a.id!);
    const toDelete = existingAttractions.filter((a) => !submittedIds.includes(a.id));
    if (toDelete.length > 0) {
      await tx.attraction.deleteMany({ where: { id: { in: toDelete.map((a) => a.id) } } });
    }

    for (const attraction of attractions) {
      if (attraction.id) {
        await tx.attraction.update({
          where: { id: attraction.id },
          data: {
            name: attraction.name,
            description: attraction.description,
            price: attraction.price,
            image: attraction.image,
            includedByDefault: attraction.includedByDefault,
          },
        });
      } else {
        await tx.attraction.create({ data: { ...attraction, packageId: id } });
      }
    }
  });

  const updated = await prisma.package.findUnique({
    where: { id },
    include: { itinerary: { orderBy: { dayNumber: "asc" } }, attractions: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const enquiryCount = await prisma.enquiry.count({ where: { packageId: id } });
  if (enquiryCount > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete — ${enquiryCount} existing enquir${
          enquiryCount === 1 ? "y" : "ies"
        } reference this package.`,
      },
      { status: 400 }
    );
  }

  const existing = await prisma.package.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.itineraryDay.deleteMany({ where: { packageId: id } });
    await tx.attraction.deleteMany({ where: { packageId: id } });
    await tx.package.delete({ where: { id } });
  });

  return NextResponse.json({ success: true });
}