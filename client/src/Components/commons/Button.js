import classnames from "classnames";

const Button = ({
  className = "",
  buttonStyle = "",
  label = "",
  type,
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <div className={classnames(className)}>
      <button
        className={classnames("w-full", disabled && "opacity-70", buttonStyle)}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <span>{label}</span>
      </button>
    </div>
  );
};

export default Button;
