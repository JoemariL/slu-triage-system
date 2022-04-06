import classnames from "classnames";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Icon } from "../commons";

const Formbar = ({
  className = "",
  headerText = "",
  onReturnClick = () => {},
  disabled = false,
}) => {
  return (
    <div
      className={classnames("fixed w-full top-0 p-3 z-10 bg-white", className)}
    >
      <div className="flex flex-row items-center gap-x-3">
        <button
          className="rounded-full focus:outline-none hover:bg-slate-100"
          type="button"
          onClick={onReturnClick}
          disabled={disabled}
        >
          <Icon icon={<IoReturnDownBackOutline className="h-6 w-6" />} />
        </button>

        <span className="text-lg font-bold">{headerText}</span>
      </div>
    </div>
  );
};

export default Formbar;
