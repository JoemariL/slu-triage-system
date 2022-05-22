import { MdOutlineKeyboardArrowRight } from "react-icons//md";
import classNames from "classnames";

const CampusTab = ({
  CAMPUS_NAME = "",
  ACTIVE = false,
  loading = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={classNames(
        "w-full my-0.5 p-2 ... inline-flex justify-between items-center rounded cursor-pointer hover:bg-sky-600 hover:text-white",
        ACTIVE && "bg-sky-600 text-white"
      )}
      onClick={onClick}
    >
      <span className="w-[18rem] truncate">{CAMPUS_NAME}</span>
      <MdOutlineKeyboardArrowRight className="h-5 w-5" />
    </div>
  );
};

export default CampusTab;
