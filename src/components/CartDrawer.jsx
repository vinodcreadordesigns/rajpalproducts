import { useEffect, useRef, useState } from "react";
import {
  Instagram, Minus, Plus, Trash2, X, ShoppingBag, ShieldCheck, Truck,
  User, Phone, Mail, Home, Milestone, Landmark, MapPin, Building2, Map, Hash,
  Pencil, Twitter, Facebook, ChevronLeft, ChevronRight,
  Check, CheckCircle2, FileDown, CreditCard, Ticket, Lock, Leaf, Heart,
  PartyPopper, Tag, ArrowRight, Loader2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useCart, COUPON_LIST } from "../hooks/useCart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ───────────────────────── CONFIG ───────────────────────── */
const whatsappNumber = "919930670044";
const instagramUrl = "https://www.instagram.com/rajpalincense81";
const twitterUrl = "https://twitter.com/rajpalproducts";
const facebookUrl = "https://facebook.com/rajpalproducts";
const emailAddress = "mailto:info@rajpalproducts.com";

const MAROON = "#6E0F1D";
const GREEN = "#388E3C";
const BLUE = "#2874F0";
const PURPLE = "#7B3FC4";
const GOLD = "#B7791F";

/** Savings tiers — coupon codes useCart.jsx me hain (percent / amount dono jagah same rakhna) */
const TIERS = [
  { amount: 750,  percent: 10, code: "RAJPAL10", color: GREEN,  bg: "#E8F5E9", border: "#A5D6A7" },
  { amount: 1500, percent: 20, code: "PURELY20", color: PURPLE, bg: "#F3E8FF", border: "#D1B3F5" },
  { amount: 2500, percent: 30, code: "DIVINE30", color: GOLD,   bg: "#FEF3C7", border: "#FCD34D" },
];
const MAX_TIER = TIERS[TIERS.length - 1].amount;

const PAYMENT_OPTIONS = [
  { label: "UPI", hint: "Pay with any UPI app" },
  { label: "Google Pay", hint: "Instant UPI payment" },
  { label: "PhonePe", hint: "Instant UPI payment" },
  { label: "Paytm", hint: "Wallet or UPI" },
  { label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay" },
];
const STEPS = [
  { n: 1, label: "Cart & Offers" },
  { n: 2, label: "Delivery Address" },
  { n: 3, label: "Payment & Order" },
];
const STORE_KEY = "rajpal_checkout_v1";
const EMPTY_FORM = {
  name: "", mobile: "", email: "",
  houseNo: "", street: "", landmark: "",
  area: "", city: "", state: "", pincode: "",
};

const formatINR = (value) =>
  `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

// jsPDF default font ₹ symbol support nahi karta, isliye PDF me "Rs." use hota hai
const pdfINR = (value) =>
  `Rs. ${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const makeOrderId = () => `RP${Date.now().toString().slice(-8)}`;

const validate = (f) => ({
  name: !f.name.trim(),
  mobile: !/^[6-9]\d{9}$/.test(f.mobile),
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email),
  houseNo: !f.houseNo.trim(),
  street: !f.street.trim(),
  area: !f.area.trim(),
  city: !f.city.trim(),
  state: !f.state.trim(),
  pincode: !/^\d{6}$/.test(f.pincode),
});

const loadSaved = () => {
  try {
    if (typeof window === "undefined") return null;
    return JSON.parse(window.localStorage.getItem(STORE_KEY));
  } catch {
    return null;
  }
};

const deliveryEstimate = () => {
  const fmt = (d) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  const a = new Date(); a.setDate(a.getDate() + 3);
  const b = new Date(); b.setDate(b.getDate() + 6);
  return `${fmt(a)} – ${fmt(b)}`;
};

const deliveryShort = () => {
  const a = new Date(); a.setDate(a.getDate() + 3);
  const b = new Date(); b.setDate(b.getDate() + 6);
  const mon = (x) => x.toLocaleDateString("en-IN", { month: "short" });
  return mon(a) === mon(b)
    ? `${a.getDate()}–${b.getDate()} ${mon(a)}`
    : `${a.getDate()} ${mon(a)} – ${b.getDate()} ${mon(b)}`;
};

/* ───────────────────────── SMALL PIECES ───────────────────────── */
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#25D366" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.84 13.12A15.01 15.01 0 0 0 24.02 9C15.74 9 9 15.74 9 24.02c0 2.67.7 5.28 2.02 7.58L9 39.2l7.78-2.04a15.1 15.1 0 0 0 7.22 1.84h.01c8.28 0 15.02-6.74 15.02-15.02 0-4.01-1.56-7.78-4.19-10.86zm-10.82 23.1h-.01a12.54 12.54 0 0 1-6.39-1.75l-.46-.27-4.74 1.24 1.27-4.63-.3-.48a12.5 12.5 0 0 1-1.92-6.69c0-6.91 5.62-12.53 12.55-12.53 3.35 0 6.5 1.31 8.87 3.68a12.46 12.46 0 0 1 3.66 8.88c0 6.92-5.62 12.55-12.53 12.55zm6.88-9.4c-.38-.19-2.23-1.1-2.57-1.22-.35-.13-.6-.19-.85.19-.25.38-.97 1.22-1.19 1.47-.22.25-.44.28-.81.1-.38-.2-1.59-.59-3.03-1.87-1.12-1-1.87-2.23-2.09-2.61-.22-.37-.02-.57.16-.76.17-.17.38-.44.56-.66.19-.22.25-.38.38-.63.12-.25.06-.47-.03-.66-.1-.19-.85-2.05-1.16-2.8-.31-.74-.62-.64-.85-.65h-.72c-.25 0-.66.09-1.01.47-.34.37-1.31 1.28-1.31 3.12 0 1.85 1.34 3.63 1.53 3.88.19.25 2.64 4.03 6.4 5.65.9.39 1.6.62 2.14.79.9.29 1.72.25 2.37.15.72-.11 2.23-.91 2.54-1.79.32-.88.32-1.63.22-1.79-.09-.16-.34-.25-.72-.44z"
      fill="white"
    />
  </svg>
);

const FormField = ({ icon: Icon, error, className = "", ...props }) => (
  <div className={className}>
    <div className="relative">
      {Icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Icon size={13} style={{ color: error ? "#EF4444" : "#9CA3AF" }} />
        </span>
      )}
      <input
        {...props}
        className={`w-full rounded-lg py-2.5 text-sm text-gray-800 outline-none transition
          ${Icon ? "pl-9 pr-3.5" : "px-3.5"}
          ${error
            ? "border-2 border-red-400 bg-red-50 focus:border-red-500 focus:ring-0"
            : "border border-gray-300 bg-white focus:border-[#6E0F1D] focus:ring-2 focus:ring-[#6E0F1D]/15"
          }`}
      />
    </div>
  </div>
);

