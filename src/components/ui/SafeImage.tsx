"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const DEFAULT_FALLBACK =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23e7e1d7'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%235c6b73' text-anchor='middle' dy='.3em'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export default function SafeImage({
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  ...props
}: ImageProps & { fallbackSrc?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      src={failed ? fallbackSrc : props.src}
      onError={() => setFailed(true)}
    />
  );
}