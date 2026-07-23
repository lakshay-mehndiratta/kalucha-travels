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
  image: z.string().url(),
  includedByDefault: z.boolean(),
});

const updateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  country: z.string().min(1),
  heroImage: z.string().url(),
  shortDescription: z.string().min(1),
  package: z.object({
    name: z.string().min(1),
    durationDays: z.number().int().min(1),
    durationNights: z.number().int().min(0),
    basePrice: z.number().int().min(0),
    includedServices: z.array(z.string().min(1)).min(1),
    itinerary: z.array(itineraryDaySchema).min(1),
    attractions: z.array(attractionSchema).min(1),
  }),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message, issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const conflictingSlug = await prisma.destination.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
  });
  if (conflictingSlug) {
    return NextResponse.json({ error: "This slug is already in use." }, { status: 400 });
  }

  const { package: pkg, ...destinationData } = parsed.data;

  const existingPackage = await prisma.package.findFirst({ where: { destinationId: id } });
  if (!existingPackage) {
    return NextResponse.json({ error: "No package found for this destination." }, { status: 400 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.destination.update({ where: { id }, data: destinationData });

    await tx.package.update({
      where: { id: existingPackage.id },
      data: {
        name: pkg.name,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        basePrice: pkg.basePrice,
        includedServices: pkg.includedServices,
      },
    });

    // Itinerary: safe to fully replace, nothing else references these IDs
    await tx.itineraryDay.deleteMany({ where: { packageId: existingPackage.id } });
    await tx.itineraryDay.createMany({
      data: pkg.itinerary.map((day, i) => ({
        ...day,
        dayNumber: i + 1,
        packageId: existingPackage.id,
      })),
    });

    // Attractions: update existing by id, create new, delete removed —
    // preserves IDs so old enquiries' selectedAttractionIds keep resolving
    const existingAttractions = await tx.attraction.findMany({
      where: { packageId: existingPackage.id },
    });
    const submittedIds = pkg.attractions.filter((a) => a.id).map((a) => a.id!);

    const toDelete = existingAttractions.filter((a) => !submittedIds.includes(a.id));
    if (toDelete.length > 0) {
      await tx.attraction.deleteMany({
        where: { id: { in: toDelete.map((a) => a.id) } },
      });
    }

    for (const attraction of pkg.attractions) {
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
        await tx.attraction.create({
          data: { ...attraction, packageId: existingPackage.id },
        });
      }
    }
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const enquiryCount = await prisma.enquiry.count({
    where: { package: { destinationId: id } },
  });

  if (enquiryCount > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete — ${enquiryCount} existing enquir${
          enquiryCount === 1 ? "y" : "ies"
        } reference this destination. Handle those enquiries first.`,
      },
      { status: 400 }
    );
  }

  await prisma.$transaction(async (tx) => {
    const pkg = await tx.package.findFirst({ where: { destinationId: id } });
    if (pkg) {
      await tx.itineraryDay.deleteMany({ where: { packageId: pkg.id } });
      await tx.attraction.deleteMany({ where: { packageId: pkg.id } });
      await tx.package.delete({ where: { id: pkg.id } });
    }
    await tx.destination.delete({ where: { id } });
  });

  return NextResponse.json({ success: true });
}