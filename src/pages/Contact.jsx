"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  Send,
  Navigation,
  CheckCircle2,
} from "lucide-react";

/* ---------- Business details (edit here) ---------- */
const WHATSAPP_NUMBER = "919930670044";
const WHATSAPP_DISPLAY = "+91 99306 70044";
const EMAIL = "rajpalproduct@gmail.com";
const EMAIL_2 = "info@rajpalproduct.in";
const ADDRESS_LINES = [
  "Shop No. 2, Vastu Matunga Co-operative Housing Society,",
  "Laxmi Narayan Lane, Matunga C. Railway,",
  "Mumbai – 400 019",
];
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Rajpal+Products+Matunga+Mumbai";

const SUBJECTS = [
  "Product Inquiry",
  "Bulk Order",
  "Dealership Request",
  "Order / Delivery Support",
  "Return & Exchange",
  "General Support",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

const inputBase = `
  w-full rounded-2xl border bg-white px-5 py-4
  text-sm text-[#3a0d0d] placeholder:text-[#7a1020]/40
  outline-none transition-all duration-300
  focus:border-[#7a1020] focus:shadow-[0_0_0_4px_rgba(122,16,32,0.08)]
`;

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a1020]">
        {label}
        {required && <span className="text-[#a01f34]"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [openSubject, setOpenSubject] = useState(false);
  const [notice, setNotice] = useState("");
  const dropdownRef = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenSubject(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";

    const digits = form.phone.replace(/\D/g, "");
    const tenDigits = digits.length > 10 ? digits.slice(-10) : digits;
    if (!form.phone.trim()) er.phone = "Please enter your phone number.";
    else if (tenDigits.length !== 10)
      er.phone = "Enter a valid 10-digit mobile number.";

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      er.email = "Enter a valid email address.";

    if (!form.subject) er.subject = "Please select a subject.";
    if (!form.message.trim()) er.message = "Please write your message.";

    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const buildMessage = () =>
    [
      "*New Inquiry - Rajpal Products*",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() && `Email: ${form.email.trim()}`,
      form.company.trim() && `Company: ${form.company.trim()}`,
      `Subject: ${form.subject}`,
      "",
      "Message:",
      form.message.trim(),
    ]
      .filter((line) => line !== false && line !== "")
      .join("\n")
      .replace("Subject:", "Subject:");

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setNotice("Opening WhatsApp with your inquiry. Please press Send there.");
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = `${form.subject} - ${form.name.trim()}`;
    const body = buildMessage().replace(/\*/g, "");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setNotice("Opening your email app with the inquiry.");
  };

  const details = [
    {
      icon: <MapPin size={20} />,
      title: "Visit Us",
      content: (
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#7a1020]"
        >
          {ADDRESS_LINES.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </a>
      ),
    },
    {
      icon: <Phone size={20} />,
      title: "Call / WhatsApp",
      content: (
        <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-[#7a1020]">
          {WHATSAPP_DISPLAY}
        </a>
      ),
    },
    {
      icon: <Mail size={20} />,
      title: "Email",
      content: (
        <>
          {[EMAIL, EMAIL_2].map((mail) => (
            <a
              key={mail}
              href={`mailto:${mail}`}
              className="block break-all hover:text-[#7a1020]"
            >
              {mail}
            </a>
          ))}
        </>
      ),
    },
    {
      icon: <Clock size={20} />,
      title: "Working Hours",
      content: <span>Mon – Sat : 9 AM to 7 PM</span>,
    },
  ];

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
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* BACKGROUND GLOW */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#7a1020]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#7a1020]/10 blur-3xl" />

        {/* PATTERN */}
        <div
          className="
            pointer-events-none absolute inset-0 opacity-[0.04]
            bg-[radial-gradient(circle_at_center,_#7a1020_1px,_transparent_1px)]
            [background-size:28px_28px]
          "
        />

        {/* HEADER */}
        <div className="relative z-10 mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-[#7a1020]">
            Contact Us
          </p>

          <h2
            className="max-w-3xl text-4xl leading-tight text-[#3a0d0d] md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
          >
            Let’s Connect With
            <span className="block bg-gradient-to-r from-[#7a1020] via-[#a01f34] to-[#5c0d18] bg-clip-text text-transparent">
              Rajpal Products
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#7b4d4d]">
            We’re here to help with fragrance products, bulk and wholesale
            orders, and customer support.
          </p>

          <div className="mt-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-[#7a1020] via-[#a01f34] to-transparent" />
        </div>

        {/* MAIN GRID */}
        <div className="relative z-10 grid gap-12 lg:gap-20 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT: CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              flex flex-col
            "
          >
            <h3
              className="text-3xl text-[#3a0d0d]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
            >
              Contact Details
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#7b4d4d]">
              Reach us directly through any of the options below.
            </p>

            <div className="mt-8 space-y-7">
              {details.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[#7a1020]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a1020]">
                      {item.title}
                    </p>
                    <div className="mt-1.5 text-[16px] leading-7 text-[#3a0d0d]">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#128C7E] hover:underline"
            >
              <MessageCircle size={18} />
              Chat with us on WhatsApp
            </a>
          </motion.div>
          {/* RIGHT: FORM */}
          <motion.form
            noValidate
            onSubmit={sendWhatsApp}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
            "
          >
            <div className="mb-7">
              <h3
                className="text-3xl text-[#3a0d0d]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
              >
                Send Your Inquiry
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-[#7b4d4d]">
                Fill in the details and send your inquiry on WhatsApp or email.
                Fields marked * are required.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" required error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={`${inputBase} ${errors.name ? "border-red-400" : "border-[#7a1020]/15"}`}
                />
              </Field>

              <Field label="Phone Number" required error={errors.phone}>
                <input
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  className={`${inputBase} ${errors.phone ? "border-red-400" : "border-[#7a1020]/15"}`}
                />
              </Field>

              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com (optional)"
                  autoComplete="email"
                  className={`${inputBase} ${errors.email ? "border-red-400" : "border-[#7a1020]/15"}`}
                />
              </Field>

              <Field label="Company Name">
                <input
                  type="text"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Optional"
                  autoComplete="organization"
                  className={`${inputBase} border-[#7a1020]/15`}
                />
              </Field>
            </div>

            {/* SUBJECT DROPDOWN */}
            <div className="mt-5" ref={dropdownRef}>
              <Field label="Subject" required error={errors.subject}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenSubject((o) => !o)}
                    aria-expanded={openSubject}
                    className={`flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-4 text-sm transition-all duration-300 hover:border-[#7a1020] ${
                      errors.subject ? "border-red-400" : "border-[#7a1020]/15"
                    }`}
                  >
                    <span
                      className={
                        form.subject ? "font-medium text-[#3a0d0d]" : "text-[#7a1020]/40"
                      }
                    >
                      {form.subject || "Select subject"}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#7a1020] transition duration-300 ${
                        openSubject ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSubject && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[#7a1020]/10 bg-white shadow-[0_20px_40px_rgba(122,16,32,0.12)]">
                      {SUBJECTS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setForm((f) => ({ ...f, subject: item }));
                            setErrors((er) => ({ ...er, subject: "" }));
                            setOpenSubject(false);
                          }}
                          className={`block w-full border-b border-[#7a1020]/5 px-5 py-3.5 text-left text-sm transition-colors duration-200 last:border-b-0 hover:bg-[#7a1020] hover:text-white ${
                            form.subject === item
                              ? "bg-[#7a1020]/5 font-semibold text-[#7a1020]"
                              : "text-[#3a0d0d]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
            </div>

            {/* MESSAGE */}
            <div className="mt-5">
              <Field label="Your Message" required error={errors.message}>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us what you are looking for. For order issues, please include your order number."
                  className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-[#7a1020]/15"}`}
                />
              </Field>
            </div>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-wrap gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  flex items-center gap-3 rounded-full
                  bg-[#25D366] px-8 py-4
                  text-sm font-semibold uppercase tracking-[0.14em] text-white
                  shadow-[0_12px_30px_rgba(37,211,102,0.25)]
                "
              >
                <MessageCircle size={18} />
                Send on WhatsApp
              </motion.button>

              <motion.button
                type="button"
                onClick={sendEmail}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  flex items-center gap-3 rounded-full
                  bg-gradient-to-r from-[#7a1020] via-[#65101b] to-[#3f060d]
                  px-8 py-4
                  text-sm font-semibold uppercase tracking-[0.14em] text-white
                  shadow-[0_12px_30px_rgba(122,16,32,0.25)]
                "
              >
                <Send size={18} />
                Send via Email
              </motion.button>
            </div>

            {notice && (
              <div className="mt-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{notice}</span>
              </div>
            )}
          </motion.form>

        </div>

        {/* MAP: FULL WIDTH */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mt-10 overflow-hidden rounded-[32px] border border-[#7a1020]/15 shadow-[0_15px_50px_rgba(122,16,32,0.12)]"
        >
          <iframe
            title="Rajpal Products location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.787823736182!2d72.8520115!3d19.029069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf9822821f45%3A0xe08971914c2d5d7f!2sRajpal%20Products!5e0!3m2!1sen!2sin!4v1778844132607!5m2!1sen!2sin"
            className="block h-[320px] w-full md:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="
              absolute bottom-4 left-4 flex items-center gap-2
              rounded-full bg-white px-5 py-3
              text-xs font-semibold uppercase tracking-[0.15em] text-[#7a1020]
              shadow-xl transition-all duration-300 hover:bg-[#7a1020] hover:text-white
            "
          >
            <Navigation size={16} />
            Get Directions
          </a>
        </motion.div>
      </section>
    </>
  );
};

export default ContactForm;