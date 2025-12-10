import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Suspense } from "react";

import ProjectDescription from "../../../components/ProjectDescription";

// export async function generateMetadata(
//     id: string,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   // fetch data
//   //const project = await getProject(id)
//   return {
//     title: "test", // project.title,
//     description: "test"
//   }
// }

// FIXME: Add generate metadata
const ProjectView = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-5/6 items-center justify-items-center gap-x-3">
        <Link href="/projects" legacyBehavior>
          <button
            aria-label="Back"
            type="button"
            className="transition-all hover:scale-150 md:text-2xl"
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </button>
        </Link>
        <h2 className="w-48 font-roboto text-xl opacity-50 md:text-sm">
          Return To Overview
        </h2>
      </div>
      <Suspense>
        <ProjectDescription id={params.id} />
      </Suspense>
    </div>
  );
};

export default ProjectView;
