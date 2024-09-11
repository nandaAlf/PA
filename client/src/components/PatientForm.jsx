import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiCreatePatient, apiUpdatePatient } from "../services/api";
import { useParams } from "react-router-dom";
import { apiGetPatient } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PatientForm({ patientData, register, setValue }) {
  // const{
  //   register,
  //   handleSubmit,
  //   setValue
  // }=useForm();

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

  // useEffect(() => {
  //   async function loadData() {
  //     if (params.id) {
  //       const response=await getPatientData(params.id)
  //       setValue("hc", response.data.hc);
  //       setValue("nombre", response.data.nombre);
  //       setValue("cid", response.data.cid);
  //       setValue("edad", response.data.edad);
  //       // Agrega más campos si es necesario
  //     }
  //   }
  //   loadData()
  // },[] );

  const getPatientData = async (id) => {
    try {
      const response = await apiGetPatient(id);
      return response;
      alert("ok");
    } catch (error) {
      alert(error);
    }
  };

  // const onSubmit=handleSubmit((data)=>{
  //   handlerDataPatient(data)
  // })

  const handlerDataPatient = async (data) => {
    try {
      if (params.id) {
        const response = await apiUpdatePatient(data.hc, data);
      } else {
        const result = await apiCreatePatient(data);
        if (result.success) {
          alert("Paciente creado exitosamente");
          navigate("/patients/");
          // Aquí puedes realizar otras acciones, como redirigir al usuario.
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsDeceased(e.target.checked);
  };

  return (
    <div className="patient-form ">
      {/* <div className='close' onClick={closeForm}>X</div> */}
      {/* <form onSubmit={onSubmit} > */}
      <input
        type="text"
        placeholder="hc"
        {...register("hc", { required: true })}
      />

      <input
        type="text"
        placeholder="name"
        {...register("nombre", { required: true })}
      />
      <input
        type="text"
        placeholder="cid"
        {...register("cid", { required: true })}
      />
      <input
        type="number"
        placeholder="edad"
        {...register("edad", { required: true })}
      />

      <label>Es fallecido</label>
      <input
        type="checkbox"
        {...register("es_fallecido")}
        checked={isDeceased}
        onChange={handleCheckboxChange}
      />

      <input
        type="Raza"
        placeholder="raza"
        {...register("raza", { required: true })}
      />

      {/* Campos adicionales para Fallecido si es_fallecido es true */}
      {isDeceased && (
        <div className="fallecido-form">
          <h3>Información de Fallecido</h3>

          <input
            type="text"
            placeholder="provincia"
            {...register("fallecido.provincia", { required: true })}
          />
          <input
            type="text"
            placeholder="municipio"
            {...register("fallecido.municipio", { required: true })}
          />
          <input
            type="text"
            placeholder="direccion"
            {...register("fallecido.direccion", { required: true })}
          />
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
      )}

      {/* <button type='submit'>Send</button> */}
      {/* </form> */}
    </div>
  );
}
