"use client";

import type { ImageLoaderProps } from "next/image";
import Image from "next/image";
import React from "react";

// FIXME: Check conversion to client component
const directusLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://cms.burbn.de/assets/${src}?width=${width}&quality=${quality || 75}`;
};

const DirectusImage = ({
  src,
  alt,
  ...otherProps
}: {
  src: string;
  alt: string;
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "loader">) => {
  return (
    <Image
      src={src}
      alt={alt}
      loader={directusLoader}
      fill
      sizes="(max-width: 768px) 70vw, 10vw (max-width: 1200px) 70vw, 40vw, 10vw"
      {...otherProps} // This spreads any additional props to the Image component.
    />
  );
};

export default DirectusImage;
