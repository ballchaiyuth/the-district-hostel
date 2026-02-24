"use client";

import { BRAND_ASSETS } from "@/constants/branding";
import { useEffect, useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function SafeImage({
  src,
  fallback = BRAND_ASSETS.COVER_FALLBACK,
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>((src as string) || fallback);

  useEffect(() => {
    setImgSrc((src as string) || fallback);
  }, [src, fallback]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
}
