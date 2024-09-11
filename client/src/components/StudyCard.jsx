import React, { useEffect } from "react";
import { useState } from "react";
import ApiService from "../services/apiService";
import "../css/card.css";

const StudyCard = ({ study, isSelected, onStudySelected, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [process, setProcess] = useState({});
  const [diagnosis, setDiagnosis] = useState({});

  useEffect(() => {
    const fetchProcessAndDiagnosis = async () => {
      try {
        console.log("Fetching process for study code:", study.code);
        const processResponse = await ApiService.get(
          `/procesos/${study.code}/`
        );
        console.log("Process data:", processResponse.data);
        setProcess(processResponse.data);

        if (processResponse.data.id) {
          console.log(
            "Fetching diagnosis for process ID:",
            processResponse.data.id
          );
          const diagnosisResponse = await ApiService.get(
            `/diagnosticos/${processResponse.data.id}/`
          );
          console.log("Diagnosis data:", diagnosisResponse.data);
          setDiagnosis(diagnosisResponse.data);
        }
      } catch (error) {
        console.error("Error fetching process or diagnosis:", error);
      }
    };

    if (showDetails) {
      fetchProcessAndDiagnosis();
    }
  }, [showDetails, study.code]);

  const handleDoubleClick = () => {
    setShowDetails(!showDetails);
    document.body.classList.toggle("show-details", !showDetails);
  };

  const handleClick = () => {
    onStudySelected(study.code);
  };

  return (
    <div
      className={`container-card ${showDetails ? "selected" : "noSelected"} ${
        isSelected ? "isSelected" : ""
      } `}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
  

      <div className={`card-details ${showDetails ? "selected" : ""}`}>
        {index}
        <p className="">{study.code}</p>

        <p>
          <a href={`/patients?hc=${study.hc_paciente}`}>{study.hc_paciente}</a>
        </p>

        <p>
          <strong>Pieza:</strong> {study.pieza}
        </p>

        <p>
          <strong>Date:</strong> {study.fecha}
        </p>
        {/* </div> */}

        {/* {showDetails && (
          <div className="card-extra-details">
            <p>
              <strong>Impresion:</strong> {study.imp_diag}
            </p>
            <p>
              <strong>Especialista:</strong> {study.especialista}
            </p>
            <p>
              <strong>Medico:</strong> {study.especialista}
            </p>
            {console.log("d", diagnosis, process)}
            <p>
              <strong>Observaciones</strong> {diagnosis.observaciones}
            </p>
            <p>
              <strong>Diagnostico</strong> {diagnosis.diagnostico}
            </p>
          </div>
        )}  */}
      </div>
    </div>
  );
};

export default StudyCard;
