import classNames from "classnames";

const ListItemLayout = ({ children, className = "" }) => {
  return (
    <div className={classNames("flex flex-col gap-3", className)}>
      {children}
    </div>
  );
};

export default ListItemLayout;
