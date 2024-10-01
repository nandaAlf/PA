import React from "react";
import { toastError } from "../../util/Notification";

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
  errors={}
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
          // {...register(id, { required })}
          {...register(id, { required, ...validation })}
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
        {/* Mostrar el mensaje de error solo si existe */}
      {errors[id]?.message && (
        // <span className="error-message">{error[id].message}</span>
        console.log("eeeeeeeerrrrrrrrooooor",errors[id].message)
        
      )}
    </div>
  );
}
