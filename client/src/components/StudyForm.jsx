import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudyForm({ studyData,register,setValue}) {
  const navigate=useNavigate()
  
  //arreglar METER EN UN USEFEECT
  const [doctors, setDoctors] = useState([
    { username: "juan", id: 14 },
    { username: "pedre", id: 12 },
  ]);
  const [specialists, setSpecialists] = useState([
    { username: "p1", id: 5 },
    { username: "p2", id: 17 },
  ]);

  useEffect(() => {
    if (studyData) {
      for (const [key, value] of Object.entries(studyData)) {
        setValue(key, value);
      }
      setValue('fecha',studyData.fecha)
    }
  }, [studyData, setValue]);


  return (
    <div className=" ">
        <div>
          <label htmlFor="code">Code:</label>
          <input
            id="code"
            type="text"
            {...register("code", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            id="tipo"
            type="text"
            maxLength="1"
            {...register("tipo", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="hc_paciente">HC Paciente:</label>
          <input
            id="hc_paciente"
            type="text"
            {...register("hc_paciente", { required: true })}
          />
        </div>

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

        <div>
          <label htmlFor="fecha">Fecha:</label>
          <input id="fecha" type="date" {...register("fecha")} />
        </div>

        <div>
          <label htmlFor="entidad">Entidad:</label>
          <input
            id="entidad"
            type="text"
            maxLength="2"
            {...register("entidad")}
          />
        </div>
    </div>
  );
}
