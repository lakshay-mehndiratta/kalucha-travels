import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";

const tripTypeLabels: Record<string, string> = {
  ONE_WAY: "One Way",
  ROUND_TRIP: "Round Trip",
  MULTI_CITY: "Multi City",
};

const classLabels: Record<string, string> = {
  ECONOMY: "Economy",
  PREMIUM_ECONOMY: "Premium Economy",
  BUSINESS: "Business",
  FIRST: "First Class",
};

export async function GET() {
  const enquiries = await prisma.flightEnquiry.findMany({
    include: { legs: { orderBy: { legOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Flight Enquiries");

  sheet.columns = [
    { header: "Name", key: "name", width: 22 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Trip Type", key: "tripType", width: 14 },
    { header: "Route", key: "route", width: 42 },
    { header: "Adults", key: "adults", width: 10 },
    { header: "Children", key: "children", width: 10 },
    { header: "Infants", key: "infants", width: 10 },
    { header: "Class", key: "travelClass", width: 16 },
    { header: "Preferred Airline", key: "airline", width: 20 },
    { header: "Budget (INR)", key: "budget", width: 14 },
    { header: "Status", key: "status", width: 14 },
    { header: "Submitted On", key: "createdAt", width: 16 },
  ];

  sheet.getRow(1).font = { bold: true };

  enquiries.forEach((e) => {
    const route = e.legs
      .map(
        (leg) =>
          `${leg.originCode}→${leg.destinationCode} (${leg.date.toLocaleDateString("en-IN")})`
      )
      .join(", ");

    sheet.addRow({
      name: e.name,
      email: e.email,
      phone: e.phone,
      tripType: tripTypeLabels[e.tripType],
      route,
      adults: e.adults,
      children: e.children,
      infants: e.infants,
      travelClass: classLabels[e.travelClass],
      airline: e.preferredAirline ?? "",
      budget: e.budget ?? "",
      status: e.status,
      createdAt: e.createdAt.toLocaleDateString("en-IN"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="kalucha-flight-enquiries-${Date.now()}.xlsx"`,
    },
  });
}