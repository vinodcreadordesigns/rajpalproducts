import { Swiper, SwiperSlide } from "swiper/react";

import {
  EffectCoverflow,
  Pagination,
  Mousewheel,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/siteData";

const Categories = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f3ed] py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#7a1020]/10 blur-[120px]" />

        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-[#c49b63]/10 blur-[120px]" />

      </div>

      {/* Heading */}
      <div className="mb-16 text-center">

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#7a1020]">
          Divine Collections
        </p>

        <h2 className="font-serif text-4xl font-bold md:text-6xl">

          <span className="bg-gradient-to-r from-[#7a1020] via-[#c49b63] to-[#7a1020] bg-clip-text text-transparent">
            Luxury Product
          </span>

          <br />

          <span className="text-[#2d1606]">
            Category Universe
          </span>

        </h2>

        <div className="mx-auto mt-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-[#7a1020] via-[#c49b63] to-[#7a1020]" />

      </div>

      {/* Slider */}
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        slidesPerView={"auto"}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}

        mousewheel={true}

        coverflowEffect={{
          rotate: 0,
          stretch: -20,
          depth: 180,
          modifier: 2,
          scale: 0.85,
          slideShadows: false,
        }}

        pagination={{
          clickable: true,

          renderBullet: function (index, className) {
            return `<span class="${className}">
              ${index + 1}
            </span>`;
          },
        }}

        modules={[
          EffectCoverflow,
          Pagination,
          Mousewheel,
          Autoplay,
        ]}

        className="categoriesSwiper"
      >

        {categories.map((category) => (

          <SwiperSlide
            key={category.slug}
            className="!w-[260px] md:!w-[320px]"
          >

            <div className="overflow-hidden rounded-[30px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] transition duration-500 hover:-translate-y-3">

              <CategoryCard category={category} />

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

      {/* Custom CSS */}
      <style jsx>{`

        .categoriesSwiper {
          padding-bottom: 90px;
        }

        /* Side Cards */
        .categoriesSwiper .swiper-slide {
          opacity: 0.4;
          transform: scale(0.82);
          transition: 0.5s;
          filter: blur(1px);
        }

        /* Active Card */
        .categoriesSwiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
          filter: blur(0px);
        }

        /* Pagination Container */
        .categoriesSwiper .swiper-pagination {
          margin-top: 40px;
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }

        /* Left + Right Lines */
        .categoriesSwiper .swiper-pagination::before,
        .categoriesSwiper .swiper-pagination::after {

          content: "";

          width: 80px;
          height: 1px;

          background: linear-gradient(
            to right,
            transparent,
            #c49b63
          );
        }

        .categoriesSwiper .swiper-pagination::after {

          background: linear-gradient(
            to left,
            transparent,
            #c49b63
          );
        }

        /* Numbers */
        .categoriesSwiper .swiper-pagination-bullet {

          width: auto;
          height: auto;

          background: transparent;

          color: #7a1020;

          opacity: 0.45;

          font-size: 18px;
          font-weight: 600;

          transition: 0.35s;
        }

        /* Active Number */
        .categoriesSwiper .swiper-pagination-bullet-active {

          opacity: 1;

          transform: scale(1.5);

          color: #7a1020;

          text-shadow: 0 0 12px rgba(122,16,32,0.35);
        }

      `}</style>

    </section>
  );
};

export default Categories;