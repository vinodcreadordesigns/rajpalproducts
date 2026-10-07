import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { categories } from "../../data/siteData";
import { motion, AnimatePresence } from "framer-motion";

const toAnchor = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const MegaMenu = ({
  open,
  anchorRect,
  onMouseEnter,
  onMouseLeave,
  onClose,
}) => {
  const top = anchorRect ? anchorRect.bottom : 0;

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          // while open the panel is interactive; the moment `open` flips to
          // false (exit animation running) it ignores the mouse completely,
          // so it can't re-trigger hover and reopen itself
          style={{ top, pointerEvents: open ? "auto" : "none" }}
          className="fixed inset-x-0 z-[999] w-screen border-t border-[#800000]/10 bg-[#F7F1E8] shadow-xl"
        >
          <div
            className="
              mx-auto grid w-full max-w-[1800px]
              grid-cols-2 gap-x-10 gap-y-10
              px-10 py-10
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              max-h-[75vh] overflow-y-auto
            "
          >
            {categories.map((category) => (
              <div key={category.slug} className="min-w-0">
                {/* CATEGORY HEADING */}
                <Link
                  to={`/categories/${category.slug}`}
                  onClick={onClose}
                  className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.12em] text-[#800000] transition-colors duration-200 hover:text-[#5c0000]"
                >
                  {category.name}
                </Link>

                {/* SUBCATEGORIES */}
                <div className="flex flex-col gap-2.5">
                  {category.subcategories?.map((sub) => (
                    <Link
                      key={sub}
                      to={`/categories/${category.slug}#${toAnchor(sub)}`}
                      onClick={onClose}
                      className="text-xs text-[#1B1B2F]/80 transition-all duration-200 hover:translate-x-1 hover:text-[#800000]"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MegaMenu;