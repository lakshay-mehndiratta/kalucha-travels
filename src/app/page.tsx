import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Services from "@/components/sections/Services";
import Destinations from "@/components/sections/Destinations";
import StatsBand from "@/components/sections/StatsBand";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Services />
      <Destinations />
      <StatsBand />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}