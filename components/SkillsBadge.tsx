const tagIconMapping: object = {
  sql: "azuresqldatabase",
  cpp: "cplusplus",
};

const SkillsBadge = (props: { id: string; text: string }) => {
  const findIconOrNull = () => {
    if (!(props.id.toLowerCase() in tagIconMapping))
      return `devicon-${props.id.toLowerCase()}-plain`;
    return `devicon-${tagIconMapping[props.id.toLowerCase() as keyof object]}-plain`;
  };

  return (
    <div
      className="group flex h-20 w-32 items-center justify-center gap-x-1
     rounded-xl bg-gradient-to-br from-primary to-accent text-center
     shadow-lg shadow-secondary transition duration-300 ease-in-out hover:scale-105
     hover:bg-gradient-to-br hover:from-primary hover:to-secondary dark:text-text"
    >
      <div className="text-center text-xl font-extrabold transition-transform duration-300 ease-in-out group-hover:scale-110">
        <i className={findIconOrNull()} />
      </div>
      <span className="max-w-20 text-xl opacity-100 transition-transform duration-300 ease-in-out group-hover:scale-110">{`${props.text}`}</span>
    </div>
  );
};

export default SkillsBadge;
