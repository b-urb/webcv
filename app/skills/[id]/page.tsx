import ProjectsList from "../../../components/ProjectsList";
import type { Skill } from "../../../lib/directus";
import { allSkills, getSkillAssociatedProjects } from "../../../lib/skills";

export async function generateStaticParams() {
  const skills = await allSkills();
  return skills.map((skill: Skill) => ({
    id: skill.id?.toString() ?? "",
  }));
}

const SkillDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex w-full flex-col items-center">
      <h2>Related Projects</h2>
      <ProjectsList loader={() => getSkillAssociatedProjects(id)} />
    </div>
  );
};

export default SkillDetail;
