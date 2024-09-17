import React from "react";
import InputForForm from "./inputForForm";
export default function InputContainer({ inputs = [], register,disabled=false }) {
  return (
    <div className="section-short-input">
      {inputs.map((input,index) => (
        <div>
          
          <InputForForm
            key={index}
            labelText={input.labelText}
            id={input.id}
            register={register}
            required={input.required}
            type={input.type}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}
