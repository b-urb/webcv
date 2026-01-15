import { Suspense } from "react";

import { getProjectById } from "../lib/projects";
import type { Project } from "../lib/types";
import { BlogpostMarkdown } from "./BlogpostMarkdown";
import ProjectStats from "./ProjectStats";

async function getProject(projectId: string) {
  // Call an external API endpoint to get posts
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  if (!projectId || projectId === "undefined") {
    return undefined;
  }
  try {
    return await getProjectById(projectId);
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    return undefined;
  }
}
const ProjectDescription = async (props: { id: string }) => {
  const project: Project | undefined = await getProject(props.id);
  return project !== undefined ? (
    <div className="flex w-5/6 flex-col items-center gap-y-4">
      <article
        className="prose-p:text-dark-4 prose-headings:text-dark-4 prose-p:text-md
      prose flex
      min-w-full
        flex-col
        justify-items-center
       dark:prose-invert
       prose-pre:bg-inherit
       prose-pre:opacity-90
       xl:prose-p:text-xl"
      >
        <h2>{project.name!}</h2>
        <BlogpostMarkdown
          markdown={project.translations?.[0]?.description ?? ""}
        />
      </article>
      <Suspense>
        <ProjectStats url={project.repository_url} />
      </Suspense>
    </div>
  ) : (
    <div>No Projectdata</div>
  );
};

export default ProjectDescription;
