import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Visa Services" },
  { href: "#packages", label: "Holiday Packages" },
  { href: "#destinations", label: "Destinations" },
  { href: "#contact", label: "Contact Us" },
];

export default function Header() {
  return (
    <header className="relative z-10 pt-4 px-6">
      <div className="max-w-6xl mx-auto bg-white/97 rounded-2xl px-5 py-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <Link href="#home" className="flex items-center gap-2.5 text-navy">
          <div className="w-9.5 h-9.5 rounded-[9px] bg-orange flex items-center justify-center text-white font-serif font-bold text-xl">
            K
          </div>
          <div>
            <div className="font-serif font-bold text-lg leading-[1.05] text-navy">
              Kalucha
            </div>
            <div className="text-[9px] tracking-[0.25em] text-muted font-sans">
              TRAVELS
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex gap-7.5 text-[14.5px] font-medium text-[#33424b]">
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

        <Button href="#apply" variant="primary" size="sm">
          Apply for Visa →
        </Button>
      </div>
    </header>
  );
}