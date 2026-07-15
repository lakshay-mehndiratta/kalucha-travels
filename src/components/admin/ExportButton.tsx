export default function ExportButton() {
  return (
    <a
      href="/api/enquiries/export"
      className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-navy-deep transition-colors"
    >
      Export to Excel ↓
    </a>
  );
}