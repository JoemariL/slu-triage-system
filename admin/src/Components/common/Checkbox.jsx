import classnames from "classnames";

const Checkbox = ({
  label = "",
  name = "",
  id = "",
  value,
  onChange = () => {},
  checked,
  disabled = false,
}) => {
  return (
    <div className="flex flex-row items-center gap-x-3">
      <input
        className={classnames("h-4 w-4")}
        type="checkbox"
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        checked={checked}
        disabled={disabled}
      />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
