import ProjectsList from "../../../components/ProjectsList";
import { getSkillAssociatedProjects } from "../../../lib/skills";

const SkillDetail = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <h2>Related Projects</h2>
      <ProjectsList loader={() => getSkillAssociatedProjects(params.id)} />
    </div>
  );
};

export default SkillDetail;
