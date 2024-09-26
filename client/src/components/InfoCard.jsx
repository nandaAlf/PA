import React from "react";
import { FaClock } from "react-icons/fa"; // Usa react-icons para los íconos
import "../css/InfoCard.css";
export const InfoCard = ({ title, patientCount, description, icon }) => {
  return (
    <div className="info-card-container">
      <div className="content">
        <div className="textContent">
          <h6>{title}</h6>
          <h3>{patientCount}</h3>
          <p>{description}</p>
        </div>
        <div className="icon-container">{icon}</div>
      </div>
    </div>
  );
};
