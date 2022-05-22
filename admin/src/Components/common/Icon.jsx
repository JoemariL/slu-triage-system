import classnames from "classnames";

const Icon = ({ className = "", roundedFull = false, icon }) => {
  return (
    <div
      className={classnames(
        "p-2 flex flex-row justify-center items-center",
        roundedFull && "rounded-full",
        className
      )}
    >
      {icon}
    </div>
  );
};
export default Icon;
