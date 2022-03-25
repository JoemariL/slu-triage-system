import React, { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";

const Input = ({
  className = "",
  inputOutStyle = "",
  inputInStyle = "",
  label = "",
  subtitle = "",
  type,
  id = "",
  name = "",
  placeholder = "",
  minLength = 0,
  maxLength = 100,
  defaultValue,
  value,
  onChange = () => {},
  focus = false,
  loading = false,
  error,
  required = false,
  iconRight,
  disabled = false,
}) => {
  const ref = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const onFocusCb = useCallback(() => {
    return setIsFocused(true);
  }, []);

  const onBlurCb = useCallback(() => {
    return setIsFocused(false);
  }, []);

  useEffect(() => {
    if (focus && ref && ref.current) {
      ref.current.focus();
      setIsFocused(true);
    }
  }, [focus]);

  return (
    <div className={classnames("grid grid-row-4 space-y-2", className)}>
      <span>{label}</span>
      <div
        className={classnames(
          "px-2",
          "inline-flex items-center",
          "border-2 border-gray-300 bg-white",
          error ? "border-red-600" : "border-gray-300",
          inputOutStyle
        )}
      >
        <input
          className={classnames("w-full", "focus:outline-none", inputInStyle)}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          defaultValue={defaultValue}
          value={value}
          ref={ref}
          onFocus={onFocusCb}
          onBlur={onBlurCb}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
        {iconRight}
      </div>
      <span className="px-2 text-sm text-gray-500">{subtitle}</span>
      {error && <span className="px-2 text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default Input;
