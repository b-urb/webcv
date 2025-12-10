import Markdown from "react-markdown";

import type { WorkRoles } from "../lib/directus";

const formatDate = (date: string) => {
  const newDate = new Date(date);
  // Get the month and year, ensuring the month is in MM format
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();
  return `${month}/${year}`;
};
const WorkRolesView = (props: { roles: WorkRoles[] }) => {
  return (
    <div className="flex flex-col gap-y-5">
      {props.roles
        .sort(
          (a, b) =>
            new Date(b.startdate ?? "").getTime() -
            new Date(a.startdate ?? "").getTime()
        )
        .map((elem) => (
          <div key={elem.id} className="flex flex-col justify-between">
            <div className="flex gap-5">
              {elem.title}
              <h4>
                {formatDate(elem.startdate)} -{" "}
                {elem.enddate ? formatDate(elem.enddate) : "now"}
              </h4>
            </div>
            <div className="prose prose-invert text-xs lg:text-sm 2xl:text-lg ">
              <Markdown>
                {elem.translations
                  ? elem.translations[0].description
                  : "no description"}
              </Markdown>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WorkRolesView;
