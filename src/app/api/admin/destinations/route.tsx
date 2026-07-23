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
  image: z.string().url(),
  includedByDefault: z.boolean(),
});

const createSchema = z.object({
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

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message, issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existingSlug = await prisma.destination.findUnique({
    where: { slug: parsed.data.slug },
  });
  if (existingSlug) {
    return NextResponse.json({ error: "This slug is already in use." }, { status: 400 });
  }

  const { package: pkg, ...destinationData } = parsed.data;

  const destination = await prisma.destination.create({
    data: {
      ...destinationData,
      packages: {
        create: {
          name: pkg.name,
          durationDays: pkg.durationDays,
          durationNights: pkg.durationNights,
          basePrice: pkg.basePrice,
          includedServices: pkg.includedServices,
          itinerary: {
            create: pkg.itinerary.map((day, i) => ({ ...day, dayNumber: i + 1 })),
          },
          attractions: { create: pkg.attractions },
        },
      },
    },
  });

  return NextResponse.json({ id: destination.id }, { status: 201 });
}