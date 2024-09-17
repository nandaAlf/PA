import React from "react";

export default function InputForForm({
  labelText = "",
  placeholder = labelText,
  id = "",
  type = "text",
  register = null,
  required = true,
  disabled = false,
}) {
  return (
    <>
      <label htmlFor="">{labelText}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
        disabled={disabled}
      />
    </>
  );
}
