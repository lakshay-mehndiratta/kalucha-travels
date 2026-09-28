import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(
    /^[a-z0-9-]+$/,
    "Slug must be lowercase letters, numbers, and hyphens only"
  ),
  country: z.string().min(1),
  heroImage: z.url(),
  shortDescription: z.string().min(1),
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
      {
        error: parsed.error.issues[0].message,
        issues: z.flattenError(parsed.error),
      },
      { status: 400 }
    );
  }

  const conflictingSlug = await prisma.destination.findFirst({
    where: {
      slug: parsed.data.slug,
      NOT: { id },
    },
  });

  if (conflictingSlug) {
    return NextResponse.json(
      { error: "This slug is already in use." },
      { status: 400 }
    );
  }

  await prisma.destination.update({
    where: { id },
    data: parsed.data,
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