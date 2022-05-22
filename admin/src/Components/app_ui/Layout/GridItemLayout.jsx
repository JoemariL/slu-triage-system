import classNames from "classnames";

const GridItemLayout = ({ children, className = "" }) => {
  return (
    <div
      className={classNames("flex flex-row flex-wrap gap-7", className)}
    >
      {children}
    </div>
  );
};

export default GridItemLayout;