const HeaderSocial = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={label}
    aria-label={label}
    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
  >
    {children}
  </a>
);

const paymentMethods = [
  { label: "GPay", bg: "#ffffff", border: "#dadce0", text: "#3c4043" },
  { label: "PhonePe", bg: "#5f259f", border: "#5f259f", text: "#ffffff" },
  { label: "Paytm", bg: "#00baf2", border: "#00baf2", text: "#002e6e" },
  { label: "UPI", bg: "#ffffff", border: "#097939", text: "#097939" },
];

const PaymentBadges = () => (
  <div className="flex flex-wrap items-center gap-1.5">
    {paymentMethods.map((pm) => (
      <span
        key={pm.label}
        className="rounded-md px-2 py-1 text-[10px] font-bold"
        style={{ backgroundColor: pm.bg, color: pm.text, border: `1px solid ${pm.border}` }}
      >
        {pm.label}
      </span>
    ))}
    <span className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-[10px] font-bold text-gray-500">
      <CreditCard size={11} /> Card
    </span>
  </div>
);

/** Product image with a graceful fallback when src is missing/broken */
const ProductImg = ({ src, alt, className = "" }) => {
  const [broken, setBroken] = useState(false);
  if (!src || broken) {
    return (
      <div className={`flex items-center justify-center bg-[#FDF3F1] ${className}`}>
        <Leaf size={20} style={{ color: MAROON, opacity: 0.45 }} />
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setBroken(true)} className={`object-cover ${className}`} />;
};

/* ───────────────────── SAVINGS PROGRESS (3 tiers) ───────────────────── */
const SavingsProgress = ({ subtotal, appliedCoupon }) => {
  const progress = Math.min((subtotal / MAX_TIER) * 100, 100);
  const nextTier = TIERS.find((t) => subtotal < t.amount);
  const remaining = nextTier ? Math.ceil(nextTier.amount - subtotal) : 0;
  const topTier = TIERS[TIERS.length - 1];
  const unlocked = [...TIERS].reverse().find((t) => subtotal >= t.amount);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[13px] font-bold" style={{ color: nextTier ? "#8D5A00" : "#1B5E20" }}>
        <PartyPopper size={16} className="shrink-0" />
        <span>
          {nextTier
            ? `Add ${formatINR(remaining)} more to unlock ${nextTier.percent}% OFF`
            : appliedCoupon?.code === topTier.code
              ? "Best deal applied — you're saving the most!"
              : `${topTier.percent}% OFF unlocked — apply ${topTier.code}`}
        </span>
      </div>

      <div className="relative mx-2 h-2 rounded-full bg-gray-200">
        <motion.div
          className="h-full rounded-full"
          style={{ background: unlocked ? unlocked.color : GREEN }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        {TIERS.map((t) => (
          <span
            key={t.code}
            className="absolute top-1/2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow"
            style={{
              left: `${(t.amount / MAX_TIER) * 100}%`,
              transform: "translate(-50%, -50%)",
              background: subtotal >= t.amount ? t.color : "#CBD5E1",
            }}
          >
            {subtotal >= t.amount && <CheckCircle2 size={9} className="text-white" />}
          </span>
        ))}
      </div>

      <div className="relative mx-2 mt-2 h-8 text-center text-[10px] font-semibold leading-tight text-gray-500">
        {TIERS.map((t, i) => (
          <span
            key={t.code}
            className="absolute whitespace-nowrap"
            style={{
              left: `${(t.amount / MAX_TIER) * 100}%`,
              transform: i === TIERS.length - 1 ? "translateX(-70%)" : "translateX(-50%)",
              color: subtotal >= t.amount ? t.color : undefined,
            }}
          >
            {formatINR(t.amount)}
            <br />
            {t.percent}% OFF
          </span>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────── COUPON (compact) ───────────────────── */
const CouponPanel = ({ subtotal, appliedCoupon, applyCoupon, removeCoupon, discount }) => {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const tryApply = (raw) => {
    const res = applyCoupon(raw);
    setMsg({ ok: res.ok, text: res.message });
    if (res.ok) setCode("");
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Ticket size={15} style={{ color: MAROON }} />
        <p className="text-[13px] font-bold text-gray-800">Coupons</p>
      </div>

      {appliedCoupon ? (
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-between gap-3 rounded-lg border border-dashed px-3 py-2"
          style={{ borderColor: GREEN, background: "#F1F8E9" }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <CheckCircle2 size={18} style={{ color: GREEN }} className="shrink-0" />
            <div className="min-w-0">
              <p className="text-[13px] font-extrabold tracking-wide" style={{ color: "#1B5E20" }}>
                {appliedCoupon.code} applied
              </p>
              <p className="text-[11px] text-green-800">You saved {formatINR(discount)}</p>
            </div>
          </div>
          <button
            onClick={() => { removeCoupon(); setMsg(null); }}
            className="shrink-0 rounded-md border border-green-300 bg-white px-2.5 py-1 text-[11px] font-bold text-green-800 transition hover:bg-green-50"
          >
            Remove
          </button>
        </motion.div>
      ) : (
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase().replace(/\s/g, "")); setMsg(null); }}
            onKeyDown={(e) => e.key === "Enter" && tryApply(code)}
            placeholder="Enter coupon code"
            maxLength={16}
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-gray-800 outline-none transition placeholder:font-normal placeholder:normal-case placeholder:tracking-normal focus:border-[#6E0F1D] focus:ring-2 focus:ring-[#6E0F1D]/15"
          />
          <button
            onClick={() => tryApply(code)}
            className="min-h-[44px] rounded-lg px-5 text-sm font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            style={{ background: MAROON }}
          >
            Apply
          </button>
        </div>
      )}

      <AnimatePresence>
        {msg && !appliedCoupon && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-1.5 text-[11px] font-medium ${msg.ok ? "text-green-700" : "text-red-500"}`}
          >
            {msg.text}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {COUPON_LIST.map((c) => {
          const tier = TIERS.find((t) => t.code === c.code) || TIERS[0];
          const locked = subtotal < c.minAmount;
          const active = appliedCoupon?.code === c.code;
          return (
            <button
              key={c.code}
              type="button"
              disabled={locked || active}
              onClick={() => tryApply(c.code)}
              className="flex items-center gap-2 rounded-lg border p-2 text-left transition enabled:hover:shadow-sm disabled:cursor-default"
              style={{
                borderColor: active ? tier.color : locked ? "#E5E7EB" : tier.border,
                background: locked ? "#F9FAFB" : tier.bg,
              }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold text-white"
                style={{ background: locked ? "#9CA3AF" : tier.color }}
              >
                {c.percent}%
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-extrabold tracking-wide text-gray-800">{c.code}</span>
                <span className="flex items-center gap-1 truncate text-[10px] font-semibold" style={{ color: locked ? "#9CA3AF" : tier.color }}>
                  {active ? <><CheckCircle2 size={10} /> Applied</> : locked ? <><Lock size={10} /> Add {formatINR(Math.ceil(c.minAmount - subtotal))}</> : "Tap to apply"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ───────────────────── YOU MAY ALSO LIKE (compact, real products only) ───────────────────── */
const AddMoreProducts = ({ suggestions = [], cartKeys, onAdd, subtotal = 0 }) => {
  const scroller = useRef(null);
  const [justAdded, setJustAdded] = useState(null);

  const list = suggestions.filter((p) => !cartKeys.has(String(p.id)));
  if (list.length === 0) return null;

  const nextTier = TIERS.find((t) => subtotal < t.amount);
  const scrollBy = (dir) => scroller.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  const handleAdd = (p) => {
    onAdd(p);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <section className="shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-gray-800">You may also like</p>
          <p className="truncate text-[11px] text-gray-500">
            {nextTier
              ? `Add ${formatINR(Math.ceil(nextTier.amount - subtotal))} more to get ${nextTier.percent}% OFF`
              : "You've unlocked the best discount"}
          </p>
        </div>
        <div className="hidden shrink-0 gap-1.5 sm:flex">
          <button onClick={() => scrollBy(-1)} aria-label="Previous" className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => scrollBy(1)} aria-label="Next" className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div ref={scroller} className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 py-3" style={{ scrollbarWidth: "none" }}>
        {list.map((p) => {
          const added = justAdded === p.id;
          return (
            <article key={p.id} className="flex w-[240px] shrink-0 snap-start items-center gap-2.5 rounded-lg border border-gray-200 p-2">
              <ProductImg src={p.image} alt={p.name} className="h-14 w-14 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-[12px] font-semibold text-gray-800">{p.name}</h4>
                <p className="text-[10px] text-gray-400">{p.weight}</p>
                <p className="text-[13px] font-bold text-gray-900">{p.price}</p>
              </div>
              <button
                onClick={() => handleAdd(p)}
                aria-label={`Add ${p.name}`}
                className="flex h-8 shrink-0 items-center justify-center gap-1 rounded-md border px-2.5 text-[11px] font-bold transition active:scale-[0.96]"
                style={added ? { background: GREEN, borderColor: GREEN, color: "#fff" } : { background: "#fff", borderColor: MAROON, color: MAROON }}
              >
                {added ? <CheckCircle2 size={13} /> : <><Plus size={12} /> Add</>}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────── ADDRESS MODAL ───────────────────── */
const AddressModal = ({
  open, onClose, form, errors, attempted, updateField, onSave, pinLoading,
  note, setNote, isValid,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-4"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Delivery details"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#FDECEA" }}>
                <MapPin size={17} style={{ color: MAROON }} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900">Delivery details</h3>
                <p className="text-[11px] text-gray-500">Saved on this device for your next order</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="grid grid-cols-6 gap-3">
              <FormField className="col-span-6 sm:col-span-3" icon={User} placeholder="Full Name *" value={form.name} onChange={updateField("name")} error={attempted && errors.name} />
              <FormField className="col-span-6 sm:col-span-3" icon={Phone} type="tel" inputMode="numeric" placeholder="Mobile Number *" value={form.mobile} onChange={updateField("mobile")} error={attempted && errors.mobile} />
              <FormField className="col-span-6 sm:col-span-3" icon={Mail} type="email" placeholder="Email Address *" value={form.email} onChange={updateField("email")} error={attempted && errors.email} />
              <FormField className="col-span-6 sm:col-span-3" icon={Hash} inputMode="numeric" placeholder="Pincode * (city & state auto-fill)" value={form.pincode} onChange={updateField("pincode")} error={attempted && errors.pincode} />
              <FormField className="col-span-6 sm:col-span-3" icon={Building2} placeholder="City *" value={form.city} onChange={updateField("city")} error={attempted && errors.city} />
              <FormField className="col-span-6 sm:col-span-3" icon={Map} placeholder="State *" value={form.state} onChange={updateField("state")} error={attempted && errors.state} />
              <FormField className="col-span-6 sm:col-span-3" icon={Home} placeholder="House No. / Colony *" value={form.houseNo} onChange={updateField("houseNo")} error={attempted && errors.houseNo} />
              <FormField className="col-span-6 sm:col-span-3" icon={Milestone} placeholder="Street *" value={form.street} onChange={updateField("street")} error={attempted && errors.street} />
              <FormField className="col-span-6 sm:col-span-3" icon={MapPin} placeholder="Area / Locality *" value={form.area} onChange={updateField("area")} error={attempted && errors.area} />
              <FormField className="col-span-6 sm:col-span-3" icon={Landmark} placeholder="Landmark (optional)" value={form.landmark} onChange={updateField("landmark")} />
            </div>

            {pinLoading && (
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
                <Loader2 size={12} className="animate-spin" /> Fetching city & state…
              </p>
            )}

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 200))}
              rows={2}
              placeholder="Order note (optional) — e.g. call before delivery"
              className="mt-4 w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#6E0F1D] focus:ring-2 focus:ring-[#6E0F1D]/15"
            />

            {attempted && !isValid && (
              <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-red-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                Please fill all highlighted fields correctly.
              </p>
            )}
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
            <button
              type="button"
              onClick={onSave}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white shadow transition hover:opacity-90 active:scale-[0.99]"
              style={{ background: MAROON }}
            >
              <CheckCircle2 size={15} /> Save & continue
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ───────────────────── CHECKOUT STEPPER ───────────────────── */
const Stepper = ({ step, onGo }) => (
  <nav aria-label="Checkout progress" className="shrink-0 border-b border-gray-200 bg-white">
    {/* tablet / desktop */}
    <ol className="mx-auto hidden max-w-[1400px] items-center px-6 py-3.5 sm:flex">
      {STEPS.map((s, i) => {
        const done = s.n < step;
        const active = s.n === step;
        return (
          <li key={s.n} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              disabled={!done}
              onClick={() => onGo(s.n)}
              aria-current={active ? "step" : undefined}
              className="flex min-h-[40px] items-center gap-2.5 disabled:cursor-default"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold"
                style={
                  done ? { background: GREEN, color: "#fff" }
                    : active ? { background: MAROON, color: "#fff" }
                      : { background: "#F3F4F6", color: "#9CA3AF" }
                }
              >
                {done ? <Check size={16} /> : s.n}
              </span>
              <span className="text-sm font-bold" style={{ color: active ? MAROON : done ? "#1F2937" : "#9CA3AF" }}>
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="mx-4 h-0.5 flex-1 rounded" style={{ background: s.n < step ? GREEN : "#E5E7EB" }} />
            )}
          </li>
        );
      })}
    </ol>

    {/* mobile */}
    <div className="px-4 py-3 sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold text-gray-500">Step {step} of 3</p>
          <p className="text-base font-bold text-gray-900">{STEPS[step - 1].label}</p>
        </div>
        {step > 1 && (
          <button
            type="button"
            onClick={() => onGo(step - 1)}
            className="flex min-h-[40px] items-center gap-1 rounded-lg border px-3 text-[13px] font-bold"
            style={{ color: MAROON, borderColor: MAROON }}
          >
            <ChevronLeft size={15} /> Back
          </button>
        )}
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {STEPS.map((s) => (
          <span
            key={s.n}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: s.n < step ? GREEN : s.n === step ? MAROON : "#E5E7EB" }}
          />
        ))}
      </div>
    </div>
  </nav>
);

/* ───────────────────── STEP SHELL (collapsed summary / expanded) ───────────────────── */
const StepShell = ({ n, title, state, summary, onEdit, children }) => {
  const active = state === "active";
  const done = state === "done";
  return (
    <section
      aria-current={active ? "step" : undefined}
      className="overflow-hidden rounded-2xl border bg-white shadow-sm"
      style={{ borderColor: active ? "#E3B9BE" : "#E5E7EB" }}
    >
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={
            done ? { background: GREEN, color: "#fff" }
              : active ? { background: MAROON, color: "#fff" }
                : { background: "#F3F4F6", color: "#9CA3AF" }
          }
        >
          {done ? <Check size={18} /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`text-base font-bold sm:text-lg ${state === "upcoming" ? "text-gray-400" : "text-gray-900"}`}>{title}</h3>
          {!active && summary && <div className="text-[13px] leading-5 text-gray-500">{summary}</div>}
        </div>
        {done && (
          <button
            type="button"
            onClick={onEdit}
            className="flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border bg-white px-3.5 text-[13px] font-bold transition hover:bg-[#FDF1F2]"
            style={{ color: MAROON, borderColor: MAROON }}
          >
            <Pencil size={13} /> Edit
          </button>
        )}
      </div>
      {active && <div className="border-t border-gray-100 px-4 py-4 sm:px-5 sm:py-5">{children}</div>}
    </section>
  );
};

/* ───────────────────── ORDER TOTALS ───────────────────── */
const SummaryRows = ({ totalItems, subtotal, discount, total, appliedCoupon }) => (
  <div>
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
        <span className="font-medium text-gray-800">{formatINR(subtotal)}</span>
      </div>
      <div className="flex justify-between" style={{ color: discount > 0 ? GREEN : undefined }}>
        <span>Discount{appliedCoupon ? ` (${appliedCoupon.code})` : ""}</span>
        <span className="font-medium">{discount > 0 ? `− ${formatINR(discount)}` : "₹0"}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery</span>
        <span className="font-bold" style={{ color: GREEN }}>FREE</span>
      </div>
    </div>
    <div className="mt-3 flex items-end justify-between border-t border-gray-200 pt-3">
      <span className="text-base font-bold text-gray-900">Total</span>
      <motion.span key={total} initial={{ scale: 1.08 }} animate={{ scale: 1 }} className="text-2xl font-extrabold text-gray-900">
        {formatINR(total)}
      </motion.span>
    </div>
  </div>
);

const state2Summary = (state, confirmed, form) => {
  if (state === "done") {
    return (
      <>
        <span className="block truncate font-medium text-gray-700">{form.name} · {form.area}, {form.city}</span>
        <span className="block">Delivery: {deliveryShort()}</span>
      </>
    );
  }
  return confirmed ? `${form.name} · ${form.city}` : "Add where we should deliver";
};

/* ═════════════════════════ MAIN DRAWER ═════════════════════════ */
const CartDrawer = ({ suggestions = [] }) => {
  const {
    items, isCartOpen, setIsCartOpen, updateQty, removeFromCart, clearCart,
    addToCart, subtotal, discount, total, appliedCoupon, applyCoupon, removeCoupon,
    lastAdded,
  } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.qty, 0);
  const cartKeys = new Set(items.map((i) => String(i.key)));

  const [form, setForm] = useState(() => ({ ...EMPTY_FORM, ...(loadSaved()?.form || {}) }));
  const [payment, setPayment] = useState(() => {
    const p = loadSaved()?.payment;
    return PAYMENT_OPTIONS.some((o) => o.label === p) ? p : "UPI";
  });
  const [note, setNote] = useState(() => loadSaved()?.note || "");
  const [confirmed, setConfirmed] = useState(() => {
    const s = loadSaved();
    return !!s && Object.values(validate({ ...EMPTY_FORM, ...(s.form || {}) })).every((e) => !e);
  });
  const [addressOpen, setAddressOpen] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [step, setStep] = useState(1);
  const scroller = useRef(null);
  const [toast, setToast] = useState("");
  const pendingAction = useRef(null); // "wa" | "pdf" — address save hone ke baad auto-run
  const backup = useRef(null); // cancel karne par purana address wapas

  const openAddressModal = (mode) => {
    backup.current = { form, confirmed };
    if (mode === "new") {
      setForm(EMPTY_FORM);
      setConfirmed(false);
    }
    setAttempted(false);
    setAddressOpen(true);
  };

  const closeAddressModal = () => {
    if (backup.current) {
      setForm(backup.current.form);
      setConfirmed(backup.current.confirmed);
      backup.current = null;
    }
    pendingAction.current = null;
    setAddressOpen(false);
  };

  const showToast = (t) => {
    setToast(t);
    setTimeout(() => setToast(""), 2400);
  };

  /* Esc to close + lock page scroll while cart is open */
  useEffect(() => {
    if (!isCartOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (addressOpen) closeAddressModal();
      else setIsCartOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isCartOpen, addressOpen, setIsCartOpen]);

  useEffect(() => {
    if (items.length === 0) setStep(1);
  }, [items.length]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const lookupPin = async (pin) => {
    setPinLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      const po = data?.[0]?.PostOffice?.[0];
      if (data?.[0]?.Status === "Success" && po) {
        setForm((p) =>
          p.pincode === pin
            ? { ...p, city: po.District || p.city, state: po.State || p.state, area: p.area || po.Name || "" }
            : p
        );
      }
    } catch {
      /* offline / API down — user can type manually */
    } finally {
      setPinLoading(false);
    }
  };

  const updateField = (field) => (e) => {
    let v = e.target.value;
    if (field === "mobile") v = v.replace(/\D/g, "").slice(0, 10);
    if (field === "pincode") v = v.replace(/\D/g, "").slice(0, 6);
    setForm((p) => ({ ...p, [field]: v }));
    if (confirmed) setConfirmed(false);
    if (field === "pincode" && v.length === 6) lookupPin(v);
  };

  const errors = validate(form);
  const isValid = Object.values(errors).every((e) => !e);

  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const fullAddress = () =>
    `${form.houseNo}, ${form.street}${form.landmark ? ", near " + form.landmark : ""}, ${form.area}, ${form.city}, ${form.state} - ${form.pincode}`;

  /* ── WhatsApp message ── */
  const buildMessage = (orderId) => {
    const line = "━━━━━━━━━━━━━━━━━━";
    const lines = [
      "🛕 *RAJPAL PRODUCTS*",
      "_Namaste! I'd like to place an order_ 🙏",
      line,
      `🧾 *Order ID:* ${orderId}`,
      `📅 *Date:* ${today}`,
      line,
      "🛍️ *ORDER ITEMS*",
      ...items.flatMap((item, i) => [
        `${i + 1}. *${item.name}* (${item.weight})`,
        `    ${item.price} × ${item.qty} = ${formatINR(item.priceValue * item.qty)}`,
      ]),
      line,
      "💰 *PRICE DETAILS*",
      `Subtotal (${totalItems} ${totalItems === 1 ? "item" : "items"}): ${formatINR(subtotal)}`,
      appliedCoupon
        ? `🎟️ Coupon: *${appliedCoupon.code}* (${appliedCoupon.percent}% OFF)`
        : "🎟️ Coupon: Not applied",
      appliedCoupon ? `🎉 Discount: − ${formatINR(discount)}` : null,
      "🚚 Delivery: FREE",
      `✅ *Total Payable: ${formatINR(total)}*`,
      appliedCoupon ? `💚 _You saved ${formatINR(discount)} on this order!_` : null,
      `💳 Preferred payment: ${payment}`,
      line,
      "👤 *CUSTOMER DETAILS*",
      `Name: ${form.name}`,
      `Mobile: +91 ${form.mobile}`,
      `Email: ${form.email}`,
      line,
      "📍 *DELIVERY ADDRESS*",
      `House/Colony: ${form.houseNo}`,
      `Street: ${form.street}`,
      form.landmark ? `Landmark: ${form.landmark}` : null,
      `Area: ${form.area}`,
      `City: ${form.city}`,
      `State: ${form.state}`,
      `Pincode: ${form.pincode}`,
      note.trim() ? `📝 Note: ${note.trim()}` : null,
      line,
      "📎 Invoice PDF has been downloaded — I'm attaching it here.",
      "",
      "Please confirm my order & share the payment details. Thank you! 🌿",
    ];
    return encodeURIComponent(lines.filter((l) => l !== null).join("\n"));
  };

  /* ── PDF invoice ── */
  const generateInvoicePDF = (orderId) => {
    const doc = new jsPDF();
    const mx = 14;
    let y = 18;

    doc.setFontSize(18);
    doc.setTextColor(110, 15, 29);
    doc.setFont(undefined, "bold");
    doc.text("RAJPAL PRODUCTS", mx, y);
    doc.setFont(undefined, "normal");
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Order Invoice (Enquiry)", mx, y); y += 5;
    doc.text(`Order ID: ${orderId}`, mx, y); y += 5;
    doc.text(`Date: ${today}`, mx, y); y += 9;

    doc.setDrawColor(230);
    doc.line(mx, y, 196, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.setFont(undefined, "bold");
    doc.text("Customer Details", mx, y);
    doc.setFont(undefined, "normal");
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Name: ${form.name}`, mx, y); y += 5;
    doc.text(`Mobile: +91 ${form.mobile}`, mx, y); y += 5;
    doc.text(`Email: ${form.email}`, mx, y); y += 9;

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.setFont(undefined, "bold");
    doc.text("Delivery Address", mx, y);
    doc.setFont(undefined, "normal");
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(60);
    const addrLines = doc.splitTextToSize(fullAddress(), 180);
    doc.text(addrLines, mx, y);
    y += addrLines.length * 5 + 2;
    doc.text(`Preferred payment: ${payment}`, mx, y);
    y += 5;
    if (note.trim()) {
      const noteLines = doc.splitTextToSize(`Note: ${note.trim()}`, 180);
      doc.text(noteLines, mx, y);
      y += noteLines.length * 5;
    }
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [["#", "Item", "Weight", "Qty", "Price", "Total"]],
      body: items.map((item, i) => [
        i + 1, item.name, item.weight, item.qty,
        pdfINR(item.priceValue), pdfINR(item.priceValue * item.qty),
      ]),
      theme: "grid",
      headStyles: { fillColor: [110, 15, 29], textColor: 255, fontSize: 9 },
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 10 }, 3: { cellWidth: 14 } },
    });

    let fy = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text("Subtotal", mx, fy);
    doc.text(pdfINR(subtotal), 196, fy, { align: "right" });
    fy += 6;

    if (appliedCoupon) {
      doc.setTextColor(56, 142, 60);
      doc.text(`Discount (${appliedCoupon.code} - ${appliedCoupon.percent}% OFF)`, mx, fy);
      doc.text(`- ${pdfINR(discount)}`, 196, fy, { align: "right" });
      fy += 6;
    }

    doc.setTextColor(60);
    doc.text("Delivery", mx, fy);
    doc.setTextColor(56, 142, 60);
    doc.text("FREE", 196, fy, { align: "right" });

    doc.setDrawColor(230);
    doc.line(mx, fy + 4, 196, fy + 4);

    doc.setFontSize(13);
    doc.setTextColor(20);
    doc.setFont(undefined, "bold");
    doc.text("Total Payable", mx, fy + 12);
    doc.text(pdfINR(total), 196, fy + 12, { align: "right" });
    doc.setFont(undefined, "normal");

    if (appliedCoupon) {
      doc.setFontSize(10);
      doc.setTextColor(56, 142, 60);
      doc.text(`You saved ${pdfINR(discount)} with ${appliedCoupon.code}`, mx, fy + 19);
    }

    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      "This is an enquiry invoice, not a tax invoice. Final pricing & delivery charges are confirmed via WhatsApp.",
      mx, fy + 28
    );
    return doc;
  };

  const invoiceFileName = (orderId) =>
    `Rajpal-Invoice-${orderId}-${form.name ? form.name.trim().replace(/\s+/g, "_") : "Order"}.pdf`;

  const runAction = (type) => {
    const id = makeOrderId();
    generateInvoicePDF(id).save(invoiceFileName(id));
    showToast("Invoice downloaded");
    if (type === "wa") {
      // wa.me link sirf text pre-fill karta hai, file auto-attach nahi hoti
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${buildMessage(id)}`, "_blank", "noopener,noreferrer");
      }, 500);
    }
  };

  const requireAddress = (type) => {
    if (confirmed) return false;
    pendingAction.current = type;
    backup.current = { form, confirmed };
    setStep(2);
    setAttempted(true);
    setAddressOpen(true);
    return true;
  };

  const handleSaveAddress = () => {
    setAttempted(true);
    if (!isValid) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify({ form, payment, note }));
    } catch {
      /* storage blocked — ignore */
    }
    backup.current = null;
    setConfirmed(true);
    setAddressOpen(false);
    const next = pendingAction.current;
    pendingAction.current = null;
    if (next) runAction(next);
    else showToast("Address saved");
  };

  const handleDownloadInvoice = () => {
    if (requireAddress("pdf")) return;
    runAction("pdf");
  };

  const handleWhatsApp = () => {
    if (requireAddress("wa")) return;
    runAction("wa");
  };

  const renderWhatsAppButton = (className = "") => (
    <button
      type="button"
      onClick={handleWhatsApp}
      className={`flex w-full items-center justify-center gap-2.5 min-h-[52px] rounded-lg py-3.5 text-[15px] font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] ${className}`}
      style={{ background: "#128C4A" }}
    >
      <WhatsAppIcon size={20} />
      Order on WhatsApp
      <ArrowRight size={16} />
    </button>
  );

  const stateFor = (n) => (n < step ? "done" : n === step ? "active" : "upcoming");

  /* primary action changes with the current step */
  const primary =
    step === 1
      ? { kind: "maroon", label: "Continue to Address", onClick: () => setStep(2) }
      : step === 2
        ? confirmed
          ? { kind: "maroon", label: "Continue to Payment", onClick: () => setStep(3) }
          : { kind: "maroon", label: "Add Delivery Address", onClick: () => openAddressModal("edit"), plus: true }
        : { kind: "wa" };

  const renderContinue = (label, onClick, className = "") => (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] ${className}`}
      style={{ background: MAROON }}
    >
      {label} <ArrowRight size={17} />
    </button>
  );

  const renderPrimary = (className = "") =>
    primary.kind === "wa" ? (
      renderWhatsAppButton(className)
    ) : (
      <button
        type="button"
        onClick={primary.onClick}
        className={`flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] ${className}`}
        style={{ background: MAROON }}
      >
        {primary.plus && <Plus size={18} />}
        {primary.label}
        {!primary.plus && <ArrowRight size={17} />}
      </button>
    );

  const itemsWord = totalItems === 1 ? "Item" : "Items";
  const line1 = [form.houseNo, form.street, form.landmark && `Near ${form.landmark}`, form.area]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed right-0 top-0 z-[60] flex h-full w-full flex-col overflow-hidden shadow-2xl transition-transform duration-500 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#F6F3F2" }}
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6" style={{ background: MAROON }}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-white" />
            <div>
              <h2 className="text-[15px] font-bold tracking-wide text-white">Secure Checkout</h2>
              <p className="text-[11px] text-white/70">{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="mr-2 hidden items-center gap-1.5 lg:flex">
              <HeaderSocial href={instagramUrl} label="Instagram"><Instagram size={15} /></HeaderSocial>
              <HeaderSocial href={`https://wa.me/${whatsappNumber}`} label="WhatsApp"><WhatsAppIcon size={17} /></HeaderSocial>
              <HeaderSocial href={emailAddress} label="Email"><Mail size={15} /></HeaderSocial>
              <HeaderSocial href={twitterUrl} label="X / Twitter"><Twitter size={15} /></HeaderSocial>
              <HeaderSocial href={facebookUrl} label="Facebook"><Facebook size={15} /></HeaderSocial>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {items.length > 0 && <Stepper step={step} onGo={(n) => n < step && setStep(n)} />}

        {/* BODY */}
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "#FDECEA" }}>
                <ShoppingBag size={34} style={{ color: MAROON }} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Your cart is empty</h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Add products to get 10% OFF above ₹750, 20% OFF above ₹1,500 and 30% OFF above ₹2,500.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 min-h-[48px] rounded-lg px-6 text-sm font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
                style={{ background: MAROON }}
              >
                Browse products
              </button>
              <div className="mt-8 w-full text-left">
                <AddMoreProducts suggestions={suggestions} cartKeys={cartKeys} onAdd={addToCart} subtotal={0} />
              </div>
            </div>
          ) : (
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 p-3 pb-6 sm:p-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
              {/* ───────── MAIN: 3 steps ───────── */}
              <div className="flex min-w-0 flex-col gap-3">
                {/* STEP 1 — CART & OFFERS */}
                <StepShell
                  n={1}
                  title="Cart & Offers"
                  state={stateFor(1)}
                  onEdit={() => setStep(1)}
                  summary={
                    <>
                      {totalItems} {itemsWord} · {formatINR(total)}
                      {appliedCoupon && <span style={{ color: GREEN }}> · {appliedCoupon.code} applied</span>}
                    </>
                  }
                >
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                        <span className="text-sm font-bold text-gray-800">
                          Your items <span className="font-normal text-gray-400">({totalItems})</span>
                        </span>
                        {confirmClear ? (
                          <span className="flex items-center gap-2 text-[11px]">
                            <span className="font-medium text-gray-500">Remove all?</span>
                            <button onClick={() => { clearCart(); setConfirmClear(false); }} className="min-h-[32px] rounded bg-red-500 px-3 font-bold text-white">Yes</button>
                            <button onClick={() => setConfirmClear(false)} className="min-h-[32px] rounded border border-gray-300 px-3 font-bold text-gray-600">No</button>
                          </span>
                        ) : (
                          <button onClick={() => setConfirmClear(true)} className="flex min-h-[32px] items-center gap-1 text-[12px] font-medium text-gray-500 transition hover:text-red-500">
                            <Trash2 size={12} /> Clear all
                          </button>
                        )}
                      </div>

                      <div className="divide-y divide-gray-100">
                        <AnimatePresence initial={false}>
                          {items.map((item) => {
                            const lineTotal = item.priceValue * item.qty;
                            return (
                              <motion.div
                                layout
                                key={item.key}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex gap-3 p-3 sm:p-4"
                              >
                                <ProductImg src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg border border-gray-200 sm:h-[72px] sm:w-[72px]" />
                                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="min-w-0">
                                    <h4 className="line-clamp-2 text-[13px] font-semibold leading-snug text-gray-800 sm:text-sm">{item.name}</h4>
                                    <p className="mt-0.5 text-[11px] text-gray-500">{item.weight} · {item.price} each</p>
                                  </div>
                                  <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
                                    <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                                      <button onClick={() => updateQty(item.key, item.qty - 1)} aria-label={`Decrease ${item.name}`} className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100">
                                        <Minus size={14} />
                                      </button>
                                      <span className="flex h-10 min-w-[36px] items-center justify-center border-x border-gray-300 text-sm font-bold text-gray-800">{item.qty}</span>
                                      <button onClick={() => updateQty(item.key, item.qty + 1)} aria-label={`Increase ${item.name}`} className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100">
                                        <Plus size={14} />
                                      </button>
                                    </div>
                                    <p className="w-20 text-right text-[15px] font-extrabold text-gray-900">{formatINR(lineTotal)}</p>
                                    <button
                                      onClick={() => removeFromCart(item.key)}
                                      aria-label={`Remove ${item.name}`}
                                      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition hover:border-red-300 hover:text-red-500"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>

                    <AddMoreProducts suggestions={suggestions} cartKeys={cartKeys} onAdd={addToCart} subtotal={subtotal} />

                    <div className="rounded-xl border border-gray-100 p-4" style={{ background: "#FFFBFA" }}>
                      <SavingsProgress subtotal={subtotal} appliedCoupon={appliedCoupon} />
                    </div>

                    <div className="rounded-xl border border-gray-100 p-4">
                      <CouponPanel
                        subtotal={subtotal}
                        appliedCoupon={appliedCoupon}
                        applyCoupon={applyCoupon}
                        removeCoupon={removeCoupon}
                        discount={discount}
                      />
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 lg:hidden">
                      <SummaryRows totalItems={totalItems} subtotal={subtotal} discount={discount} total={total} appliedCoupon={appliedCoupon} />
                    </div>

                    {/* Cart band karke aur products add karne ke liye */}
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border bg-white text-sm font-bold transition hover:bg-[#FDF1F2] active:scale-[0.99]"
                      style={{ color: MAROON, borderColor: MAROON }}
                    >
                      <Plus size={16} /> Add more products
                    </button>

                    {renderContinue("Continue to Address", () => setStep(2))}
                  </div>
                </StepShell>

                {/* STEP 2 — DELIVERY ADDRESS */}
                <StepShell
                  n={2}
                  title="Delivery Address"
                  state={stateFor(2)}
                  onEdit={() => setStep(2)}
                  summary={state2Summary(stateFor(2), confirmed, form)}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: "#F9DFE2" }}>
                      <MapPin size={20} style={{ color: MAROON }} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-gray-900">Where should we deliver your order?</p>
                      <p className="text-xs text-gray-500">Your address is saved on this device for next time.</p>
                    </div>
                  </div>

                  {confirmed ? (
                    <div
                      className="rounded-xl p-4"
                      style={{ border: `2px solid ${MAROON}`, background: "#FFF8F7" }}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={24} className="mt-0.5 shrink-0" style={{ color: MAROON }} aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <p className="text-base font-bold text-gray-900">{form.name}</p>
                            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#F9DFE2", color: MAROON }}>Selected</span>
                          </div>
                          <p className="mt-0.5 text-xs text-gray-500">+91 {form.mobile} · {form.email}</p>
                          <p className="mt-2 text-sm leading-6 text-gray-700">{line1}</p>
                          <p className="text-sm font-semibold leading-6 text-gray-900">{form.city}, {form.state} - {form.pincode}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-sm">
                        <Truck size={18} style={{ color: BLUE }} className="shrink-0" />
                        <span className="text-gray-600">
                          Estimated Delivery <strong className="block text-gray-900 sm:ml-1 sm:inline">{deliveryEstimate()}</strong>
                        </span>
                      </div>
                      {note.trim() && <p className="mt-2 text-xs text-gray-500">Note: {note.trim()}</p>}

                      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:flex">
                        <button
                          type="button"
                          onClick={() => openAddressModal("edit")}
                          className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-lg border bg-white px-5 text-sm font-bold transition hover:bg-[#FDF1F2]"
                          style={{ color: MAROON, borderColor: MAROON }}
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => openAddressModal("new")}
                          className="flex min-h-[46px] items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                        >
                          <Plus size={15} /> Add New Address
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center rounded-xl border-2 border-dashed px-4 py-8 text-center"
                      style={{ borderColor: "#E3B9BE", background: "#FFF8F7" }}
                    >
                      <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "#F9DFE2" }}>
                        <MapPin size={28} style={{ color: MAROON }} />
                      </span>
                      <p className="text-lg font-bold text-gray-900">Add your delivery address</p>
                      <p className="mt-1 text-sm text-gray-500">Add an address to continue with your order</p>
                      <button
                        type="button"
                        onClick={() => openAddressModal("edit")}
                        className="mt-5 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg px-8 text-[15px] font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98] sm:w-auto"
                        style={{ background: MAROON }}
                      >
                        <Plus size={18} /> Add New Address
                      </button>
                    </div>
                  )}

                  {confirmed && <div className="mt-4">{renderContinue("Continue to Payment", () => setStep(3))}</div>}
                </StepShell>

                {/* STEP 3 — PAYMENT & ORDER */}
                <StepShell n={3} title="Payment & Order" state={stateFor(3)} summary="Choose how you'd like to pay">
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold text-gray-800">Payment Method</legend>
                    <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {PAYMENT_OPTIONS.map((opt) => {
                        const on = payment === opt.label;
                        return (
                          <label
                            key={opt.label}
                            className="flex min-h-[58px] cursor-pointer items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 transition focus-within:ring-2 focus-within:ring-[#6E0F1D]/30"
                            style={on ? { borderColor: MAROON, background: "#FFF8F7" } : { borderColor: "#E5E7EB", background: "#fff" }}
                          >
                            <input
                              type="radio"
                              name="payment-method"
                              value={opt.label}
                              checked={on}
                              onChange={() => setPayment(opt.label)}
                              className="sr-only"
                            />
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                              style={{ borderColor: on ? MAROON : "#9CA3AF" }}
                              aria-hidden="true"
                            >
                              {on && <span className="h-2.5 w-2.5 rounded-full" style={{ background: MAROON }} />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold text-gray-900">{opt.label}</span>
                              <span className="block text-[11px] text-gray-500">{opt.hint}</span>
                            </span>
                            {on && <CheckCircle2 size={18} style={{ color: MAROON }} aria-hidden="true" />}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-5 rounded-xl bg-gray-50 p-4 lg:hidden">
                    <p className="mb-3 text-sm font-bold text-gray-800">Order Summary</p>
                    <SummaryRows totalItems={totalItems} subtotal={subtotal} discount={discount} total={total} appliedCoupon={appliedCoupon} />
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {renderWhatsAppButton()}
                    <button
                      type="button"
                      onClick={handleDownloadInvoice}
                      className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
                    >
                      <FileDown size={16} style={{ color: MAROON }} /> Download Invoice PDF
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500">
                      <Lock size={12} style={{ color: GREEN }} /> Safe & Secure Payment
                    </p>
                    <p className="text-center text-[11px] leading-4 text-gray-400">
                      Enquiry only — final pricing & delivery are confirmed on WhatsApp. The invoice PDF downloads automatically; attach it in the chat.
                    </p>
                  </div>
                </StepShell>

                {/* Benefits */}
                <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 text-[12px] text-gray-600 shadow-sm sm:grid-cols-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "#FDECEA" }}><Leaf size={16} style={{ color: MAROON }} /></span>
                    <span><strong className="block text-gray-800">100% Natural</strong>Pure, premium quality</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "#FDECEA" }}><Heart size={16} style={{ color: MAROON }} /></span>
                    <span><strong className="block text-gray-800">Trusted</strong>By happy customers</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "#FDECEA" }}><Truck size={16} style={{ color: MAROON }} /></span>
                    <span><strong className="block text-gray-800">Shipping World-Wide</strong>Free delivery</span>
                  </div>
                </div>
              </div>

              {/* ───────── DESKTOP: sticky order summary ───────── */}
              <aside aria-label="Order summary" className="hidden min-w-0 lg:sticky lg:top-5 lg:block lg:self-start">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <p className="flex items-center gap-2 text-base font-bold text-gray-900">
                      <Tag size={17} style={{ color: MAROON }} /> Order Summary
                    </p>
                    <span className="text-xs text-gray-500">{totalItems} {itemsWord.toLowerCase()}</span>
                  </div>
                  <div className="px-5 py-4">
                    <SummaryRows totalItems={totalItems} subtotal={subtotal} discount={discount} total={total} appliedCoupon={appliedCoupon} />
                    {discount > 0 && (
                      <div className="mt-3 flex items-center justify-between rounded-lg px-3 py-2 text-[13px] font-bold" style={{ background: "#E8F5E9", color: "#1B5E20" }}>
                        <span className="flex items-center gap-1.5"><Leaf size={14} /> You save</span>
                        <span>{formatINR(discount)}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 border-t border-gray-100 px-5 py-4">
                    {renderPrimary()}
                    {step === 2 && !confirmed && (
                      <p className="text-center text-[11px] text-gray-500">Add a delivery address to continue</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center text-[13px] font-bold underline-offset-2 hover:underline"
                      style={{ color: MAROON }}
                    >
                      + Add more products
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500">
                      <Lock size={12} style={{ color: GREEN }} /> Safe & Secure Payment
                    </p>
                    <PaymentBadges />
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>

        {/* MOBILE / TABLET STICKY BAR */}
        {items.length > 0 && (
          <div
            className="shrink-0 border-t border-gray-200 bg-white px-4 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="mx-auto flex max-w-xl items-center gap-3">
              <div className="shrink-0">
                <p className="text-[11px] font-medium text-gray-500">
                  {discount > 0 ? <span style={{ color: GREEN }}>You save {formatINR(discount)}</span> : "Total"}
                </p>
                <p className="text-xl font-extrabold leading-tight text-gray-900">{formatINR(total)}</p>
              </div>
              <div className="min-w-0 flex-1">{renderPrimary("!px-3")}</div>
            </div>
          </div>
        )}
      </aside>

      {/* ADDRESS MODAL */}
      <AddressModal
        open={addressOpen && isCartOpen}
        onClose={closeAddressModal}
        form={form}
        errors={errors}
        attempted={attempted}
        updateField={updateField}
        onSave={handleSaveAddress}
        pinLoading={pinLoading}
        note={note}
        setNote={setNote}
        isValid={isValid}
      />

      {/* ADDED-TO-CART TOAST (sirf jab cart band ho)
          Wrapper centering karta hai, motion element sirf animate karta hai,
          taaki framer-motion ka transform Tailwind ke translate ko override na kare. */}
      <AnimatePresence>
        {lastAdded && !isCartOpen && (
          <div
            key={lastAdded.at}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 sm:px-4"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto flex w-full max-w-md items-center gap-2.5 rounded-2xl bg-gray-900 p-2.5 pl-3.5 text-white shadow-2xl ring-1 ring-white/10 sm:gap-3 sm:p-3"
            >
              <CheckCircle2 size={20} className="shrink-0 text-green-400" />
              <p className="line-clamp-2 min-w-0 flex-1 text-[13px] font-semibold leading-snug">
                {lastAdded.name} added to cart
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex h-10 shrink-0 touch-manipulation items-center gap-1.5 whitespace-nowrap rounded-xl bg-white px-3.5 text-[13px] font-bold transition active:scale-95"
                style={{ color: MAROON }}
              >
                <ShoppingBag size={15} className="shrink-0" />
                View cart
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GENERAL TOAST */}
      <AnimatePresence>
        {toast && (
          <div className="pointer-events-none fixed inset-x-0 bottom-28 z-[90] flex justify-center px-4 lg:bottom-6">
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-[12px] font-semibold text-white shadow-lg"
            >
              <CheckCircle2 size={14} className="shrink-0 text-green-400" />
              <span className="min-w-0 truncate">{toast}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;