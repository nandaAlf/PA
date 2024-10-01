import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import { apiCreateStudy, apiUpdateStudy } from "../services/api";
import InputContainer from "./InputContainer";
import InputForForm from "./InputForForm";
export default function DiagnosisForm({
  diagnosisData,
  processData,
  register,
  setValue,
  errors,
  isViewing,
}) {
  useEffect(() => {
    if (diagnosisData) {
      for (const [key, value] of Object.entries(diagnosisData)) {
        setValue(key, value);
      }
      for (const [key, value] of Object.entries(processData)) {
        setValue(key, value);
      }
    }
  }, [diagnosisData, setValue, processData]);

  const fields = [
    // {
    //   labelText: "Macro:",
    //   id: "descripcion_macro",
    //   placeholder: "Ingresa la descripción macro",
    //   type: "text",
    //   required: false,
    // },
    // {
    //   labelText: "Micro:",
    //   id: "descripcion_micro",
    //   placeholder: "Ingresa la descripción micro",
    //   type: "text",
    //   required: false,
    // },
    // {
    //   labelText: "Observaciones:",
    //   id: "observaciones",
    //   placeholder: "Ingresa observaciones",
    //   type: "text",
    //   required: false,
    // },
    {
      labelText: "Diagnóstico:",
      id: "diagnostico",
      // placeholder: "Ingresa el diagnóstico",
      type: "text",
      required: false,
    },
    {
      labelText: "Finalizado:",
      id: "finalizado",
      type: "checkbox",
      required: false,
      defaultValue: false,
    },
  ];
  const processField = [
    {
      labelText: "Bloques:",
      id: "no_bloques",
      placeholder: "0",
      type: "number",
      required: false,
    },
    {
      labelText: "Laminas:",
      id: "no_laminas",
      placeholder: "0",
      type: "number",
      required: false,
    },
    {
      labelText: "Coloraciones rutinarias",
      id: "no_cr",
      placeholder: "0",
      type: "number",
      required: false,
    },
    {
      labelText: "Coloraciones especiales:",
      id: "no_ce",
      placeholder: "0",
      type: "number",
      required: false,
    },
  ];

  return (
    <div className="">
      {fields.map((field, index) => (
        <InputForForm
          key={index}
          labelText={field.labelText}
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          register={register}
          required={field.required}
          defaultValue={field.defaultValue}
          disabled={isViewing || field.disabled}
          errors={errors}
        />
      ))}
      <div className="grid grid-cols-4 gap-4">
        {processField.map((field, index) => (
          <InputForForm
            key={index}
            labelText={field.labelText}
            id={field.id}
            type={field.type}
            // placeholder={field.placeholder}
            register={register}
            required={field.required}
            defaultValue={0}
            disabled={isViewing || field.disabled}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
}
