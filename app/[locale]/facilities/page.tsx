"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function FacilitiesPage() {
  const t = useTranslations("FacilitiesPage");

  return (
    <main className="bg-neutral-950 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.5em] uppercase opacity-40">
          {t("header")}
        </h1>
        <div className="w-12 h-px bg-amber-500/30 mx-auto" />
        <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
          {t("status")}
        </p>
      </motion.div>
    </main>
  );
}
