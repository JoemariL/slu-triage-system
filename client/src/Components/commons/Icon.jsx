import classnames from "classnames";

const Icon = ({
  className = "",
  rounded = false,
  roundedFull = false,
  icon,
}) => {
  return (
    <div
      className={classnames(
        "p-2 flex flex-row justify-center items-center",
        rounded && "rounded",
        roundedFull && "rounded-full",
        className
      )}
    >
      {icon}
    </div>
  );
};
export default Icon;
