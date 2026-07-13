import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Services from "@/components/sections/Services";
import Destinations from "@/components/sections/Destinations";
import StatsBand from "@/components/sections/StatsBand";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Services />
      <Destinations />
      <StatsBand />
    </main>
  );
}