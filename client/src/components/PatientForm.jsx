import React  ,{useEffect } from 'react'
import { useForm } from "react-hook-form";
import { apiCreatePatient, apiUpdatePatient } from '../services/api';
import { useParams } from 'react-router-dom';
import { apiGetPatient } from '../services/api';
import { useNavigate } from "react-router-dom";

export default function PatientForm() {
  const{
    register,
    handleSubmit,
    setValue
  }=useForm();

  const params=useParams()
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      if (params.id) {
        const response=await getPatientData(params.id)
        setValue("hc", response.data.hc);
        setValue("nombre", response.data.nombre);
        setValue("cid", response.data.cid);
        setValue("edad", response.data.edad);
        // Agrega más campos si es necesario
      }
    }
    loadData()
  },[] );

  const getPatientData=async(id)=>{
    try{
        const response= await apiGetPatient(id)
        return response
        alert('ok')
    }
    catch(error){
      alert(error)
    }
  }

  const onSubmit=handleSubmit((data)=>{
    handlerDataPatient(data)
  })


  const handlerDataPatient= async (data)=>{
      try{
        if(params.id){
          const response= await apiUpdatePatient(data.hc,data)
        }
        else{
          const result=await apiCreatePatient(data)
          if (result.success) {
            alert("Paciente creado exitosamente"); 
            navigate("/patient");
            // Aquí puedes realizar otras acciones, como redirigir al usuario.
          } else {
            alert(result.message);
          }
        }
      }
      catch(error){
        alert(error)
      }
  }

  return (
    <div className='patient-form '>
      {/* <div className='close' onClick={closeForm}>X</div> */}
      <form onSubmit={onSubmit} >
        <input type="text" 
        placeholder='hc'
        {...register("hc",{required:true})} 
        />
        <input type="text" 
        placeholder="name"
        {...register("nombre",{required:true})}
        />
        <input type="text"
        placeholder="cid"
        {...register("cid",{required:true})}
        />
        <input type="number" 
        placeholder="edad"
        {...register("edad",{required:true})}
        />
        <label>Es fallecido</label>
        <input type="checkbox" name="" id="" />

        <input type="Raza" 
        placeholder="raza"
        {...register("raza",{required:true})}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
