import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForForm from "./inputForForm";
import InputContainer from "./InputContainer";
export default function StudyForm({ studyData, register, setValue }) {
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
  }, [studyData, setValue]);

  return (
    <div className=" ">
      {/* <div>
        <label htmlFor="code">Code:</label>
        <input
          id="code"
          type="text"
          {...register("code", { required: true })}
        />
      </div> */}

      <InputForForm
        labelText="code"
        id="code"
        type="text"
        register={register}
        required={true}
      />

      <InputContainer
        inputs={[
          {
            labelText: "hc_paciente",
            id: "hc_paciente",
            type: "text",
            required: true,
          },
          { labelText: "tipo", id: "tipo", type: "text", required: true },
        ]}
        register={register}
      />
      <InputContainer
        inputs={[
          { labelText: "Entidad", id: "entidad", type: "text", required: true },
          { labelText: "fecha", id: "fecha", type: "date", required: true },
        ]}
        register={register}
      />

      <div className="section-short-input">
        <div>
          <label htmlFor="medico">Médico:</label>
          <select id="medico" {...register("medico", { required: true })}>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>

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

      <div>
        <label htmlFor="imp_diag">Impresión Diagnóstica:</label>
        <input id="imp_diag" type="text" {...register("imp_diag")} />
      </div>

      <div>
        <label htmlFor="pieza">Pieza:</label>
        <input
          id="pieza"
          type="text"
          {...register("pieza", { required: true })}
        />
      </div>
    </div>
  );
}
