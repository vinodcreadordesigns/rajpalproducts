import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  X,
  Search,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  Check,
  CheckCheck,
  Store,
  Tag,
  Clock,
  Globe,
} from "lucide-react";

import { productCatalog, categories } from "../data/siteData";

/* ───────────────── Brand config (edit here) ───────────────── */
const MAROON = "#7a1020";
const MAROON_DEEP = "#4a0712";
const GOLD = "#c9a24b";

const BRAND = {
  name: "RAJPAL PRODUCTS",
  since: 1981,
  whatsappNumber: "919930670044",
  phoneDisplay: "+91 99306 70044",
  products: "agarbatti, dhoop, pooja items and spiritual products",
};

/* ───────────────── Catalog helpers ───────────────── */
function flattenCatalog(catalog) {
  const all = [];
  Object.entries(catalog || {}).forEach(([catKey, category]) => {
    const categoryName = category.name || category.title || catKey;
    const categorySlug = category.slug || catKey;
    (category.sections || []).forEach((section) => {
      const sectionName = section.name || section.title || "";
      (section.products || []).forEach((product) => {
        all.push({ ...product, categoryName, categorySlug, sectionName });
      });
    });
  });
  return all;
}

function formatTime(date) {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ───────────────── Text understanding ───────────────── */
// Words that carry no product meaning
const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "am", "was", "do", "does", "did", "you", "your", "u", "ur",
  "i", "me", "my", "we", "our", "to", "of", "for", "in", "on", "at", "with", "and", "or",
  "it", "this", "that", "these", "those", "any", "some", "have", "has", "get", "got", "can",
  "could", "would", "will", "please", "pls", "plz", "show", "tell", "give", "want", "need",
  "looking", "look", "find", "search", "buy", "order", "purchase", "available", "stock",
  "product", "products", "item", "items", "what", "which", "who", "how", "where", "when",
  "about", "details", "detail", "info", "information", "price", "cost", "rate", "rates",
  "best", "good", "new", "more", "also", "there", "here", "hi", "hello", "hey", "ok", "okay",
  "kindly", "like", "something", "anything", "variety", "types", "type", "kind", "kinds",
]);

