"use client";

import { BRAND_ASSETS } from "@/constants/branding";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string;
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
  const [prevSrc, setPrevSrc] = useState<string>(src);

  // Sync state during render to avoid cascading renders
  if (src !== prevSrc) {
    setError(false);
    setPrevSrc(src);
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        fill
        {...props}
        src={error || !src ? fallback : src}
        alt={alt}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        suppressHydrationWarning
        unoptimized
      />
    </div>
  );
}
