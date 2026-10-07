import { motion } from "framer-motion";
import logo from "../assets/rajpal logo PNG.png";

const AnimatedBrandLogo = ({ size = "h-11 w-36 sm:h-14 sm:w-44" }) => {
  return (
    <div className="flex items-center">
      {/* Logo */}
      <motion.div
        className={`relative ${size} flex-shrink-0`}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={logo}
          alt="Rajpal Products"
          className="h-full w-full object-contain drop-shadow-sm"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedBrandLogo;