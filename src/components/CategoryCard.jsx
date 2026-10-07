import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const CategoryCard = ({ category }) => (
  <motion.div
    whileHover={{
      rotateX: -5,
      rotateY: 6,
      scale: 1.04,
      y: -6,
    }}
    transition={{
      type: "spring",
      stiffness: 280,
      damping: 22,
    }}
    style={{
      transformStyle: "preserve-3d",
      perspective: 1600,
    }}
    className="w-full h-full"   // ← Important for Grid
  >
    <Link
      to={`/categories/${category.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#fff8f0] shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-700"
    >
      {/* 3D Paper Fold */}
      <div className="pointer-events-none absolute right-0 top-0 z-30 h-14 w-14 overflow-hidden">
        <div className="absolute right-0 top-0 h-0 w-0 border-l-[55px] border-t-[55px] border-l-transparent border-t-[#f1dfc4] opacity-0 transition-all duration-700 group-hover:opacity-100" />
        <div className="absolute right-0 top-0 h-0 w-0 border-l-[44px] border-t-[44px] border-l-transparent border-t-[#fff7ee] opacity-0 transition-all duration-700 group-hover:opacity-100" />
        <div className="absolute right-1 top-1 h-7 w-7 rotate-45 bg-white/40 blur-md opacity-0 transition duration-700 group-hover:opacity-100" />
      </div>

      {/* Shine */}
      <div className="absolute -left-[120%] top-0 z-20 h-full w-[45%] rotate-12 bg-white/25 blur-xl transition-all duration-1000 group-hover:left-[130%]" />

      {/* Image Area */}
      <div className="relative aspect-[0.8/1] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a2511]/90 via-transparent to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />

        {/* Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center opacity-0 transition duration-500 group-hover:opacity-100"
          style={{ transform: "translateZ(50px)" }}
        >
          <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-white drop-shadow-2xl">
            {category.name}
          </h3>

          <div className="mt-2.5 h-[2px] w-10 rounded-full bg-gradient-to-r from-[#d4a373] to-[#fff1d0]" />

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mt-4 flex items-center gap-1.5 rounded-full bg-[#4a2511] px-5 py-1.5 text-xs font-medium text-white shadow-lg"
          >
            View
            <ArrowUpRight size={14} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 h-14 w-full bg-gradient-to-t from-white/20 to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />
      </div>
    </Link>
  </motion.div>
);

export default CategoryCard;