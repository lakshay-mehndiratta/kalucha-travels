export default function ExportButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 bg-navy text-white text-[13px] sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-navy-deep transition-colors whitespace-nowrap"
    >
      Export to Excel ↓
    </a>
  );
}