import Image from "next/image";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <div id="apply" className="max-w-[1152px] mx-auto mb-20 px-6">
      <div className="relative rounded-3xl overflow-hidden p-[50px] flex justify-between items-center flex-wrap gap-6 text-white">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format"
          alt="Airplane in the sky"
          fill
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,25,35,0.9),rgba(10,25,35,0.55))]" />

        <div>
          <h3 className="text-[30px] leading-tight max-w-[360px]">
            Ready for Your Next{" "}
            <span className="text-[#ff9d5c]">Adventure?</span>
          </h3>
          <p className="max-w-[280px] text-[#d7dee1] text-sm mt-2">
            Apply for your visa today and let us take care of the rest.
          </p>
        </div>

        <div className="flex gap-3.5">
          <Button href="#" variant="primary">
            Apply for Visa →
          </Button>
          <Button href="tel:+919216044112" variant="outline-light">
            Call Us Now →
          </Button>
        </div>
      </div>
    </div>
  );
}