import classnames from "classnames";

const Icon = ({ className = "", icon }) => {
  return (
    <div
      className={classnames(
        "flex flex-row justify-center items-center",
        className
      )}
    >
      {icon}
    </div>
  );
};
export default Icon;
