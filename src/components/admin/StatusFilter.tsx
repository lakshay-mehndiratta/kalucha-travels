import Link from "next/link";

const statuses = ["ALL", "NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;

export default function StatusFilter({
  basePath,
  active,
}: {
  basePath: string;
  active: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((s) => (
        <Link
          key={s}
          href={s === "ALL" ? basePath : `${basePath}?status=${s}`}
          className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border transition-colors ${
            active === s
              ? "bg-navy text-white border-navy"
              : "bg-white text-navy border-line hover:bg-cream"
          }`}
        >
          {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
        </Link>
      ))}
    </div>
  );
}