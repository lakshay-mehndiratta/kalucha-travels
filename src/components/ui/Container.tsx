import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-page mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}