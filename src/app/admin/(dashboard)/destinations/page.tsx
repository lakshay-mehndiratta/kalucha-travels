import { prisma } from "@/lib/prisma";
import StatusFilter from "@/components/admin/StatusFilter";
import StatusSelect from "@/components/admin/StatusSelect";
import ExportButton from "@/components/admin/ExportButton";

const validStatuses = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;

export default async function AdminDestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = validStatuses.includes(status as (typeof validStatuses)[number])
    ? (status as (typeof validStatuses)[number])
    : undefined;

  const enquiries = await prisma.enquiry.findMany({
    where: activeStatus ? { status: activeStatus } : undefined,
    include: {
      package: { include: { destination: true, attractions: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <p className="text-sm text-muted mt-1">
            {enquiries.length} total enquir{enquiries.length === 1 ? "y" : "ies"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton href="/api/enquiries/export" />
        </div>
      </div>

      <div className="mb-6">
        <StatusFilter basePath="/admin/destinations" active={activeStatus ?? "ALL"} />
      </div>

      <div className="bg-white border border-line rounded-brand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
                <tr className="bg-[#f3ede3] text-left text-[12px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3.5 font-semibold">Traveler</th>
                <th className="px-5 py-3.5 font-semibold">Contact</th>
                <th className="px-5 py-3.5 font-semibold">Package</th>
                <th className="px-5 py-3.5 font-semibold">Travelers</th>
                <th className="px-5 py-3.5 font-semibold">Travel Window</th>
                <th className="px-5 py-3.5 font-semibold">Est. Price</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Attractions</th>
                <th className="px-5 py-3.5 font-semibold">Submitted</th>
                </tr>
            </thead>
            <tbody>
                {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="border-t border-line align-top">
                        <td className="px-5 py-4">
                            <div className="font-semibold text-navy">{enquiry.name}</div>
                                {enquiry.message && (
                                <div className="text-[12px] text-muted mt-1 max-w-55">
                                    {enquiry.message}
                                </div>
                            )}
                        </td>

                        <td className="px-5 py-4 text-[13px]">
                            <div>{enquiry.email}</div>
                            <div className="text-muted">{enquiry.phone}</div>
                        </td>

                        <td className="px-5 py-4 text-[13px]">
                            <div className="font-medium text-navy">
                                {enquiry.package.destination.name}
                            </div>
                            <div className="text-muted">{enquiry.package.name}</div>
                        </td>

                        <td className="px-5 py-4 text-[13px]">
                            <div className="font-semibold text-navy">
                                {enquiry.adults + enquiry.children + enquiry.infants + enquiry.seniors} total
                            </div>
                            <div className="text-[11.5px] text-muted">
                                {enquiry.adults}A · {enquiry.children}C · {enquiry.infants}I · {enquiry.seniors}S
                            </div>
                        </td>

                        <td className="px-5 py-4 text-[13px]">
                            {enquiry.travelWindowStart && enquiry.travelWindowEnd
                                ? `${new Date(enquiry.travelWindowStart).toLocaleDateString("en-IN")} – ${new Date(
                                enquiry.travelWindowEnd
                                ).toLocaleDateString("en-IN")}`
                                : "Flexible"}
                        </td>
                        <td className="px-5 py-4 text-[13px] font-semibold text-orange-dark">
                            ₹{enquiry.estimatedPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="px-5 py-4">
                            <StatusSelect enquiryId={enquiry.id} currentStatus={enquiry.status} endpoint="/api/enquiries" />
                        </td>
            
                        {(() => {
                            const included = enquiry.package.attractions.filter(
                            (a) => a.includedByDefault
                        );
                        const selected = enquiry.package.attractions.filter((a) =>
                            enquiry.selectedAttractionIds.includes(a.id)
                        );

                        return (
                            <td className="px-5 py-4 text-[12px] max-w-55">
                                <div className="mb-1.5">
                                    <span className="text-muted font-semibold">Included: </span>
                                    {included.map((a) => a.name).join(", ") || "—"}
                                </div>
                                <div>
                                    <span className="text-orange-dark font-semibold">Add-ons: </span>
                                    {selected.map((a) => a.name).join(", ") || "None"}
                                </div>
                            </td>
                        );
                    })()}
            
                    <td className="px-5 py-4 text-[13px] text-muted">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN")}
                    </td>
                </tr>
              ))}
                {enquiries.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-muted text-sm">
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}