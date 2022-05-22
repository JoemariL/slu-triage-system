import React, { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";

const Input = ({
  label = "",
  subtitle = "",
  type,
  id = "",
  name = "",
  placeholder = "",
  minLength = 0,
  maxLength = 100,
  focus = false,
  loading = false,
  disabled = false,
  required = false,
  onChange = () => {},
  iconLeft,
  iconRight,
  pattern,
  min,
  max,
  error,
  defaultValue,
  value,
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
    <div className="grid grid-row-4 space-y-2">
      <span>
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div
        className={classnames(
          "px-2 inline-flex items-center border-2 rounded border-gray-300 bg-white focus-within:border-blue-900",
          error
            ? "border-red-600 focus-within:border-red-600"
            : "border-gray-300"
        )}
      >
        {iconLeft}
        <input
          className={classnames(
            "p-3 w-full rounded-full focus:outline-none",
            loading ? "blur-sm animate-pulse" : "",
            error ? "bg-red-50" : "",
            disabled ? "bg-white" : ""
          )}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          min={min}
          max={max}
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
          pattern={pattern}
          autoComplete="off"
        />
        {iconRight}
      </div>
      {error ? (
        <span className="px-2 text-sm text-red-600">{error}</span>
      ) : (
        <span className="px-2 text-sm text-gray-500">{subtitle}</span>
      )}
    </div>
  );
};

export default Input;
