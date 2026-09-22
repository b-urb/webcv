"use client";

import Image from "next/image";
import React from "react";

// The loader lives in lib/imageLoader.ts and is wired globally in
// next.config.js, so this component no longer carries its own copy pointing
// at cms.burbn.de — that URL would be fetched at view time and defeat the
// static export.

const DirectusImage = ({
  src,
  alt,
  ...otherProps
}: {
  src: string;
  alt: string;
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 70vw, 10vw (max-width: 1200px) 70vw, 40vw, 10vw"
      {...otherProps} // This spreads any additional props to the Image component.
    />
  );
};

export default DirectusImage;
