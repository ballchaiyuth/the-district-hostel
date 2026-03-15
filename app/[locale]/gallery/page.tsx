"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const DEFAULT_FACILITIES = [
  {
    icon: "/images/accomodation/air_conditioning.svg",
    label: "Air Conditioning",
  },
  { icon: "/images/accomodation/bed.svg", label: "Bed" },
  { icon: "/images/accomodation/food.svg", label: "Beverage" },
  { icon: "/images/accomodation/shower.svg", label: "Shower" },
  { icon: "/images/accomodation/wifi.svg", label: "High-speed Wifi" },
];

const AutoSlideImage = ({
  images,
  label,
}: {
  images: string[];
  label: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      4000 + Math.random() * 2000,
    );
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-neutral-950 rounded-sm border border-white/5 shadow-2xl">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
          alt={`${label} slide`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
      <div className="absolute bottom-8 left-8 z-20">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-brand/80 italic">
          Perspective 0{index + 1}
        </span>
      </div>
    </div>
  );
};

export default function GalleryPage() {
  const t = useTranslations("GalleryPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Structured Data based on your room types
  const dormRooms = [
    {
      label: "District A",
      id: "district-a",
      images: ["/images/gallery/room-1.jpg", "/images/gallery/room-2.jpg"],
    },
    {
      label: "District B",
      id: "district-b",
      images: ["/images/gallery/room-3.jpg", "/images/gallery/room-1.jpg"],
    },
  ];

  const privateRooms = [
    {
      label: "District C",
      id: "district-c",
      images: ["/images/gallery/pool-1.jpg", "/images/gallery/pool-2.jpg"],
    },
    {
      label: "District D",
      id: "district-d",
      images: ["/images/gallery/pool-3.jpg", "/images/gallery/pool-1.jpg"],
    },
    {
      label: "District E",
      id: "district-e",
      images: [
        "/images/gallery/exterior-1.jpg",
        "/images/gallery/exterior-2.jpg",
      ],
    },
    {
      label: "District F",
      id: "district-f",
      images: [
        "/images/gallery/neighborhood-1.jpg",
        "/images/gallery/neighborhood-2.jpg",
      ],
    },
    {
      label: "District G",
      id: "district-g",
      images: ["/images/gallery/lobby-1.jpg", "/images/gallery/lobby-2.jpg"],
    },
  ];

  const allSections = [...dormRooms, ...privateRooms];

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="pt-32 pb-16 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-8xl font-light tracking-[0.3em] uppercase text-white leading-tight italic">
            {t("header")}
          </h1>
          <div className="mx-auto mt-12 h-px w-24 bg-brand"></div>
        </div>
      </div>

      <section className="bg-neutral-900 py-20">
        <div className={containerClass}>
          {/* Partitioned Navigation Tree */}
          <div className="mb-20 flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-x-20 gap-y-12 items-start md:items-center">
              {/* Dorm Group */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20 mb-6 italic">
                  Dormitory
                </span>
                <div className="flex gap-8">
                  {dormRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => scrollToSection(room.id)}
                      className="text-[11px] font-bold tracking-[0.3em] uppercase text-brand hover:text-brand-light transition-all pb-1 border-b border-brand/20 hover:border-brand-light"
                    >
                      {room.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vertical Divider for Desktop */}
              <div className="hidden md:block h-12 w-px bg-white/10" />

              {/* Private Group */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20 mb-6 italic">
                  Private Suites
                </span>
                <div className="flex flex-wrap justify-center md:justify-start gap-8">
                  {privateRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => scrollToSection(room.id)}
                      className="text-[11px] font-bold tracking-[0.3em] uppercase text-brand hover:text-brand-light transition-all pb-1 border-b border-brand/20 hover:border-brand-light"
                    >
                      {room.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-20">
            {allSections.map((section) => (
              <div id={section.id} key={section.id} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-12">
                  <div className="lg:col-span-8">
                    <h3 className="text-brand text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6">
                      {section.label}
                    </h3>
                    <p className="text-neutral-400 font-light leading-relaxed max-w-2xl text-lg">
                      Experience Ekkamai&apos;s finest living in our
                      {section.label}. Meticulously designed to provide a
                      perfect sanctuary for the modern traveler.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-end">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">
                      Suite Archive / 2026
                    </span>
                  </div>
                </div>

                <AutoSlideImage images={section.images} label={section.label} />

                {/* Facilities Bar */}
                <div className="mt-16 pt-16 border-t border-white/5">
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-12 text-center">
                    {t("facility")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
                    {DEFAULT_FACILITIES.map((facility) => (
                      <div
                        className="flex flex-col items-center gap-4 group/icon"
                        key={facility.label}
                      >
                        <div
                          className="w-12 h-12 bg-brand transition-transform duration-500 group-hover/icon:scale-110"
                          style={{
                            maskImage: `url(${facility.icon})`,
                            WebkitMaskImage: `url(${facility.icon})`,
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                          }}
                        />
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover/icon:text-white transition-colors">
                          {facility.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Branding Footer */}
          <div className="mt-60 text-center">
            <div className="h-px w-12 bg-white/20 mx-auto mb-8" />
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20 italic">
              The District / {t("curated")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
