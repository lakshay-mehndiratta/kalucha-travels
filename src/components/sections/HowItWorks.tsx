import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  FaComments,
  FaLocationDot,
  FaFileLines,
  FaSuitcaseRolling,
} from "react-icons/fa6";

const steps = [
  {
    icon: FaComments,
    title: "Consultation",
    description: "Share your travel plans with our experts.",
  },
  {
    icon: FaLocationDot,
    title: "Choose Destination",
    description: "Pick your dream destination — we guide you.",
  },
  {
    icon: FaFileLines,
    title: "Visa Processing",
    description: "We handle documentation and visa processing.",
  },
  {
    icon: FaSuitcaseRolling,
    title: "Travel Confidently",
    description: "Pack your bags and enjoy a hassle-free trip.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream py-20">
      <Container>
        <div className="text-left mb-12">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="text-[34px] leading-tight text-navy">
            Your Journey in{" "}
            <span className="text-orange">4 Easy Steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-5 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative bg-white border border-line rounded-brand px-5 py-[26px]"
              >
                <div className="w-[30px] h-[30px] rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold mb-9">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute top-[22px] right-5 w-10 h-10 rounded-[10px] bg-[#fdece2] text-orange flex items-center justify-center text-lg">
                  <Icon />
                </div>
                <h4 className="text-base text-navy mb-1.5">{step.title}</h4>
                <p className="text-[13px] text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}