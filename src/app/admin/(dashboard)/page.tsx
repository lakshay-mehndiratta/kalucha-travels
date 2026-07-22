import { prisma } from "@/lib/prisma";
import {
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default async function DashboardPage() {
  const [
    totalDestinationEnquiries,
    newDestinationEnquiries,
    totalFlightEnquiries,
    newFlightEnquiries,
    recentDestinationEnquiries,
    recentFlightEnquiries,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.flightEnquiry.count(),
    prisma.flightEnquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { package: { include: { destination: true } } },
    }),
    prisma.flightEnquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  const stats = [
    { label: "Destination Enquiries", value: totalDestinationEnquiries, icon: HiOutlineMapPin },
    { label: "Flight Enquiries", value: totalFlightEnquiries, icon: HiOutlinePaperAirplane },
    { label: "New (Unhandled)", value: newDestinationEnquiries + newFlightEnquiries, icon: HiOutlineClock },
    { label: "Total Enquiries", value: totalDestinationEnquiries + totalFlightEnquiries, icon: HiOutlineCheckCircle },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-line rounded-brand p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-[10px] bg-[#fdece2] text-orange flex items-center justify-center text-xl shrink-0">
                <Icon />
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-navy">{stat.value}</div>
                <div className="text-[12.5px] text-muted">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-line rounded-brand p-5">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4">
            Recent Destination Enquiries
          </h3>
          <div className="space-y-3">
            {recentDestinationEnquiries.map((e) => (
              <div key={e.id} className="flex justify-between items-center border-b border-line pb-3 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-[13.5px] font-medium text-navy">{e.name}</div>
                  <div className="text-[12px] text-muted">{e.package.destination.name}</div>
                </div>
                <span className="text-[11px] font-semibold text-muted">
                  {new Date(e.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            ))}
            {recentDestinationEnquiries.length === 0 && (
              <p className="text-sm text-muted">No enquiries yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-line rounded-brand p-5">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4">
            Recent Flight Enquiries
          </h3>
          <div className="space-y-3">
            {recentFlightEnquiries.map((e) => (
              <div key={e.id} className="flex justify-between items-center border-b border-line pb-3 last:border-b-0 last:pb-0">
                <div>
                  <div className="text-[13.5px] font-medium text-navy">{e.name}</div>
                  <div className="text-[12px] text-muted">{e.tripType.replace("_", " ")}</div>
                </div>
                <span className="text-[11px] font-semibold text-muted">
                  {new Date(e.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            ))}
            {recentFlightEnquiries.length === 0 && (
              <p className="text-sm text-muted">No enquiries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}