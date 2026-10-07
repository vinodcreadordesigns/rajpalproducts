import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Headphones,
  BadgeCheck,
  Leaf,
  Flame,
  PackageCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  Quote,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import aboutimage from "../assets/rajpalabout.png";
import rajpalabout from "../assets/rajpal.png";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Brand",
    desc: "Serving customers with devotion, trust and purity since 1981.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Reliable assistance and fast response for all our clients.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Quality",
    desc: "Crafted with authentic ingredients and divine fragrances.",
  },
];

const craftSteps = [
  {
    num: "01",
    icon: Leaf,
    title: "Sourcing",
    desc: "Sandalwood, rose, saffron and jasmine sourced from trusted growers across India.",
  },
  {
    num: "02",
    icon: Flame,
    title: "Blending",
    desc: "Master perfumers hand-blend each fragrance in small, closely watched batches.",
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Rolling & Drying",
    desc: "Every stick is rolled by hand and slow-dried to lock in a lasting aroma.",
  },
  {
    num: "04",
    icon: Truck,
    title: "Packaging",
    desc: "Quality-checked and packed with care before it leaves for your home.",
  },
];

const qualityPromises = [
  "Zero synthetic charcoal fillers",
  "Batch-tested fragrance consistency",
  "Hand-inspected before packaging",
  "Consistent burn time, every stick",
];

const team = [
  {
    initials: "VR",
    name: "Vijay Rajpal",
    role: "Founder & Chairman",
    note: "Started this journey in 1981 with a single blending room and a belief in purity.",
  },
  {
    initials: "MR",
    name: "Mahesh Rajpal",
    role: "Director, Operations",
    note: "Keeps every batch, every partner and every promise running on time.",
  },
  {
    initials: "AR",
    name: "Ashish Rajpal",
    role: "Brand & Marketing Lead",
    note: "Carries the Rajpal story to new homes, cities and generations.",
  },
];

