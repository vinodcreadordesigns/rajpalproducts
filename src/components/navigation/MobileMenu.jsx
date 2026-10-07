import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, navLinks } from "../../data/siteData";

const toAnchor = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const MobileMenu = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div
      className="
        absolute
        left-0
        top-full
        z-[999]
        w-full
        bg-white
        shadow-2xl
        border-t
        border-[#E2C88B]/30
        md:hidden
        max-h-[85vh]
        overflow-y-auto
      "
    >
      {/* TOP LINKS */}
      <div className="flex flex-col p-5 space-y-4 border-b border-gray-200">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setOpen(false)}
            className="
              text-gray-800
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              hover:text-[#800000]
              transition
            "
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CATEGORIES */}
      <div className="p-5">
        <h4 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C9A34E]">
          Categories
          <ChevronDown size={14} />
        </h4>

        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="
                rounded-2xl
                border
                border-[#E2C88B]/20
                bg-[#fffdf9]
                p-4
                shadow-sm
              "
            >
              {/* CATEGORY NAME */}
              <Link
                to={`/categories/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="
                  block
                  text-sm
                  font-bold
                  text-[#800000]
                  hover:text-[#C9A34E]
                  transition
                "
              >
                {cat.name}
              </Link>

              {/* SUB CATEGORIES */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {cat.subcategories.slice(0, 4).map((sub) => (
                  <Link
                    key={sub}
                    to={`/categories/${cat.slug}#${toAnchor(sub)}`}
                    onClick={() => setOpen(false)}
                    className="
                      rounded-lg
                      bg-white
                      px-2
                      py-1.5
                      text-[11px]
                      text-gray-600
                      hover:bg-[#800000]
                      hover:text-white
                      transition-all
                    "
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;