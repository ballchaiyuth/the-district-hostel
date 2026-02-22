"use client";
import Link from "next/link";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md">
        <div className="relative z-10 flex items-center justify-between py-4 px-6 border-b border-white/10">
          {/* Left: Hamburger & Brand Logo */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative h-8 w-8 shrink-0"
            >
              <img
                src="/icons/ui/menu-white.svg"
                className="absolute inset-0 h-full w-full cursor-pointer transition-opacity duration-300 group-hover:opacity-0"
                alt="Menu White"
              />
              <img
                src="/icons/ui/menu-orange.svg"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                alt="Menu Orange"
              />
            </button>

            <Link href="/">
              <h1 className="text-white text-xl md:text-2xl font-extrabold tracking-tighter truncate">
                THE DISTRICT
              </h1>
            </Link>
          </div>

          {/* Right: Mobile Language Selector */}
          <div className="flex lg:hidden items-center gap-4">
            <button onClick={() => console.log("Language changed to UK")}>
              <img
                src="/icons/flags/flag-uk.svg"
                className="h-6 w-6 cursor-pointer active:scale-90 transition-transform"
                alt="UK Flag"
              />
            </button>
          </div>

          {/* Right: Desktop Navigation & CTA */}
          <div className="hidden lg:flex items-center gap-8 text-white text-sm tracking-[0.2em]">
            <nav className="flex gap-8">
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

            <div className="flex items-center gap-6 border-l border-white/20 pl-8">
              <button onClick={() => console.log("Language changed to UK")}>
                <img
                  src="/icons/flags/flag-uk.svg"
                  className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity"
                  alt="UK Flag"
                />
              </button>

              <button
                onClick={() => console.log("Check Availability")}
                className="border border-white px-6 py-2 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
