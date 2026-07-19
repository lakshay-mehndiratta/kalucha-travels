import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const legSchema = z.object({
  originCode: z.string().min(2),
  originCity: z.string().min(1),
  destinationCode: z.string().min(2),
  destinationCity: z.string().min(1),
  date: z.string(),
});

const flightEnquirySchema = z
  .object({
    tripType: z.enum(["ONE_WAY", "ROUND_TRIP", "MULTI_CITY"]),
    legs: z.array(legSchema).min(1).max(5),
    adults: z.number().int().min(1, "At least 1 adult is required"),
    children: z.number().int().min(0),
    infants: z.number().int().min(0),
    travelClass: z.enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]),
    preferredAirline: z.string().optional(),
    budget: z
      .number()
      .int()
      .min(1000, "Budget must be at least ₹1,000")
      .multipleOf(1000, "Budget must be in increments of ₹1,000")
      .optional(),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z
      .string()
      .regex(/^\+\d{1,4} \d{10}$/, "Phone number must be a valid 10-digit number"),
  })
  .refine((d) => d.adults + d.children + d.infants <= 9, {
    message: "Maximum 9 travellers allowed per booking",
    path: ["adults"],
  })
  .refine((d) => d.legs.every((leg) => leg.originCode !== leg.destinationCode), {
    message: "Origin and destination cannot be the same",
    path: ["legs"],
  });

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = flightEnquirySchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue.message, issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { legs, ...rest } = parsed.data;

  const enquiry = await prisma.flightEnquiry.create({
    data: {
      ...rest,
      legs: {
        create: legs.map((leg, i) => ({
          ...leg,
          legOrder: i + 1,
          date: new Date(leg.date),
        })),
      },
    },
  });

  return NextResponse.json({ id: enquiry.id }, { status: 201 });
}