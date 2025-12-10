import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";

import { getSkillsById } from "../lib/skills";
import type { ProjectsSkills } from "../lib/types";
import MetaTag from "./MetaTag";

const ProjectsCard = async (props: {
  id: number;
  name: string;
  content: string;
  associated_skills: ProjectsSkills[] | null;
}) => {
  const ids = props.associated_skills?.map((it) => Number(it.skills_id)) ?? [];
  const skills = await getSkillsById(ids);
  return (
    <Link href={`projects/${props.id!.toString()}`}>
      <div className="size-full self-stretch rounded-md shadow-black transition-all duration-300 hover:cursor-pointer md:w-96 md:hover:scale-105">
        <div className="md:text-md grid h-full divide-y divide-dotted divide-white rounded-md bg-primary p-3 text-xs text-black dark:bg-secondary dark:text-text">
          <div className="row-span-auto">
            <h2 className="font-roboto text-xl md:text-2xl">{props.name}</h2>
          </div>
          {}
          <div className="row-auto h-44 cursor-default overflow-hidden font-barlow text-base prose-a:underline md:h-36">
            <div className="xl:text-md line-clamp-6 text-sm">
              <Markdown>{props.content}</Markdown>
            </div>
          </div>
          <div className="row-auto flex flex-wrap justify-start justify-items-start gap-2 pt-2">
            {skills !== undefined
              ? skills?.map((tag) => {
                  if (tag !== undefined)
                    return (
                      <MetaTag key={tag.key} tag={tag.key} text={tag.text} />
                    );
                  return null;
                })
              : "no tags"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsCard;
