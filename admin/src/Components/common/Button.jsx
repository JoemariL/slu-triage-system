import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  className = "",
  label = "",
  type,
  disabled = false,
  loading = false,
  onClick = () => {},
  icon,
}) => {
  return (
    <>
      <button
        className={classnames(
          "p-2 hover:opacity-80",
          className,
          disabled && "cursor-default pointer-events-none opacity-20"
        )}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? (
          <div className="flex flex-row justify-center">
            <BiLoaderAlt className="h-6 w-6 text-white animate-spin" />
          </div>
        ) : (
          <div className="inline-flex items-center gap-x-2">
            {icon}
            {label}
          </div>
        )}
      </button>
    </>
  );
};

export default Button;
