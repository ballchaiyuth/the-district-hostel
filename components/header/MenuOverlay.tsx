"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingClick: () => void;
}

const MenuOverlay = ({ isOpen, onClose, onBookingClick }: MenuOverlayProps) => {
  const t = useTranslations("Navigation");
  const [animate, setAnimate] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Sync animation state with visibility toggle
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) setAnimate(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setAnimate(true), 10);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainItems = [
    { label: t("story"), href: "/story" },
    { label: t("offers"), href: "/offers" },
    { label: t("gallery"), href: "/gallery" },
    { label: t("blog"), href: "/blog" },
  ];

  const secondaryItems = [
    { label: t("stay"), href: "/stay" },
    { label: t("dine"), href: "/dine" },
    { label: t("neighbourhood"), href: "/neighbourhood" },
    { label: t("facilities"), href: "/facilities" },
    { label: t("contact"), href: "/contact" },
  ];

  const menuLinkStyle = `w-full py-3 text-center text-base font-light tracking-[0.25em] text-white/80 hover:text-orange-400 uppercase transition-[opacity,transform] duration-400`;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl transition-opacity duration-400 ease-out overflow-y-auto ${animate ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full flex-col bg-neutral-900/90 text-white shadow-2xl transition-all duration-400 ease-out h-full lg:h-auto lg:max-w-lg lg:border lg:border-white/5 lg:rounded-2xl ${animate ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="fixed right-6 top-6 z-[120] text-3xl font-light text-white/40 hover:text-orange-400 hover:rotate-90 lg:absolute cursor-pointer"
        >
          ✕
        </button>

        <nav className="flex flex-col items-center px-8 py-24 lg:py-16">
          <div className="flex w-full flex-col items-center">
            {/* Primary Navigation (Mobile Only) */}
            <div className="flex w-full flex-col items-center lg:hidden">
              {mainItems.map((item, index) => (
                <div
                  key={item.label}
                  className="w-full flex flex-col items-center"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{ transitionDelay: `${index * 30 + 50}ms` }}
                    className={`${menuLinkStyle} ${animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} cursor-pointer`}
                  >
                    {item.label}
                  </Link>
                  <div className="w-12 h-[0.5px] bg-white/10 mx-auto" />
                </div>
              ))}
            </div>

            {/* Secondary Navigation Items */}
            {secondaryItems.map((item, index) => (
              <div
                key={item.label}
                className="w-full flex flex-col items-center"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{ transitionDelay: `${(index + 4) * 30 + 50}ms` }}
                  className={`${menuLinkStyle} ${animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} cursor-pointer`}
                >
                  {item.label}
                </Link>
                {index !== secondaryItems.length - 1 && (
                  <div className="w-12 h-[0.5px] bg-white/10 mx-auto" />
                )}
              </div>
            ))}
          </div>

          {/* Booking CTA (Mobile Only) */}
          <div
            className={`mt-10 w-full flex justify-center lg:hidden transition-all duration-400 delay-300 ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            <button
              onClick={onBookingClick}
              className="w-full max-w-[240px] border border-white/20 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black cursor-pointer"
            >
              {t("checkAvailability")}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuOverlay;
