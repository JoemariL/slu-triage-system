import { FiArrowLeft } from "react-icons/fi";
import classnames from "classnames";
import { Icon } from "../../commons";

const Appbar = ({
  className = "",
  iconStyle = "",
  returnButtonDesign = "",
  headerText = "",
  onClick = () => {},
  suffixProp,
  disabled = false,
}) => {
  return (
    <div
      className={classnames(
        "fixed w-full",
        "top-0 p-3 z-10",
        "flex flex-row items-center gap-x-5",
        "border-b-2",
        "border-gray-200",
        className
      )}
    >
      <button
        className={classnames(
          "rounded-full focus:outline-none",
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

      <div className="ml-auto">{suffixProp}</div>
    </div>
  );
};

export default Appbar;
