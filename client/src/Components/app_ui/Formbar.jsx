import classnames from "classnames";
import { MdArrowBackIosNew } from "react-icons/md";
import { Icon } from "../commons";

const Formbar = ({
  className = "",
  header = "",
  sticky = false,
  onReturnClick = () => {},
}) => {
  return (
    <div
      className={classnames(
        "w-full py-5 px-3",
        sticky && "sticky top-0 z-40",
        className
      )}
    >
      <div className="inline-flex items-center gap-x-5">
        <button type="button" onClick={onReturnClick}>
          <Icon icon={<MdArrowBackIosNew className="h-5 w-5" />} />
        </button>

        <span className="text-xl font-bold">{header}</span>
      </div>
    </div>
  );
};

export default Formbar;
