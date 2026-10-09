import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Handshake,
  Leaf,
  Award,
  ShieldCheck,
  Sparkles,
  MapPin,
  Star,
  Flame,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import FAQAccordion from "../components/FAQAccordion";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard, { ReviewSummary } from "../components/TestimonialCard";

import { categories, faqs, productCatalog } from "../data/siteData";
import DhoopBattiImage from "../assets/images/BB-DhoopBatti.jpg";
import BrandHeritage from "../assets/images/brand-heritage.jpg";
import GiftBanner from "../assets/images/gift-banner.jpg"; // banner background image

// import rajpalsince from "../assets/imagesince/rajpalsince.png";

/* ---------- HOT SELLING PRODUCTS ----------
   Real products siteData.js ke productCatalog se aate hain.
   Kaun se products dikhane hain, yeh HOT_PICKS se decide hota hai:
     category = category ka slug   (jaise "incense-sticks")
     id       = product ka id      (naam ka slug, jaise "premium-oudh")
     badge    = card par dikhne wala tag
     series   = card par naam ke upar dikhne wala series label
   Product badalna ho to bas category + id badal do. */
const HOT_PICKS = [
  // Nature's Bouquet Natural-Incense
  { category: "natural-incense", id: "kasturi-mystique", series: "Nature's Bouquet", badge: "Best Seller" },
  { category: "natural-incense", id: "kapoor-pure",      series: "Nature's Bouquet", badge: "Trending" },
  { category: "natural-incense", id: "lotus-bloom",      series: "Nature's Bouquet", badge: "Hot" },

  // Exotic series
  { category: "incense-sticks",  id: "exotic-rose",      series: "Exotic Series",    badge: "Best Seller" },
  { category: "incense-sticks",  id: "exotic-oudh",      series: "Exotic Series",    badge: "Trending" },
  { category: "incense-sticks",  id: "exotic-bakhoor",   series: "Exotic Series",    badge: "Hot" },

  // Premium series
  { category: "incense-sticks",  id: "premium-khus",     series: "Premium Series",   badge: "Best Seller" },
  { category: "incense-sticks",  id: "premium-kesar",    series: "Premium Series",   badge: "Trending" },

  // Ultra Premium series
  { category: "incense-sticks",  id: "ultra-premium-javadhu",    series: "Ultra Premium", badge: "Hot" },
  { category: "incense-sticks",  id: "ultra-premium-royal-rich", series: "Ultra Premium", badge: "Best Seller" },
];

// MegaMenu jaisa hi anchor, taaki card click par category page ke
// sahi section par scroll ho
const toAnchor = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const buildHotItem = (product, section, categorySlug, badge, series) => {
  const cat = categories.find((c) => c.slug === categorySlug);
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 1;
  return {
    key: `${categorySlug}-${product.id}`,
    name: product.name,
    image: product.image,
    imageHover: product.imageHover,
    price: product.price,
    weight: hasVariants
      ? product.variants.map((v) => v.weight).join(" / ")
      : product.weight,
    hasVariants,
    category: series || cat?.name,
    badge,
    href: `/categories/${categorySlug}#${toAnchor(section.title)}`,
  };
};

const getHotProducts = () => {
  const items = HOT_PICKS.map((pick) => {
    const sections = productCatalog?.[pick.category]?.sections || [];
    for (const section of sections) {
      const product = section.products.find((x) => x.id === pick.id);
      if (product) {
        return buildHotItem(product, section, pick.category, pick.badge, pick.series);
      }
    }
    return null;
  }).filter(Boolean);

  // safety: koi id match na ho to har category ka pehla product bhar do
  if (items.length < HOT_PICKS.length) {
    const used = new Set(items.map((i) => i.key));
    for (const cat of categories) {
      if (items.length >= HOT_PICKS.length) break;
      const section = productCatalog?.[cat.slug]?.sections?.[0];
      const product = section?.products?.[0];
      if (product && !used.has(`${cat.slug}-${product.id}`)) {
        items.push(buildHotItem(product, section, cat.slug, "Hot"));
      }
    }
  }
  return items;
};

