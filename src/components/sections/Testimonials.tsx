import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const testimonials = [
  {
    quote:
      "Kalucha Travels made my Europe trip absolutely seamless. From visa to hotel bookings, everything was perfectly arranged.",
    name: "Ankit Sharma",
    detail: "Visited Europe",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80&auto=format",
  },
  {
    quote:
      "Highly professional team and quick visa processing. Got my Canada visa without any hassle. Thank you Kalucha Travels!",
    name: "Priya Mehta",
    detail: "Visited Canada",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format",
  },
  {
    quote:
      "Our family vacation to Singapore was amazing. Great package, excellent support and memorable experience.",
    name: "Neha & Family",
    detail: "Visited Singapore",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy-deep text-white py-14 lg:py-20">
      <Container>
        <div className="mb-8 lg:mb-10">
          <Eyebrow className="text-[#ffb083]">What Our Clients Say</Eyebrow>
          <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] leading-tight text-white">
            Stories from Happy <span className="text-orange">Travellers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-brand p-6 sm:p-[26px]"
            >
              <span className="block text-orange text-[28px] font-serif mb-2.5">
                &quot;
              </span>
              <p className="text-sm text-[#d7dee1] mb-[22px] min-h-0 sm:min-h-[80px]">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <b className="block text-sm">{t.name}</b>
                  <span className="text-xs text-[#a9b6bc]">{t.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}