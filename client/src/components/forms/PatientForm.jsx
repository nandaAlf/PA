import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputContainer from "./InputContainer";
import InputForForm from "./InputForForm";
import { Alert } from "react-bootstrap";
export default function PatientForm({
  patientData,
  register,
  setValue,
  isViewing,
  unregister,
  errors,
  isEditing
}) {
  useEffect(() => {
    if (patientData) {
      for (const [key, value] of Object.entries(patientData)) {
        setValue(key, value);
      }
      if (patientData.es_fallecido) {
        setIsDeceased(true);
        if (patientData.fallecido) {
          for (const [key, value] of Object.entries(patientData.fallecido)) {
            setValue(`fallecido.${key}`, value);
          }
        }
      }
      
    }
  }, [patientData, setValue]);

  const [isDeceased, setIsDeceased] = useState(false);

  const handleCheckboxChange = (e) => {
    if(isViewing) return
    const checked = e.target.checked;
    setIsDeceased(checked);
    if (!checked) {
      unregister("fallecido");
    }
  };
  const formInputs = [
    { labelText: "Nombre", id: "nombre", maxLength: 50 },
    { labelText: "Historia Clinica", id: "hc", maxLength: 6 ,disabled:isEditing},
    { labelText: "Carnet de identidad", id: "cid", maxLength: 11 },
    {
      labelText: "Edad",
      id: "edad",
      type: "number",
      validation: {
        required: "La edad es obligatoria", // Validación requerida
        min: {
          value: 0,
          message: "La edad debe ser un número positivo", // Validación para números positivos
        },
        max: {
          value: 120,
          message: "La edad debe ser un númer menor que 120", // Validación opcional para límite
        },
      },
    },
    {
      labelText: "Raza",
      id: "raza",
      placeholder: "...",
      options: [
        { value: "B", label: "Blanco" },
        { value: "N", label: "Negro" },
        { value: "M", label: "Multato" },
        { label: "No especificado" },
      ],
    },
    {
      labelText: "Sexo",
      id: "sexo",
      placeholder: "...",
      options: [
        { value: "F", label: "Femenino" },
        { value: "M", label: "Masculino" },
        { label: "No especificado" },
      ],
    },
  ];

  // Inputs adicionales si el paciente es fallecido
  const deceasedInputs = [
    { labelText: "Provincia", id: "provincia" },
    { labelText: "Municipio", id: "municipio" },
    { labelText: "APP", id: "app" },
    { labelText: "APF", id: "apf" },
    { labelText: "APGAR", id: "apgar" ,type:"number"},
    { labelText: "Fecha de muerte", id: "fecha_muerte", type: "date" },
  ];
  return (
    <div>
      <div className="grid-input-container">
        {formInputs.map((input, index) => (
          <InputForForm
            key={index}
            labelText={input.labelText}
            id={input.id}
            register={register}
            required={input.required}
            type={input.type}
            disabled={isViewing || input.disabled}
            options={input.options}
            maxLength={input.maxLength}
            placeholder={input.placeholder}
            defaultValue={input.defaultValue}
            validation={input.validation} // Pasa las reglas de validación aquí
            error={errors[input.id]}
          />
        ))}
      </div>
      <label>Es fallecido</label>
      <input
        className="checkbox"
        type="checkbox"
        {...register("es_fallecido")}
        checked={isDeceased}
        onChange={handleCheckboxChange}
      />

      {/* Mostrar inputs adicionales si el paciente es fallecido */}
      {isDeceased && (
        <div className="grid-input-container ">
          {deceasedInputs.map((input, index) => (
            <InputForForm
              key={index}
              labelText={input.labelText}
              id={`fallecido.${input.id}`}
              register={register}
              required={input.required}
              type={input.type}
              disabled={ isViewing || input.disabled }
              options={input.options}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
              defaultValue={input.defaultValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