function HotProductCard({ product, index, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index < 6 ? index * 0.1 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        to={product.href}
        className="
          group relative flex h-full flex-col overflow-hidden
          border border-[#7a1020]/15 bg-white
          transition-all duration-500
          hover:-translate-y-2
          hover:border-[#b68a35]
          hover:shadow-[0_24px_50px_rgba(122,16,32,0.18)]
        "
      >
        {/* IMAGE — hover par dusri photo fade hoti hai */}
        <div className="relative aspect-square overflow-hidden bg-[#f5f0ea]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={product.imageHover || product.image}
            alt={`${product.name} - alternate view`}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
          />

          {/* BADGE (square tag) */}
          <span
            className="
              hot-badge absolute left-0 top-4 z-10
              inline-flex items-center gap-1.5
              px-3 py-1.5
              text-[10px] font-bold uppercase tracking-[0.14em]
              text-white shadow-md
            "
          >
            <Flame size={11} strokeWidth={2.5} />
            {product.badge}
          </span>
        </div>

        {/* INFO */}
        <div className="flex flex-1 flex-col border-t border-[#7a1020]/10 p-3 sm:p-4">
          {/* 5 STAR RATING — ek ek karke pop hote hain */}
          <div
            className="mb-2 flex items-center gap-0.5"
            aria-label="Rated 5 out of 5 stars"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: (index < 6 ? index * 0.1 : 0) + 0.4 + i * 0.07,
                  ease: "backOut",
                }}
                className="inline-flex"
              >
                <Star size={15} strokeWidth={0} fill="#FBBC05" />
              </motion.span>
            ))}
            <span className="ml-1.5 text-[11px] font-semibold text-[#9c8a6f]">
              5.0
            </span>
          </div>

          {product.category && (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#b68a35]">
              {product.category}
            </p>
          )}

          <h3 className="text-[15px] font-semibold capitalize leading-snug text-[#2f1b00] transition-colors duration-300 group-hover:text-[#7a1020] sm:text-base">
            {product.name}
          </h3>

          {product.weight && (
            <p className="mt-0.5 text-xs text-[#9c8a6f]">{product.weight}</p>
          )}

          <p className="mt-1 text-sm font-bold text-[#7a1020]">
            {product.hasVariants ? "From " : ""}
            {product.price}
          </p>

          <span
            className="
              mt-auto inline-flex items-center gap-1 pt-3 sm:pt-4
              text-[11px] font-semibold uppercase tracking-[0.18em]
              text-[#7a1020]
            "
          >
            View Product
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
            />
          </span>
        </div>

        {/* gold line that draws across the bottom on hover */}
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#7a1020] to-[#b68a35] transition-all duration-500 group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

/* ---------- Auto-stepping carousel: scroll -> stop -> scroll ----------
   - Har STEP_EVERY_MS par ek card aage badhta hai, beech mein ruk jata hai
   - End par pahunchne par smoothly wapas shuru
   - Mouse/touch/keyboard focus par auto-scroll ruk jata hai
   - Screen se bahar ho ya tab hidden ho to bhi ruk jata hai
   - "Reduce motion" on ho to auto-scroll band (arrows aur swipe chalte hain) */
const STEP_EVERY_MS = 2600; // ek card ke baad kitni der ruke (ms)

function HotScroller({ products, reduceMotion }) {
  const wrapRef = useRef(null);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const resumeTimer = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const stepSize = () => {
    const el = scrollRef.current;
    const first = el?.firstElementChild;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    return first.getBoundingClientRect().width + gap;
  };

  const advance = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: stepSize(), behavior: "smooth" });
    }
  };

  const manual = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * stepSize() * 2, behavior: "smooth" });
  };

  const pause = () => {
    clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  };
  const resume = (delay = 400) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  };

  // auto step
  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      if (pausedRef.current || !visibleRef.current || document.hidden) return;
      advance();
    }, STEP_EVERY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // sirf tab chale jab section screen par ho
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    updateEdges();
    return () => clearTimeout(resumeTimer.current);
  }, []);

  const arrowClass = `
    absolute top-[42%] z-20 -translate-y-1/2
    flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
    bg-white/95 backdrop-blur-md
    border border-[#7a1020]/20
    text-[#7a1020]
    shadow-[0_10px_30px_rgba(122,16,32,0.18)]
    transition-all duration-300
    hover:bg-[#7a1020] hover:text-white hover:scale-110
    disabled:opacity-0 disabled:pointer-events-none
  `;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={() => resume(400)}
      onTouchStart={pause}
      onTouchEnd={() => resume(3000)}
      onFocus={pause}
      onBlur={() => resume(400)}
    >
      <button
        onClick={() => manual(-1)}
        disabled={atStart}
        aria-label="Scroll products left"
        className={`${arrowClass} left-0 -translate-x-1 sm:-translate-x-5`}
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <div
        ref={scrollRef}
        onScroll={updateEdges}
        className="hide-scrollbar flex gap-4 sm:gap-5 snap-x snap-mandatory overflow-x-auto pb-2 pt-2"
      >
        {products.map((product, index) => (
          <div
            key={product.key}
            className="
              shrink-0 snap-start
              basis-[calc(50%_-_8px)]
              sm:basis-[calc(33.333%_-_14px)]
              lg:basis-[calc(20%_-_16px)]
            "
          >
            <HotProductCard
              product={product}
              index={index}
              reduceMotion={reduceMotion}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => manual(1)}
        disabled={atEnd}
        aria-label="Scroll products right"
        className={`${arrowClass} right-0 translate-x-1 sm:translate-x-5`}
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function HotSellingProducts() {
  const reduceMotion = useReducedMotion();
  const products = getHotProducts();

  if (!products.length) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:py-12">
      {/* HEADING */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-6 text-center sm:mb-8"
      >
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7a1020] sm:mb-4 sm:text-sm sm:tracking-[0.35em]">
          <motion.span
            animate={
              reduceMotion ? undefined : { y: [0, -3, 0], scale: [1, 1.15, 1] }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <TrendingUp size={18} />
          </motion.span>
          Tranding Products
        </p>

        <h2 className="section-heading text-[28px] sm:text-[38px] md:text-[48px]">
          Customer Favourites
        </h2>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-4 h-[3px] w-32 origin-center bg-gradient-to-r from-[#7a1020] via-[#b68a35] to-[#7a1020] sm:mt-6 sm:w-40"
        />
      </motion.div>

      {/* PRODUCTS — auto-stepping carousel */}
      <HotScroller products={products} reduceMotion={reduceMotion} />
    </section>
  );
}

/* ---------- Capsule-style category card (matches reference layout) ---------- */
function CategoryCapsule({ category }) {
  const label = category.name || category.title || category.label;
  const image = category.image || category.img || category.thumbnail;
  const href = category.slug ? `/categories/${category.slug}` : "/products";

  return (
    <Link
      to={href}
      className="group flex shrink-0 snap-start flex-col items-center gap-3 sm:gap-4 w-[112px] sm:w-[150px] lg:w-[186px] cursor-pointer"
    >
      <div
        className="
          relative overflow-hidden
          h-[210px] w-[112px]
          sm:h-[280px] sm:w-[150px]
          lg:h-[340px] lg:w-[186px]
          rounded-full
          border-[3px] border-white
          shadow-[0_18px_45px_rgba(122,16,32,0.16)]
          transition-all duration-500
          group-hover:-translate-y-2
          group-hover:shadow-[0_28px_60px_rgba(122,16,32,0.28)]
        "
      >
        <img
          src={image}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#7a1020]/10" />
      </div>

      <p className="lux-font text-center text-[13px] sm:text-[15px] font-semibold leading-snug text-[#3d2200] transition-colors duration-300 group-hover:text-[#7a1020]">
        {label}
      </p>
    </Link>
  );
}

/* ---------- Horizontal scroller with left/right controls ---------- */
function CategoryScroller({ items }) {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(updateEdges, 400);
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        disabled={atStart}
        aria-label="Scroll categories left"
        className="
          absolute left-0 top-1/2 z-20 -translate-y-1/2
          -translate-x-1 sm:-translate-x-4
          flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
          rounded-full
          bg-white/90 backdrop-blur-md
          border border-[#7a1020]/15
          text-[#7a1020]
          shadow-[0_10px_30px_rgba(122,16,32,0.18)]
          transition-all duration-300
          hover:bg-[#7a1020] hover:text-white hover:scale-110
          disabled:opacity-0 disabled:pointer-events-none
        "
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <div
        ref={scrollRef}
        onScroll={updateEdges}
        className="
          hide-scrollbar
          flex gap-4 sm:gap-7 lg:gap-9
          overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          px-3 sm:px-4 py-2
        "
      >
        {items.map((category) => (
          <CategoryCapsule key={category.slug} category={category} />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        disabled={atEnd}
        aria-label="Scroll categories right"
        className="
          absolute right-0 top-1/2 z-20 -translate-y-1/2
          translate-x-1 sm:translate-x-4
          flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
          rounded-full
          bg-white/90 backdrop-blur-md
          border border-[#7a1020]/15
          text-[#7a1020]
          shadow-[0_10px_30px_rgba(122,16,32,0.18)]
          transition-all duration-300
          hover:bg-[#7a1020] hover:text-white hover:scale-110
          disabled:opacity-0 disabled:pointer-events-none
        "
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* ---------- ACTION BUTTON (sabhi buttons ke liye same style + animation) ----------
   - gold pulse ring + shine sweep + arrow (hover par slide)
   - `to` do to <Link> banega, `onClick` do to <button>
   - spacing ke liye className se margin pass karo (jaise "mt-6") */
function ActionButton({ to, onClick, children, className = "" }) {
  const base =
    "banner-btn group/btn relative inline-flex w-fit items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#7a1020] to-[#4a0712] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white transition duration-500 hover:scale-105 sm:px-8 sm:py-4 sm:text-sm";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <ArrowUpRight
        size={16}
        className="relative z-10 shrink-0 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1"
      />
      {/* shine sweep */}
      <span className="banner-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`}>
      {inner}
    </button>
  );
}

/* ---------- PREMIUM COLLECTIONS BANNER ----------
   Full-width background image + black overlay, content bich mein */
function PremiumBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full py-6 sm:py-10 lg:py-12">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="group relative isolate flex min-h-[340px] w-full items-center justify-center overflow-hidden bg-[#1a0a0f] sm:min-h-[400px] lg:min-h-[480px]"
      >
        {/* BACKGROUND IMAGE */}
        <img
          src={GiftBanner}
          alt="Rajpal premium incense collection"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />

        {/* BLACK LIGHT EFFECT — image ke upar dark overlay + soft center glow */}
        <div className="absolute inset-0 -z-10 bg-black/60" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.75)_100%)]" />
        <div className="banner-glow absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[380px] sm:w-[380px]" />

        {/* CENTER CONTENT */}
        <div className="px-6 py-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#e6c06a] sm:text-sm">
            Premium Collections
          </p>

          <h2 className="gold-heading text-[28px] sm:text-[42px] lg:text-[56px]">
            Divine Fragrances <br />
            For Every Pooja
          </h2>

          <div className="mx-auto mt-4 h-[2px] w-40 bg-gradient-to-r from-transparent via-[#b68a35] to-transparent sm:mt-5 sm:w-56" />

          <p className="lux-font mx-auto mt-4 max-w-md text-[13px] leading-7 text-white/90 sm:text-[15px] sm:leading-8">
            Agarbatti, dhoop batti and natural incense, crafted since 1981.
          </p>

          <ActionButton to="/categories" className="mt-6 sm:mt-8">
            Shop Now
          </ActionButton>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Why Choose Us steps ---------- */
const whyChooseSteps = [
  { icon: Handshake, label: "Global Trust Since 1981" },
  { icon: Leaf, label: "Sustainably Handcrafted" },
  { icon: Award, label: "Award-Winning Quality" },
  { icon: ShieldCheck, label: "Safe & Certified" },
  { icon: Sparkles, label: "Crafted for Ritual & Wellness" },
  { icon: MapPin, label: "Made in India" },
];

function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#fff3df] px-4 py-8 shadow-[0_25px_70px_rgba(122,16,32,0.15)] sm:px-10 sm:py-12"
      >
        <h3
          className="mb-8 text-center text-xl font-bold uppercase tracking-wide text-[#2f1b00] sm:mb-10 sm:text-3xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Why Choose Rajpal?
        </h3>

        {/* grid on mobile/tablet (no sideways scroll), single row on desktop */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:flex lg:items-start lg:justify-center lg:gap-0">
          {whyChooseSteps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === whyChooseSteps.length - 1;
            return (
              <div key={step.label} className="flex items-start justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex w-full max-w-[130px] flex-col items-center text-center lg:w-[130px]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#b68a35]/50 bg-white text-[#7a1020] shadow-[0_8px_20px_rgba(122,16,32,0.1)] sm:h-20 sm:w-20">
                    <Icon size={26} strokeWidth={1.6} />
                  </div>
                  <p className="mt-3 text-[12px] font-semibold leading-snug text-[#2f1b00] sm:text-[13px]">
                    {step.label}
                  </p>
                </motion.div>

                {!isLast && (
                  <div className="mt-10 hidden w-12 items-center lg:flex">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b68a35]" />
                    <span className="mx-1 h-px flex-1 border-t-2 border-dotted border-[#b68a35]/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- GOOGLE REVIEWS ----------
   Cards TestimonialCard.jsx se aate hain.
   Real photo chahiye to review mein  photo: "/images/reviews/name.jpg"  add karo. */
const TOTAL_REVIEWS = 98;

const googleReviews = [
  { name: "Nikhil Arane",   avatarColor: "#a63fc4", time: "6 months ago", rating: 5, text: "All Good products." },
  { name: "Hemant Joshi",   avatarColor: "#7a1020", time: "6 months ago", rating: 5, text: "Divinely committed and amazing products." },
  { name: "Hemant Gabhane", avatarColor: "#1a0a0f", time: "6 months ago", rating: 5, text: "Nice variety of agarbattis and dhoop, specially must try their herbal sticks." },
  { name: "Priya Sharma",   avatarColor: "#0f9d58", time: "2 weeks ago",  rating: 5, text: "Amazing fragrance quality, my temple smells divine every morning. Highly recommend Rajpal products!" },
  { name: "Anil Mehta",     avatarColor: "#4285f4", time: "1 month ago",  rating: 5, text: "Been using their agarbatti for years. Consistent quality and long-lasting aroma, perfect for daily pooja." },
  { name: "Sunita Rao",     avatarColor: "#e8710a", time: "3 weeks ago",  rating: 5, text: "Lovely packaging and the dhoop batti burns evenly. Will order again for Diwali." },
];

const REVIEW_STEP_MS = 3500;

/* swipe + arrows + auto-scroll (loops back to start) */
function ReviewScroller({ reviews }) {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const stepSize = () => {
    const el = scrollRef.current;
    const first = el?.firstElementChild;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    return first.getBoundingClientRect().width + gap;
  };

  const go = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * stepSize(), behavior: "smooth" });
  };

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = setInterval(() => {
      const el = scrollRef.current;
      if (!el || pausedRef.current || document.hidden) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: stepSize(), behavior: "smooth" });
      }
    }, REVIEW_STEP_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  const arrow =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition disabled:pointer-events-none disabled:opacity-0";

  return (
    <div
      className="relative w-full min-w-0 flex-1"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => setTimeout(() => (pausedRef.current = false), 2500)}
    >
      <button
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Previous reviews"
        className={`${arrow} left-1 sm:left-0 sm:-translate-x-1/2 bg-[#4a4a4a] text-white hover:bg-[#222]`}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        onScroll={updateEdges}
        className="hide-scrollbar flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-3 sm:gap-5"
      >
        {reviews.map((review) => (
          <div
            key={review.name + review.time}
            className="
              shrink-0 snap-start
              basis-[86%]
              min-[480px]:basis-[calc(50%_-_8px)]
              sm:basis-[calc(50%_-_10px)]
              lg:basis-[calc(33.333%_-_14px)]
            "
          >
            <TestimonialCard item={review} />
          </div>
        ))}
      </div>

      <button
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Next reviews"
        className={`${arrow} right-1 sm:right-0 sm:translate-x-1/2 border border-[#ddd] bg-white text-[#222] hover:bg-[#f3f3f3]`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function GoogleReviewsSection() {
  return (
    <section className="overflow-x-clip bg-[#fff8f2]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-14">
        {/* heading with side lines */}
        <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
          <span className="hidden h-px w-20 bg-[#e6d6c3] sm:block lg:w-28" />
          <h2 className="section-heading text-center text-[21px] min-[400px]:text-[26px] sm:text-[34px] md:text-[40px]">
            Customer Reviews
          </h2>
          <span className="hidden h-px w-20 bg-[#e6d6c3] sm:block lg:w-28" />
        </div>

        {/* summary left (desktop) / top (mobile), scrolling cards right */}
        <div className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:gap-10">
          <div className="w-full lg:w-[220px] lg:shrink-0">
            <ReviewSummary total={TOTAL_REVIEWS} />
          </div>
          <ReviewScroller reviews={googleReviews} />
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* PREMIUM FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        .lux-font {
          font-family: 'Space Mono', monospace;
          letter-spacing: 1px;
        }

        .section-heading {
          font-family: 'Cinzel', serif;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.2;
          background: linear-gradient(
            90deg,
            #7a1020 0%,
            #b68a35 50%,
            #7a1020 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Gold heading — dark/image background ke liye (Gift banner) */
        .gold-heading {
          font-family: 'Cinzel', serif;
          font-weight: 800;
          letter-spacing: 1px;
          line-height: 1.2;
          background: linear-gradient(90deg, #f5d98b 0%, #c9983a 50%, #f5d98b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Common button animation (ActionButton) */
        .banner-btn {
          animation: bannerPulse 2.4s ease-in-out infinite;
        }
        .banner-shine {
          animation: bannerShine 3s ease-in-out infinite;
        }
        .banner-glow {
          background: radial-gradient(circle, rgba(182,138,53,0.28) 0%, transparent 70%);
          animation: bannerGlow 4s ease-in-out infinite;
        }

        @keyframes bannerPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(182,138,53,0.55); }
          50%      { box-shadow: 0 0 0 14px rgba(182,138,53,0); }
        }
        @keyframes bannerShine {
          0%   { transform: translateX(0) skewX(-12deg); }
          60%, 100% { transform: translateX(480%) skewX(-12deg); }
        }
        @keyframes bannerGlow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-btn, .banner-shine, .banner-glow { animation: none; }
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Hot selling badge shimmer */
        .hot-badge {
          background: linear-gradient(110deg, #7a1020 0%, #c1272d 45%, #7a1020 100%);
          background-size: 220% 100%;
          animation: hotShimmer 2.6s linear infinite;
        }

        @keyframes hotShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -20% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hot-badge { animation: none; }
        }
      `}</style>

      <Hero />

      {/* HOT SELLING PRODUCTS */}
      <HotSellingProducts />

      {/* FEATURED CATEGORIES */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 sm:py-10 lg:py-12">
        <div className="relative z-10 mb-6 text-center sm:mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7a1020] sm:mb-4 sm:text-sm sm:tracking-[0.4em]">
            Featured Categories
          </p>

          <h2 className="section-heading text-[28px] sm:text-[38px] md:text-[52px]">
            Premium Divine Collections
          </h2>

          <p className="mx-auto mt-4 max-w-3xl lux-font text-[13px] leading-7 text-[#6d4c41] sm:mt-5 sm:text-[15px] sm:leading-8">
            Bento-inspired luxury sections with cinematic incense and fragrance visuals.
          </p>

          <div className="mx-auto mt-5 h-[3px] w-32 rounded-full bg-gradient-to-r from-[#7a1020] via-[#b68a35] to-[#7a1020] sm:mt-6 sm:w-40" />
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fff7f0] to-[#f6efe6]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,16,32,0.08),transparent_60%)]" />
          <img
            src="https://i.pinimg.com/736x/c3/ca/ce/c3cacec81ef726eaaaf1ef58049eef0c.jpg"
            alt="bg"
            className="h-full w-full object-cover opacity-5 mix-blend-overlay"
          />
        </div>

        <div className="relative">
          <CategoryScroller items={categories} />
        </div>
      </section>

      {/* PREMIUM COLLECTIONS — full-width banner */}
      <PremiumBanner />

      {/* MAIN BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className="grid overflow-hidden bg-gradient-to-br from-[#fff6ef] via-[#fffaf6] to-[#f8ece5] shadow-[0_20px_80px_rgba(122,16,32,0.08)] md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7a1020] sm:mb-4 sm:text-sm">
              Traditional Pooja Collection
            </p>

            <h2 className="section-heading max-w-xl text-[30px] sm:text-[40px] md:text-[52px] lg:text-[60px]">
              Sacred Items <br />
              For Every Pooja
            </h2>

            <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#6b5b4b] sm:mt-6 sm:text-[16px] sm:leading-8">
              Explore premium agarbatti, diyas, idols, pooja thali,
              incense sticks, kalash, flowers, Fragrance Roll on and spiritual essentials
              for your divine celebrations.
            </p>

            <ActionButton to="/categories" className="mt-6 sm:mt-8">
              Shop Now
            </ActionButton>
          </div>

          <div className="relative flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(122,16,32,0.08),transparent_70%)]" />

            <img
              src={DhoopBattiImage}
              alt="Pooja Store"
              className="relative z-10 h-full max-h-[260px] w-full object-contain transition duration-700 hover:scale-105 sm:max-h-[360px] md:max-h-[450px]"
            />
          </div>
        </div>
      </section>

      {/* ABOUT BRAND */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:py-12">
        <div className="mb-6 text-center sm:mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7a1020] sm:text-sm">
            About Brand
          </p>

          <h2 className="section-heading text-[28px] sm:text-[38px] md:text-[52px]">
            Crafted Heritage Since 1981
          </h2>
        </div>

        <div className="grid gap-5 border border-[#7a1020]/10 bg-white/70 p-4 shadow-xl backdrop-blur-xl sm:gap-8 sm:p-8 md:grid-cols-2">
          <img
            src={BrandHeritage}
            className="h-56 w-full object-cover sm:h-72 md:h-80"
            alt="Brand heritage"
          />

          <div className="flex flex-col justify-center">
            <h3 className="section-heading text-[26px] sm:text-[32px] lg:text-[36px]">
              RAJPAL PRODUCTS
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-[#6d4c41] sm:mt-5 sm:text-[16px] sm:leading-8">
              PURELY DIVINE blends traditional incense craftsmanship with modern
              fragrance innovation for premium spiritual and lifestyle experiences.
              {showMore && (
                <>
                  {" "}
                  Rajpal Products is a trusted manufacturer and exporter of premium-quality incense sticks. Inspired by nature, we create long-lasting fragrances that bring peace and positivity. Every product is crafted with care, ensuring exceptional quality, purity, and customer satisfaction. Our mission is to spread divine aromas that enrich every home and sacred space.
                </>
              )}
            </p>

            <ActionButton
              onClick={() => setShowMore(!showMore)}
              className="mt-5 sm:mt-6"
            >
              {showMore ? "Show Less" : "Learn More"}
            </ActionButton>
          </div>
        </div>
      </section>

      {/* TRUST & WHY CHOOSE US */}
      <TrustSection />

      {/* CUSTOMER REVIEWS (Google style) */}
      <GoogleReviewsSection />
    </>
  );
};

export default Home;