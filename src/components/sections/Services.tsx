import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  FaPassport,
  FaUmbrellaBeach,
  FaPlane,
  FaHotel,
  FaShip,
  FaShieldHalved,
  FaBriefcase,
  FaMapLocationDot,
} from "react-icons/fa6";

const services = [
  {
    icon: FaPassport,
    title: "Visa Assistance",
    description:
      "Hassle-free visa guidance for tourist, student and work visas.",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Holiday Packages",
    description:
      "Customized holiday packages for couples, families and groups.",
  },
  {
    icon: FaPlane,
    title: "Flight Booking",
    description:
      "Domestic and international flight bookings at the best prices.",
  },
  {
    icon: FaHotel,
    title: "Hotel Booking",
    description:
      "Handpicked hotels for comfortable and memorable stays worldwide.",
  },
  {
    icon: FaShip,
    title: "Cruise Booking",
    description:
      "Luxury cruises to explore destinations by sea with world-class comfort.",
  },
  {
    icon: FaShieldHalved,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance for a worry-free journey.",
  },
  {
    icon: FaBriefcase,
    title: "Corporate Travel",
    description: "End-to-end corporate travel management for businesses.",
  },
  {
    icon: FaMapLocationDot,
    title: "Sightseeing Planning",
    description:
      "Curated sightseeing experiences and local tours at top destinations.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#f3ede3] py-20">
      <Container>
        <div className="flex justify-between items-end gap-5 flex-wrap mb-10">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="text-[34px] leading-tight max-w-[420px] text-navy">
              Travel Solutions Tailored for{" "}
              <span className="text-orange">You</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[18px]">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white border border-line rounded-brand px-5 py-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(14,42,58,0.08)]"
              >
                <div className="w-[42px] h-[42px] rounded-[10px] bg-orange text-white flex items-center justify-center text-[19px] mb-4">
                  <Icon />
                </div>
                <h4 className="text-[16.5px] text-navy mb-2">
                  {service.title}
                </h4>
                <p className="text-[13.5px] text-muted mb-3.5 min-h-[52px]">
                  {service.description}
                </p>
                <div className="text-[13px] font-bold text-orange-dark">
                  Learn More →
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}