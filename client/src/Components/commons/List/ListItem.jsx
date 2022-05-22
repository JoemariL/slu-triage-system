import classnames from "classnames";

const ListItem = ({ className = "", label = "", subtitle = "", icon }) => {
  return (
    <li
      className={classnames("p-3 inline-flex items-center gap-x-3", className)}
    >
      {icon}
      <div className="flex flex-col">
        <span className="font-bold">{label}</span>
        <span className="text-sm">{subtitle}</span>
      </div>
    </li>
  );
};

export default ListItem;
