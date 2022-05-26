import classNames from "classnames";

const DualLayout = ({ children, className = "" }) => {
  return (
    <div className={classNames("h-full flex flex-col lg:flex-row", className)}>
      {children}
    </div>
  );
};

export default DualLayout;