// Spelling / language variants → one canonical word
const SYNONYMS = {
  incense: "agarbatti", agarbathi: "agarbatti", agarbati: "agarbatti", agarbattis: "agarbatti",
  agarbatthi: "agarbatti", udbatti: "agarbatti", udbathi: "agarbatti", joss: "agarbatti",
  sticks: "agarbatti", stick: "agarbatti", dhup: "dhoop", dhoup: "dhoop", dhooop: "dhoop",
  puja: "pooja", poojan: "pooja", pujan: "pooja", worship: "pooja", kapur: "kapoor",
  camphor: "kapoor", karpur: "kapoor", sambrani: "sambrani", benzoin: "sambrani",
  cones: "cone", coil: "cone", fragrance: "scent", perfume: "scent", smell: "scent",
  fragrant: "scent", sandalwood: "chandan", sandal: "chandan", chandanam: "chandan",
  roses: "rose", gulab: "rose", jasmine: "mogra", chameli: "mogra", lavender: "lavender",
  oud: "oudh", agar: "oudh", guggal: "guggul", gugal: "guggul", lobhan: "loban", lobaan: "loban",
  diya: "diya", deepak: "diya", lamp: "diya", wicks: "wick", batti: "wick",
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function canon(word) {
  let w = SYNONYMS[word] || word;
  // light plural stripping: "dhoops" → "dhoop", "candles" → "candle"
  if (w.length > 4 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  return SYNONYMS[w] || w;
}

function tokenize(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function contentTokens(text) {
  return tokenize(text)
    .filter((t) => !STOPWORDS.has(t))
    .map(canon)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// Edit distance for typo tolerance ("agarbati", "sandle", "dhoup")
function editDistance(a, b) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function tokenScore(qt, ht) {
  if (qt === ht) return 3;
  if (qt.length >= 3 && (ht.startsWith(qt) || qt.startsWith(ht)) && Math.min(qt.length, ht.length) >= 3) return 2;
  if (qt.length >= 4 && ht.includes(qt)) return 1.5;
  if (qt.length >= 4) {
    const d = editDistance(qt, ht);
    if (d === 1 || (d === 2 && qt.length >= 7)) return 1.2;
  }
  return 0;
}

/* ───────────────── Intents ───────────────── */
// Each intent has patterns; the highest scoring one wins. Word-boundary
// matching avoids the old bug where "hi" matched "shipping", "this", etc.
const INTENTS = [
  { id: "greeting", re: /\b(hi|hii+|hello|hey|namaste|namaskar|pranam|good (morning|afternoon|evening))\b/, w: 1 },
  { id: "thanks", re: /\b(thanks?|thank you|thx|shukriya|dhanyavad|great|awesome|perfect)\b/, w: 2 },
  { id: "bye", re: /\b(bye|goodbye|see you|tata|ok bye|alvida)\b/, w: 3 },
  { id: "shipping", re: /\b(ship|shipping|shipped|deliver|delivery|dispatch|courier|worldwide|international|abroad|overseas|outside india|export|usa|uk|dubai|canada|australia|how long|how many days|days to reach)\b/, w: 3 },
  { id: "tracking", re: /\b(track|tracking|order status|where is my|awb|not received|not delivered|delayed)\b/, w: 4 },
  { id: "price", re: /\b(price|prices|pricing|cost|costs|rate|rates|how much|kitna|kimat|mrp|cheap|expensive|discount|offer|offers)\b/, w: 3 },
  { id: "bulk", re: /\b(bulk|wholesale|distributor|distribution|dealer|reseller|retailer|b2b|large quantity|cartons?|dealership|franchise)\b/, w: 4 },
  { id: "authentic", re: /\b(fake|fraud|scam|original|genuine|authentic|real|duplicate|copy|trusted|legit|verified|safe)\b/, w: 3 },
  { id: "order", re: /\b(how to (order|buy|purchase)|place (an )?order|want to (order|buy)|ordering|buy now|book)\b/, w: 4 },
  { id: "payment", re: /\b(pay|payment|upi|gpay|phonepe|paytm|card|cod|cash on delivery|net banking|bank transfer|invoice|gst)\b/, w: 3 },
  { id: "returns", re: /\b(return|returns|refund|exchange|replace|replacement|damaged|broken|wrong item|cancel|cancellation)\b/, w: 4 },
  { id: "contact", re: /\b(contact|call|phone|number|whatsapp|email|mail|address|location|visit|reach|talk to|speak|human|support|help desk|owner|manager)\b/, w: 3 },
  { id: "about", re: /\b(about (you|us|rajpal|brand|company)|who are you|your (brand|company|story)|since|history|1981|founded|established|how old)\b/, w: 3 },
  { id: "bestsellers", re: /\b(best ?sellers?|popular|top (selling|products)|trending|most sold|recommend|recommendation|suggest|suggestion|favou?rite)\b/, w: 3 },
  { id: "categories", re: /\b(categor(y|ies)|catalou?gue|range|collection|all products|what (do|all) you (sell|have|offer)|what products|menu)\b/, w: 3 },
  { id: "gift", re: /\b(gift|gifting|festival|diwali|navratri|ganesh|wedding|housewarming|puja kit|pooja kit|combo|hamper)\b/, w: 3 },
  { id: "benefits", re: /\b(benefit|benefits|good for|uses?|why use|meditation|calm|relax|mosquito|sleep|stress|health|chemical|natural|herbal|charcoal|smokeless)\b/, w: 2 },
  { id: "help", re: /\b(help|what can you do|how does this work|options|guide me)\b/, w: 2 },
  { id: "complaint", re: /\b(bad|poor|worst|angry|complain|complaint|disappointed|issue|problem)\b/, w: 3 },
];

function detectIntent(lower) {
  let best = null;
  INTENTS.forEach((intent) => {
    if (intent.re.test(lower)) {
      if (!best || intent.w > best.w) best = intent;
    }
  });
  return best ? best.id : null;
}

/* ───────────────── Component ───────────────── */
const FloatingAI = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "ai",
      time: new Date(),
      text:
        "🙏 Namaste! Welcome to RAJPAL PRODUCTS\n\n" +
        `🛡️ Verified brand, trusted since ${BRAND.since}\n` +
        "🌍 We ship worldwide\n\n" +
        "Ask me about our agarbatti, dhoop, pooja items, prices, shipping or bulk orders. Please beware of fake sellers — we only accept orders through our official WhatsApp number.",
      suggestions: ["Show agarbatti", "Shipping worldwide?", "Wholesale order", "Is this genuine?"],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // Remembers the conversation so follow-ups like "show more" or "price?" work
  const contextRef = useRef({ lastQuery: null, lastResults: [], shown: 0, lastIntent: null });

  const allProducts = useMemo(() => flattenCatalog(productCatalog), []);

  const categoryList = useMemo(
    () =>
      (categories || [])
        .map((c) => ({ name: c.name || c.title || c.label, slug: c.slug }))
        .filter((c) => c.name),
    []
  );

  // Pre-tokenise the catalog once for fast searching
  const indexed = useMemo(
    () =>
      allProducts.map((p) => ({
        product: p,
        name: contentTokens(p.name),
        section: contentTokens(p.sectionName),
        category: contentTokens(p.categoryName),
        extra: contentTokens([p.description, p.fragrance, p.tag].filter(Boolean).join(" ")),
      })),
    [allProducts]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open && messages.length > 1) {
      const last = messages[messages.length - 1];
      if (last.type !== "user") setUnreadCount((c) => c + 1);
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  /* ── Smart product search: token scoring + typo tolerance ── */
  const searchProducts = (query) => {
    const qTokens = contentTokens(query);
    if (qTokens.length === 0) return { results: [], tokens: [] };

    const scored = indexed
      .map((entry) => {
        let matched = 0;
        let score = 0;
        qTokens.forEach((qt) => {
          let best = 0;
          const tryField = (tokens, weight) =>
            tokens.forEach((ht) => {
              const s = tokenScore(qt, ht) * weight;
              if (s > best) best = s;
            });
          tryField(entry.name, 3);
          tryField(entry.section, 2);
          tryField(entry.category, 1.5);
          tryField(entry.extra, 1);
          if (best > 0) {
            matched += 1;
            score += best;
          }
        });
        return { product: entry.product, matched, score, ratio: matched / qTokens.length };
      })
      .filter((s) => s.matched > 0 && (qTokens.length === 1 || s.ratio >= 0.5))
      .sort((a, b) => b.ratio - a.ratio || b.score - a.score);

    return { results: scored.map((s) => s.product), tokens: qTokens };
  };

  const openWhatsApp = (text) => {
    window.open(
      `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const ai = (text, extra = {}) => ({ kind: "text", text, ...extra });

  const categoryNames = () => categoryList.map((c) => c.name);

  /* ── Brain: decide the reply ── */
  const generateReply = (userMessage) => {
    const lower = normalize(userMessage);
    const ctx = contextRef.current;
    const intent = detectIntent(lower);

    // Follow-up: "show more", "next", "more options"
    if (/^(show )?(more|next|others?|more options|aur|or)$/.test(lower) || /\bshow more\b/.test(lower)) {
      if (ctx.lastResults.length > ctx.shown) {
        const items = ctx.lastResults.slice(ctx.shown, ctx.shown + 6);
        ctx.shown += items.length;
        return {
          kind: "products",
          intro: "Here are some more options 👇",
          items,
          total: ctx.lastResults.length,
          offset: ctx.shown - items.length,
        };
      }
      return ai("That's everything I have for this search. 🙏\n\nTry another product name, or ask our team on WhatsApp for something special.", {
        whatsapp: true,
        suggestions: categoryNames().slice(0, 3),
      });
    }

    // Product search (only if there are real product words in the query)
    const { results, tokens } = searchProducts(userMessage);
    const strongNonProductIntent = ["shipping", "tracking", "bulk", "authentic", "payment", "returns", "contact", "about", "thanks", "bye", "complaint", "order"].includes(intent);
    const hasProductWords = tokens.length > 0 && results.length > 0;

    if (hasProductWords && (!strongNonProductIntent || results.length <= 12 && tokens.length >= 2)) {
      ctx.lastQuery = userMessage;
      ctx.lastResults = results;
      ctx.shown = Math.min(6, results.length);
      ctx.lastIntent = "products";

      const topCategory = results[0].categoryName;
      let intro;
      if (intent === "price") intro = `Here are the prices for "${userMessage.trim()}" 💰`;
      else if (intent === "bulk") intro = `Great choice for bulk! Here are matching products — message us for wholesale rates 📦`;
      else intro = `Found ${results.length === 1 ? "1 match" : `${results.length} matches`} in ${topCategory}${results.length > 1 && results.some((r) => r.categoryName !== topCategory) ? " and more" : ""} ✨`;

      return { kind: "products", intro, items: results.slice(0, 6), total: results.length, offset: 0 };
    }

    // Category name typed directly (e.g. "dhoop")
    const catHit = categoryList.find((c) => {
      const ct = contentTokens(c.name);
      return tokens.length > 0 && tokens.every((t) => ct.some((x) => tokenScore(t, x) >= 2));
    });
    if (catHit) {
      return ai(`We have a range under ${catHit.name}. 🙏\n\nTell me the fragrance or product name you have in mind and I'll show it to you.`, {
        link: { to: `/categories/${catHit.slug}`, label: `Open ${catHit.name}` },
        suggestions: ["Bestsellers", "Wholesale order"],
      });
    }

    switch (intent) {
      case "greeting":
        return ai(`🙏 Namaste! Welcome to ${BRAND.name}.\n\n✨ Premium ${BRAND.products}.\n🛡️ Trusted since ${BRAND.since} • 🌍 Worldwide shipping\n\nWhat are you looking for today?`, {
          suggestions: ["Show agarbatti", "Bestsellers", "Shipping worldwide?"],
        });

      case "thanks":
        return ai("You're most welcome! 🙏\n\nIf you'd like to go ahead with an order, our team on WhatsApp will take care of it.", {
          whatsapp: true,
        });

      case "bye":
        return ai("Thank you for visiting RAJPAL PRODUCTS. 🙏 Come back anytime — we're here to help!");

      case "shipping":
        return ai(
          "🌍 We ship worldwide!\n\n📦 Every order is packed safely so the fragrance and quality reach you intact.\n🚚 Dispatch is quick, and delivery time depends on your country and courier.\n\nShare your country/city and the products you want on WhatsApp, and our team will confirm shipping charges and timelines.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I want to know about shipping to my location.", suggestions: ["Wholesale order", "Is this genuine?"] }
        );

      case "tracking":
        return ai(
          "📍 To check your order status, please message our team on WhatsApp with your name and order details (or tracking number). They'll update you right away.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I want to check my order status." }
        );

      case "price": {
        // price follow-up for the last viewed products
        if (ctx.lastResults.length > 0 && ctx.lastIntent === "products" && tokens.length === 0) {
          return {
            kind: "products",
            intro: "Here are the prices for what we were just looking at 💰",
            items: ctx.lastResults.slice(0, 6),
            total: ctx.lastResults.length,
            offset: 0,
          };
        }
        return ai(
          "💰 Prices depend on the fragrance and pack size.\n\nTell me a product name (for example \"rose agarbatti\" or \"sandalwood dhoop\") and I'll show its price. For bulk or export pricing, our team will send you a quote.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, please share your price list.", suggestions: categoryNames().slice(0, 3) }
        );
      }

      case "bulk":
        return ai(
          "📦 Wholesale, distributor and export orders are welcome.\n\n✨ Better pricing on larger quantities\n🌍 Shipping available worldwide\n\nShare the products and quantity you need on WhatsApp and our team will send you a quote.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I'm interested in wholesale / bulk orders.", suggestions: ["Shipping worldwide?", "Is this genuine?"] }
        );

      case "authentic":
        return ai(
          `🛡️ ${BRAND.name} is a verified brand, trusted since ${BRAND.since}.\n\nPlease beware of fake sellers and duplicate products. We accept orders only through our official WhatsApp number:\n\n📞 ${BRAND.phoneDisplay}\n\nIf anyone else claims to sell on our behalf, please don't pay them.`,
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I want to confirm an order is genuine." }
        );

      case "order":
        return ai(
          "🛍️ Ordering is simple:\n\n1. Tell me the product you want (or browse the site)\n2. Tap \"Order now\" on the product card\n3. Our team confirms price, shipping and payment with you on WhatsApp\n\nOrders are accepted only on our official WhatsApp number.",
          { whatsapp: true, suggestions: ["Show agarbatti", "Bestsellers"] }
        );

      case "payment":
        return ai(
          "💳 Payment and invoicing details are confirmed by our team when you place the order on WhatsApp, so you always pay through our official channel.\n\nPlease don't pay anyone who contacts you from another number.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I'd like to know the payment options." }
        );

      case "returns":
      case "complaint":
        return ai(
          "I'm sorry about that. 🙏 For any issue with an order — damaged item, wrong item, return or cancellation — please message our team on WhatsApp with your order details and a photo if possible. They'll resolve it quickly.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I need help with an existing order." }
        );

      case "contact":
        return ai(
          `📞 You can reach ${BRAND.name} on our official WhatsApp number:\n\n${BRAND.phoneDisplay}\n\nOur team replies within a few minutes.`,
          { whatsapp: true }
        );

      case "about":
        return ai(
          `🕉️ ${BRAND.name} has been crafting ${BRAND.products} since ${BRAND.since}.\n\nFor over four decades, families and temples have trusted us for quality and fragrance — and today we ship worldwide.`,
          { link: { to: "/about", label: "Know our story" }, suggestions: ["Show agarbatti", "Bestsellers"] }
        );

      case "bestsellers": {
        const flagged = allProducts.filter((p) => p.bestseller || p.featured || p.popular || p.isBestSeller);
        const pool = flagged.length ? flagged : allProducts;
        const items = pool.slice(0, 6);
        if (items.length === 0) break;
        ctx.lastResults = pool;
        ctx.shown = items.length;
        ctx.lastIntent = "products";
        return {
          kind: "products",
          intro: flagged.length ? "Our customers' favourites ⭐" : "Here are some popular picks from our collection ⭐",
          items,
          total: pool.length,
          offset: 0,
        };
      }

      case "categories":
        if (categoryList.length > 0) {
          return ai(`🗂️ Here's what we offer:\n\n${categoryNames().map((n) => `• ${n}`).join("\n")}\n\nTell me which one interests you and I'll show the products.`, {
            link: { to: "/categories", label: "See all categories" },
            suggestions: categoryNames().slice(0, 4),
          });
        }
        break;

      case "gift":
        return ai(
          "🎁 Pooja items, premium dhoop and fragrant agarbatti make wonderful gifts for festivals, weddings and housewarmings.\n\nTell me the occasion and budget on WhatsApp and our team will suggest the right set for you.",
          { whatsapp: true, waText: "Hello RAJPAL PRODUCTS, I'm looking for gift / festival sets.", suggestions: ["Show agarbatti", "Show dhoop"] }
        );

      case "benefits":
        return ai(
          "🌿 Good agarbatti and dhoop create a calm, devotional atmosphere — ideal for daily pooja, meditation and freshening your home.\n\nTell me the fragrance you like (rose, sandalwood, mogra, oudh…) and I'll show the matching products.",
          { suggestions: ["Sandalwood", "Rose", "Oudh"] }
        );

      case "help":
        return ai(
          "Here's what I can do 🙏\n\n🔎 Find products by name, fragrance or category\n💰 Show prices\n📦 Help with wholesale / bulk orders\n🌍 Explain worldwide shipping\n🛡️ Confirm we're genuine\n\nJust type what you need.",
          { suggestions: ["Bestsellers", "Shipping worldwide?", "Wholesale order"] }
        );

      default:
        break;
    }

    // Greeting hidden inside a longer sentence ("hi, do you have rose?") is handled by product search above.
    return ai(
      `I couldn't find "${userMessage.trim().slice(0, 40)}" in our catalog. 🙏\n\nTry a product, fragrance or category name — or ask our team directly, they'll help right away.`,
      { whatsapp: true, suggestions: categoryNames().slice(0, 3).length ? categoryNames().slice(0, 3) : ["Bestsellers", "Shipping worldwide?"] }
    );
  };

  const sendMessage = (overrideText) => {
    const text = (overrideText ?? message).trim();
    if (!text || typing) return;

    const userMessage = { type: "user", text, time: new Date(), status: "sent" };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m === userMessage ? { ...m, status: "read" } : m)));
    }, 500);

    const reply = generateReply(text);
    // Longer answers "take longer to type" – feels more natural
    const len = reply.kind === "products" ? 120 : (reply.text || "").length;
    const delay = Math.min(1800, 700 + len * 4);

    setTimeout(() => {
      const aiReply =
        reply.kind === "products"
          ? { type: "products", ...reply, time: new Date() }
          : { type: "ai", ...reply, time: new Date() };
      setMessages((prev) => [...prev, aiReply]);
      setTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => {
            setOpen((o) => !o);
            setMinimized(false);
          }}
          className="group relative flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105"
          style={{ background: `linear-gradient(90deg, ${MAROON}, ${MAROON_DEEP})` }}
          aria-label="Open Rajpal Assistant"
        >
          <Bot size={20} />
          <span className="hidden text-sm font-medium md:block">Rajpal Assistant</span>
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full" style={{ backgroundColor: "#22c55e" }}>
            <span className="absolute inset-0 animate-ping rounded-full" style={{ backgroundColor: "#22c55e" }} />
          </span>

          {unreadCount > 0 && !open && (
            <span className="absolute -top-2 -left-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 flex w-[92vw] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#100b09] shadow-2xl"
            style={{ height: minimized ? "auto" : 600, maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="px-5 py-4 text-white" style={{ background: `linear-gradient(90deg, ${MAROON}, ${MAROON_DEEP})` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Sparkles size={18} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold">Rajpal Assistant</h3>
                    <p className="flex items-center gap-1 text-[11px] text-white/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Online now
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMinimized((m) => !m)}
                    className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label={minimized ? "Expand chat" : "Minimize chat"}
                  >
                    <ChevronDown size={16} className={`transition-transform duration-300 ${minimized ? "rotate-180" : ""}`} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {!minimized && (
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/70">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} style={{ color: GOLD }} />
                    Verified since {BRAND.since}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe size={12} style={{ color: GOLD }} />
                    Worldwide shipping
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} style={{ color: GOLD }} />
                    Replies in minutes
                  </span>
                </div>
              )}
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto bg-[#181110] p-4">
                  {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* USER MESSAGE */}
                        {msg.type === "user" && (
                          <div className="ml-auto max-w-[85%]">
                            <div
                              className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm leading-relaxed text-white"
                              style={{ background: `linear-gradient(90deg, ${MAROON}, ${MAROON_DEEP})` }}
                            >
                              {msg.text}
                            </div>
                            <div className="mt-1 flex items-center justify-end gap-1 pr-1 text-[10px] text-white/35">
                              {msg.time && formatTime(msg.time)}
                              {msg.status === "read" ? (
                                <CheckCheck size={12} style={{ color: "#5bc7f5" }} />
                              ) : (
                                <Check size={12} />
                              )}
                            </div>
                          </div>
                        )}

                        {/* AI TEXT */}
                        {msg.type === "ai" && (
                          <div className="flex max-w-[92%] items-start gap-2">
                            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2a201c]">
                              <Sparkles size={12} style={{ color: GOLD }} />
                            </div>
                            <div>
                              <div className="rounded-2xl rounded-tl-sm bg-[#2a201c] px-3.5 py-2.5 text-sm leading-relaxed text-white">
                                <p className="whitespace-pre-wrap">{msg.text}</p>

                                {msg.link && (
                                  <Link
                                    to={msg.link.to}
                                    className="mt-3 inline-block rounded-full border border-[#c9a24b]/40 px-3 py-1.5 text-xs font-medium text-[#e3c274] transition hover:bg-[#c9a24b]/10"
                                  >
                                    {msg.link.label}
                                  </Link>
                                )}

                                {msg.whatsapp && (
                                  <button
                                    onClick={() =>
                                      openWhatsApp(msg.waText || "Hello RAJPAL PRODUCTS, I want to place an order.")
                                    }
                                    className="mt-3 flex items-center gap-2 rounded-full bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:scale-105"
                                  >
                                    <MessageCircle size={14} />
                                    Chat on WhatsApp
                                  </button>
                                )}
                              </div>

                              {msg.suggestions?.length > 0 && isLast && !typing && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {msg.suggestions.map((s) => (
                                    <button
                                      key={s}
                                      onClick={() => sendMessage(s)}
                                      className="rounded-full border border-[#c9a24b]/30 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80 transition hover:border-[#c9a24b]/70 hover:text-white"
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              )}

                              {msg.time && <p className="mt-1 pl-1 text-[10px] text-white/35">{formatTime(msg.time)}</p>}
                            </div>
                          </div>
                        )}

                        {/* PRODUCT CARDS — real catalog data */}
                        {msg.type === "products" && (
                          <div className="max-w-full">
                            {msg.intro && (
                              <div className="mb-2 flex max-w-[92%] items-start gap-2">
                                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2a201c]">
                                  <Sparkles size={12} style={{ color: GOLD }} />
                                </div>
                                <div className="rounded-2xl rounded-tl-sm bg-[#2a201c] px-3.5 py-2.5 text-sm leading-relaxed text-white">
                                  {msg.intro}
                                </div>
                              </div>
                            )}

                            <div className="mb-2 flex items-center gap-2 pl-1 text-[11px] text-white/50">
                              <Store size={12} style={{ color: GOLD }} />
                              {msg.total > msg.items.length
                                ? `Showing ${msg.items.length} of ${msg.total} results`
                                : `${msg.items.length} result${msg.items.length > 1 ? "s" : ""} found`}
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {msg.items.map((product, i) => (
                                <div key={i} className="overflow-hidden rounded-2xl border border-white/5 bg-[#221a17]">
                                  {product.image && (
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-36 w-full object-cover"
                                      loading="lazy"
                                    />
                                  )}
                                  <div className="p-3">
                                    {product.categoryName && (
                                      <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-[#c9a24b]/15 px-2 py-0.5 text-[10px] font-semibold text-[#e3c274]">
                                        <Tag size={9} />
                                        {product.categoryName}
                                      </span>
                                    )}
                                    <h4 className="line-clamp-2 font-medium text-white">{product.name}</h4>
                                    {product.weight && <p className="mt-1 text-sm text-white/50">{product.weight}</p>}
                                    {product.price && (
                                      <p className="mt-2 text-lg font-semibold" style={{ color: GOLD }}>
                                        ₹ {product.price}
                                      </p>
                                    )}
                                    <div className="mt-3 flex flex-col gap-2">
                                      {product.categorySlug && (
                                        <Link
                                          to={`/categories/${product.categorySlug}`}
                                          className="rounded-full border border-white/15 px-3 py-2 text-center text-xs font-medium text-white/80 transition hover:bg-white/5"
                                        >
                                          View more
                                        </Link>
                                      )}
                                      <button
                                        onClick={() =>
                                          openWhatsApp(
                                            `Hello RAJPAL PRODUCTS, I want to order ${product.name}${product.weight ? ` (${product.weight})` : ""}`
                                          )
                                        }
                                        className="rounded-full bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:scale-[1.02]"
                                      >
                                        Order now
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {isLast && !typing && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {msg.total > msg.offset + msg.items.length && (
                                  <button
                                    onClick={() => sendMessage("Show more")}
                                    className="rounded-full border border-[#c9a24b]/30 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80 transition hover:border-[#c9a24b]/70 hover:text-white"
                                  >
                                    Show more
                                  </button>
                                )}
                                <button
                                  onClick={() => sendMessage("Shipping worldwide?")}
                                  className="rounded-full border border-[#c9a24b]/30 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80 transition hover:border-[#c9a24b]/70 hover:text-white"
                                >
                                  Shipping worldwide?
                                </button>
                                <button
                                  onClick={() => sendMessage("Wholesale order")}
                                  className="rounded-full border border-[#c9a24b]/30 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80 transition hover:border-[#c9a24b]/70 hover:text-white"
                                >
                                  Wholesale
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Typing */}
                  {typing && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2a201c]">
                        <Sparkles size={12} style={{ color: GOLD }} />
                      </div>
                      <div className="w-fit rounded-2xl rounded-tl-sm bg-[#2a201c] px-4 py-2.5">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0.3s]" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef}></div>
                </div>

                {/* Quick Buttons */}
                <div className="flex flex-wrap gap-2 border-t border-white/5 bg-[#150f0c] px-3 py-2.5">
                  <button
                    onClick={() => sendMessage("Show bestsellers")}
                    className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                  >
                    <Search size={12} />
                    Bestsellers
                  </button>
                  <button
                    onClick={() => sendMessage("Wholesale order")}
                    className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                  >
                    <ShoppingBag size={12} />
                    Wholesale
                  </button>
                  <button
                    onClick={() => sendMessage("Is this original product?")}
                    className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                  >
                    Genuine?
                  </button>
                  <button
                    onClick={() => sendMessage("Do you ship worldwide?")}
                    className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                  >
                    <Globe size={12} />
                    Worldwide shipping
                  </button>
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 border-t border-white/5 bg-[#100b09] p-3.5">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products or ask a question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 rounded-full border border-white/10 bg-[#1d1512] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#c9a24b]/50"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!message.trim() || typing}
                    className="rounded-full p-2.5 text-white transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                    style={{ background: `linear-gradient(90deg, ${MAROON}, ${MAROON_DEEP})` }}
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAI;