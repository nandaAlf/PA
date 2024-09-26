import React from "react";

export default function InputForForm({
  labelText = "",
  placeholder = "",
  id = "",
  type = "text",
  register = () => {},
  required = true,
  disabled = false,
  value = "",
  options = [],
  maxLength,
  defaultValue,
  validation = {},
}) {
  return (
    <div className="flex-column">
      <label htmlFor={id}>{labelText}</label>
      {options.length > 0 ? (
        <div>
          <select
            className="select-input"
            id={id}
            // {...register(id, { required })}
            {...register(id, { required, ...validation })}
            disabled={disabled}
          >
            <option value="">{placeholder}</option>{" "}
            {/* Opción vacía como placeholder */}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, { required })}
          disabled={disabled}
          maxLength={maxLength}
          defaultValue={defaultValue}
        />
      )}

      {/* <label htmlFor="">{labelText}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
        disabled={disabled}
       
      /> */}
    </div>
  );
}
