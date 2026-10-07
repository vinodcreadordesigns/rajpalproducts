"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
} from "lucide-react";

const ContactForm = () => {
  const [openSubject, setOpenSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const whatsappNumber = "919930670044";
  const whatsappDisplay = "+91 9930670044";

  return (
    <>
      {/* GOOGLE FONTS */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <section
        className="
          relative overflow-hidden
          rounded-[36px]
          border border-[#7a1020]/10
          bg-gradient-to-br
          from-[#fff8f5]
          via-[#f9ece7]
          to-[#f3dfd7]
          p-6 md:p-10 lg:p-14
          shadow-[0_20px_80px_rgba(122,16,32,0.10)]
        "
        style={{
          fontFamily: "'Outfit', sans-serif",
        }}
      >

        {/* BACKGROUND GLOW */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#7a1020]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#7a1020]/10 blur-3xl" />

        {/* PATTERN */}
        <div
          className="
            absolute inset-0 opacity-[0.04]
            bg-[radial-gradient(circle_at_center,_#7a1020_1px,_transparent_1px)]
            [background-size:28px_28px]
          "
        />

        {/* HEADER */}
        <div className="relative z-10 mb-12">

          <p
            className="
              mb-4
              text-xs
              uppercase
              tracking-[0.5em]
              text-[#7a1020]
              font-semibold
            "
          >
            Contact Us
          </p>

          <h2
            className="
              max-w-3xl
              text-4xl
              md:text-5xl
              lg:text-6xl
              leading-tight
              text-[#3a0d0d]
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
            }}
          >
            Let’s Connect With

            <span
              className="
                block
                bg-gradient-to-r
                from-[#7a1020]
                via-[#a01f34]
                to-[#5c0d18]
                bg-clip-text
                text-transparent
              "
            >
              Rajpal Products
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#7b4d4d]">
            We’re here to assist you with premium incense products,
            wholesale orders, and customer support.
          </p>

          <div className="mt-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-[#7a1020] via-[#a01f34] to-transparent" />
        </div>

        {/* MAIN GRID */}
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="
              rounded-[32px]
              border border-[#7a1020]/10
              bg-white/80
              p-6 md:p-8
              shadow-[0_15px_50px_rgba(122,16,32,0.08)]
              backdrop-blur-xl
            "
          >

            {/* TITLE */}
            <div className="mb-7">

              <h3
                className="text-3xl text-[#3a0d0d]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                Send Your Inquiry
              </h3>

              <p className="mt-2 text-[15px] text-[#7b4d4d] leading-7">
                Fill out the form below and our team will contact you shortly.
              </p>
            </div>

            {/* INPUTS */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}
              <input
                type="text"
                placeholder="Full Name"
                className="
                  rounded-2xl
                  border border-[#7a1020]/15
                  bg-white
                  px-5 py-4
                  text-sm text-[#3a0d0d]
                  outline-none
                  transition-all duration-300
                  focus:border-[#7a1020]
                  focus:shadow-[0_0_0_4px_rgba(122,16,32,0.08)]
                "
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                className="
                  rounded-2xl
                  border border-[#7a1020]/15
                  bg-white
                  px-5 py-4
                  text-sm text-[#3a0d0d]
                  outline-none
                  transition-all duration-300
                  focus:border-[#7a1020]
                  focus:shadow-[0_0_0_4px_rgba(122,16,32,0.08)]
                "
              />

              {/* PHONE */}
              <input
                type="text"
                placeholder="Phone Number"
                className="
                  rounded-2xl
                  border border-[#7a1020]/15
                  bg-white
                  px-5 py-4
                  text-sm text-[#3a0d0d]
                  outline-none
                  transition-all duration-300
                  focus:border-[#7a1020]
                  focus:shadow-[0_0_0_4px_rgba(122,16,32,0.08)]
                "
              />

              {/* COMPANY */}
              <input
                type="text"
                placeholder="Company Name"
                className="
                  rounded-2xl
                  border border-[#7a1020]/15
                  bg-white
                  px-5 py-4
                  text-sm text-[#3a0d0d]
                  outline-none
                  transition-all duration-300
                  focus:border-[#7a1020]
                  focus:shadow-[0_0_0_4px_rgba(122,16,32,0.08)]
                "
              />
            </div>

            {/* SUBJECT DROPDOWN */}
            <div className="relative mt-5">

              {/* BUTTON */}
              <button
                type="button"
                onClick={() => setOpenSubject(!openSubject)}
                className="
                  flex w-full items-center justify-between
                  rounded-2xl
                  border border-[#7a1020]/15
                  bg-white
                  px-5 py-4
                  text-sm
                  transition-all duration-300
                  hover:border-[#7a1020]
                "
              >

                <span
                  className={`font-medium ${
                    selectedSubject
                      ? "text-[#3a0d0d]"
                      : "text-[#7a1020]/50"
                  }`}
                >
                  {selectedSubject || "Select Subject"}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition duration-300 ${
                    openSubject ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* OPTIONS */}
              {openSubject && (
                <div
                  className="
                    absolute left-0 top-full z-50 mt-3
                    w-full overflow-hidden
                    rounded-2xl
                    border border-[#7a1020]/10
                    bg-white
                    shadow-[0_20px_40px_rgba(122,16,32,0.12)]
                  "
                >

                  {[
                    "Product Inquiry",
                    "Bulk Order",
                    "Dealership Request",
                    "General Support",
                  ].map((item, i) => (

                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedSubject(item);
                        setOpenSubject(false);
                      }}
                      className="
                        block w-full
                        border-b border-[#7a1020]/5
                        px-5 py-4
                        text-left text-sm
                        text-[#3a0d0d]
                        transition-all duration-300
                        hover:bg-gradient-to-r
                        hover:from-[#7a1020]
                        hover:to-[#a01f34]
                        hover:text-white
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MESSAGE */}
            <textarea
              rows={6}
              placeholder="Write Your Message..."
              className="
                mt-5 w-full
                rounded-2xl
                border border-[#7a1020]/15
                bg-white
                px-5 py-4
                text-sm text-[#3a0d0d]
                outline-none
                transition-all duration-300
                focus:border-[#7a1020]
                focus:shadow-[0_0_0_4px_rgba(122,16,32,0.08)]
              "
            />

            {/* BUTTONS */}
            <div className="mt-7 flex flex-wrap gap-4">

              {/* SEND */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="
                  group relative overflow-hidden
                  rounded-full
                  bg-gradient-to-r
                  from-[#7a1020]
                  via-[#65101b]
                  to-[#3f060d]
                  px-8 py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-[0_12px_30px_rgba(122,16,32,0.25)]
                "
              >
                <span className="relative z-10">
                  Send Inquiry
                </span>
              </motion.button>

              {/* WHATSAPP */}
              <motion.a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="
                  flex items-center gap-3
                  rounded-full
                  border border-[#25D366]/20
                  bg-[#25D366]
                  px-8 py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  shadow-[0_12px_30px_rgba(37,211,102,0.25)]
                "
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >

            {[
              {
                icon: <MapPin size={20} />,
                title: "Address",
                value:
                  "Shop No.2,\nVastu Matunga Co-operative Housing Society,\nLaxmi Narayan Lane,\nMatunga C.Rly,\nMumbai 400-019",
              },
              {
                icon: <Mail size={20} />,
                title: "Email",
                value: "info@rajpalproducts.in",
              },
              {
                icon: <Phone size={20} />,
                title: "Phone",
                value: whatsappDisplay,
              },
              {
                icon: <Clock size={20} />,
                title: "Working Hours",
                value: "Mon - Sat : 9 AM to 7 PM",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="
                  flex items-start gap-4
                  rounded-[26px]
                  border border-[#7a1020]/10
                  bg-white/80
                  p-5
                  shadow-[0_10px_30px_rgba(122,16,32,0.08)]
                  backdrop-blur-xl
                "
              >

                {/* ICON */}
                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#7a1020]
                    to-[#5c0d18]
                    text-white
                    shrink-0
                  "
                >
                  {item.icon}
                </div>

                {/* TEXT */}
                <div>

                  <p
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.28em]
                      text-[#7a1020]
                      font-semibold
                    "
                  >
                    {item.title}
                  </p>

                  <h3
                    className="mt-2 whitespace-pre-line text-xl leading-snug text-[#3a0d0d]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </h3>
                </div>
              </motion.div>
            ))}

            {/* MAP */}
            <div className="overflow-hidden rounded-[30px] border border-[#7a1020]/15 shadow-[0_10px_30px_rgba(122,16,32,0.12)]">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.787823736182!2d72.8520115!3d19.029069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf9822821f45%3A0xe08971914c2d5d7f!2sRajpal%20Products!5e0!3m2!1sen!2sin!4v1778844132607!5m2!1sen!2sin"
                className="h-[300px] w-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;