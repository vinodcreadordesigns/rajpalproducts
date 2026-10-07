import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const poojaItems = ["🌸", "🪔", "✨", "🌺", "🪷"];

/* ───────────────── SHARED STAGE (background + text content) ─────────────────
   This is rendered twice — once inside the left half, once inside the right
   half — so that together they visually form ONE complete screen. When the
   two halves later slide apart, it looks like the whole screen is opening. */
const LoaderStage = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
    {/* BACKGROUND GLOW */}
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7a1020]/20 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#c8a96b]/10 blur-[120px]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#7a1020]/10 blur-[120px]" />
    </div>

    {/* FALLING POOJA ITEMS */}
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        initial={{
          y: -120,
          x: Math.random() * window.innerWidth,
          opacity: 0,
          rotate: 0,
        }}
        animate={{
          y: window.innerHeight + 100,
          opacity: [0, 1, 1, 0],
          rotate: [0, 180, 360],
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
          ],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear",
        }}
        className="absolute text-2xl md:text-3xl"
      >
        {poojaItems[Math.floor(Math.random() * poojaItems.length)]}
      </motion.div>
    ))}

    {/* MAIN CONTENT */}
    <div className="relative z-10 flex flex-col items-center justify-center">
      {/* RAJPAL — drops down from the top */}
      <motion.h1
        initial={{ opacity: 0, y: -220 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-[#f7d48b] via-[#fff2c9] to-[#c8a96b] bg-clip-text text-4xl font-black uppercase tracking-[0.4em] text-transparent md:text-6xl"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        RAJPAL
      </motion.h1>

      {/* soft glow burst right where the two lines meet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.4, 1.6, 2] }}
        transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
        className="pointer-events-none absolute h-24 w-24 rounded-full bg-[#f7d48b]/40 blur-2xl"
      />

      {/* PURELY DIVINE — rises up from the bottom */}
      <motion.p
        initial={{ opacity: 0, y: 220 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 text-xs uppercase tracking-[0.7em] text-[#c8a96b]/70 md:text-sm"
      >
        PURELY DIVINE
      </motion.p>

      {/* LOADING BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-10 h-[3px] w-64 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-[#f7d48b] to-transparent"
        />
      </motion.div>

      {/* LOADING TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          opacity: { duration: 1.5, repeat: Infinity },
          delay: 1.2,
        }}
        className="mt-5 text-sm tracking-[0.25em] text-white/40"
      >
        LOADING DIVINE EXPERIENCE...
      </motion.p>
    </div>
  </div>
);

const WebsiteLoader = () => {
  const [phase, setPhase] = useState("intro"); // "intro" -> "split"
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // 1) Let RAJPAL / PURELY DIVINE fall, rise, and meet
    const openTimer = setTimeout(() => setPhase("split"), 1600);
    // 2) Once the screen has finished splitting apart, unmount the loader
    const hideTimer = setTimeout(() => setHide(true), 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden bg-[#0f0604]">
      {/* LEFT HALF */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: phase === "split" ? "-100%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 h-full w-1/2 overflow-hidden bg-[#0f0604]"
      >
        <div className="absolute left-0 top-0 h-full w-[200%]">
          <LoaderStage />
        </div>
      </motion.div>

      {/* RIGHT HALF */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: phase === "split" ? "100%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute right-0 top-0 h-full w-1/2 overflow-hidden bg-[#0f0604]"
      >
        <div className="absolute right-0 top-0 h-full w-[200%]">
          <LoaderStage />
        </div>
      </motion.div>

      {/* BOTTOM LINE — only pulses while the two halves are still joined */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase === "split" ? 0 : 1 }}
        transition={{
          duration: 2,
          repeat: phase === "split" ? 0 : Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-[#c8a96b] to-transparent"
      />
    </div>
  );
};

export default WebsiteLoader;