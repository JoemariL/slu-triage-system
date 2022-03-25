import classnames from "classnames";

const Button = ({
  className = "",
  buttonStyle = "",
  label = "",
  type,
  onClick = () => {},
}) => {
  return (
    <div className={classnames(className)}>
      <button
        className={classnames("w-full", buttonStyle)}
        type={type}
        onClick={onClick}
      >
        <span>{label}</span>
      </button>
    </div>
  );
};

export default Button;
