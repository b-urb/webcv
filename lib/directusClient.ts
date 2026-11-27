import { createDirectus, graphql, rest, staticToken } from "@directus/sdk";

import { fetchWithRetry } from "./fetchRetry.cjs";
import type {
  Blogpost,
  Introtext,
  Project,
  ProjectsSkills,
  ProjectTranslations,
  Skill,
  WorkExperience,
  WorkRoles,
  WorkRolesTranslations,
} from "./types";

export const directus = createDirectus<MyCollections>("https://cms.burbn.de", {
  globals: { fetch: fetchWithRetry },
})
  .with(staticToken(process.env.DIRECTUS_TOKEN!))
  .with(rest())
  .with(graphql());

interface MyCollections {
  blogposts: Blogpost[];
  projects: Project[];
  projects_translations: ProjectTranslations[];
  aboutme: Introtext;
  projects_skills: ProjectsSkills[];
  work_experience: WorkExperience[];
  work_roles: WorkRoles[];
  work_roles_translations: WorkRolesTranslations[];
  skills: Skill[];
}
