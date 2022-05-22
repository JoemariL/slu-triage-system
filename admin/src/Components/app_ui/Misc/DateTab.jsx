import { MdOutlineKeyboardArrowRight } from "react-icons//md";
import classNames from "classnames";

const DateTab = ({
  DATE = "",
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
      <span className="w-[18rem] truncate">{DATE}</span>
      <MdOutlineKeyboardArrowRight className="h-5 w-5" />
    </div>
  );
};

export default DateTab;
