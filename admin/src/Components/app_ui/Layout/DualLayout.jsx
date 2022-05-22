import classNames from "classnames";

const DualLayout = ({ children, className = "" }) => {
  return (
    <div className={classNames("h-full flex flex-row", className)}>
      {children}
    </div>
  );
};

export default DualLayout;
