import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  className = "",
  buttonStyle = "",
  label = "",
  type,
  disabled = false,
  onClick = () => {},
  loading = false,
}) => {
  return (
    <div className={classnames(className)}>
      <button
        className={classnames("w-full", disabled && "opacity-70", buttonStyle)}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? (
          <div className="flex flex-row justify-center">
            <BiLoaderAlt className="h-6 w-6 text-white animate-spin" />
          </div>
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default Button;
