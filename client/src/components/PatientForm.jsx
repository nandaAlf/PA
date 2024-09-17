import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiCreatePatient, apiUpdatePatient } from "../services/api";
import { useParams } from "react-router-dom";
import { apiGetPatient } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputContainer from "./InputContainer";
import InputForForm from "./inputForForm";
export default function PatientForm({
  patientData,
  register,
  setValue,
  isEditing,
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
    setIsDeceased(e.target.checked);
  };

  return (
    <div>
      {/* <div className='close' onClick={closeForm}>X</div> */}
      {/* <form onSubmit={onSubmit} > */}
      {/* <label htmlFor="">Nombre</label>
      <input
        type="text"
        placeholder="name"
        {...register("nombre", { required: true })}
        // disabled={isEditing} // Deshabilitar si estás solo viendo
      /> */}
      <InputForForm
        labelText="Nombre"
        id="nombre"
        register={register}
        disabled={isEditing}
      />
      <InputContainer
        inputs={[
          { labelText: "Historia Clinica", id: "hc" },
          { labelText: "Carnet de identidad", id: "cid" },
        ]}
        disabled={isEditing}
        register={register}
      />
      <InputContainer
        inputs={[
          { labelText: "Edad", id: "edad", type: "number" },
          { labelText: "Raza", id: "raza" },
        ]}
        disabled={isEditing}
        register={register}
      />
      {/* <div className="section-short-input">
        <div>
          <label htmlFor="">Historia Clinica</label>
          <input
            type="text"
            placeholder="hc"
            {...register("hc", { required: true })}
            // disabled={isEditing}
          />
        </div>
        <div>
          <label htmlFor="">Carnet de identidad</label>
          <input
            type="text"
            placeholder="cid"
            {...register("cid", { required: true })}
          />
        </div>
      </div> */}

      {/* <div className="section-short-input">
        <div>
          <label htmlFor="">Edad</label>
          <input
            type="number"
            placeholder="edad"
            {...register("edad", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="">Raza</label>
          <input
            type="Raza"
            placeholder="raza"
            {...register("raza", { required: true })}
          />
        </div>
      </div> */}

      <label>Es fallecido</label>
      <input
        className="checkbox"
        type="checkbox"
        {...register("es_fallecido")}
        checked={isDeceased}
        onChange={handleCheckboxChange}
      />
      {isDeceased && (
        <div className="fallecido-form">
          {/* <h3>Información de Fallecido</h3> */}
          <hr />
          <div className="section-short-input">
            <div>
              <label htmlFor="">Dirección</label>
              <input
                type="text"
                placeholder="direccion"
                {...register("fallecido.direccion", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="">Provincia</label>
              <input
                type="text"
                placeholder="provincia"
                {...register("fallecido.provincia", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="">Municipio</label>
              <input
                type="text"
                placeholder="municipio"
                {...register("fallecido.municipio", { required: true })}
              />
            </div>
          </div>

          <div className="section-short-input">
            <input
              type="text"
              placeholder="app"
              {...register("fallecido.app", { required: true })}
            />
            <input
              type="text"
              placeholder="apf"
              {...register("fallecido.apf", { required: true })}
            />
            <input
              type="text"
              placeholder="hea"
              {...register("fallecido.hea", { required: true })}
            />
          </div>
          <div className="section-short-input">
            <input
              type="number"
              placeholder="apgar"
              {...register("fallecido.apgar", { required: true })}
            />
            <input
              type="number"
              placeholder="edad gestacional"
              {...register("fallecido.edad_gest", { required: true })}
            />
            <input
              type="date"
              placeholder="fecha de muerte"
              {...register("fallecido.fecha_muerte", { required: true })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
