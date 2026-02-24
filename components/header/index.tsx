"use client";

import BookingModal from "@/components/booking/BookingModal";
import MenuOverlay from "@/components/header/MenuOverlay";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Header = () => {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navLinks = [
    { href: "/story", label: t("story") },
    { href: "/offers", label: t("offers") },
    { href: "/gallery", label: t("gallery") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md">
        <div className="relative z-10 flex items-center justify-between py-4 px-6 border-b border-white/10">
          {/* Left: Menu & Brand */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative h-8 w-8 shrink-0 cursor-pointer"
              aria-label="Open Menu"
            >
              {/* Menu Icon: White (Default) */}
              <div className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0">
                <SafeImage
                  src="/icons/ui/menu-white.svg"
                  alt="Menu icon"
                  unoptimized
                />
              </div>
              {/* Menu Icon: Orange (Hover) */}
              <div className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <SafeImage
                  src="/icons/ui/menu-orange.svg"
                  alt="Menu icon active"
                  unoptimized
                />
              </div>
            </button>
            <Link href="/">
              <h1 className="text-white text-xl md:text-2xl font-extrabold tracking-tighter truncate uppercase">
                THE DISTRICT
              </h1>
            </Link>
          </div>

          {/* Right: Navigation & Actions */}
          <div className="flex items-center gap-4 lg:gap-8">
            <nav className="hidden lg:flex gap-8 text-white text-sm tracking-[0.2em] uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-6 lg:border-l lg:border-white/20 lg:pl-8">
              <LocaleSwitcher />

              <button
                onClick={() => setIsBookingOpen(true)}
                className="hidden sm:block border border-white text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
              >
                {t("checkAvailability")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlays & Modals */}
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
