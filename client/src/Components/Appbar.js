import classnames from "classnames";
import { FiArrowLeft } from "react-icons/fi";
import { Icon } from "./commons";

const Appbar = ({
  className = "",
  returnButtonDesign = "",
  headerText = "",
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <div
      className={classnames(
        "fixed w-full top-0 p-3 z-10 border-b-2 bg-white border-gray-100",
        className
      )}
    >
      <div className="flex flex-row items-center space-x-5">
        <button
          className={classnames(
            "rounded-full focus:outline-none hover:bg-slate-100",
            returnButtonDesign
          )}
          type="button"
          onClick={onClick}
          disabled={disabled}
        >
          <Icon
            className={classnames(disabled ? "opacity-70" : "")}
            icon={<FiArrowLeft className="h-6 w-6" />}
          />
        </button>

        <span className="text-lg">
          <strong>{headerText}</strong>
        </span>
      </div>
    </div>
  );
};

export default Appbar;
