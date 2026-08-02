import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;

  const document = await prisma.visaDocument.findUnique({ where: { id: documentId } });
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from("visa-documents")
    .createSignedUrl(document.storagePath, 300); // 5-minute expiry

  if (error || !data) {
    return NextResponse.json({ error: "Failed to generate link" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}