import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const itineraryDaySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const attractionSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().min(0),
  image: z.url(),
  includedByDefault: z.boolean(),
});

const createPackageSchema = z.object({
  destinationId: z.string().min(1),
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

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createPackageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message, issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { destinationId, itinerary, attractions, ...pkgData } = parsed.data;

  const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
  if (!destination) {
    return NextResponse.json({ error: "Destination not found." }, { status: 404 });
  }

  const existingSlug = await prisma.package.findFirst({
    where: { destinationId, slug: pkgData.slug },
  });
  if (existingSlug) {
    return NextResponse.json(
      { error: `A package with the slug "${pkgData.slug}" already exists for ${destination.name}.` },
      { status: 400 }
    );
  }

  const created = await prisma.package.create({
    data: {
      ...pkgData,
      destinationId,
      itinerary: { create: itinerary.map((day, i) => ({ ...day, dayNumber: i + 1 })) },
      attractions: { create: attractions },
    },
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}