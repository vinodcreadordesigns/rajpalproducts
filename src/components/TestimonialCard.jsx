import { BadgeCheck, Star } from "lucide-react";

/* =====================================================================
   TestimonialCard.jsx  — Google-review style (mobile responsive)
   Default export : TestimonialCard  (single review card)
   Named exports  : GoogleG, GoogleWordmark, Stars, ReviewSummary
   ===================================================================== */

/* ---------- Google "G" logo (official colours) ---------- */
export function GoogleG({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

/* ---------- Google wordmark ---------- */
export function GoogleWordmark({ className = "" }) {
  const letters = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span
      className={`select-none font-medium leading-none ${className}`}
      style={{ fontFamily: "'Product Sans', 'Poppins', Arial, sans-serif" }}
      aria-label="Google"
    >
      {letters.map(([ch, color], i) => (
        <span key={i} style={{ color }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ---------- Star row ----------
   size = mobile size, smSize = size from the sm breakpoint up (optional) */
export function Stars({ rating = 5, size = 18, smSize }) {
  const sm = smSize ?? size;
  return (
    <div
      className="flex shrink-0 items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          strokeWidth={0}
          fill={i < rating ? "#FBBC05" : "#e5ded2"}
          className="star-resp"
          style={{ "--s": `${size}px`, "--s-sm": `${sm}px` }}
        />
      ))}
      <style>{`
        .star-resp { width: var(--s); height: var(--s); }
        @media (min-width: 640px) {
          .star-resp { width: var(--s-sm); height: var(--s-sm); }
        }
      `}</style>
    </div>
  );
}

/* ---------- Summary block: EXCELLENT / stars / Based on N reviews ---------- */
export function ReviewSummary({ total = 98 }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <p className="text-[20px] font-bold uppercase tracking-wide text-[#c9a96a] sm:text-[24px]">
        Excellent
      </p>
      <div className="mt-1.5">
        <Stars rating={5} size={22} smSize={26} />
      </div>
      <p className="mt-1.5 text-[13px] text-[#222] sm:text-[14px]">
        Based on <span className="font-bold">{total} reviews</span>
      </p>
      <GoogleWordmark className="mt-1 text-[28px] sm:text-[34px]" />
    </div>
  );
}

/* ---------- Single review card ----------
   item = { name, time, rating, text, photo?, initial?, avatarColor? } */
const TestimonialCard = ({ item }) => {
  const initial = item.initial || item.name?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <article className="flex h-full w-full min-w-0 flex-col rounded-xl bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.08)] min-h-[170px] sm:min-h-[200px] sm:p-5">
      <header className="flex items-start gap-2.5 sm:gap-3">
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.name}
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
          />
        ) : (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-medium text-white sm:h-10 sm:w-10 sm:text-lg"
            style={{ backgroundColor: item.avatarColor || "#7a1020" }}
          >
            {initial}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-semibold leading-tight text-[#111] sm:text-[14px]">
            {item.name}
          </p>
          <p className="mt-0.5 text-[12px] leading-tight text-[#8a8a8a] sm:text-[12.5px]">
            {item.time}
          </p>
        </div>

        <GoogleG size={20} className="sm:h-[22px] sm:w-[22px]" />
      </header>

      <div className="mt-2.5 flex items-center gap-1.5">
        <Stars rating={item.rating ?? 5} size={15} smSize={17} />
        <BadgeCheck
          size={16}
          className="shrink-0 text-white"
          fill="#4285F4"
          strokeWidth={2}
          aria-label="Verified review"
        />
      </div>

      <p className="mt-2 break-words text-[14px] leading-6 text-[#222] sm:text-[14.5px]">
        {item.text}
      </p>
    </article>
  );
};

export default TestimonialCard;