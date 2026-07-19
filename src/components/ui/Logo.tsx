import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/kalucha_travels_logo.png";

type LogoProps = {
  variant?: "header" | "footer";
};

export default function Logo({ variant = "header" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={logo}
        alt="Kalucha Travels"
        className={`w-auto rounded-lg ${
          isFooter ? "h-12" : "h-10"
        }`}
        priority
      />

      <div className="leading-none">
        <h2
          className={`font-bold ${
            isFooter
              ? "text-[18px] text-white"
              : "text-[16px] text-navy"
          }`}
        >
          Kalucha
        </h2>

        <p
          className={`mt-0.5 uppercase tracking-[0.22em] ${
            isFooter
              ? "text-[10px] text-gray-300"
              : "text-[10px] text-gray-500"
          }`}
        >
          Travels
        </p>
      </div>
    </Link>
  );
}