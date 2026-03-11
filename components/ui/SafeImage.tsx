"use client";

import { BRAND_ASSETS } from "@/constants/branding";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: unknown;
  fallback?: string;
}

export default function SafeImage({
  src,
  fallback = BRAND_ASSETS.COVER_FALLBACK,
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState<boolean>(false);

  // Validate source type and error state
  const validSrc =
    error || typeof src !== "string" ? fallback : (src as string);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        // Force re-mount on src change to reset error state
        key={typeof src === "string" ? src : "empty"}
        fill
        {...props}
        src={validSrc}
        alt={alt}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        suppressHydrationWarning
        unoptimized
      />
    </div>
  );
}
