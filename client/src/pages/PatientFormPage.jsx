import PatientForm from "../components/PatientForm";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import { handleApiError, toastSuccess } from "../util/Notification";
import React from "react";

export default function PatientFormPage() {
  const [patient, setPatient] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const { handleSubmit, register, setValue } = useForm();
  // const [process, setProcess] = useState({});

  useEffect(() => {
    const id = params.id;
    if (id) {
      setIsEditing(true);
      fetchPatient(id);
    }
  }, [params]);

  const fetchPatient = async (id) => {
    const result = await ApiService.get(`/pacientes/${id}`);
    console.log(result.data);
    if (result.success) {
      setPatient(result.data);
      // fetchProcess(code);
    } else handleApiError(error);
  };

  const handleCreatePatient = async (data) => {
    const result = await ApiService.post("/pacientes/", data);
    if (result.success) {
      toastSuccess("Paciente creado con exito");
    } else handleApiError(result);

    return result.success;
  };
  const handleUpdatePatient = async (id, data) => {
    const result = await ApiService.put(`/pacientes/${id}/`, data);
    if (result.success) {
      toastSuccess("Paciente actualizado con éxito.");
    } else handleApiError(result);
    return result.success;
  };

  const onSubmit = async (patientData) => {
    
    let result;
    if (isEditing) {
      result = await handleUpdatePatient(patientData.hc, patientData);
    } else {
      result = await handleCreatePatient(patientData);
    }
    if (result.success) {
      toastSuccess("ok")
      // handleDiagnosisProcess(studyData.code, diagnosisData, processData);
      // navigate("/studies/");
    }
  };

  return (
    <div>
      Patient Info
      {/* <PatientForm/> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <PatientForm
          patientData={patient}
          register={register}
          setValue={setValue}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
