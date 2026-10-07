import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const subjects = [
  "Product Inquiry",
  "Bulk Order",
  "Dealership Request",
  "General Support",
];

const ContactForm = () => {
  const [openSubject, setOpenSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[2rem] border border-[#7a1020]/20 bg-white/40 p-8 shadow-[0_0_40px_rgba(122,16,32,0.08)] backdrop-blur-2xl"
    >
      {/* GOLD GLOW */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#E2C88B]/20 blur-3xl" />

      {/* TITLE */}
      <div className="relative z-10 mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-[#7a1020]">
          Contact Us
        </p>

        <h2 className="mt-2 bg-gradient-to-r from-[#7a1020] via-[#b68a35] to-[#7a1020] bg-clip-text text-3xl font-black uppercase tracking-[0.12em] text-transparent">
          Send Inquiry
        </h2>
      </div>

      {/* FORM */}
      <div className="relative z-10 space-y-5">

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-2xl border border-[#7a1020]/15 bg-white/80 p-4 text-sm text-[#3d0911] outline-none backdrop-blur-xl transition focus:border-[#7a1020] focus:shadow-[0_0_20px_rgba(122,16,32,0.15)]"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-2xl border border-[#7a1020]/15 bg-white/80 p-4 text-sm text-[#3d0911] outline-none backdrop-blur-xl transition focus:border-[#7a1020] focus:shadow-[0_0_20px_rgba(122,16,32,0.15)]"
        />

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full rounded-2xl border border-[#7a1020]/15 bg-white/80 p-4 text-sm text-[#3d0911] outline-none backdrop-blur-xl transition focus:border-[#7a1020] focus:shadow-[0_0_20px_rgba(122,16,32,0.15)]"
        />

        {/* SUBJECT DROPDOWN */}
        <div className="relative">

          {/* BUTTON */}
          <button
            type="button"
            onClick={() => setOpenSubject(!openSubject)}
            className="flex w-full items-center justify-between rounded-2xl border border-[#7a1020]/15 bg-white/80 p-4 text-left backdrop-blur-xl transition hover:border-[#7a1020]"
          >
            <span
              className={`text-sm font-semibold ${
                selectedSubject
                  ? "text-[#3d0911]"
                  : "text-[#7a1020]/50"
              }`}
            >
              {selectedSubject || "Select Subject"}
            </span>

            <ChevronDown
              className={`transition duration-300 ${
                openSubject ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          {/* OPTIONS */}
          <AnimatePresence>
            {openSubject && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl border border-[#7a1020]/15 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
              >
                {subjects.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(item);
                      setOpenSubject(false);
                    }}
                    className={`w-full px-5 py-4 text-left text-sm font-medium transition duration-300 hover:bg-gradient-to-r hover:from-[#7a1020] hover:to-[#b68a35] hover:text-white ${
                      selectedSubject === item
                        ? "bg-[#7a1020] text-white"
                        : "text-[#3d0911]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MESSAGE */}
        <textarea
          rows={5}
          placeholder="Write Your Message..."
          className="w-full rounded-2xl border border-[#7a1020]/15 bg-white/80 p-4 text-sm text-[#3d0911] outline-none backdrop-blur-xl transition focus:border-[#7a1020] focus:shadow-[0_0_20px_rgba(122,16,32,0.15)]"
        />

        {/* SEND BUTTON */}
        <div className="pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#E2C88B] to-[#C9A45C] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(226,200,139,0.35)]"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-[#7a1020] to-[#4a0712] transition duration-500 group-hover:translate-x-0" />

            <span className="relative z-10 transition group-hover:text-[#F5D68A]">
              Send Inquiry
            </span>
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default ContactForm;