import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const MenuItem = ({
  className = "",
  label = "",
  subtitle = "",
  loading = false,
  disabled = false,
  icon,
  onClick = () => {},
}) => {
  return (
    <li
      className={classnames(
        "p-5 inline-flex items-center gap-3 cursor-pointer hover:bg-slate-200",
        className
      )}
      onClick={onClick}
    >
      {loading ? (
        <BiLoaderAlt className="h-6 w-6 text-blue-600 animate-spin" />
      ) : (
        <>{icon}</>
      )}

      <div className="flex flex-col">
        <span className="font-bold">{label}</span>
        <span className="text-sm">{subtitle}</span>
      </div>

      <div className="ml-auto">
        <MdOutlineArrowForwardIos className="h-4 w-4" />
      </div>
    </li>
  );
};

export default MenuItem;
