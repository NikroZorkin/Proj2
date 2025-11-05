"use client";

import { useState } from "react";
import Image from "next/image";

interface CoinImageProps {
  src: string;
  alt: string;
  size?: number;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23999'/%3E%3C/svg%3E";

export function CoinImage({ src, alt, size = 32 }: CoinImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="relative shrink-0 rounded-full bg-gray-100 dark:bg-gray-800"
      style={{ width: size, height: size }}
    >
      <Image
        src={hasError ? FALLBACK_IMAGE : imgSrc}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc(FALLBACK_IMAGE);
          }
        }}
        unoptimized
      />
    </div>
  );
}

