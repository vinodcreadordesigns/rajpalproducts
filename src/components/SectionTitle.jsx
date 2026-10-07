import { motion } from "framer-motion";

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mx-auto mb-10 max-w-3xl text-center"
  >
    {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>}
    <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
    {subtitle && <p className="mt-4 text-sm text-beige/80 md:text-base">{subtitle}</p>}
  </motion.div>
);

export default SectionTitle;
