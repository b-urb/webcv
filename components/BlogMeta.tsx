import { faClock, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import MetaTag from "./MetaTag";

const BlogMeta = (props: { tags: string[] | null; date: string }) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return (
    <div className="grid grid-cols-6 gap-4 border-2 border-accent/50 p-2">
      <FontAwesomeIcon
        className="col-span-1 self-center justify-self-center"
        icon={faClock}
      />
      <span className="col-span-5 text-xs">
        {new Date(props.date).toLocaleDateString("de-DE", dateOptions)}
      </span>
      <FontAwesomeIcon
        className="col-span-1 self-center justify-self-center"
        icon={faTags}
      />
      <div className="col-span-5 flex flex-wrap justify-start justify-items-start gap-2 pt-2">
        {props.tags?.map(
          (tag) => tag && <MetaTag key={tag} tag={tag} text={tag} />
        )}
      </div>
    </div>
  );
};

export default BlogMeta;
