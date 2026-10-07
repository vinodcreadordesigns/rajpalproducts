import { useEffect, useState } from "react";
import { Instagram, Phone, Ticket, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = [
  {
    type: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    link: "https://wa.me/919930670044",
  },
  {
    icon: Instagram,
    label: "Instagram",
    color: "#E1306C",
    link: "https://www.instagram.com/rajpalincense81?igsi=MWduOTB5bjZqMThs",
  },
];

const coupons = [
  { code: "RAJPAL15", off: "15% OFF", note: "on orders above ₹1000" },
  { code: "PURELY25", off: "25% OFF", note: "on orders above ₹2000" },
];

const Topbar = () => {
  const [copied, setCopied] = useState("");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // One offer at a time, switches every 4s (pauses on hover)
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setActive((p) => (p + 1) % coupons.length),
      4000
    );
    return () => clearTimeout(t);
  }, [active, paused]);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const coupon = coupons[active];
  const isCopied = copied === coupon.code;

  return (
    <div
      className="sticky top-0 z-50 border-b border-[#F5D68A]/20 text-[#F5D68A]"
      style={{
        background:
          "linear-gradient(90deg, #4a0712 0%, #5c0b18 50%, #4a0712 100%)",
      }}
    >
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-3 px-3 sm:px-4">
        {/* LEFT: phone (lg and up) */}
        <div className="hidden flex-1 md:flex">
          <a
            href="tel:+919930670044"
            className="hidden items-center gap-2 rounded-full border border-[#F5D68A]/30 py-1 pl-1 pr-3.5 text-xs font-medium transition-colors hover:bg-[#F5D68A] hover:text-[#4a0712] lg:flex"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#F5D68A]/15">
              <Phone size={12} />
            </span>
            +91 99306 70044
          </a>
        </div>

        {/* CENTER: single rotating offer */}
        <div
          className="flex min-w-0 flex-1 items-center justify-center md:flex-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-9 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex h-9 items-center gap-2.5"
              >
                {/* gold icon disc */}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FBE7B0] to-[#D4A84F] text-[#4a0712]">
                  <Ticket size={13} strokeWidth={2.4} />
                </span>

                {/* offer text */}
                <p className="whitespace-nowrap text-[13px] leading-none">
                  <span className="font-bold text-[#FCE9B8]">{coupon.off}</span>
                  <span className="hidden text-[#F5D68A]/75 sm:inline">
                    {" "}
                    {coupon.note}
                  </span>
                </p>

                {/* code pill: tap to copy */}
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  aria-label={`Copy coupon code ${coupon.code}`}
                  className={`flex min-w-[108px] items-center justify-between gap-2 rounded-full border border-dashed px-3 py-1.5 font-mono text-[11px] font-bold leading-none tracking-[0.16em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D68A] ${
                    isCopied
                      ? "border-transparent bg-[#F5D68A] text-[#4a0712]"
                      : "border-[#F5D68A]/60 bg-black/20 text-[#F5D68A] hover:bg-black/35"
                  }`}
                >
                  {isCopied ? "COPIED" : coupon.code}
                  {isCopied ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: social (+ call icon on tablet) */}
        <div className="flex shrink-0 items-center justify-end gap-2 md:flex-1">
          <a
            href="tel:+919930670044"
            aria-label="Call us"
            title="Call us"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#F5D68A]/30 transition-colors hover:bg-[#F5D68A] hover:text-[#4a0712] sm:flex lg:hidden"
          >
            <Phone size={14} />
          </a>

          {icons.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                aria-label={item.label}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md ring-1 ring-white/30"
                style={{ backgroundColor: item.color }}
              >
                {item.type === "whatsapp" ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt=""
                    className="h-4 w-4"
                  />
                ) : (
                  <Icon size={16} />
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Topbar;