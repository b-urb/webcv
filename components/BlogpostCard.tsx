"use client";

import React from "react";

import DirectusImage from "./DirectusImage";
import MetaTag from "./MetaTag";

interface BlogpostCardProps {
  name: string;
  thumbnail?: string;

  abstract: string;
  date: string;
  tags: Array<string>;
}

const BlogpostCard: React.FC<BlogpostCardProps> = ({
  name,
  thumbnail,
  date,
  tags,
}) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return (
    <div className="m-4 h-full w-96 self-stretch rounded-md shadow-black transition-all duration-300 hover:cursor-pointer md:hover:scale-105">
      <div className="md:text-md grid h-full divide-y divide-dotted divide-white rounded-md bg-secondary p-3 text-xs text-black dark:bg-secondary dark:text-white">
        <div className="flex justify-center ">
          <div className="relative size-52 2xl:size-80">
            <DirectusImage
              src={thumbnail || "/images/default-thumbnail.jpg"}
              alt="Blogpost thumbnail"
              className="rounded-md"
            />
          </div>
        </div>
        <div className="row-span-auto">
          <h2 className="h-24 font-roboto text-xl md:text-2xl">{name}</h2>
        </div>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="row-auto h-44 cursor-default font-barlow text-base prose-a:underline md:h-36"
        >
          <span className="text-xs">
            {new Date(date).toLocaleDateString("de-DE", dateOptions)}
          </span>
          <div className="row-auto flex flex-wrap justify-start justify-items-start gap-2 pt-2">
            {tags.map(
              (tag) => tag && <MetaTag key={tag} tag={tag} text={tag} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default BlogpostCard;
