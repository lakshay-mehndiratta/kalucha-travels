import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteDestinationButton from "@/components/admin/DeleteDestinationButton";

export const dynamic = "force-dynamic";

export default async function ManageDestinationsPage() {
  const destinations = await prisma.destination.findMany({
    include: {
      packages: { include: { _count: { select: { enquiries: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">
          {destinations.length} destination{destinations.length === 1 ? "" : "s"}
        </p>
        <Link
          href="/admin/destinations/manage/new"
          className="bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors"
        >
          + Add Destination
        </Link>
      </div>

      <div className="bg-white border border-line rounded-brand overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f3ede3] text-left text-[12px] uppercase tracking-wide text-muted">
                <th className="px-5 py-3.5 font-semibold">Destination</th>
                <th className="px-5 py-3.5 font-semibold">Country</th>
                <th className="px-5 py-3.5 font-semibold">Package</th>
                <th className="px-5 py-3.5 font-semibold">Base Price</th>
                <th className="px-5 py-3.5 font-semibold">Enquiries</th>
                <th className="px-5 py-3.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => {
                const pkg = dest.packages[0];
                const enquiryCount = pkg?._count.enquiries ?? 0;
                return (
                  <tr key={dest.id} className="border-t border-line">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-navy">{dest.name}</div>
                      <div className="text-[12px] text-muted">/{dest.slug}</div>
                    </td>
                    <td className="px-5 py-4 text-[13px]">{dest.country}</td>
                    <td className="px-5 py-4 text-[13px]">
                      {pkg ? pkg.name : <span className="text-red-600">No package</span>}
                    </td>
                    <td className="px-5 py-4 text-[13px] font-semibold text-orange-dark">
                      {pkg ? `₹${pkg.basePrice.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-[13px]">{enquiryCount}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/destinations/manage/${dest.id}/edit`}
                          className="text-[12.5px] font-semibold text-navy hover:text-orange-dark"
                        >
                          Edit
                        </Link>
                        <DeleteDestinationButton
                          destinationId={dest.id}
                          destinationName={dest.name}
                          disabled={enquiryCount > 0}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {destinations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted text-sm">
                    No destinations yet.
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