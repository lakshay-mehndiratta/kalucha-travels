"use client";

import { usePathname } from "next/navigation";
import { HiOutlineBars3 } from "react-icons/hi2";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/destinations": "Destination Enquiries",
  "/admin/flights": "Flight Enquiries",
  "/admin/settings": "Settings",
};

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Admin";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-line px-4 sm:px-6 py-4 flex items-center gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-navy text-xl"
        aria-label="Open menu"
      >
        <HiOutlineBars3 />
      </button>
      <h1 className="text-lg sm:text-xl font-serif font-bold text-navy">{title}</h1>
    </header>
  );
}