import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import Image from "next/image";
import logo from "@/assets/kalucha_travels_logo.png";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Visa Services" },
  { href: "#packages", label: "Holiday Packages" },
  { href: "#destinations", label: "Destinations" },
  { href: "#contact", label: "Contact Us" },
];

const serviceLinks = [
  "Visa Assistance",
  "Holiday Packages",
  "Flight Booking",
  "Hotel Booking",
  "Cruise Booking",
  "Travel Insurance",
  "Corporate Travel",
  "Sightseeing Planning",
];

const socials = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaInstagram, href: "https://www.instagram.com/kalucha_travels/" },
  { icon: FaYoutube, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-[#c7d1d5] pt-15">
      <div className="max-w-page mx-auto px-6">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-7.5 pb-11 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
                <Link href="/" className="inline-flex items-center">
                  <Image
                    src={logo}
                    alt="Kalucha Travels"
                    width={160}
                    height={52}
                    className="h-12 w-auto object-contain rounded-lg"
                  />
                </Link>
                <div>
                    <div className="font-serif font-bold text-lg leading-[1.05] text-white">
                    Kalucha
                    </div>
                    <div className="text-[9px] tracking-[0.25em] text-muted">
                    TRAVELS
                    </div>
                </div>
                </div>
            <p className="text-[13.5px] max-w-65 mt-3.5 mb-5 text-[#a9b6bc]">
              Your trusted travel partner for visas, holidays, flights and
              unforgettable journeys worldwide.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={i}
                    href={s.href}
                    className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-[13px] hover:bg-white/16 transition-colors"
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h5 className="text-white text-sm mb-4">Quick Links</h5>
            <ul className="list-none">
              {quickLinks.map((link) => (
                <li key={link.href} className="mb-2.5 text-[13.5px]">
                  <Link href={link.href} className="hover:text-orange transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white text-sm mb-4">Our Services</h5>
            <ul className="list-none">
              {serviceLinks.map((label) => (
                <li key={label} className="mb-2.5 text-[13.5px]">
                  <Link href="#services" className="hover:text-orange transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white text-sm mb-4">Contact Us</h5>
            <ul className="list-none">
              <li className="mb-2.5 text-[13.5px]">📞 +91 92160 44112</li>
              <li className="mb-2.5 text-[13.5px]">📞 +91 90504 44112</li>
              <li className="mb-2.5 text-[13.5px]">✉️ info@kaluchatravels.com</li>
              <li className="mb-2.5 text-[13.5px]">
                📍 Mandi Road, Gandhi Chowk,
                <br />
                Sharki, Phagwara, Punjab 144401
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-3 py-5 text-[12.5px] text-[#86959b]">
          <span>© 2026 Kalucha Travels. All Rights Reserved.</span>
          <span>
            <Link href="#" className="ml-5 hover:text-orange transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="#" className="ml-5 hover:text-orange transition-colors">
              Privacy Policy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}