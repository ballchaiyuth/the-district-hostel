"use client";

import SafeImage from "@/components/ui/SafeImage";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BlogGalleryProps {
  images: string;
}

export default function BlogGallery({ images }: BlogGalleryProps) {
  const imageList = images
    .replace(/\s+/g, "")
    .split(",")
    .filter((img) => img.length > 0);

  return (
    <div className="not-prose my-12 blog-gallery group relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        className="rounded-[2rem] overflow-hidden shadow-xl"
      >
        {imageList.map((src, index) => (
          <SwiperSlide
            key={index}
            className="aspect-[16/10] md:aspect-[16/9] bg-neutral-900"
          >
            <div className="relative w-full h-full">
              <SafeImage
                src={src}
                alt="Gallery image"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-6 right-8 text-white/20 text-[10px] font-medium tracking-[0.4em]">
                {index + 1} / {imageList.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Navigation Arrows */
        .swiper-button-next,
        .swiper-button-prev {
          color: rgba(255, 255, 255, 0.3) !important;
          background: none !important;
          width: 50px !important;
          height: 100% !important;
          top: 0 !important;
          margin-top: 0 !important;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .blog-gallery:hover .swiper-button-next,
        .blog-gallery:hover .swiper-button-prev {
          opacity: 1;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #f59e0b !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: 200;
        }

        .swiper-button-prev {
          left: 10px !important;
        }
        .swiper-button-next {
          right: 10px !important;
        }

        /* Pagination Bullets */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.2;
          width: 5px !important;
          height: 5px !important;
        }

        .swiper-pagination-bullet-active {
          background: #f59e0b !important;
          opacity: 1;
          width: 15px !important;
          border-radius: 3px !important;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
