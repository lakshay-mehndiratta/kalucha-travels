import { prisma } from "@/lib/prisma";
import StatusFilter from "@/components/admin/StatusFilter";
import StatusSelect from "@/components/admin/StatusSelect";
import ViewDocumentButton from "@/components/admin/ViewDocumentButton";

export const dynamic = "force-dynamic";

const validStatuses = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;

export default async function AdminVisaApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = validStatuses.includes(status as (typeof validStatuses)[number])
    ? (status as (typeof validStatuses)[number])
    : undefined;

  const applications = await prisma.visaApplication.findMany({
    where: activeStatus ? { status: activeStatus } : undefined,
    include: { documents: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          {applications.length} total application{applications.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mb-6">
        <StatusFilter basePath="/admin/visa-applications" active={activeStatus ?? "ALL"} />
      </div>

      <div className="bg-white border border-line rounded-brand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f3ede3] text-left text-[12px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3.5 font-semibold">Applicant</th>
                <th className="px-5 py-3.5 font-semibold">Contact</th>
                <th className="px-5 py-3.5 font-semibold">Destination</th>
                <th className="px-5 py-3.5 font-semibold">Visa Type</th>
                <th className="px-5 py-3.5 font-semibold">Travel Date</th>
                <th className="px-5 py-3.5 font-semibold">Documents</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-line align-top">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-navy">{app.name}</div>
                    {app.message && (
                      <div className="text-[12px] text-muted mt-1 max-w-55">{app.message}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[13px]">
                    <div>{app.email}</div>
                    <div className="text-muted">{app.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-[13px]">{app.destinationCountry}</td>
                  <td className="px-5 py-4 text-[13px]">{app.visaType}</td>
                  <td className="px-5 py-4 text-[13px]">
                    {app.travelDate
                      ? new Date(app.travelDate).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-[13px]">
                    <div className="flex flex-col items-start gap-1">
                      {app.documents.map((doc) => (
                        <ViewDocumentButton
                          key={doc.id}
                          documentId={doc.id}
                          label={doc.documentType}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusSelect
                      enquiryId={app.id}
                      currentStatus={app.status}
                      endpoint="/api/visa-applications"
                    />
                  </td>
                  <td className="px-5 py-4 text-[13px] text-muted">
                    {new Date(app.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-muted text-sm">
                    No visa applications yet.
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