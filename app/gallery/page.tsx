"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Component for auto-sliding images with motion effects
 */
const AutoSlideImage = ({
  images,
  interval = 5000,
}: {
  images: string[];
  interval?: number;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      interval + Math.random() * 2000,
    );

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900 shadow-2xl rounded-sm border border-white/5">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.7, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
          alt="Gallery Slide"
        />
      </AnimatePresence>
      <div className="absolute inset-0 z-10 bg-black/20 hover:bg-black/0 transition-colors duration-700 cursor-crosshair" />
    </div>
  );
};

export default function GalleryPage() {
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Page Title Header */}
      <div className="py-24 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white">
            Gallery
          </h1>
          <div className="mx-auto mt-8 h-[1px] w-24 bg-orange-500"></div>
        </div>
      </div>

      {/* Mosaic Gallery Section */}
      <section className="bg-neutral-900 py-20 border-b border-white/5">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[350px] md:auto-rows-[400px]">
            {/* Pool Area */}
            <div className="md:col-span-2 md:row-span-2">
              <AutoSlideImage
                images={[
                  "/images/gallery/pool-1.jpg",
                  "/images/gallery/pool-2.jpg",
                  "/images/gallery/pool-3.jpg",
                ]}
              />
            </div>

            {/* Room Highlights */}
            <div className="md:col-span-1 md:row-span-1">
              <AutoSlideImage
                images={[
                  "/images/gallery/room-1.jpg",
                  "/images/gallery/room-2.jpg",
                  "/images/gallery/room-3.jpg",
                ]}
              />
            </div>

            {/* Dining / Food */}
            <div className="md:col-span-1 md:row-span-2">
              <AutoSlideImage
                images={[
                  "/images/gallery/food-1.jpg",
                  "/images/gallery/food-2.jpg",
                  "/images/gallery/food-3.jpg",
                ]}
              />
            </div>

            {/* Lobby */}
            <div className="md:col-span-1 md:row-span-1">
              <AutoSlideImage
                images={[
                  "/images/gallery/lobby-1.jpg",
                  "/images/gallery/lobby-2.jpg",
                ]}
              />
            </div>

            {/* Exterior */}
            <div className="md:col-span-2 md:row-span-1">
              <AutoSlideImage
                images={[
                  "/images/gallery/exterior-1.jpg",
                  "/images/gallery/exterior-2.jpg",
                ]}
              />
            </div>

            {/* Neighborhood */}
            <div className="md:col-span-2 md:row-span-1">
              <AutoSlideImage
                images={[
                  "/images/gallery/neighborhood-1.jpg",
                  "/images/gallery/neighborhood-2.jpg",
                ]}
              />
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
              Curated Moments at the District
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
