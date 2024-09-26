import PatientForm from "../components/PatientForm";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toastSuccess } from "../util/Notification";
import React from "react";
import Button from "../components/Button";
import "../css/form.css";
import { useService } from "../util/useService";
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
  const { handleSubmit, register, setValue, unregister ,errors} = useForm();
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

  const onSubmit = async (patientData) => {
    console.log("data", patientData);
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
          unregister={unregister}
          errors={errors}
        />
        {!isViewing ? (
          <Button prop={"Enviar"} details={"formButton"} />
        ) : (
          <>
            <hr />
            {patient.studies?.length > 0 ? (
              <>
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
                        href={`/studies?code=${study}`}
                        target="_blank" //abre el enlace en una nueva pestana
                        rel="noopener noreferrer"
                      >
                        {`${index + 1} - ${study}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
            {patient.es_fallecido ? (
              patient.fallecido.necropsy ? (
                <a
                  href={`/studies?code=${patient.fallecido.necropsy[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 Necropsia: {patient.fallecido.necropsy[0]}
                </a>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        )}
      </form>
    </div>
  );
}
