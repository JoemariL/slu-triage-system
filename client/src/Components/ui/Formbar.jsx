import classnames from "classnames";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Icon } from "../commons";

const Formbar = ({
  className = "",
  header = "",
  disabled = false,
  onReturnClick = () => {},
}) => {
  return (
    <div
      className={classnames("sticky w-full top-0 p-3 z-10 bg-slate-100", className)}
    >
      <div className="flex flex-row items-center gap-x-5">
        <button
          className="rounded-full bg-slate-200 focus:outline-none hover:bg-white"
          type="button"
          onClick={onReturnClick}
          disabled={disabled}
        >
          <Icon icon={<IoReturnDownBackOutline className="h-5 w-5" />} />
        </button>

        <span className="text-lg text-center font-bold">{header}</span>
      </div>
    </div>
  );
};

export default Formbar;
