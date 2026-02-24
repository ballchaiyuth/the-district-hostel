"use client";

import BookingModal from "@/components/booking/BookingModal";
import MenuOverlay from "@/components/header/MenuOverlay";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Ref to detect clicks outside the language selector
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "EN", flag: "/icons/flags/flag-uk.svg", label: "English" },
    { code: "TH", flag: "/icons/flags/flag-th.svg", label: "ไทย" },
    { code: "CN", flag: "/icons/flags/flag-cn.svg", label: "中文" },
  ];

  const [currentLang, setCurrentLang] = useState(languages[0]);

  // Handle Global Click & ESC Key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLangOpen(false);
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isLangOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md">
        <div className="relative z-10 flex items-center justify-between py-4 px-6 border-b border-white/10">
          {/* Brand Logo & Hamburger (Same as before) */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative h-8 w-8 shrink-0 cursor-pointer"
            >
              <img
                src="/icons/ui/menu-white.svg"
                className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0"
                alt="Menu"
              />
              <img
                src="/icons/ui/menu-orange.svg"
                className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                alt="Menu Hover"
              />
            </button>
            <Link href="/">
              <h1 className="text-white text-xl md:text-2xl font-extrabold tracking-tighter truncate uppercase">
                THE DISTRICT
              </h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 lg:gap-8">
            <nav className="hidden lg:flex gap-8 text-white text-sm tracking-[0.2em]">
              <Link
                href="/story"
                className="hover:text-orange-400 transition-colors"
              >
                STORY
              </Link>
              <Link
                href="/offers"
                className="hover:text-orange-400 transition-colors"
              >
                OFFERS
              </Link>
              <Link
                href="/gallery"
                className="hover:text-orange-400 transition-colors"
              >
                GALLERY
              </Link>
              <Link
                href="/blog"
                className="hover:text-orange-400 transition-colors"
              >
                BLOG
              </Link>
            </nav>

            <div className="flex items-center gap-4 lg:gap-6 lg:border-l lg:border-white/20 lg:pl-8">
              {/* Language Selector Container */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="cursor-pointer flex items-center"
                >
                  <img
                    src={currentLang.flag}
                    className="h-6 w-6 rounded-[2px] hover:opacity-80 transition-opacity"
                    alt="Language"
                  />
                </button>

                {/* Dropdown with Slide & Fade Animation */}
                <div
                  className={`absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 top-full mt-4 w-40 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl z-20 transition-all duration-300 ease-out ${
                    isLangOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang);
                        setIsLangOpen(false);
                      }}
                      className="group flex w-full items-center gap-4 px-5 py-3 transition-colors hover:bg-white/10 cursor-pointer text-left"
                    >
                      <img
                        src={lang.flag}
                        className="h-4 w-5 object-cover rounded-[2px]"
                        alt={lang.label}
                      />
                      <span
                        className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${
                          currentLang.code === lang.code
                            ? "text-orange-400"
                            : "text-white group-hover:text-orange-400"
                        }`}
                      >
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="hidden sm:block border border-white text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onBookingClick={() => {
          setIsMenuOpen(false);
          setIsBookingOpen(true);
        }}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Header;
