import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProductGrid from "../components/product/ProductGrid";
import { productCatalog } from "../data/siteData";

const toAnchor = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const CategoryPageTemplate = ({ category }) => {
  const { hash } = useLocation();

  const sections =
    productCatalog[category.slug]?.sections || [];

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [hash, category.slug]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
        <Link
          to="/"
          className="transition hover:text-[#4a2511]"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          to="/categories"
          className="transition hover:text-[#4a2511]"
        >
          Categories
        </Link>

        <span>/</span>

        <span className="font-medium text-[#4a2511]">
          {category.name}
        </span>
      </div>

      {/* Back to Home */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#4a2511] transition hover:gap-3"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      {/* Category Name */}
      <h1 className="mb-8 font-serif text-3xl font-semibold tracking-wide text-[#4a2511]">
        {category.name}
      </h1>

      {/* Product Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <div
            key={section.title}
            id={toAnchor(section.title)}
            className="scroll-mt-40"
          >
            <h3 className="mb-5 font-serif text-2xl font-semibold tracking-wide text-[#4a2511]">
              {section.title}
            </h3>

            <ProductGrid products={section.products} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPageTemplate;