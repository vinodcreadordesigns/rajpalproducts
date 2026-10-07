import {
  Menu,
  ShoppingCart,
  X,
  House,
  LayoutGrid,
  Info,
  BookOpen,
  Phone,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/siteData";
import { useCart } from "../hooks/useCart";
import AnimatedBrandLogo from "./AnimatedBrandLogo";
import MegaMenu from "./navigation/MegaMenu";
import MobileMenu from "./navigation/MobileMenu";

// small delay so moving the mouse from the "Categories" link down into the
// panel doesn't close it mid-transition
const HOVER_DELAY = 150;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [navRect, setNavRect] = useState(null);

  const navRef = useRef(null);
  const closeTimeout = useRef(null);
  const locked = useRef(false); // blocks hover-open right after a click

  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  const orderedLinks = navLinks;

  const openCategories = () => {
    if (locked.current) return; // ignore hover while locked
    clearTimeout(closeTimeout.current);
    if (navRef.current) setNavRect(navRef.current.getBoundingClientRect());
    setCategoriesOpen(true);
  };

  const scheduleCloseCategories = () => {
    locked.current = false; // mouse left, so hover works again
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(
      () => setCategoriesOpen(false),
      HOVER_DELAY
    );
  };

  // called when any link is clicked (menu link or the Categories link itself)
  const closeCategoriesNow = () => {
    clearTimeout(closeTimeout.current);
    locked.current = true;
    setCategoriesOpen(false);
  };

  // safety net: close on any route change
  useEffect(() => {
    clearTimeout(closeTimeout.current);
    setCategoriesOpen(false);
  }, [location.pathname, location.hash]);

  // clean up pending timer on unmount
  useEffect(() => () => clearTimeout(closeTimeout.current), []);

  // ICONS — keyed by label. Catalogue / FAQs both get the BookOpen icon,
  // so it shows whether siteData uses "FAQs" or "Catalogue".
  const navIcons = {
    Home: <House size={14} />,
    Categories: <LayoutGrid size={14} />,
    About: <Info size={14} />,
    FAQs: <BookOpen size={14} />,
    Catalogue: <BookOpen size={14} />,
    Contact: <Phone size={14} />,
  };

  // DISPLAY NAME OVERRIDES — only changes what text shows in the navbar
  const displayLabels = {
    FAQs: "Catalogue",
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-[#E2C88B]/20 bg-[#5C0000] text-white"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-[0.18em] text-[#F5D98F]"
        >
          <AnimatedBrandLogo />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-5 lg:gap-8 md:flex">
          {orderedLinks.map((item) => {
            // CATEGORIES — hover opens the full-width MegaMenu panel
            if (item.label === "Categories") {
              return (
                <div
                  key={item.path}
                  onMouseEnter={openCategories}
                  onMouseLeave={scheduleCloseCategories}
                >
                  <NavLink
                    to={item.path}
                    onClick={closeCategoriesNow}
                    className={`
                      flex items-center gap-2
                      rounded-full px-4 py-2
                      text-xs uppercase tracking-[0.22em]
                      transition-all duration-300
                      ${
                        categoriesOpen
                          ? "text-[#F5D98F]"
                          : "text-[#fffefc] hover:text-[#F5D98F]"
                      }
                    `}
                  >
                    {navIcons[item.label]}
                    {displayLabels[item.label] || item.label}
                  </NavLink>
                </div>
              );
            }

            // NORMAL LINKS
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="
                  flex items-center gap-2
                  text-xs uppercase tracking-[0.22em]
                  text-white/90
                  transition-all duration-300
                  hover:text-[#F5D98F]
                "
              >
                {navIcons[item.label]}
                {displayLabels[item.label] || item.label}
              </NavLink>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* AMAZON STYLE CART */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="
              relative flex items-center gap-2
              rounded-full border border-[#E2C88B]/40
              bg-white/10
              px-4 py-2
              transition-all duration-300
              hover:bg-[#E2C88B]
              hover:text-[#5C0000]
            "
          >
            {/* COUNT */}
            {itemCount > 0 && (
              <span
                className="
                  absolute -top-2 left-5
                  flex h-5 min-w-[20px]
                  items-center justify-center
                  rounded-full bg-[#FFB703]
                  px-1 text-[10px]
                  font-bold text-black
                "
              >
                {itemCount}
              </span>
            )}

            <ShoppingCart size={20} />

            <span className="hidden text-xs font-semibold uppercase tracking-[0.15em] sm:block">
              Cart
            </span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="
              rounded-full border border-white/20
              bg-white/10 p-2 md:hidden
            "
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <MobileMenu open={open} setOpen={setOpen} />
      </div>

      {/* FULL-WIDTH MEGA MENU — controlled from here, portals itself to body */}
      <MegaMenu
        open={categoriesOpen}
        anchorRect={navRect}
        onMouseEnter={openCategories}
        onMouseLeave={scheduleCloseCategories}
        onClose={closeCategoriesNow}
      />
    </nav>
  );
};

export default Navbar;