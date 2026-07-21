import Link from "next/link";

export default function AdminNav({ active }: { active: "destinations" | "flights" }) {
  const tabs = [
    { key: "destinations" as const, label: "Destination Enquiries", href: "/admin" },
    { key: "flights" as const, label: "Flight Enquiries", href: "/admin/flights" },
  ];

  return (
    <div className="inline-flex bg-white border border-line rounded-full p-1 mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            active === tab.key ? "bg-navy text-white" : "text-navy hover:bg-cream"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}