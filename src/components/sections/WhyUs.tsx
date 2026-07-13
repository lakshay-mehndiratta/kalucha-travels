import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const stats = [
  { icon: "◆", value: "5+ Yrs", label: "In Business" },
  { icon: "✦", value: "100+", label: "Destinations" },
  { icon: "✓", value: "IATA", label: "Approved Agency" },
];

export default function WhyUs() {
  return (
    <section id="about" className="bg-cream py-20">
      <Container className="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        <div>
          <Eyebrow>Why Kalucha Travels</Eyebrow>
          <h2 className="text-[36px] leading-tight max-w-120 mb-4 text-navy">
            Trusted by Thousands, Chosen for a{" "}
            <span className="text-orange">Reason</span>
          </h2>
          <p className="text-[15.5px] text-muted max-w-115 mb-8">
            Based in Phagwara, Punjab, Kalucha Travels is an IATA-approved
            agency that has spent over 5 years simplifying travel for people
            across Punjab and beyond. From visa approvals to unforgettable
            holidays, we handle it all with care and expertise.
          </p>
          <div className="flex gap-3.5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 flex items-center gap-3 bg-white border border-line rounded-xl px-4.5 py-4"
              >
                <div className="w-9.5 h-9.5 rounded-[9px] bg-[#fdece2] text-orange flex items-center justify-center text-lg shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <b className="block text-base text-navy font-serif">
                    {stat.value}
                  </b>
                  <span className="text-[11.5px] text-muted">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1.1fr_1fr] gap-3.5">
          <div className="relative row-span-2 h-full rounded-brand overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=700&q=80&auto=format"
              alt="Passport and visa documents"
              fill
              sizes="(max-width: 1024px) 100vw, 610px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="relative h-42.5 rounded-brand overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80&auto=format"
                alt="Airplane in the sky"
                fill
                sizes="(max-width: 1024px) 100vw, 490px"
                className="object-cover"
              />
            </div>
            <div className="relative h-42.5 rounded-brand overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80&auto=format"
                alt="Family walking through airport"
                fill
                sizes="(max-width: 1024px) 100vw, 490px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}