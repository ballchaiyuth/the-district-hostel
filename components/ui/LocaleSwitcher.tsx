"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", flag: "/icons/flags/flag-uk.svg", label: "English" },
    { code: "th", flag: "/icons/flags/flag-th.svg", label: "ไทย" },
    { code: "cn", flag: "/icons/flags/flag-cn.svg", label: "中文" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const onSelectChange = (nextLocale: string) => {
    setIsOpen(false);
    startTransition(() => {
      // @ts-expect-error - params is a dynamic object from Next.js 15
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Selection Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`cursor-pointer flex items-center transition-opacity hover:opacity-80 ${isPending ? "opacity-50" : ""}`}
      >
        <div className="relative h-6 w-6 overflow-hidden">
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            fill
            className="object-cover"
          />
        </div>
      </button>

      {/* Language Options Dropdown */}
      <div
        className={`absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 top-full mt-4 w-40 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl z-20 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectChange(lang.code)}
              className="group flex w-full items-center gap-4 px-5 py-3 transition-colors hover:bg-white/10 cursor-pointer text-left"
            >
              <div className="relative h-4 w-5 shrink-0 overflow-hidden rounded-[1px]">
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${
                  locale === lang.code
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
    </div>
  );
}
