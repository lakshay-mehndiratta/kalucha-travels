import { ReactNode } from "react";

export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-orange-dark text-[13px] font-bold uppercase tracking-[0.12em] mb-3.5 before:content-[''] before:w-[22px] before:h-0.5 before:bg-orange before:inline-block ${className}`}
    >
      {children}
    </div>
  );
}