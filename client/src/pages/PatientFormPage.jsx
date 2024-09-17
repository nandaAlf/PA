import PatientForm from "../components/PatientForm";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ApiService from "../services/apiService";
import { handleApiError, toastSuccess } from "../util/Notification";
import React from "react";
import Button from "../components/Button";
import "../css/form.css";
import { useService } from "../util/useService";
import StudyForm from "../components/StudyForm";
import StudyCard from "../components/StudyCard";
import { useNavigate } from "react-router-dom";
export default function PatientFormPage() {
  const [patient, setPatient] = useState({});
  const [isEditing, setIsEditing] = useState(false); //create or edit
  const [isViewing, setIsViewing] = useState(false);
  const {
    fetchItem: fetchPatient,
    handleCreate: handleCreatePatient,
    handleUpdate: handleUpdatePatient,
  } = useService("pacientes");
  const params = useParams();
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  // const [process, setProcess] = useState({});

  useEffect(() => {
    const id = params.id;
    if (id) {
      const isViewRoute = window.location.pathname.includes("view");
      fetchPatient(id, setPatient);
      if (isViewRoute) {
        // setIsEditing(false);
        setIsViewing(true);
      } else setIsEditing(true);
    }
  }, [params]);

  // const handleCreatePatient = async (data) => {
  //   const result = await ApiService.post("/pacientes/", data);
  //   if (result.success) {
  //     toastSuccess("Paciente creado con exito");
  //   } else handleApiError(result);

  //   return result.success;
  // };
  // const handleUpdatePatient = async (id, data) => {
  //   const result = await ApiService.put(`/pacientes/${id}/`, data);
  //   if (result.success) {
  //     toastSuccess("Paciente actualizado con éxito.");
  //   } else handleApiError(result);
  //   return result.success;
  // };

  const onSubmit = async (patientData) => {
    let result;
    if (isEditing) {
      result = await handleUpdatePatient(patientData.hc, patientData);
      if (result) {
        toastSuccess(`Se ha editado la informacion del paciente ${patient.hc}`);
        navigate("/patients");
      }
    } else {
      result = await handleCreatePatient(patientData);
      if (result) {
        toastSuccess("Se ha insertado un nuevo paciente");
        navigate("/patients");
      }
    }
  };

  return (
    <div className="patient form-container component">
      {/* <PatientForm/> */}
      <form onSubmit={handleSubmit(onSubmit)} className="patient form ">
        <PatientForm
          patientData={patient}
          register={register}
          setValue={setValue}
          isEditing={isViewing}
        />
        {!isViewing ? (
          <Button prop={"Enviar"} details={"formButton"} />
        ) : (
          <>
            <hr />
            <a
              href={`/studies?hc_paciente=${patient.hc}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Todos los estudios
            </a>
            <ul>
              {patient.studies?.map((study, index) => (
                <li key={index}>
                  <a
                    href={`/studies?code=C-24-01`}
                    target="_blank" //abre el enlace en una nueva pestana
                    rel="noopener noreferrer"
                  >
                    {`Estudio ${index + 1}(Poner el codigo)`}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </form>
    </div>
  );
}
