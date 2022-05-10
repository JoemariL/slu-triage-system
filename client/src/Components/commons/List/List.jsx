import classnames from "classnames";

const List = ({
  children,
  position = "vertical" || "horizontal",
  loading = false,
}) => {
  return (
    <div
      className={classnames(
        "rounded-md",
        position === "vertical" ? "flex flex-col" : "flex flex-row items-center"
      )}
    >
      {children}
    </div>
  );
};

export default List;
