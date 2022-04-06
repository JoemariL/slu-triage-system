import classnames from "classnames";

const Menu = ({ children, position = "vertical" || "horizontal" }) => {
  return (
    <div
      className={classnames(
        position === "vertical"
          ? "flex flex-col"
          : "flex flex-row items-center"
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
