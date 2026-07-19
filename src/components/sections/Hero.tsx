import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";

const avatarImages = [
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80&auto=format",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format",
];

export default function Hero() {
  return (
    <div className="relative min-h-160 text-white overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80&auto=format"
        alt="Traveler at an airport"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,25,35,0.88)_8%,rgba(10,25,35,0.55)_45%,rgba(10,25,35,0.15)_75%)]" />

      <Header />

      <Container className="relative z-3 pt-17.5 pb-15">
        <div className="inline-flex items-center gap-2 text-[#ffb083] text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 before:content-[''] before:w-5.5 before:h-0.5 before:bg-orange before:inline-block">
          Your Journey, Our Expertise
        </div>
        <h1 className="text-[52px] leading-[1.08] max-w-160 mb-5">
          Your Journey Begins With <span className="text-orange">Trusted</span> Visa Experts
        </h1>
        <p className="max-w-120 text-[#e7edf0] text-base mb-8">
          Visa assistance, international tours, holiday packages, flight
          bookings, hotel reservations and more — all under one roof, from
          Phagwara to the world.
        </p>
        <div className="flex gap-3.5 mb-14">
          <Button href="/flights" variant="primary">
            Book Flights →
          </Button>
          <Button href="#packages" variant="outline-light">
            Explore Packages →
          </Button>
        </div>

        <div className="inline-flex items-center gap-3.5 bg-white/8 border border-white/25 px-5 py-3 rounded-2xl backdrop-blur-sm">
          <div className="flex">
            {avatarImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={36}
                height={36}
                className={`w-9 h-9 rounded-full border-2 border-navy object-cover ${
                  i !== 0 ? "-ml-2.5" : ""
                }`}
              />
            ))}
          </div>
          <div>
            <div className="font-bold text-orange text-[15px]">
              5000+{" "}
              <span className="font-normal text-xs text-[#d7dee1]">
                Happy Travellers
              </span>
            </div>
            <div className="flex gap-0.5 text-orange text-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}