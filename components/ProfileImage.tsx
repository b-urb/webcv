"use client";

import Image from "next/image";
import React from "react";

// Loader comes from next.config.js (lib/imageLoader.ts); see DirectusImage.

const ProfileImage = () => {
  const imageUuid = "218814ac-b04e-4156-9be9-3770ff825a70";
  return (
    <div className="relative size-44 shrink-0 overflow-hidden rounded-full border-4 border-accent dark:border-accent md:size-56 lg:size-64 2xl:size-72 3xl:size-80">
      <Image
        src={imageUuid}
        alt="Profile Picture"
        sizes="(max-width: 769px) 30vw, (max-width: 1200px) 50vw"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default ProfileImage;
