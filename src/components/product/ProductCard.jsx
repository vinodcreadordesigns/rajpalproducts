import { useState, useMemo } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "../../hooks/useCart";

// WhatsApp Icon
const WhatsAppIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.664 4.942 1.926 7.103L2 30l7.093-1.884A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.471a11.434 11.434 0 0 1-5.842-1.603l-.418-.249-4.338 1.152 1.16-4.232-.273-.435A11.408 11.408 0 0 1 4.56 16.003c0-6.32 5.124-11.443 11.443-11.443 6.32 0 11.443 5.124 11.443 11.443 0 6.32-5.124 11.468-11.443 11.468zm6.282-8.576c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.89 1.118-1.09 1.348-.2.23-.401.258-.745.086-.344-.172-1.452-.535-2.765-1.708-1.022-.912-1.712-2.037-1.912-2.381-.2-.344-.021-.53.15-.702.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.777-1.876-1.065-2.567-.28-.672-.566-.581-.777-.592-.2-.01-.43-.013-.66-.013s-.603.086-.919.43c-.316.344-1.205 1.176-1.205 2.867s1.234 3.327 1.406 3.557c.172.23 2.428 3.706 5.882 5.196.823.355 1.464.567 1.965.726.826.263 1.578.226 2.172.137.663-.099 2.036-.832 2.323-1.635.287-.803.287-1.49.2-1.635-.085-.143-.315-.23-.659-.402z" />
  </svg>
);

/**
 * Variant shape:
 * { weight: "100g", price: "₹180", mrp: "₹220", pricePerGm: "₹1.80/g" }
 */

const parsePrice = (str) =>
  str ? parseFloat(String(str).replace(/[^\d.]/g, "")) : NaN;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const variants = useMemo(() => {
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      return product.variants;
    }
    return [{ weight: product.weight, price: product.price }];
  }, [product.variants, product.weight, product.price]);

  const hasMultipleVariants = variants.length > 1;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedVariant = variants[selectedIndex];

  const discountPct = useMemo(() => {
    const price = parsePrice(selectedVariant.price);
    const mrp = parsePrice(selectedVariant.mrp);
    if (isNaN(price) || isNaN(mrp) || mrp <= 0 || price >= mrp) return null;
    return Math.round(((mrp - price) / mrp) * 100);
  }, [selectedVariant.price, selectedVariant.mrp]);

  const whatsappMessage = `Hello RAJPAL PRODUCTS, I want to order ${product.name}${
    selectedVariant.weight ? ` (${selectedVariant.weight})` : ""
  }`;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      id: selectedVariant.weight
        ? `${product.id}-${selectedVariant.weight}`
        : product.id,
      baseId: product.id,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden rounded-none
        border border-[#e7ddce] bg-white
        transition-all duration-500 ease-out
        [@media(hover:hover)]:hover:-translate-y-1.5
        hover:border-[#7a1020]/25
        hover:shadow-[0_22px_45px_-18px_rgba(122,16,32,0.35)]
      "
    >
      {/* ── IMAGE ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6efe4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:opacity-0"
        />
        <img
          src={product.imageHover || product.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-[1.07] object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {/* Product name */}
        <h4 className="line-clamp-2 min-h-[2.4em] text-[12px] font-semibold uppercase leading-snug tracking-[0.01em] text-stone-800 transition-colors duration-300 group-hover:text-[#7a1020] sm:text-sm">
          {product.name}
        </h4>

        <div className="my-2 h-px w-full bg-gradient-to-r from-[#e7ddce] via-[#e7ddce] to-transparent sm:my-3" />

        {/* Weight selector */}
        {hasMultipleVariants && (
          <div role="group" aria-label="Select weight" className="mb-2 flex flex-wrap gap-1 sm:gap-1.5">
            {variants.map((variant, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={variant.weight}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  className={`touch-manipulation rounded-none border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] transition-all duration-200 sm:text-[11px] ${
                    isSelected
                      ? "border-[#7a1020] bg-[#7a1020] text-white shadow-sm"
                      : "border-[#e7ddce] bg-[#f6efe4] text-stone-600 hover:border-[#7a1020]/40 hover:text-[#7a1020]"
                  }`}
                >
                  {variant.weight}
                </button>
              );
            })}
          </div>
        )}

        {/* ── PRICE BLOCK ── */}
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-base font-bold leading-none tracking-tight text-[#7a1020]">
              {selectedVariant.price}
            </span>
            {selectedVariant.mrp && (
              <span className="text-[11px] font-medium leading-none text-stone-400 line-through sm:text-xs">
                {selectedVariant.mrp}
              </span>
            )}
            {discountPct !== null && (
              <span className="inline-block rounded-sm bg-green-50 px-1 py-px text-[9px] font-bold leading-tight tracking-wide text-green-700">
                {discountPct}% off
              </span>
            )}
          </div>

          {selectedVariant.pricePerGm && (
            <span className="text-[10px] font-medium leading-tight text-stone-400">
              {selectedVariant.pricePerGm}
            </span>
          )}

          {selectedVariant.weight && !hasMultipleVariants && (
            <span className="text-[10px] font-medium uppercase leading-tight tracking-[0.06em] text-stone-400 sm:text-[11px]">
              {selectedVariant.weight}
            </span>
          )}
        </div>

        {/* ── BUTTONS ── */}
        <div className="mt-auto flex items-stretch gap-1.5 pt-3 sm:gap-2">
          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={added ? "Added to cart" : "Add to cart"}
            className={`
              grid h-10 min-w-0 flex-1 touch-manipulation place-items-center overflow-hidden
              rounded-none px-2 text-white shadow-sm sm:h-11
              transition-all duration-300 active:scale-95
              [@media(hover:hover)]:hover:shadow-[0_10px_22px_-6px_rgba(122,16,32,0.55)]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1020]
              ${added ? "bg-[#1a1a1a]" : "bg-gradient-to-br from-[#c49b63] to-[#7a1020]"}
            `}
          >
            {/* Both states share one grid cell, so width always fits the content */}
            <span
              className={`col-start-1 row-start-1 flex items-center justify-center gap-1.5 transition-all duration-300 ${
                added ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Check size={15} strokeWidth={2.5} className="shrink-0" />
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em]">
                Added
              </span>
            </span>

            <span
              className={`col-start-1 row-start-1 flex items-center justify-center gap-1.5 transition-all duration-300 ${
                added ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <ShoppingBag size={15} strokeWidth={2.2} className="shrink-0" />
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em]">
                <span className="sm:hidden">Add</span>
                <span className="hidden sm:inline">Add to Cart</span>
              </span>
            </span>
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/919930670044?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            title="Order on WhatsApp"
            className="
              flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-none
              border border-[#25D366]/30 bg-[#25D366]/10 text-[#128C3F]
              transition-all duration-300 sm:h-11 sm:w-11
              hover:bg-[#25D366] hover:text-white
              active:scale-90 active:bg-[#25D366] active:text-white
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]
            "
          >
            <WhatsAppIcon size={18} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;