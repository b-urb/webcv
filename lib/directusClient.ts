import { createDirectus, graphql, rest, staticToken } from "@directus/sdk";

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

async function fetchWithRetry(input: RequestInfo | URL, init?: RequestInit) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(input, init);
    if ((res.status !== 503 && res.status !== 429) || attempt === 6) return res;
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
  }
}

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
