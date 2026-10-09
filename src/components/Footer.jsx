import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { memo } from "react";
import { Phone, Mail, MapPin, Globe2, RotateCcw, ChevronRight, ShieldCheck } from "lucide-react";

import rajpalLogo from "../assets/rajpal logo PNG.png";

import { categories, navLinks } from "../data/siteData";

import divineImg1 from "../assets/images/footerimages/divine-1.jpg";
import divineImg2 from "../assets/images/footerimages/divine-2.jpg";
import divineImg3 from "../assets/images/footerimages/divine-3.jpg";
import divineImg4 from "../assets/images/footerimages/divine-4.jpg";
import divineImg5 from "../assets/images/footerimages/divine-5.jpg";
import divineImg6 from "../assets/images/footerimages/divine-6.jpg";

const divineImages = [divineImg1, divineImg2, divineImg3, divineImg4, divineImg5, divineImg6];

/* ───────────────── POLICY PAGE ROUTES ─────────────────
   Dono ke liye alag page/file banao aur App.jsx mein ye routes add karo:
   <Route path="/privacy-policy" element={<PrivacyPolicy />} />
   <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} /> */
const POLICY_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Return & Exchange Policy", to: "/return-exchange-policy" },
];

/* ───────────────── ADDRESS ───────────────── */
const ADDRESS_LINES = [
  "Rajpal Products",
  "Shop No.2, Vastu Matunga Co-operative Housing Society,",
  "Laxmi Narayan Lane, Matunga C.Rly,",
  "Mumbai 400-019",
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_LINES.join(", ")
)}`;

/* ───────────────── SOCIAL LINKS ───────────────── */
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/rajpalincense81?igsi=MWduOTB5bjZqMThs",
  whatsapp: "https://wa.me/919930670044",
  linkedin: "https://www.linkedin.com/", // TODO: apna LinkedIn page URL
  facebook: "https://www.facebook.com/", // TODO: apna Facebook page URL
};

const socials = [
  {
    id: "instagram",
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[17px] w-[17px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: SOCIAL_LINKS.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const SocialIcons = memo(function SocialIcons() {
  return (
    <div className="mt-5 flex items-center gap-2.5">
      {socials.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C49B63]/25 bg-white/[0.04] text-[#EAD3A1] transition duration-300 hover:-translate-y-0.5 hover:border-[#C49B63] hover:bg-[#C49B63] hover:text-[#070201]"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
});

/* ───────────────── PAYMENT METHOD LOGOS ─────────────────
   Sab inline SVG hain (koi image file / external link nahi), isliye Vercel par bhi fast load honge.
   Naya logo add karna ho to PAYMENT_LOGOS mein ek entry daal do. */
const PAY_W = 52;
const PAY_H = 32;

const PayChip = ({ label, children }) => (
  <span
    role="img"
    aria-label={label}
    title={label}
    className="flex items-center justify-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5 "
    style={{ width: PAY_W, height: PAY_H }}
  >
    {children}
  </span>
);

const PAYMENT_LOGOS = [
  {
    label: "Visa",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <text x="26" y="21" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="16" fill="#1A1F71" letterSpacing="0.5">
          VISA
        </text>
      </svg>
    ),
  },
  {
    label: "Mastercard",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <circle cx="20" cy="16" r="9" fill="#EB001B" />
        <circle cx="32" cy="16" r="9" fill="#F79E1B" />
        <path d="M26 8.6a9 9 0 0 1 0 14.8 9 9 0 0 1 0-14.8z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    label: "American Express",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <rect width="52" height="32" fill="#2E77BB" />
        <text x="26" y="14" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="9" fill="#fff" letterSpacing="0.6">
          AMERICAN
        </text>
        <text x="26" y="24" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="9" fill="#fff" letterSpacing="0.6">
          EXPRESS
        </text>
      </svg>
    ),
  },
  {
    label: "Google Pay",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <text x="26" y="21" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#5F6368" dx="1">Pay</tspan>
        </text>
        <rect x="9" y="26" width="6" height="2" rx="1" fill="#EA4335" />
        <rect x="16" y="26" width="6" height="2" rx="1" fill="#FBBC05" />
        <rect x="23" y="26" width="6" height="2" rx="1" fill="#34A853" />
      </svg>
    ),
  },
  {
    label: "PhonePe",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <rect width="52" height="32" fill="#5F259F" />
        <circle cx="14" cy="16" r="7" fill="#fff" />
        <text x="14" y="20.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="12" fill="#5F259F">
          ₹
        </text>
        <text x="35" y="19.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="9.5" fill="#fff">
          PhonePe
        </text>
      </svg>
    ),
  },
  {
    label: "Paytm",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <text x="26" y="20.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="13" letterSpacing="-0.3">
          <tspan fill="#002E6E">pay</tspan>
          <tspan fill="#00BAF2">tm</tspan>
        </text>
      </svg>
    ),
  },
  {
    label: "UPI",
    node: (
      <svg viewBox="0 0 52 32" width={PAY_W} height={PAY_H} aria-hidden="true">
        <text x="22" y="21" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="14" fill="#3D3D3D">
          UPI
        </text>
        <path d="M36 9l5 7-5 7z" fill="#097939" />
        <path d="M41 9l5 7-5 7z" fill="#F26522" />
      </svg>
    ),
  },
];

const PaymentMethods = memo(function PaymentMethods() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 border-t border-[#C49B63]/10 pt-6 md:flex-row md:justify-between">
      <div className="text-center md:text-left">
        <p className="footer-text flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C49B63] md:justify-start">
          <ShieldCheck size={12} /> Secure Payments
        </p>
        <p className="footer-text mt-1 text-xs text-white/50">Cards, UPI &amp; wallets accepted</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-end">
        {PAYMENT_LOGOS.map((p) => (
          <PayChip key={p.label} label={p.label}>
            {p.node}
          </PayChip>
        ))}
      </div>
    </div>
  );
});

/* ───────────────── FLOATING PARTICLES ───────────────── */
const Particle = memo(function Particle({ delay, x, size }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full bg-[#C49B63] will-change-transform"
      style={{ left: `${x}%`, bottom: "0", width: size, height: size }}
      animate={{ y: [-10, -90, -10], opacity: [0, 0.7, 0], scale: [0.7, 1.3, 0.7] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
});

const particles = [
  { delay: 0, x: 10, size: 4 },
  { delay: 1, x: 24, size: 3 },
  { delay: 2, x: 45, size: 5 },
  { delay: 1.5, x: 66, size: 3 },
  { delay: 3, x: 80, size: 4 },
];

/* ───────────────── CONTACT & SUPPORT (vertical menu) ─────────────────
   title = chhota label, value = main text.
   `to` = internal page, `href` = external/WhatsApp/mailto. */
const infoTags = [
  {
    icon: Globe2,
    title: "Delivery",
    value: "Shipping Worldwide",
  },
  {
    icon: RotateCcw,
    title: "Hassle-free",
    value: "Return & Exchange Policy",
    to: "/return-exchange-policy",
  },
  {
    icon: Phone,
    title: "WhatsApp Us",
    value: "+91 99306 70044",
    href: "https://wa.me/919930670044",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@rajpalproduct.in",
    href: "mailto:info@rajpalproduct.in",
  },
];

const InfoRow = ({ icon: Icon, title, value, href, to }) => {
  const base = "group flex items-start gap-3";

  const content = (
    <>
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C49B63]/25 bg-white/[0.04] text-[#EAD3A1] transition-colors duration-300 group-hover:border-[#C49B63] group-hover:bg-[#C49B63] group-hover:text-[#070201]">
        <Icon size={14} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="footer-text block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C49B63]">
          {title}
        </span>
        <span className="footer-text mt-0.5 block break-words text-[13px] leading-5 text-white/70 transition-colors group-hover:text-[#EAD3A1]">
          {value}
        </span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={base}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={base}
      >
        {content}
      </a>
    );
  }

  return <div className={base}>{content}</div>;
};

const Footer = () => {
  const categoryHalf = Math.ceil(categories.length / 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        .footer-heading{ font-family:'Cinzel', serif; font-weight:800; letter-spacing:0.18em; }
        .footer-text{ font-family:'Inter', sans-serif; letter-spacing:0.03em; }
        .footer-brand{ font-family:'Cinzel', serif; font-weight:900; letter-spacing:0.22em; }

        .footer-root{ overflow-anchor: none; }

        .gallery-wrap{
          contain: layout paint;
          transform: translateZ(0);
        }

        .marquee-track{
          display:flex;
          width:max-content;
          gap:2rem;
          padding:0 2rem;
          will-change:transform;
          backface-visibility:hidden;
          animation: marquee-scroll 35s linear infinite;
        }
        .marquee-track:hover{ animation-play-state: paused; }

        @keyframes marquee-scroll{
          from{ transform: translate3d(0,0,0); }
          to{ transform: translate3d(-50%,0,0); }
        }

        @media (prefers-reduced-motion: reduce){
          .marquee-track{ animation: none; }
        }

        .gallery-card{ flex-shrink:0; }
      `}</style>

      <footer className="footer-root relative overflow-hidden bg-[#070201]">
        {/* GALLERY */}
        <div className="gallery-wrap relative z-20 h-[304px] overflow-hidden bg-black/60 py-8">
          <div className="marquee-track">
            {[...divineImages, ...divineImages].map((img, i) => (
              <div key={i} className="gallery-card">
                <div className="relative h-[240px] w-[360px] overflow-hidden rounded-[30px] border border-[#C49B63]/20 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <img
                    src={img}
                    alt="Divine"
                    width={360}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C49B63]/10 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <p className="footer-heading text-xs uppercase tracking-[0.3em] text-[#EAD3A1]">
                      Divine Collection
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Premium Spiritual</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AMBIENT GLOW */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[10%] top-[25%] h-96 w-96 rounded-full bg-[#7A1020]/10 blur-[100px]" />
          <div className="absolute right-[10%] top-[40%] h-80 w-80 rounded-full bg-[#C49B63]/10 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-60 w-[650px] -translate-x-1/2 rounded-full bg-[#C49B63]/5 blur-[80px]" />
        </div>

        {/* PARTICLES */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {particles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 pb-5 pt-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.8fr_1.3fr_1.3fr]">
            {/* BRAND */}
            <div>
              <div className="relative mb-3 h-12 w-40 sm:h-14 sm:w-44">
                <img src={rajpalLogo} alt="Rajpal Products" className="h-full w-full object-contain drop-shadow-sm" />
              </div>
              <div className="mb-4 h-px w-24 bg-gradient-to-r from-[#C49B63]/60 to-transparent" />
              <p className="footer-text text-sm leading-6 text-white/55">
                Premium spiritual fragrance collections crafted with devotion, heritage and timeless Indian elegance since 1981.
              </p>
              <SocialIcons />
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="footer-heading mb-5 text-xs uppercase text-[#EAD3A1]">Quick Links</h4>
              <div className="space-y-2.5">
                {navLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="footer-text block text-sm text-white/55 transition hover:text-[#EAD3A1]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* POLICIES — alag pages */}
              <h4 className="footer-heading mb-4 mt-7 text-xs uppercase text-[#EAD3A1]">Policies</h4>
              <div className="space-y-2.5">
                {POLICY_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="footer-text block text-sm text-white/55 transition hover:text-[#EAD3A1]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CATEGORIES — 2 vertical columns, no scroll */}
            <div>
              <h4 className="footer-heading mb-5 text-xs uppercase text-[#EAD3A1]">Categories</h4>
              <div className="grid grid-cols-2 gap-x-6">
                {[categories.slice(0, categoryHalf), categories.slice(categoryHalf)].map((col, ci) => (
                  <div key={ci} className="space-y-2.5">
                    {col.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/categories/${cat.slug}`}
                        className="footer-text block break-words text-sm text-white/55 transition hover:text-[#EAD3A1]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* VISIT US */}
            <div>
              <h4 className="footer-heading mb-5 text-xs uppercase text-[#EAD3A1]">Visit Us</h4>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C49B63]/20 bg-white/[0.04]">
                  <MapPin size={13} className="text-[#EAD3A1]" />
                </span>
                <address className="footer-text text-sm not-italic leading-6 text-white/55">
                  {ADDRESS_LINES.map((line, i) => (
                    <span key={line} className={`block ${i === 0 ? "font-semibold text-white/80" : ""}`}>
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-text mt-3 inline-flex items-center gap-2 border-b border-[#C49B63]/40 pb-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAD3A1] transition hover:border-[#EAD3A1]"
              >
                Get Directions
              </a>
            </div>

            {/* CONTACT & SUPPORT — vertical menu */}
            <div>
              <h4 className="footer-heading mb-5 text-xs uppercase text-[#EAD3A1]">Contact Us</h4>
              <div className="space-y-4">
                {infoTags.map((tag) => (
                  <InfoRow key={tag.title} {...tag} />
                ))}
              </div>
            </div>
          </div>

          {/* SECURE PAYMENTS — horizontal strip */}
          <PaymentMethods />

          {/* BOTTOM BAR */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[#C49B63]/10 pt-4 md:flex-row">
            <p className="footer-text text-[10px] tracking-[0.15em] text-white/35">
              © {new Date().getFullYear()} RAJPAL PRODUCTS | PURELY DIVINE
            </p>

            <p className="footer-text text-[10px] tracking-[0.12em] text-white/35">
              Made by{" "}
              <a
                href="https://creadordesigns.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C49B63] transition hover:text-[#EAD3A1]"
              >
                Creador Designs
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;