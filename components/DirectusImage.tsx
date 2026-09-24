"use client";

import Image from "next/image";
import React from "react";

import directusImageLoader from "../lib/imageLoader";

// The loader is the shared one in lib/imageLoader.ts, which serves the
// build-time copies of Directus assets in the static export. It is passed
// explicitly as well as wired globally in next.config.js, because tests and
// anything else rendering outside Next never read that config.

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
      loader={directusImageLoader}
      fill
      sizes="(max-width: 768px) 70vw, 10vw (max-width: 1200px) 70vw, 40vw, 10vw"
      {...otherProps} // This spreads any additional props to the Image component.
    />
  );
};

export default DirectusImage;
