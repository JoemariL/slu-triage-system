import classnames from "classnames";

const List = ({ children, position = "vertical" || "horizontal" }) => {
  return (
    <ul
      className={classnames(
        "rounded-md",
        position === "vertical" && "flex flex-col",
        position === "horizontal" && "flex flex-row items-center"
      )}
    >
      {children}
    </ul>
  );
};

export default List;
