import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import Logo from "@/components/ui/Logo";

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
    <footer id="contact" className="bg-navy-deep text-[#c7d1d5] pt-10 lg:pt-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-8 lg:gap-[30px] pb-8 lg:pb-11 border-b border-white/10">
          <div>
            <Logo variant="footer" />
            <p className="text-[13.5px] max-w-full sm:max-w-[260px] mt-3.5 mb-5 text-[#a9b6bc]">
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
                    className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-[13px] hover:bg-white/[0.16] transition-colors"
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

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 py-5 text-[12.5px] text-[#86959b] text-center sm:text-left">
          <span>© 2026 Kalucha Travels. All Rights Reserved.</span>
          <span>
            <Link href="#" className="ml-0 sm:ml-5 mr-5 sm:mr-0 hover:text-orange transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="#" className="ml-0 sm:ml-5 hover:text-orange transition-colors">
              Privacy Policy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}