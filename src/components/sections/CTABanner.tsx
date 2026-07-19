import Image from "next/image";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <div id="apply" className="max-w-[1152px] mx-auto mb-14 lg:mb-20 px-4 sm:px-6">
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-[50px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-white">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format"
          alt="Airplane in the sky"
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,25,35,0.9),rgba(10,25,35,0.55))]" />

        <div>
          <h3 className="text-[24px] sm:text-[27px] lg:text-[30px] leading-tight max-w-full lg:max-w-[360px]">
            Ready for Your Next{" "}
            <span className="text-[#ff9d5c]">Adventure?</span>
          </h3>
          <p className="max-w-full lg:max-w-[280px] text-[#d7dee1] text-sm mt-2">
            Apply for your visa today and let us take care of the rest.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 w-full lg:w-auto">
          <Button href="#" variant="primary" className="justify-center">
            Apply for Visa →
          </Button>
          <Button href="tel:+919216044112" variant="outline-light" className="justify-center">
            Call Us Now →
          </Button>
        </div>
      </div>
    </div>
  );
}