import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const enquiries = await prisma.enquiry.findMany({
    include: {
      package: {
        include: {
          destination: true,
          attractions: true,
        },
      },
    },
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
    { header: "Adults", key: "adults", width: 10 },
    { header: "Children", key: "children", width: 10 },
    { header: "Infants", key: "infants", width: 10 },
    { header: "Seniors", key: "seniors", width: 10 },
    { header: "Travel Window", key: "travelWindow", width: 26 },
    { header: "Estimated Price (INR)", key: "price", width: 18 },
    { header: "Included Attractions", key: "included", width: 32 },
    { header: "Selected Add-ons", key: "addOns", width: 32 },
    { header: "Status", key: "status", width: 14 },
    { header: "Message", key: "message", width: 32 },
    { header: "Submitted On", key: "createdAt", width: 16 },
  ];

  sheet.getRow(1).font = { bold: true };

  enquiries.forEach((e) => {
    const included = e.package.attractions
      .filter((a) => a.includedByDefault)
      .map((a) => a.name)
      .join(", ");
    const addOns = e.package.attractions
      .filter((a) => e.selectedAttractionIds.includes(a.id))
      .map((a) => a.name)
      .join(", ");
    const travelWindow =
      e.travelWindowStart && e.travelWindowEnd
        ? `${e.travelWindowStart.toLocaleDateString("en-IN")} – ${e.travelWindowEnd.toLocaleDateString("en-IN")}`
        : "Flexible";

    sheet.addRow({
      name: e.name,
      email: e.email,
      phone: e.phone,
      destination: e.package.destination.name,
      packageName: e.package.name,
      adults: e.adults,
      children: e.children,
      infants: e.infants,
      seniors: e.seniors,
      travelWindow,
      price: e.estimatedPrice,
      included,
      addOns,
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