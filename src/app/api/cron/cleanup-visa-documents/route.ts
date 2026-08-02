import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const expiredApplications = await prisma.visaApplication.findMany({
    where: { createdAt: { lt: sixtyDaysAgo } },
    include: { documents: true },
  });

  const supabase = createAdminClient();
  let deletedCount = 0;

  for (const app of expiredApplications) {
    const paths = app.documents.map((d) => d.storagePath);
    if (paths.length > 0) {
      await supabase.storage.from("visa-documents").remove(paths);
    }
    await prisma.visaApplication.delete({ where: { id: app.id } }); // cascades to VisaDocument rows
    deletedCount++;
  }

  return NextResponse.json({ deleted: deletedCount });
}