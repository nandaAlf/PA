import React from 'react';
import '../css/PatientCard.css'// Para estilos personalizados

const PatientDetails = ({ patient, onClose }) => {
  return (
    <div className="patient-details-overlay" onClick={onClose}>
      <div className="patient-details">
        <h2>{patient.nombre}</h2>
        <p>HC: {patient.hc}</p>
        <p>CID: {patient.cid}</p>
        <p>Edad: {patient.edad || 'N/A'}</p>
        <p>Sexo: {patient.sexo || 'N/A'}</p>
        <p>Raza: {patient.raza || 'N/A'}</p>
        <p>Fallecido: {patient.es_fallecido ? 'Sí' : 'No'}</p>
        <div className="studies">
          <h4>Estudios</h4>
          {patient.studies.length > 0 ? (
            patient.studies.map((study, index) => (
              <a key={index} href={study} target="_blank" rel="noopener noreferrer">
                Estudio {index + 1}
              </a>
            ))
          ) : (
            <p>No hay estudios disponibles.</p>
          )}
        </div>
        <button onClick={() => alert('Editar paciente')}>Editar</button>
        <button onClick={() => alert('Eliminar paciente')}>Eliminar</button>
      </div>
    </div>
  );
};

export default PatientDetails;
