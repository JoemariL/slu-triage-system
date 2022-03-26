import { IoReturnUpBack } from "react-icons/io5";
import classnames from "classnames";
import { Icon } from "../../commons";

const Appbar = ({
  className = "",
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
        "flex flex-row items-center gap-x-3",
        className
      )}
    >
      <button
        className={classnames(
          "rounded-full focus:outline-none hover:scale-110 ease-in-out duration-300",
          returnButtonDesign
        )}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        <Icon
          className={classnames(
            "p-2 bg-blue-800",
            disabled ? "opacity-70" : ""
          )}
          icon={<IoReturnUpBack className="h-6 w-6 text-white" />}
        />
      </button>

      <span className="text-xl">
        <strong>{headerText}</strong>
      </span>

      <div className="ml-auto">{suffixProp}</div>
    </div>
  );
};

export default Appbar;
