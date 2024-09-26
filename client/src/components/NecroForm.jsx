import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForForm from "./inputForForm";
import InputContainer from "./InputContainer";
export default function NecroForm({
  studyData,
  register,
  setValue,
  isViewing,
}) {
  const navigate = useNavigate();

  const [specialists, setSpecialists] = useState([{ username: "esp1", id: 8 }]);

  useEffect(() => {
    if (studyData) {
      for (const [key, value] of Object.entries(studyData)) {
        setValue(key, value);
      }
      setValue("fecha", studyData.fecha);
    }
  }, [studyData, setValue]);

  return (
    <div className=" ">
      {isViewing ? (
        <InputContainer
          inputs={[
            { labelText: "Codigo", id: "code" },
            { labelText: "Historia Clinica", id: "hc_paciente" },
          ]}
          register={register}
        />
      ) : (
        <InputContainer
          inputs={[{ labelText: "Historia Clinica", id: "hc_paciente" }]}
          register={register}
        />
      )}

      <InputForForm
        labelText="Certificado de Defunción"
        id="certif_defuncion"
        register={register}
        required={true}
      />

      <InputForForm
        labelText="Habito externo"
        id="habito_externo"
        register={register}
        required={true}
      />

      <InputForForm
        labelText="Hallazgos"
        id="hallazgos"
        register={register}
        required={true}
      />

      <div className="section-short-input">
        <div>
          <label htmlFor="especialista">Especialista:</label>
          <select
            id="especialista"
            {...register("especialista", { required: true })}
          >
            {specialists.map((specialist) => (
              <option key={specialist.id} value={specialist.id}>
                {specialist.username}
              </option>
            ))}
          </select>
        </div>
      </div>

      <InputContainer
        inputs={[
          { labelText: "Fecha", id: "fecha", type: "date", required: true },
        ]}
        register={register}
      />
    </div>
  );
}
