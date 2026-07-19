import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const todayMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const oneYearFromNow = () => {
  const d = todayMidnight();
  d.setFullYear(d.getFullYear() + 1);
  return d;
};

const enquirySchema = z
  .object({
    packageId: z.string(),
    selectedAttractionIds: z.array(z.string()),
    estimatedPrice: z.number().int().positive(),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z
      .string()
      .regex(/^\+\d{1,4} \d{10}$/, "Phone number must be a valid 10-digit number"),
    travelWindowStart: z.string().optional(),
    travelWindowEnd: z.string().optional(),
    adults: z.number().int().min(1, "At least 1 adult is required per booking"),
    children: z.number().int().min(0),
    infants: z.number().int().min(0),
    seniors: z.number().int().min(0),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.travelWindowStart) return true;
      const start = new Date(data.travelWindowStart);
      return start >= todayMidnight() && start <= oneYearFromNow();
    },
    { message: "Earliest date must be within the next 12 months", path: ["travelWindowStart"] }
  )
  .refine(
    (data) => {
      if (!data.travelWindowStart || !data.travelWindowEnd) return true;
      return new Date(data.travelWindowEnd) >= new Date(data.travelWindowStart);
    },
    { message: "Latest date must be on or after the earliest date", path: ["travelWindowEnd"] }
  )
  .refine(
    (data) => {
      if (!data.travelWindowStart || !data.travelWindowEnd) return true;
      const diffDays =
        (new Date(data.travelWindowEnd).getTime() - new Date(data.travelWindowStart).getTime()) /
        (1000 * 60 * 60 * 24);
      return diffDays <= 14;
    },
    { message: "Travel window can't span more than 14 days", path: ["travelWindowEnd"] }
  );

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue.message, issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const {
    packageId,
    selectedAttractionIds,
    estimatedPrice,
    name,
    email,
    phone,
    travelWindowStart,
    travelWindowEnd,
    adults,
    children,
    infants,
    seniors,
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
      travelWindowStart: travelWindowStart ? new Date(travelWindowStart) : undefined,
      travelWindowEnd: travelWindowEnd ? new Date(travelWindowEnd) : undefined,
      adults,
      children,
      infants,
      seniors,
      message,
    },
  });

  return NextResponse.json({ id: enquiry.id }, { status: 201 });
}