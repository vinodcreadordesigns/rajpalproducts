import { Link } from "react-router-dom";
import { ShieldCheck, Globe2, Handshake, Download, ArrowRight, Star, TrendingUp, FileText } from "lucide-react";
import { productCatalog } from "../data/siteData";

/* ───────────── TOKENS (Maroon theme) ─────────────
   Maroon #7A1020 | Maroon Deep #4A0712 | Gold #C9A24B
   Tint (light maroon) #FBF1F0 | Tint 2 #F5DEDE | Cream #FFF9F7 | Ink #1F2A27
*/
const HEADING = { fontFamily: "'Playfair Display', Georgia, serif" };
const BODY = { fontFamily: "'Inter', system-ui, sans-serif" };

/* ───────────── CATALOGUE PDF (Google Drive) ─────────────
   Abhi folder link use ho raha hai (View + Download dono isi par khulenge).
   Direct download chahiye to PDF ki FILE ID daalo:
     https://drive.google.com/file/d/<FILE_ID>/view  -> DRIVE_FILE_ID = "<FILE_ID>"
*/
const CATALOGUE_FOLDER_URL = "https://drive.google.com/drive/folders/1-UZDoAZXoRAy2sNLcTRavNmePF1UhCw1";
const DRIVE_FILE_ID = ""; // optional

// View: file ID ho to PDF preview, warna folder
const CATALOGUE_VIEW_URL = DRIVE_FILE_ID
  ? `https://drive.google.com/file/d/${DRIVE_FILE_ID}/view`
  : CATALOGUE_FOLDER_URL;

// Download: file ID ho to seedha download, warna folder
const CATALOGUE_DOWNLOAD_URL = DRIVE_FILE_ID
  ? `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`
  : CATALOGUE_FOLDER_URL;

const CATALOGUE_COVER = "/catalogue-cover.png";

/* ───────────── HOT SELLING PICKS (siteData.js se) ───────────── */
const TRENDING_PICKS = [
  { category: "incense-sticks",  id: "exotic-rose",              series: "Exotic Series" },
  { category: "incense-sticks",  id: "premium-oudh",             series: "Premium Series" },
  { category: "natural-incense", id: "kasturi-mystique",         series: "Nature's Bouquet" },
  { category: "incense-sticks",  id: "premium-khus",             series: "Premium Series" },
  { category: "natural-incense", id: "nag-champa",               series: "Premium Masala" },
  { category: "incense-sticks",  id: "exotic-oudh",              series: "Exotic Series" },
  { category: "natural-incense", id: "kapoor-pure",              series: "Nature's Bouquet" },
  { category: "incense-sticks",  id: "premium-kesar",            series: "Premium Series" },
  { category: "incense-sticks",  id: "ultra-premium-royal-rich", series: "Ultra Premium" },
  { category: "incense-sticks",  id: "exotic-bakhoor",           series: "Exotic Series" },
  { category: "natural-incense", id: "lotus-bloom",              series: "Nature's Bouquet" },
  { category: "incense-sticks",  id: "ultra-premium-javadhu",    series: "Ultra Premium" },
];

const toAnchor = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const buildTrending = () =>
  TRENDING_PICKS.map((pick) => {
    const sections = productCatalog?.[pick.category]?.sections || [];
    for (const section of sections) {
      const product = section.products.find((x) => x.id === pick.id);
      if (!product) continue;
      const variants =
        Array.isArray(product.variants) && product.variants.length > 0
          ? product.variants
          : [{ weight: product.weight, price: product.price }];
      return {
        key: `${pick.category}-${product.id}`,
        name: product.name,
        series: pick.series,
        image: product.image,
        imageHover: product.imageHover || product.image,
        price: variants[0].price,
        multi: variants.length > 1,
        href: `/categories/${pick.category}#${toAnchor(section.title)}`,
      };
    }
    return null;
  }).filter(Boolean);

const TRENDING = buildTrending();

const FEATURES = [
  { icon: ShieldCheck, title: "Premium Quality", text: "Trusted by customers worldwide" },
  { icon: Globe2, title: "Global Supply", text: "Exporting to multiple countries" },
  { icon: Handshake, title: "Reliable Trading", text: "Long term business partnerships" },
];

