import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/kalucha_travels_logo.png";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="Kalucha Travels"
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}