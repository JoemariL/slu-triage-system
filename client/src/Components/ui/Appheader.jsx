import classnames from "classnames";
import { GoThreeBars } from "react-icons/go";
import { Icon } from "../commons";

const Appbar = ({
  className = "",
  header = "",
  headerIcon,
  disabled = false,
  onMenuClick = () => {},
}) => {
  return (
    <div
      className={classnames(
        "sticky w-full top-0 py-3 px-5 z-10 bg-slate-100",
        className
      )}
    >
      <div className="flex flex-row items-center gap-x-3">
        <div className="inline-flex items-center">
          {headerIcon}
          <span className="text-lg font-bold">{header}</span>
        </div>

        <button
          className="ml-auto rounded-full focus:outline-none hover:bg-white"
          type="button"
          onClick={onMenuClick}
          disabled={disabled}
        >
          <Icon icon={<GoThreeBars className="h-6 w-6" />} />
        </button>
      </div>
    </div>
  );
};

export default Appbar;
