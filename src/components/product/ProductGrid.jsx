import { useState } from "react";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleProducts = products.slice(0, visibleCount);
  const remaining = products.length - visibleCount;

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="relative py-10">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#fffdf8] to-white" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/*
          Responsive grid:
            Mobile  : 2 cols
            Tablet  : 3 cols  (sm 640+)
            Desktop : 4 cols  (lg 1024+)
            XL      : 5 cols  (xl 1280+)
        */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">

          {/* Products */}
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
            />
          ))}

          {/* View More Card */}
          {visibleCount < products.length && (
            <button
              onClick={handleViewMore}
              className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-gradient-to-br from-stone-50 to-[#fff8f8] transition-all duration-300 hover:-translate-y-1 hover:border-[#7a1020]/40 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7a1020] text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_24px_rgba(122,16,32,0.32)]">
                <ChevronRight className="h-5 w-5" />
              </div>

              {/* Title */}
              <h3 className="mt-3 font-serif text-base font-semibold tracking-wide text-[#7a1020]">
                View More
              </h3>

              {/* Remaining count */}
              <p className="mt-1 text-xs text-stone-400">
                {remaining} more product{remaining !== 1 ? "s" : ""}
              </p>
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductGrid;