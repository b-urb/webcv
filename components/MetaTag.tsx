const tagIconMapping: object = {
  sql: "azuresqldatabase",
  cpp: "cplusplus",
};

const MetaTag = (props: { tag: string; text: string }) => {
  const findIconOrNull = () => {
    if (!(props.tag.toLowerCase() in tagIconMapping))
      return `devicon-${props.tag.toLowerCase()}-plain`;
    return `devicon-${tagIconMapping[props.tag.toLowerCase() as keyof object]}-plain`;
  };

  return (
    <div className="flex h-8 w-fit rounded-xl px-2 pr-1.5 text-center font-roboto dark:bg-primary dark:text-text md:pt-0.5">
      <div className="text-center text-base md:text-lg">
        <i className={findIconOrNull()} />
      </div>
      <span className="ml-0.5 text-sm md:text-base">{`${props.text}`}</span>
    </div>
  );
};
export default MetaTag;
