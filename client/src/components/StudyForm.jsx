import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForForm from "./inputForForm";
import InputContainer from "./InputContainer";
export default function StudyForm({
  studyData,
  register,
  setValue,
  isViewing,
  user,
}) {
  const navigate = useNavigate();

  //arreglar METER EN UN USEFEECT
  const [doctors, setDoctors] = useState([{ username: "doctor1", id: 7 }]);
  const [specialists, setSpecialists] = useState([{ username: "esp1", id: 8 }]);

  useEffect(() => {
    if (studyData) {
      for (const [key, value] of Object.entries(studyData)) {
        setValue(key, value);
      }
      setValue("fecha", studyData.fecha);
    }
    // setValue("especialista",user.id);
    console.log("tudy ", user);
  }, [studyData, setValue]);

  useEffect(() => {
    if (user) {
      // Setear el user.id en el campo "especialista"
      setValue("especialista", user.id);
    }
  }, [user, setValue]);

  if (!user) return;
  return (
    <div className=" ">
      {isViewing ? (
        <InputContainer
          inputs={[
            { labelText: "Codigo", id: "code" },
            { labelText: "Historia Clinica", id: "hc_paciente" },
          ]}
          register={register}
          disabled
        />
      ) : (
        <InputContainer
          inputs={[{ labelText: "Historia Clinica", id: "hc_paciente" }]}
          register={register}
        />
      )}

      <InputContainer
        inputs={[
          {
            labelText: "tipo",
            id: "tipo",
            type: "text",
            required: true,
            options: [
              { value: "B", label: "Biopsa" },
              { value: "C", label: "Citología" },
            ],
          },
        ]}
        register={register}
      />
      <InputContainer
        inputs={[
          {
            labelText: "Entidad",
            id: "entidad",
            type: "text",
            required: true,
            options: [
              { value: "H", label: "Hospital Pediátrico" },
              { value: "CE", label: "Clínica Especialidades" },
              { value: "HP", label: "Hospital Provincial" },
            ],
          },
          { labelText: "fecha", id: "fecha", type: "date", required: true },
        ]}
        register={register}
        // disabled
      />

      <div className="section-short-input">
        <div className="select-input-container">
          <label htmlFor="medico">Médico:</label>
          <select
            className="select-input"
            id="medico"
            {...register("medico", { required: true })}
          >
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Especialista:</label>
          <input
            id="especialista"
            type="text"
            // {...register("especialista", { required: true })}
            placeholder={user.first_name}
            disabled
          />
        </div>
        {/* El campo oculto que realmente enviará el ID del especialista */}
        <input
          type="hidden"
          {...register("especialista", { required: true })}
        />

        {/* 
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
        </div> */}
      </div>

      <div>
        <label htmlFor="imp_diag">Impresión Diagnóstica:</label>
        <input id="imp_diag" type="text" {...register("imp_diag")} 
         disabled={isViewing}/>
      </div>

      <div>
        <label htmlFor="pieza">Pieza:</label>
        <input
          id="pieza"
          type="text"
          {...register("pieza", { required: true })}
          disabled={isViewing}
        />
      </div>
    </div>
  );
}
