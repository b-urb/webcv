"use client";

import type { ImageLoaderProps } from "next/image";
import Image from "next/image";
import React from "react";

const directusLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://cms.burbn.de/assets/${src}?width=${width}&quality=${quality || 76}`;
};

const ProfileImage = () => {
  const imageUuid = "218814ac-b04e-4156-9be9-3770ff825a70";
  return (
    <div className="relative size-44 overflow-hidden rounded-full border-4 border-accent dark:border-accent md:size-56 md:rounded-full lg:size-64 lg:rounded-full 2xl:size-72 2xl:rounded-full 3xl:size-80 3xl:rounded-full">
      <Image
        src={imageUuid}
        alt="Profile Picture"
        loader={directusLoader}
        sizes="(max-width: 769px) 30vw, (max-width: 1200px) 50vw"
        fill
      />
    </div>
  );
};

export default ProfileImage;
