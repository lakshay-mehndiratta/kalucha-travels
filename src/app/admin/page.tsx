import { prisma } from "@/lib/prisma";
import StatusSelect from "@/components/admin/StatusSelect";
import ExportButton from "@/components/admin/ExportButton";

export default async function AdminPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: {
      package: {
        include: { destination: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-cream py-10 px-6">
      <div className="max-w-325 mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-serif font-bold text-navy">
              Enquiries
            </h1>
            <p className="text-sm text-muted mt-1">
              {enquiries.length} total enquir{enquiries.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <ExportButton />
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
                  <th className="px-5 py-3.5 font-semibold">Travel Date</th>
                  <th className="px-5 py-3.5 font-semibold">Est. Price</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
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
                    <td className="px-5 py-4 text-[13px]">{enquiry.numTravelers}</td>
                    <td className="px-5 py-4 text-[13px]">
                      {enquiry.travelDate
                        ? new Date(enquiry.travelDate).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-[13px] font-semibold text-orange-dark">
                      ₹{enquiry.estimatedPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <StatusSelect enquiryId={enquiry.id} currentStatus={enquiry.status} />
                    </td>
                    <td className="px-5 py-4 text-[13px] text-muted">
                      {new Date(enquiry.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-muted text-sm">
                      No enquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}