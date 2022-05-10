import classnames from "classnames";

const Menu = ({ children, position = "vertical" || "horizontal" }) => {
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

export default Menu;
