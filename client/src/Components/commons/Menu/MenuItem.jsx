import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const MenuItem = ({
  className = "",
  label = "",
  subtitle = "",
  position = "vertical" || "horizontal",
  icon,
  onClick = () => {},
  hover = false,
  cursorPointer = false,
  loading = false,
}) => {
  return (
    <div
      className={classnames(
        className,
        "p-5",
        position === "vertical"
          ? "flex flex-row items-center gap-x-3"
          : "flex flex-col space-y-3",
        hover && "hover:bg-blue-100",
        cursorPointer && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {loading ? (
        <BiLoaderAlt className="h-6 w-6 text-blue-500 animate-spin" />
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
    </div>
  );
};

export default MenuItem;
