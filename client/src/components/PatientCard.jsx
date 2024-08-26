import React, { useEffect } from "react";
import { useState } from "react";
import  {apiGetDefunct } from "../services/api";
import { useNavigate } from "react-router-dom";

const PatientCard = ({
  patient,
  onPatientDeleted,
  removeBody,
  onPatientSelected,
  isSelected,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [defunctData, setDefunctData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDefunctPatient() {
      if (patient.es_fallecido) {
        const response = await getDefunctData(patient.hc);
        console.log(response);
        setDefunctData(response);
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
    try {
      const response = await apiGetDefunct(id);
      return response;
      alert("ok");
    } catch (error) {
      alert(error);
      return error;
    }
  };

  return (
    <div
      className={`patient-card ${showDetails ? "selected" : ""} ${
        isSelected ? "isSelected" : ""
      } `}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      <div className="buttons">
        <button className="edit-button" onClick={handleEditClick}>
          ✏️
        </button>
        <button onClick={handleDeleteClick}>🗑️</button>
      </div>

      <div className={`patient-details ${showDetails ? "selected" : ""}`}>
        <div className="patient-info">
          
        </div>
        <h3 className="patient-name">{patient.hc}</h3>
        <p>
          <strong>Name:</strong> {patient.nombre}
        </p>
        <p>
          <strong>Cid:</strong> {patient.cid}
        </p>
        <p>
          <strong>Es fallecido:</strong> {patient.es_fallecido ? "Si" : "No"}
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
            <p>
              <strong>Estudios:</strong> {patient.studies}
            </p>

            <ul>
              {patient.studies.map((study, index) => (
                <li key={index}>
                  <a
                    href={study}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{`Estudio ${index + 1}`}</a>
                </li>
              ))}
            </ul>

            <div>
              {patient.es_fallecido && (
                <div>
                  <p>
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
                  </p>

                  <a href={defunctData.data.necropsia}>Necropsia</a>
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
