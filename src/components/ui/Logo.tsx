import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/kalucha_travels_logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={logo}
        alt="Kalucha Travels"
        className="h-10 w-auto rounded-lg"
        priority
      />

      <div className="leading-none">
        <h2 className="text-[15px] sm:text-[16px] font-bold text-navy">
          Kalucha
        </h2>
        <p className="text-[10px] tracking-[0.22em] uppercase text-gray-500 mt-0.5">
          Travels
        </p>
      </div>
    </Link>
  );
}