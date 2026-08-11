import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const statusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CONVERTED", "CLOSED"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = statusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: z.flattenError(parsed.error) }, { status: 400 });
  }

  const application = await prisma.visaApplication.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json(application);
}