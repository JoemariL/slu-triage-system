import classnames from "classnames";
import { BiLoaderAlt } from "react-icons/bi";

const Button = ({
  className = "",
  label = "",
  type,
  secondary = false,
  roundedFull = false,
  disabled = false,
  loading = false,
  onClick = () => {},
  icon,
}) => {
  return (
    <>
      <button
        className={classnames(
          "p-3 w-full",
          roundedFull ? "rounded-full" : "rounded",
          secondary
            ? "bg-slate-600 text-white hover:opacity-80"
            : "bg-blue-900 text-white hover:opacity-80",
          disabled && "cursor-default opacity-20",
          className
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
          <div className="inline-flex items-center gap-x-3">
            {icon}
            {label}
          </div>
        )}
      </button>
    </>
  );
};

export default Button;
