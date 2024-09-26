import React from "react";
import "../css/pageSection.css";
import { useNavigate } from "react-router-dom";

export default function PageSection({ name, description, icon, link }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  return (
    <div className="page-section-container" onClick={handleClick}>
      <div className="icon">{icon}</div>
      <div className="text-container">
        <p className="title">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