function ImageStack() {
  return (
    <div className="relative h-[480px] w-full">

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        className="
          absolute left-0 bottom-0
          w-[72%] h-[380px]
       
          overflow-hidden
          border border-[#7a1022]/10
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
        "
      >
        <img
          src={aboutimage}
          alt="Rajpal Products"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-[#7a1022]/10 to-transparent" />
      </motion.div>

      {/* Small Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        whileHover={{ scale: 1.03 }}
        className="
          absolute right-0 top-0
          w-[58%] h-[290px]
          overflow-hidden
          border border-[#7a1022]/10
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          z-10
        "
      >
        <img
          src={rajpalabout}
          alt="Rajpal Agarbatti"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-[#7a1022]/10 to-transparent" />
      </motion.div>

      {/* Floating Badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="
          absolute bottom-8 right-8 z-20
          h-24 w-24 
          bg-gradient-to-br
          from-[#5a0b16]
          via-[#7a1022]
          to-[#8f1730]
          border-4 border-white/70
          flex flex-col items-center justify-center
          shadow-2xl
        "
      >
        <span className="text-[10px] tracking-[0.2em] text-white">
          SINCE
        </span>

        <span className="text-2xl font-bold text-white">
          1981
        </span>
      </motion.div>

      {/* Diya */}
      <div
        className="
          absolute top-5 left-5 z-20
          h-14 w-14 rounded-full
          bg-white/80 backdrop-blur-md
          border border-[#7a1022]/10
          flex items-center justify-center
          text-2xl
          shadow-xl
        "
      >
        🪔
      </div>
    </div>
  );
}

/* ---------- Craft visual: left-side panel for the process section ---------- */
function CraftVisual() {
  return (
    <div className="relative h-[440px] w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="
          relative h-full w-full
         
          overflow-hidden
          border border-[#7a1022]/10
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
        "
        style={{
          background:
            "linear-gradient(155deg, #5a0b16 0%, #7a1022 55%, #8f1730 100%)",
        }}
      >
        {/* soft glow */}
        <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

        <div className="relative h-full w-full flex flex-col justify-between p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-[#f6d78e]" />
            <span
              className="text-[11px] uppercase tracking-[0.35em] text-[#f6d78e]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hand Crafted
            </span>
          </div>

          <div>
            <p
              className="text-3xl lg:text-4xl leading-tight text-white/95"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Every stick, rolled
              <br />
              by hand, on purpose.
            </p>
          </div>

          {/* Ingredient chips */}
          <div className="grid grid-cols-2 gap-3">
            {["Sandalwood", "Rose", "Saffron", "Jasmine"].map((ing, i) => (
              <motion.div
                key={ing}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="
                  flex items-center gap-2
                  px-4 py-3
                  bg-white/10
                  backdrop-blur-md
                  border border-white/15
                "
              >
                <Leaf size={16} className="text-[#f6d78e] shrink-0" />
                <span className="text-sm text-white/90">{ing}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="
          absolute -bottom-6 -right-6 z-20
          h-28 w-28 rounded-full
          bg-white
          border-4 border-[#fff4cf]
          flex flex-col items-center justify-center
          shadow-2xl
          text-center
        "
      >
        <span className="text-2xl font-bold text-[#7a1022]" style={{ fontFamily: "'Playfair Display', serif" }}>
          100%
        </span>
        <span className="text-[9px] uppercase tracking-[0.15em] text-[#8f1730] mt-0.5">
          Natural
        </span>
      </motion.div>
    </div>
  );
}

/* ---------- Quality visual: right-side panel for the promise section ---------- */
function QualityVisual() {
  return (
    <div className="relative h-[440px] w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="
          relative h-full w-full
          overflow-hidden
          border border-[#7a1022]/10
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          p-8 lg:p-10
          flex flex-col justify-between
        "
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,248,220,0.85))",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] uppercase tracking-[0.35em] text-[#7a1022] font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Quality Promise
          </span>
          <div
            className="
              h-12 w-12
              bg-gradient-to-br from-[#5a0b16] via-[#7a1022] to-[#8f1730]
              flex items-center justify-center
              shadow-lg
            "
          >
            <ShieldCheck size={20} className="text-white" />
          </div>
        </div>

        <div className="space-y-4">
          {qualityPromises.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 size={18} className="text-[#7a1022] shrink-0" />
              <span className="text-[15px] text-[#3d2200]">{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#7a1022]/5 border border-[#7a1022]/10 p-5">
          <Quote size={18} className="text-[#7a1022] mb-2" />
          <p className="text-sm leading-6 text-[#6f4b00] italic">
            Purity isn't a claim on our box, it's a check we repeat on every single batch.
          </p>
        </div>
      </motion.div>

      {/* Diya accent */}
      <div
        className="
          absolute -top-5 -left-5 z-20
          h-14 w-14 
          bg-white/90 backdrop-blur-md
          border border-[#7a1022]/10
          flex items-center justify-center
          text-2xl
          shadow-xl
        "
      >
        🪔
      </div>
    </div>
  );
}

const About = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;

    const end = 21000;

    const duration = 2200;

    const increment = Math.ceil(end / (duration / 20));

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(start);
    }, 20);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      />

      <section
        ref={ref}
        className="
          relative overflow-hidden
          py-28 lg:py-36
          bg-gradient-to-br
          from-[#fffdf4]
          via-[#fff9e7]
          to-[#fff4cf]
        "
      >

        {/* Background Glow */}
        <div
          className="
            absolute top-0 left-1/2
            -translate-x-1/2
            w-[900px] h-[500px]
           
            blur-3xl
            pointer-events-none
          "
        />

        {/* Pattern */}
        <div
          className="
            absolute inset-0
            opacity-[0.04]
            bg-[radial-gradient(circle_at_center,_#7a1022_1px,_transparent_1px)]
            [background-size:32px_32px]
            pointer-events-none
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="mb-12">

            <p
              className="
                uppercase
                tracking-[0.45em]
                text-[12px]
                text-[#7a1022]
                font-semibold
                text-center
              "
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              About Us
            </p>

            <h1
              className="
                mt-5
                text-4xl md:text-5xl lg:text-6xl
                leading-[1.05]
                font-bold
                tracking-[-2px]
                text-center
                text-[#2f1b00]
              "
              style={{
                fontFamily: "'Bodoni Moda', serif",
              }}
            >
              RAJPAL PRODUCTS —
              <span className="text-[#7a1022]">
                {" "}PURELY DIVINE
              </span>
            </h1>

          </div>

          {/* Center Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mt-12"
          >
            <div className="text-center">

              <div
                className="
                  text-6xl lg:text-7xl
                  font-bold
                  tracking-[-2px]
                  bg-gradient-to-r
                  from-[#5a0b16]
                  via-[#8f1730]
                  to-[#5a0b16]
                  bg-clip-text
                  text-transparent
                "
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {count.toLocaleString()}+
              </div>

              <p
                className="mt-3 text-xl text-[#4a0d18] font-semibold"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Happy Customers
              </p>

              <p
                className="text-sm text-[#8f1730] mt-1 tracking-[0.15em]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Across India & Global Markets
              </p>

            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              mt-14
              grid lg:grid-cols-[1.05fr_0.95fr]
              gap-16
              items-center
              p-8 lg:p-14
            "
          >

            {/* Left */}
            <div>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-[#7a1022]/40" />

                <p
                  className="
                    uppercase
                    tracking-[0.35em]
                    text-[11px]
                    text-[#7a1022]
                    font-medium
                  "
                >
                  Our Story
                </p>
              </div>

              <h2
                className="
                  text-4xl lg:text-6xl
                  leading-[1.05]
                  font-bold
                  tracking-[-1px]
                  text-[#2f1b00]
                "
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Crafting Divine
                <br />
                Fragrance Since 1981
              </h2>

              <p
                className="
                  mt-7
                  text-[17px]
                  leading-[1.9]
                  text-[#6f4b00]
                "
              >
                RAJPAL PRODUCTS combines traditional incense craftsmanship
                with modern fragrance excellence. Every product is created
                with devotion, purity, and premium quality.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-10 mt-10">

                {[
                  ["43+", "Years Legacy"],
                  ["300+", "Products"],
                  ["50+", "Retail Partners"],
                ].map(([num, label], i) => (
                  <div key={i}>
                    <div
                      className="
                        text-4xl
                        font-bold
                        text-[#7a1022]
                      "
                      style={{
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {num}
                    </div>

                    <div
                      className="
                        mt-1
                        text-[11px]
                        uppercase
                        tracking-[0.25em]
                        text-[#8f1730]
                      "
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => navigate("/contact")}
                className="
                  group relative overflow-hidden
                  mt-10
                  rounded-full
                  px-8 py-4
                  text-sm
                  tracking-[0.25em]
                  uppercase
                  font-medium
                  bg-gradient-to-r
                  from-[#5a0b16]
                  via-[#7a1022]
                  to-[#8f1730]
                  text-white
                  shadow-xl
                  transition-all duration-500
                  hover:scale-105
                  hover:shadow-[#7a1022]/40
                "
              >
                Learn More
              </button>

            </div>

            {/* Right */}
            <ImageStack />

          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="
                    relative overflow-hidden
                    
                    p-8
                    border border-[#7a1022]/10
                    shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                    transition-all duration-500
                  "
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                  }}
                >

                  <div
                    className="
                      absolute top-0 left-0 right-0
                      h-[2px]
                      bg-gradient-to-r
                      from-transparent
                      via-[#7a1022]
                      to-transparent
                    "
                  />

                  <div
                    className="
                      h-16 w-16
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#f8d7de]
                      to-[#f1b7c3]
                      flex items-center justify-center
                      text-[#7a1022]
                      shadow-lg
                    "
                  >
                    <Icon size={32} strokeWidth={1.7} />
                  </div>

                  <h3
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      text-[#3d2200]
                    "
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-[15px]
                      leading-8
                      text-[#7a5a00]
                    "
                  >
                    {item.desc}
                  </p>

                </motion.div>
              );
            })}
          </div>

          {/* ---------- Section: Our Craft (image left, text right) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              mt-24 lg:mt-32
              grid lg:grid-cols-[0.95fr_1.05fr]
              gap-16
              items-center
            "
          >
            <CraftVisual />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-[#7a1022]/40" />
                <p
                  className="uppercase tracking-[0.35em] text-[11px] text-[#7a1022] font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our Craft
                </p>
              </div>

              <h2
                className="text-4xl lg:text-5xl leading-[1.1] font-bold tracking-[-1px] text-[#2f1b00]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                From Raw Ingredient
                <br />
                to Sacred Ritual
              </h2>

              <p className="mt-6 text-[17px] leading-[1.9] text-[#6f4b00] max-w-xl">
                Nothing about our process is rushed. Four decades of practice
                taught us that patience is the real ingredient behind a
                fragrance that lingers.
              </p>

              <div className="mt-10 space-y-6">
                {craftSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="
                            h-12 w-12 rounded-full
                            bg-gradient-to-br from-[#f8d7de] to-[#f1b7c3]
                            flex items-center justify-center
                            text-[#7a1022]
                            shrink-0
                          "
                        >
                          <Icon size={20} strokeWidth={1.8} />
                        </div>
                        {i !== craftSteps.length - 1 && (
                          <div className="w-px flex-1 bg-[#7a1022]/15 mt-2" />
                        )}
                      </div>

                      <div className="pb-2">
                        <div className="flex items-baseline gap-3">
                          <span
                            className="text-xs font-semibold tracking-[0.2em] text-[#8f1730]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {step.num}
                          </span>
                          <h4
                            className="text-lg font-bold text-[#3d2200]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {step.title}
                          </h4>
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-[#7a5a00] max-w-md">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ---------- Section: Quality Promise (text left, image right) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              mt-24 lg:mt-32
              grid lg:grid-cols-[1.05fr_0.95fr]
              gap-16
              items-center
            "
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-[#7a1022]/40" />
                <p
                  className="uppercase tracking-[0.35em] text-[11px] text-[#7a1022] font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our Promise
                </p>
              </div>

              <h2
                className="text-4xl lg:text-5xl leading-[1.1] font-bold tracking-[-1px] text-[#2f1b00]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Purity Isn't a Slogan.
                <br />
                It's Our Standard.
              </h2>

              <p className="mt-6 text-[17px] leading-[1.9] text-[#6f4b00] max-w-xl">
                Every batch is checked before it's approved to carry the
                Rajpal name — because trust, once lit, has to keep burning
                clean.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                {[
                  ["43+", "Years of Trust"],
                  ["0", "Compromises Made"],
                ].map(([num, label], i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#7a1022]/10 bg-white/60 backdrop-blur-md p-6"
                  >
                    <div
                      className="text-3xl font-bold text-[#7a1022]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {num}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#8f1730]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/products")}
                className="
                  group relative overflow-hidden
                  mt-10
                  rounded-full
                  px-8 py-4
                  text-sm
                  tracking-[0.25em]
                  uppercase
                  font-medium
                  border-2 border-[#7a1022]
                  text-[#7a1022]
                  transition-all duration-500
                  hover:bg-[#7a1022]
                  hover:text-white
                  hover:scale-105
                "
              >
                Explore Products
              </button>
            </div>

            <QualityVisual />
          </motion.div>

          {/* ---------- Team Section ---------- */}
          <div className="mt-24 lg:mt-32">
            <div className="text-center mb-14">
              <p
                className="uppercase tracking-[0.45em] text-[12px] text-[#7a1022] font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our Team
              </p>

              <h2
                className="mt-5 text-4xl lg:text-5xl leading-[1.05] font-bold tracking-[-1px] text-[#2f1b00]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Hands Behind
                <span className="text-[#7a1022]"> Every Fragrance</span>
              </h2>

              <p className="mt-4 text-[16px] text-[#6f4b00] max-w-xl mx-auto">
                A family business, run by people who still check every batch
                themselves.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="
                    relative overflow-hidden
                    rounded-[28px]
                    p-8
                    text-center
                    border border-[#7a1022]/10
                    shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                    transition-all duration-500
                  "
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    className="
                      absolute top-0 left-0 right-0
                      h-[2px]
                      bg-gradient-to-r
                      from-transparent
                      via-[#7a1022]
                      to-transparent
                    "
                  />

                  <div
                    className="
                      mx-auto
                      h-24 w-24
                      rounded-full
                      bg-gradient-to-br
                      from-[#5a0b16]
                      via-[#7a1022]
                      to-[#8f1730]
                      flex items-center justify-center
                      shadow-xl
                      border-4 border-white/70
                    "
                  >
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {member.initials}
                    </span>
                  </div>

                  <h3
                    className="mt-6 text-xl font-bold text-[#3d2200]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {member.name}
                  </h3>

                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#8f1730] font-semibold">
                    {member.role}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#7a5a00]">
                    {member.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </section>
    </>
  );
};

export default About;