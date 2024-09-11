import React from "react";
import "../css/button.css";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Button({ prop, action, details,iconNumber }) {

  const icon={
    1:<FaPlus/>,
    2:<FaEdit/>,
    3:<FaRegTrashAlt/>,
  }

  return (
    <>
      <button className={`basic-button ${details}`} onClick={action}>
        {icon[iconNumber]} {prop}{" "}
        {/* Renderiza el icono y el texto (si es necesario) */}
      </button>{" "}
    </>
  );
}
