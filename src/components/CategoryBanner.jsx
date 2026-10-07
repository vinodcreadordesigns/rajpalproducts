import { Sparkles } from "lucide-react";

// ── Main banner — plain black text, centered, no background, no color fills ─
const CategoryBanner = ({
  title = "Agarbatti",
}) => (
  <section className="relative mb-10 flex flex-col items-center px-2 pt-4 pb-8 text-center text-black md:pt-6 md:pb-10">
    {/* Eyebrow tag */}
    <div className="mb-5 flex items-center gap-2">
      <Sparkles size={13} className="text-black" />
      <span className="text-[11px] font-bold uppercase tracking-[0.32em]">
        Divine Collection
      </span>
    </div>

    {/* Title */}
    <h1
      className="text-[1.8rem] font-black leading-[1.1] tracking-tight md:text-[2.4rem]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {title}
    </h1>

    {/* Ornamental divider */}
    <div className="mt-6 flex items-center justify-center gap-3">
      <div className="h-px w-10 bg-black/40" />
      <svg width="9" height="9" viewBox="0 0 10 10">
        <path d="M5 0L10 5L5 10L0 5Z" fill="black" />
      </svg>
      <div className="h-px w-10 bg-black/40" />
    </div>
  </section>
);

export default CategoryBanner;