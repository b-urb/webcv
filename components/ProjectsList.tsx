import React, { Suspense } from "react";

import type { Project } from "../lib/directus";
import { allProjects } from "../lib/directus";
import ProjectsCard from "./ProjectsCard";

const filterProjects = (elem: Project, category: string | undefined) => {
  if (!category) {
    return true;
  }
  return category === elem.translations?.[0].category;
};
const ProjectsList: React.FC<{
  category?: string;
  loader?: () => Promise<Project[]>;
}> = async ({
  category,
  loader = allProjects, // Assigning the default loader function
}) => {
  const projects = await loader();
  return (
    <nav className="grid w-4/5 grid-cols-1 gap-4 lg:w-fit lg:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
      {projects !== undefined && projects.length > 0 ? (
        projects
          .filter((project) => filterProjects(project, category))
          .map((content) => (
            <Suspense key={content.id}>
              <ProjectsCard
                id={content.id}
                name={content.name ?? ""}
                content={content.translations?.[0]?.description ?? ""}
                associated_skills={content.associated_skills}
              />
            </Suspense>
          ))
      ) : (
        <span>No Projects yet :( </span>
      )}
    </nav>
  );
};

export default ProjectsList;
