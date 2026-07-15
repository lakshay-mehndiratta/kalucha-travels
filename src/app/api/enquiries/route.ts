import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const enquirySchema = z.object({
  packageId: z.string(),
  selectedAttractionIds: z.array(z.string()),
  estimatedPrice: z.number().int().positive(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  travelDate: z.string().optional(),
  numTravelers: z.number().int().min(1),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const {
    packageId,
    selectedAttractionIds,
    estimatedPrice,
    name,
    email,
    phone,
    travelDate,
    numTravelers,
    message,
  } = parsed.data;

  const enquiry = await prisma.enquiry.create({
    data: {
      packageId,
      selectedAttractionIds,
      estimatedPrice,
      name,
      email,
      phone,
      travelDate: travelDate ? new Date(travelDate) : undefined,
      numTravelers,
      message,
    },
  });

  return NextResponse.json({ id: enquiry.id }, { status: 201 });
}