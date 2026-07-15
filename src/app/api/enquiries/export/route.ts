import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const enquiries = await prisma.enquiry.findMany({
    include: { package: { include: { destination: true } } },
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Enquiries");

  sheet.columns = [
    { header: "Name", key: "name", width: 22 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Destination", key: "destination", width: 16 },
    { header: "Package", key: "packageName", width: 20 },
    { header: "Travelers", key: "travelers", width: 12 },
    { header: "Travel Date", key: "travelDate", width: 14 },
    { header: "Estimated Price (INR)", key: "price", width: 18 },
    { header: "Status", key: "status", width: 14 },
    { header: "Message", key: "message", width: 32 },
    { header: "Submitted On", key: "createdAt", width: 16 },
  ];

  sheet.getRow(1).font = { bold: true };

  enquiries.forEach((e) => {
    sheet.addRow({
      name: e.name,
      email: e.email,
      phone: e.phone,
      destination: e.package.destination.name,
      packageName: e.package.name,
      travelers: e.numTravelers,
      travelDate: e.travelDate ? e.travelDate.toLocaleDateString("en-IN") : "",
      price: e.estimatedPrice,
      status: e.status,
      message: e.message ?? "",
      createdAt: e.createdAt.toLocaleDateString("en-IN"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="kalucha-enquiries-${Date.now()}.xlsx"`,
    },
  });
}