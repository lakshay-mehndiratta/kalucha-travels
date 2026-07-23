"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import logo from "@/assets/kalucha_travels_logo.png";

import { HiOutlinePencilSquare } from "react-icons/hi2";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: HiOutlineHome },
  { href: "/admin/destinations", label: "Destination Enquiries", icon: HiOutlineMapPin },
  { href: "/admin/destinations/manage", label: "Manage Destinations", icon: HiOutlinePencilSquare },
  { href: "/admin/flights", label: "Flight Enquiries", icon: HiOutlinePaperAirplane },
  { href: "/admin/settings", label: "Settings", icon: HiOutlineCog6Tooth },
];

export default function AdminSidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapsed,
}: {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const matchingItem = navItems
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  const isActive = (href: string) => matchingItem?.href === href;

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-navy-deep text-white z-40 flex flex-col transition-all duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "w-64 lg:w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src={logo}
              alt="Kalucha Travels"
              className="w-9 h-9 rounded-[9px] object-contain shrink-0"
              priority
            />
            {!collapsed && (
              <div className="min-w-0 lg:block">
                <div className="font-serif font-bold text-[15px] leading-tight truncate">
                  Kalucha Travels
                </div>
                <div className="text-[9px] tracking-[0.2em] text-[#a9b6bc]">ADMIN</div>
              </div>
            )}
            {/* On desktop while collapsed, still show text for the brief moment the
                mobile drawer is open at a lg breakpoint edge case — hidden via lg:hidden below */}
            {collapsed && (
              <div className="min-w-0 lg:hidden">
                <div className="font-serif font-bold text-[15px] leading-tight truncate">
                  Kalucha Travels
                </div>
                <div className="text-[9px] tracking-[0.2em] text-[#a9b6bc]">ADMIN</div>
              </div>
            )}
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/70 hover:text-white text-xl shrink-0"
            aria-label="Close menu"
          >
            <HiXMark />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  collapsed ? "lg:justify-center" : ""
                } ${
                  active
                    ? "bg-orange text-white"
                    : "text-[#c7d1d5] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="text-lg shrink-0" />
                <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={onToggleCollapsed}
          className="hidden lg:flex items-center justify-center gap-2 mx-3 mb-3 py-2 rounded-lg text-[#c7d1d5] hover:bg-white/[0.06] hover:text-white transition-colors text-xs font-medium"
        >
          {collapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
          {!collapsed && "Collapse"}
        </button>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            title={collapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium text-[#c7d1d5] hover:bg-white/[0.06] hover:text-white transition-colors ${
              collapsed ? "lg:justify-center" : ""
            }`}
          >
            <HiOutlineArrowRightOnRectangle className="text-lg shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}