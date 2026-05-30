"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackClassName?: string;
};

export function BrandImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  fallbackClassName = "bg-gradient-to-br from-cream via-sand to-[#EEE8DA]",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 ${fallbackClassName}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
