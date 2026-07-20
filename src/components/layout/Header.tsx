"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Visa Services" },
  { href: "/flights", label: "Flights" },
  { href: "#packages", label: "Holiday Packages" },
  { href: "#destinations", label: "Destinations" },
  { href: "#contact", label: "Contact Us" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 pt-4 px-4 sm:px-6">
      <div className="max-w-[1152px] mx-auto bg-white/[0.97] rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <Logo />

        <nav className="hidden lg:flex gap-[30px] text-[14.5px] font-medium text-[#33424b]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-orange-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#apply" variant="primary" size="sm">
            Apply for Visa →
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-navy text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden max-w-[1152px] mx-auto mt-2 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] px-5 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-[15px] font-medium text-[#33424b] border-b border-line last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            href="#apply"
            variant="primary"
            size="sm"
            className="w-full justify-center mt-3"
          >
            Apply for Visa →
          </Button>
        </div>
      )}
    </header>
  );
}