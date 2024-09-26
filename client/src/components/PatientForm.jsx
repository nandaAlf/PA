import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputContainer from "./InputContainer";
import InputForForm from "./inputForForm";
export default function PatientForm({
  patientData,
  register,
  setValue,
  isEditing,
  unregister,
  errors
}) {
  useEffect(() => {
    if (patientData) {
      for (const [key, value] of Object.entries(patientData)) {
        setValue(key, value);
      }
      if (patientData.es_fallecido) {
        setIsDeceased(true); // Marcamos como fallecido si el paciente ya lo es
      }
    }
  }, [patientData, setValue]);
  const params = useParams();
  const navigate = useNavigate();
  const [isDeceased, setIsDeceased] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsDeceased(checked);
    if (!checked) {
      unregister("fallecido");
    }
  };
  const formInputs = [
    { labelText: "Nombre", id: "nombre", maxLength: 50 },
    { labelText: "Historia Clinica", id: "hc", maxLength: 6 },
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
          message: "La ", // Validación opcional para límite máximo
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
        { value: null, label: "No especificado" },
      ],
    },
  ];

  // Inputs adicionales si el paciente es fallecido
  const deceasedInputs = [
    { labelText: "Provincia", id: "provincia" },
    { labelText: "Municipio", id: "municipio" },
    { labelText: "APP", id: "app" },
    { labelText: "APF", id: "apf" },
    { labelText: "APGAR", id: "apgar" },
    { labelText: "Fecha de muerte", id: "fecha_muerte", type: "date" },
  ];
  return (
    // <div>
    //   <InputForForm
    //     labelText="Nombre"
    //     id="nombre"
    //     register={register}
    //     disabled={isEditing}
    //   />
    //   <InputContainer
    //     inputs={[
    //       { labelText: "Historia Clinica", id: "hc", maxLength: 6 },
    //       { labelText: "Carnet de identidad", id: "cid", maxLength: 11 },
    //     ]}
    //     disabled={isEditing}
    //     register={register}
    //   />
    //   <InputContainer
    //     inputs={[
    //       { labelText: "Edad", id: "edad", type: "number" },
    //       {
    //         labelText: "Raza",
    //         id: "raza",
    //         placeholder: "...",
    //         options: [
    //           { value: "B", label: "Blanco" },
    //           { value: "N", label: "Negro" },
    //           { value: "M", label: "Multato" },
    //           { value: null, label: "No especificado" },
    //         ],
    //       },
    //     ]}
    //     disabled={isEditing}
    //     register={register}
    //   />

    //   <label>Es fallecido</label>
    //   <input
    //     className="checkbox"
    //     type="checkbox"
    //     {...register("es_fallecido")}
    //     checked={isDeceased}
    //     onChange={handleCheckboxChange}
    //   />
    //   {isDeceased && (
    //     <div className="fallecido-form">
    //       <hr />

    //       <InputContainer
    //         register={register}
    //         inputs={[
    //           { labelText: "Provicia", id: "provicia" },
    //           { labelText: "Municipio", id: "municipip" },
    //           // { labelText: "Dirección", id: "direccion" },
    //         ]}
    //         disabled={isEditing}
    //       />
    //       <InputContainer
    //         register={register}
    //         inputs={[
    //           { labelText: "APP", id: "app" },
    //           { labelText: "APF", id: "apf" },
    //           // { labelText: "HEA", id: "hea" },
    //         ]}
    //         disabled={isEditing}
    //       />

    //       <InputContainer
    //         register={register}
    //         inputs={[
    //           { labelText: "APGAR", id: "apgar" },
    //           { labelText: "Fecha muerte", type: "date", id: "fecha_muerte" },
    //         ]}
    //         disabled={isEditing}
    //       />
    //     </div>
    //   )}
    // </div>
    <div>
      {/* Renderizado del formulario básico */}

      {/* <InputContainer inputs={formInputs} disabled={isEditing} register={register} /> */}

      <div className="grid-input-container">
        {formInputs.map((input, index) => (
          <InputForForm
            key={index}
            labelText={input.labelText}
            id={input.id}
            register={register}
            required={input.required}
            type={input.type}
            disabled={input.disabled}
            options={input.options}
            maxLength={input.maxLength}
            placeholder={input.placeholder}
            defaultValue={input.defaultValue}
            validation={input.validation} // Pasa las reglas de validación aquí
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
        <div className="grid-input-container">
          {deceasedInputs.map((input, index) => (
            <InputForForm
              key={index}
              labelText={input.labelText}
              id={input.id}
              register={register}
              required={input.required}
              type={input.type}
              disabled={input.disabled}
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