/* ───────────── PRODUCT CARD (compact) ───────────── */
const ProductCard = ({ p }) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-[#EEDAD7] bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7A1020]/10">
    <Link
      to={p.href}
      className="relative block aspect-square overflow-hidden rounded-lg bg-[#FBF1F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1020]"
    >
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
      />
      <img
        src={p.imageHover}
        alt={`${p.name} - alternate view`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-[#7A1020] px-2 py-0.5 text-[10px] font-semibold text-white shadow">
        <TrendingUp size={10} />
        Trending
      </span>
    </Link>

    <div className="flex flex-1 flex-col px-0.5 pt-2.5">
      <p className="truncate text-[10px] font-medium text-[#7A1020]">{p.series}</p>
      <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-[13px] font-semibold capitalize leading-5 text-[#1F2A27]">
        {p.name}
      </h3>

      <div className="mt-1 flex items-center gap-0.5" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={11} strokeWidth={0} fill="#C9A24B" />
        ))}
      </div>

      <p className="mt-1.5 text-sm font-bold text-[#1F2A27]">
        {p.multi && <span className="mr-1 text-[10px] font-normal text-[#1F2A27]/50">From</span>}
        {p.price}
      </p>

      <Link
        to={p.href}
        className="mb-0.5 mt-2.5 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[#FBF1F0] py-2 text-xs font-semibold text-[#7A1020] transition-colors hover:bg-[#7A1020] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1020]"
      >
        View Details
        <ArrowRight size={12} />
      </Link>
    </div>
  </article>
);

/* ───────────── PAGE ───────────── */
const Catalogue = () => (
  <div className="bg-white text-[#1F2A27]" style={BODY}>
    {/* ───── HERO ───── */}
    <section className="border-b border-[#F3E3E0] bg-gradient-to-b from-[#FFF7F5] to-[#FFFAF8] px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#7A1020]">Our Products</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px]" style={HEADING}>
            Trending <span className="text-[#7A1020]">Products</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#1F2A27]/70 sm:text-base">
            Explore our top trading products high demand, trusted quality, perfect for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-[#E8D3CF]">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center px-2 text-center sm:px-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5DEDE] text-[#7A1020] sm:h-14 sm:w-14">
                <Icon size={24} strokeWidth={1.6} />
              </span>
              <h3 className="mt-3 text-xs font-bold sm:text-sm">{title}</h3>
              <p className="mt-1 hidden text-xs leading-5 text-[#1F2A27]/55 sm:block">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ───── TRENDING GRID ───── */}
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      {TRENDING.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {TRENDING.map((p) => (
            <ProductCard key={p.key} p={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-[#FFF7F5] p-10 text-center text-sm text-[#1F2A27]/60">
          Trending products will appear here.
        </p>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 rounded-full border border-[#7A1020] px-6 py-3 text-sm font-semibold text-[#7A1020] transition-colors hover:bg-[#7A1020] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1020]"
        >
          Browse all products
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>

    {/* ───── CATALOG BANNER ───── */}
    <section className="px-4 pb-14">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#EBD3CF] bg-gradient-to-r from-[#FBEDEA] via-[#FFF7F5] to-[#F6E1DE]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#7A1020]/10 blur-3xl" />

        <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1fr_auto] lg:gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#7A1020]">Product Catalog</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl" style={HEADING}>
              Download Our Product Catalog
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#1F2A27]/70">
              Get complete product details, specifications and pricing in our latest trading catalog.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* View: Google Drive preview naye tab me */}
              <a
                href={CATALOGUE_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7A1020] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7A1020]/25 transition-all hover:-translate-y-0.5 hover:bg-[#4A0712] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7A1020]/30 sm:w-auto"
              >
                <FileText size={17} />
                View Catalog
              </a>

              {/* Download: Drive se seedha download */}
              <a
                href={CATALOGUE_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#7A1020] bg-white px-6 py-3.5 text-sm font-semibold text-[#7A1020] transition-all hover:-translate-y-0.5 hover:bg-[#7A1020] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7A1020]/30 sm:w-auto"
              >
                <Download size={17} />
                Download PDF
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-44 sm:w-52">
              <div className="absolute inset-0 translate-x-3 translate-y-3 -rotate-3 rounded-lg bg-white/80 shadow-md" />
              <img
                src={CATALOGUE_COVER}
                alt="Product catalogue cover"
                loading="lazy"
                className="relative aspect-[3/4] w-full -rotate-3 rounded-lg object-cover shadow-2xl ring-1 ring-black/5 transition-transform duration-500 hover:rotate-0"
              />
            </div>
          </div>

          <a
            href={CATALOGUE_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open catalogue"
            className="hidden flex-col items-center gap-3 text-center lg:flex"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7A1020] text-white shadow-lg shadow-[#7A1020]/30 transition-transform hover:scale-105">
              <Download size={22} />
            </span>
            <span className="max-w-[120px] text-sm italic text-[#1F2A27]/60">
              Get all products at one place
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default Catalogue;