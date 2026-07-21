import { prisma } from "@/lib/prisma";
import Footer from "@/components/layout/Footer";
import AdminNav from "@/components/admin/AdminNav";
import StatusFilter from "@/components/admin/StatusFilter";
import StatusSelect from "@/components/admin/StatusSelect";
import ExportButton from "@/components/admin/ExportButton";
import SignOutButton from "@/components/admin/SignOutButton";

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

const validStatuses = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;

export default async function AdminFlightsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = validStatuses.includes(status as (typeof validStatuses)[number])
    ? (status as (typeof validStatuses)[number])
    : undefined;

  const enquiries = await prisma.flightEnquiry.findMany({
    where: activeStatus ? { status: activeStatus } : undefined,
    include: { legs: { orderBy: { legOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <main className="min-h-screen bg-cream py-6 px-4 sm:py-10 sm:px-6">
        <div className="max-w-325 mx-auto">
          <AdminNav active="flights" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-[22px] sm:text-[28px] font-serif font-bold text-navy">
                Flight Enquiries
              </h1>
              <p className="text-sm text-muted mt-1">
                {enquiries.length} total enquir{enquiries.length === 1 ? "y" : "ies"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ExportButton href="/api/flight-enquiries/export" />
              <SignOutButton />
            </div>
          </div>

          <div className="mb-6">
            <StatusFilter basePath="/admin/flights" active={activeStatus ?? "ALL"} />
          </div>

          <div className="bg-white border border-line rounded-brand overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f3ede3] text-left text-[12px] uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5 font-semibold">Traveler</th>
                    <th className="px-5 py-3.5 font-semibold">Contact</th>
                    <th className="px-5 py-3.5 font-semibold">Trip Type</th>
                    <th className="px-5 py-3.5 font-semibold">Route</th>
                    <th className="px-5 py-3.5 font-semibold">Travelers</th>
                    <th className="px-5 py-3.5 font-semibold">Class</th>
                    <th className="px-5 py-3.5 font-semibold">Airline / Budget</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="border-t border-line align-top">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-navy">{enquiry.name}</div>
                      </td>
                      <td className="px-5 py-4 text-[13px]">
                        <div>{enquiry.email}</div>
                        <div className="text-muted">{enquiry.phone}</div>
                      </td>
                      <td className="px-5 py-4 text-[13px]">
                        {tripTypeLabels[enquiry.tripType]}
                      </td>
                      <td className="px-5 py-4 text-[13px] max-w-60">
                        {enquiry.legs.map((leg) => (
                          <div key={leg.id} className="mb-1 last:mb-0">
                            <span className="font-medium text-navy">
                              {leg.originCode} → {leg.destinationCode}
                            </span>
                            <span className="text-muted">
                              {" "}
                              ({new Date(leg.date).toLocaleDateString("en-IN")})
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="px-5 py-4 text-[13px]">
                        <div className="font-semibold text-navy">
                          {enquiry.adults + enquiry.children + enquiry.infants} total
                        </div>
                        <div className="text-[11.5px] text-muted">
                          {enquiry.adults}A · {enquiry.children}C · {enquiry.infants}I
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[13px]">
                        {classLabels[enquiry.travelClass]}
                      </td>
                      <td className="px-5 py-4 text-[13px]">
                        <div>{enquiry.preferredAirline || "—"}</div>
                        <div className="text-muted">
                          {enquiry.budget
                            ? `₹${enquiry.budget.toLocaleString("en-IN")}`
                            : "—"}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusSelect
                          enquiryId={enquiry.id}
                          currentStatus={enquiry.status}
                          endpoint="/api/flight-enquiries"
                        />
                      </td>
                      <td className="px-5 py-4 text-[13px] text-muted">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-5 py-10 text-center text-muted text-sm">
                        No flight enquiries {activeStatus ? "with this status " : ""}yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}