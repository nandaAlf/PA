import React, { useEffect } from "react";
import { useState } from "react";
import { apiGetDefunct, apiGetPatientStudy } from "../services/api";
import { useNavigate } from "react-router-dom";

const PatientCard = ({
  patient,
  onPatientDeleted,
  removeBody,
  onPatientSelected,
  isSelected,
  index,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [defunctData, setDefunctData] = useState(null);
  const navigate = useNavigate();

  // const handleViewStudiesClick = (study) => {
  //   const studyData = prueba(study);
  //   console.log(studyData);
  //   const patientId = patient.hc; // Suponiendo que hc es el ID del paciente
  //   // navigate(`/studies?patientId=${patientId}`);
  //   navigate(`/studies?code=C-24-01`);
  // };

  useEffect(() => {
    //Modificar llamar solo si es necesariop
    async function getDefunctPatient() {
      if (patient.es_fallecido ) {
        // const response = await getDefunctData(patient.hc);
        // console.log(response);
        // setDefunctData(response);
        // Agrega más campos si es necesario
      }
    }
    getDefunctPatient();
  }, []);

  const handleDoubleClick = () => {
    setShowDetails(!showDetails);
    document.body.classList.toggle("show-details", !showDetails);
  };
  const handleDeleteClick = async (event) => {
    event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta

    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este paciente?"
    );
    if (!confirmed) return;
    onPatientDeleted(patient.hc);
    removeBody();
  };
  const handleEditClick = (event) => {
    event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta
    removeBody();
    navigate(`/patient/${patient.hc}/`);
  };
  const handleClick = () => {
    onPatientSelected(patient.hc);
  };
  const getDefunctData = async (id) => {
    // try {
    //   const response = await apiGetDefunct(id);
    //   return response;
    //   alert("ok");
    // } catch (error) {
    //   alert(error);
    //   return error;
    // }
  };
  const prueba = async (url) => {
    console.log("url", url);
    await apiGetPatientStudy(url);
  };

  return (
    <div
      className={`container-card ${showDetails ? "selected" : "noSelected"} ${
        isSelected ? "isSelected" : ""
      } `}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {/* <div className="buttons">
        <button className="edit-button" onClick={handleEditClick}>
          ✏️
        </button>
        <button onClick={handleDeleteClick}>🗑️</button>
        <div><a href={(`/study/create/${patient.hc}`)}>Add study</a></div>
      </div> */}

      <div className={`card-details ${showDetails ? "selected" : ""}`}>
        {/* <div className="patient-info">
          
        </div> */}
        {index}
        <p className="patient-name">{patient.hc}</p>
        <p>
          <strong>{patient.nombre}</strong>
        </p>
        <p>
          <strong></strong> {patient.cid}
        </p>
        <p>
          <strong></strong> {patient.es_fallecido ? "Si" : "No"}
        </p>

        {showDetails && (
          <div className="extra-details">
            <p>
              <strong>Age:</strong> {patient.edad}
            </p>
            <p>
              <strong>Sexo:</strong> {patient.sexo}
            </p>
            <p>
              <strong>Raza:</strong> {patient.raza}
            </p>
            {/* <p>
              <strong>Estudios:</strong>
            </p> */}

            <a
              href={`/studies?hc_paciente=${patient.hc}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Todos los estudios
            </a>

            {/* <ul>
              {patient.studies.map((study, index) => (
                <li key={index}>
                 
                  <button onClick={() => handleViewStudiesClick(study)}>Ver Estudios</button>
                  <a
                    // href={handleViewStudiesClick(study)}
                    // href={navigate(`/studies?code=C-24-01`)}
                     href={`/studies?code=C-24-01`}
                    target="_blank" //abre el enlace en una nueva pestana
                    rel="noopener noreferrer"
                  >
                    {`Estudio ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul> */}

            <div>
              {patient.es_fallecido && (
                <div>
                  {/* <p>
                    <strong>App:</strong> {defunctData.data.app}
                  </p>
                  <p>
                    <strong>Apf:</strong> {defunctData.data.apf}
                  </p>
                  <p>
                    <strong>Apgar:</strong> {defunctData.data.apgar}
                  </p>
                  <p>
                    <strong>hea:</strong> {defunctData.data.hea}
                  </p>
                  <p>
                    <strong>Direccion:</strong> {defunctData.data.direccion}
                  </p>
                  <p>
                    <strong>muerte:</strong> {defunctData.data.fecha_muerte}
                  </p> */}

                  {/* <a href={defunctData.data.necropsia}>Necropsia</a> */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
