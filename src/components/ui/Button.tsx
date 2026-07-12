import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "outline-light" | "outline-dark";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-orange text-white hover:bg-orange-dark",
  "outline-light":
    "bg-transparent text-white border border-white/50 hover:bg-white/10",
  "outline-dark":
    "bg-transparent text-navy border border-navy hover:bg-navy hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-[26px] py-[14px] text-[15px]",
  sm: "px-5 py-[11px] text-sm",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}