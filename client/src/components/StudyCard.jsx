import React, { useEffect } from "react";
import { useState } from "react";
import "../css/card.css";
import { toastInfo } from "../util/Notification";
import DropdownToggle from "./DropdownToggle";
import { FaEdit } from "react-icons/fa";

import { BsEye } from "react-icons/bs";

import { BsThreeDots } from "react-icons/bs";
const StudyCard = ({ study,values=[], onStudySelected, index ,isSelected,type}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [process, setProcess] = useState({});
  const [diagnosis, setDiagnosis] = useState({});

  useEffect(() => {
    console.log(values);
  }, []);

  const handleClick = () => {
    onStudySelected(values[0]);
  };
  const handleCheckboxChange = () => {
    toastInfo("Vaya a la opcion editar estudio para cambiar este valor");
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
        {index}
        <p className="">{values[0]}</p>
        <p>
          <a href={`/patients?hc=${values[1]}`}>{values[1]}</a>
        </p>
        <p>{values[2]}</p>

        <p>
          <input
            className="checkbox"
            type="checkbox"
            checked={values[3]}
            onChange={handleCheckboxChange}
            name=""
            id=""
          />
        </p>

        <DropdownToggle
          className="dropdow"
          icon={<BsThreeDots size={20} color="#79889c" />}
          items={[
            { label: " Ver", url:`/${type}/view/${values[0]}`,icon: <BsEye size={12} /> },
            {
              label: ` Editar`,
              url: `/${type}/${values[0]}`,
              icon: <FaEdit size={12} />,
            },
          ]}
          styles={{
            backgroundColor: "#f7f9faff",
            border: "1px solid #e4e6ebff",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "none",
            color: "black",
            width: "40px",
            height: "40px",
          }}
        />
      </div>
    </div>
  );
};

export default StudyCard;
