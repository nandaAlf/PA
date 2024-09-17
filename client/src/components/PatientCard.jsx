import React, { useEffect } from "react";
import { useState } from "react";
import { apiGetDefunct, apiGetPatientStudy } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs"; // Importa el ícono de tres puntos

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

  // useEffect(() => {
  //   //Modificar llamar solo si es necesariop
  // }, []);

  // const handleDoubleClick = () => {
  //   setShowDetails(!showDetails);
  //   document.body.classList.toggle("show-details", !showDetails);
  // };
  // const handleDeleteClick = async (event) => {
  //   event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta

  //   const confirmed = window.confirm(
  //     "¿Estás seguro de que deseas eliminar este paciente?"
  //   );
  //   if (!confirmed) return;
  //   onPatientDeleted(patient.hc);
  //   removeBody();
  // };
  // const handleEditClick = (event) => {
  //   event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta
  //   removeBody();
  //   navigate(`/patient/${patient.hc}/`);
  // };
  const handleClick = () => {
    onPatientSelected(patient.hc);
  };

  return (
    <div
      className={`container-card ${showDetails ? "selected" : "noSelected"} ${
        isSelected ? "isSelected" : ""
      } `}
      // onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
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

        <Dropdown className="dropdow">
          <Dropdown.Toggle
            style={{
              backgroundColor: "#f7f9faff",
              border: "1px solid #e4e6ebff",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "none",
              color: "transparent",
              width: "40px",
              height: "40px",
            }}
            className="custom-dropdown-toggle"
            id="dropdown-basic"
          >
            <BsThreeDots size={20} color="#79889cff" />{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item href={`patient/${patient.hc}`}>Editar</Dropdown.Item>
            <Dropdown.Item href={`patient/view/${patient.hc}`}>
              Ver
            </Dropdown.Item>
            {patient.es_fallecido ? (
              <Dropdown.Item href={`/`}>Necropsia</Dropdown.Item>
            ) : (
              <Dropdown.Item href={`study/create/${patient.hc}`}>
                Nuevo estudio
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default PatientCard;
