import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const fieldsSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+\d{1,4} \d{10}$/, "Phone number must be a valid 10-digit number"),
  destinationCountry: z.string().min(1),
  visaType: z.string().min(1),
  travelDate: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  const formData = await req.formData();

  const parsed = fieldsSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    destinationCountry: formData.get("destinationCountry"),
    visaType: formData.get("visaType"),
    travelDate: formData.get("travelDate") || undefined,
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const documentSlots = [
    { key: "passportScan", label: "Passport Scan", required: true },
    { key: "photo", label: "Photo", required: true },
    { key: "supportingDocument", label: "Supporting Document", required: false },
  ];

  const filesToUpload: { key: string; label: string; file: File }[] = [];

  for (const slot of documentSlots) {
    const file = formData.get(slot.key) as File | null;
    if (!file || file.size === 0) {
      if (slot.required) {
        return NextResponse.json({ error: `${slot.label} is required.` }, { status: 400 });
      }
      continue;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `${slot.label} must be a PDF, JPG, or PNG file.` },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `${slot.label} must be under 5MB.` },
        { status: 400 }
      );
    }
    filesToUpload.push({ key: slot.key, label: slot.label, file });
  }

  const { travelDate, ...rest } = parsed.data;

  const application = await prisma.visaApplication.create({
    data: {
      ...rest,
      travelDate: travelDate ? new Date(travelDate) : undefined,
    },
  });

  const supabase = createAdminClient();

  for (const { label, file } of filesToUpload) {
    const ext = file.name.split(".").pop();
    const storagePath = `${application.id}/${label.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("visa-documents")
      .upload(storagePath, arrayBuffer, { contentType: file.type });

    if (uploadError) {
      // Roll back the application if any upload fails, so we don't leave a half-complete record
      await prisma.visaApplication.delete({ where: { id: application.id } });
      return NextResponse.json(
        { error: "Failed to upload documents. Please try again." },
        { status: 500 }
      );
    }

    await prisma.visaDocument.create({
      data: {
        visaApplicationId: application.id,
        documentType: label,
        storagePath,
        fileName: file.name,
        fileSize: file.size,
      },
    });
  }

  return NextResponse.json({ id: application.id }, { status: 201 });
}