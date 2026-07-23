import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

const destinations = [
  {
    name: "Dubai",
    slug: "dubai",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80&auto=format",
  },
  {
    name: "Singapore",
    slug: "singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80&auto=format",
  },
  {
    name: "Canada",
    slug: null,
    image:
      "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&q=80&auto=format",
  },
  {
    name: "United Kingdom",
    slug: null,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80&auto=format",
  },
  {
    name: "Thailand",
    slug: null,
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80&auto=format",
  },
  {
    name: "Australia",
    slug: null,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80&auto=format",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="bg-cream py-14 lg:py-20">
      <Container>
        <div className="flex justify-between items-end gap-5 flex-wrap mb-8 lg:mb-10">
          <div>
            <Eyebrow>Top Destinations</Eyebrow>
            <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] leading-tight text-navy">
              Explore the World With{" "}
              <span className="text-orange">Kalucha</span>
            </h2>
          </div>
          <Button href="#" variant="outline-dark" className="text-sm">
            View All Destinations →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              href={dest.slug ? `/destinations/${dest.slug}` : "#"}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] block"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"
                className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),transparent_55%)]" />
              <span className="absolute bottom-3 left-3 z-10 text-white font-bold text-[13px] sm:text-sm">
                {dest.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}