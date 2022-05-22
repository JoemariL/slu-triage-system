import classNames from "classnames";

const Background = ({ children, className = "" }) => {
  return (
    <div className={classNames("h-screen", className)}>
      {children}
    </div>
  );
};

export default Background;
