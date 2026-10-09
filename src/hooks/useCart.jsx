import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

/**
 * ── COUPONS ────────────────────────────────────────────────────────────────
 * Naya coupon add karna ho to bas yahan ek entry add kar do.
 * minAmount = cart subtotal kam se kam kitna hona chahiye.
 * NOTE: CartDrawer.jsx ke TIERS me bhi same percent / amount rakhna.
 */
export const COUPONS = {
  RAJPAL10: {
    code: "RAJPAL10",
    percent: 10,
    minAmount: 750,
    title: "10% OFF on ₹750+",
  },
  PURELY20: {
    code: "PURELY20",
    percent: 20,
    minAmount: 1500,
    title: "20% OFF on ₹1,500+",
  },
  DIVINE30: {
    code: "DIVINE30",
    percent: 30,
    minAmount: 2500,
    title: "30% OFF on ₹2,500+",
  },
};

export const COUPON_LIST = Object.values(COUPONS);

/** "₹1,299", "Rs. 499.50", "₹99" -> 1299, 499.5, 99 */
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? 0 : value;
};

/** Unique key per cart line (id preferred, else name+weight+price) */
const getKey = (product) => {
  if (product.id) return String(product.id);
  return `${product.name}-${product.weight}-${product.price}`;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState(null);
  // Last product jo add hua — "Added to cart" toast ke liye
  const [lastAdded, setLastAdded] = useState(null);

  /**
   * addToCart(product)                       -> add karta hai, cart band rehta hai (toast dikhta hai)
   * addToCart(product, { openCart: true })   -> add karke cart khol deta hai (e.g. "Buy Now")
   */
  const addToCart = (product, { openCart = false } = {}) => {
    const key = getKey(product);
    const priceValue = parsePrice(product.price);

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, key, priceValue, qty: 1 }];
    });

    setLastAdded({ name: product.name, at: Date.now() });
    if (openCart) setIsCartOpen(true);
  };

  const dismissLastAdded = () => setLastAdded(null);

  // Toast 2.5 sec baad apne aap hat jaye
  useEffect(() => {
    if (!lastAdded) return undefined;
    const t = setTimeout(() => setLastAdded(null), 2500);
    return () => clearTimeout(t);
  }, [lastAdded]);

  // Cart khul gaya to toast ki zarurat nahi
  useEffect(() => {
    if (isCartOpen) setLastAdded(null);
  }, [isCartOpen]);

  const updateQty = (key, nextQty) => {
    if (nextQty <= 0) {
      setItems((prev) => prev.filter((item) => item.key !== key));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, qty: nextQty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
  };

  const removeFromCart = (key) =>
    setItems((prev) => prev.filter((item) => item.key !== key));

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceValue * item.qty,
    0
  );

  // Cart chhota ho gaya aur coupon ki minimum shart tut gayi -> coupon hata do
  useEffect(() => {
    if (couponCode && (!COUPONS[couponCode] || subtotal < COUPONS[couponCode].minAmount)) {
      setCouponCode(null);
    }
  }, [subtotal, couponCode]);

  const appliedCoupon = couponCode ? COUPONS[couponCode] || null : null;
  const discount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.percent) / 100)
    : 0;
  const total = Math.max(subtotal - discount, 0);

  /** Returns { ok: boolean, message: string } */
  const applyCoupon = (rawCode) => {
    const code = String(rawCode || "").trim().toUpperCase();
    if (!code) return { ok: false, message: "Please enter a coupon code." };

    const coupon = COUPONS[code];
    if (!coupon) return { ok: false, message: "This coupon code is not valid." };

    if (subtotal < coupon.minAmount) {
      const need = Math.ceil(coupon.minAmount - subtotal);
      return {
        ok: false,
        message: `Add ₹${need.toLocaleString("en-IN")} more to use ${code}.`,
      };
    }

    setCouponCode(code);
    return {
      ok: true,
      message: `${code} applied — ${coupon.percent}% OFF unlocked!`,
    };
  };

  const removeCoupon = () => setCouponCode(null);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      discount,
      total,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      lastAdded,
      dismissLastAdded,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, itemCount, subtotal, discount, total, couponCode, isCartOpen, lastAdded]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};