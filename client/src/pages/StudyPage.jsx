import React, { useEffect } from "react";
import { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import StudyCard from "../components/StudyCard";
import HeadCard from "../components/HeadCard";
// import Dropdown from "../components/Dropdown.jsx";
import { useNavigate } from "react-router-dom";
// import apiService from "../services/apiService";
import ApiService from "../services/apiService";
import "../css/page.css";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../components/Button";
import { useService } from "../util/useService";
import { InfoCard } from "../components/InfoCard";
import {
  handleApiError,
  toastInfo,
  toastSuccess,
} from "../util/Notification";
import AccionButtons from "../components/AccionButtons";

function StudyPage() {
  const [studies, setStudies] = useState([]);
  const [searchBy, setSearchBy] = useState("code");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudies, setSelectedStudies] = useState([]);
  const {fetchItems,handleDelete} =useService("estudios");

  // const [type, setType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudies("-fecha");
    handleURLParams() 
    // const data=fetchItems({ordering: "-fecha"})
    // setStudies(data)
    // console.log(data)
  }, []);

  const fetchStudies = async (orderParam="", filterParm={}) => { 
    const studies = await fetchItems({ ordering: orderParam, filters:filterParm});
    setStudies(studies)
    console.log("fetch",studies);
  };
  // async function fetchStudies(date = "-fecha", type = "") {
  //   const result = await ApiService.get(
  //     `/estudios/?ordering=${date}&tipo=${type}`
  //   );
  //   if (result.success) {
  //     setStudies(result.data);
  //     handleURLParams();
  //   } else handleApiError(result);
  // }

  const handleURLParams = () => {
    const params = new URLSearchParams(location.search);

    const searchParams = [
      { key: "code", setter: setSearchBy },
      { key: "hc_paciente", setter: setSearchBy },
    ];

    for (let param of searchParams) {
      const value = params.get(param.key);
      if (value) {
        param.setter(param.key);
        setSearchTerm(value);
        break;
      }
    }
  };

  const filteredStudies = studies.filter((studies) =>
    studies[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudySelected = (code) => {
    setSelectedStudies((prevSelected) =>
      prevSelected.includes(code)
        ? prevSelected.filter((selectedCode) => selectedCode !== code)
        : [...prevSelected, code]
    );
  };

  const handleCreateStudy = () => {
    navigate(`/study/create/`);
  };

  const handleEditStudy = () => {
    if (selectedStudies.length != 1) {
      toastInfo("Solo es posible editar un estudio a la vez");
      return;
    }
    navigate(`/study/${selectedStudies[0]}`);
  };

  const handleDeleteClick = () => {
    if (selectedStudies.length <= 0) return;

    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este estudio?"
    );
    if (!confirmed) return;

    {
      for (let i = 0; i < selectedStudies.length; i++) {
        // const result = handleDeleteStudy(selectedStudies[i]);
        handleDelete(selectedStudies[i])
      }
    }
  };

  // const handleDeleteStudy = async (id) => {
  //   const result = await ApiService.delete(`/estudios/${id}`);
  //   if (result.success) {
  //     toastSuccess(`Estudio ${id} eliminado`);
  //   } else {
  //     handleApiError(result);
  //   }
  // };

  const handleTypeSelect = (eventKey) => {
    // alert(eventKey)
    // setType(eventKey); // Actualiza el estado del tipo seleccionado
    fetchStudies("-fecha", {tipo:eventKey}); // Trae los estudios filtrados por el tipo
  };
  return (
    <div className="component study">
      {/* <div className="container"> */}
      
      <div className="section-info">
        <InfoCard
          title="Total Pacientes"
          patientCount={10}
          description={`Hombres ${10} Mujeres ${29}`}
          // icon={<FaClock size={24} color="#28a745" />}
        />
        <InfoCard
          title="Pacientes fallecidos"
          patientCount={10}
          description="Total Patients 10 today"
          // icon={<FaClock size={24} color="#28a745" />}
        />
        <InfoCard
          title="Menores de 16 años"
          patientCount={10}
          description="Total Patients 10 today"
          // icon={<FaClock size={24} color="#28a745" />}
        />
      </div>

      <div className="section-search">
        {/* <div className="dropdow-menu">
          <AccionBar
            onInsert={handleCreateStudy}
            onEdit={handleEditStudy}
            onDelete={handleDeleteClick}
          />
          </div> */}

        {/* <Dropdown /> */}
        {/* Dropdown para filtrar por tipo */}
        <div className="dropdow-menu">
          <Dropdown onSelect={handleTypeSelect}>
            <Dropdown.Toggle
              style={{
                backgroundColor: "#6ab8a7ff",
                color: "white",
                border: "none",
              }}
              id="dropdown-basic"
            >
              Filter By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">Todos</Dropdown.Item>{" "}
              <Dropdown.Item eventKey="B">Biopsia</Dropdown.Item>{" "}
              <Dropdown.Item eventKey="C">Citologías</Dropdown.Item>{" "}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* <div className="search-bar-container"> */}
        <SearchFilter
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          searchBy={searchBy}
          onSearchByChange={setSearchBy}
          options={["code", "hc_paciente"]}
        />
        {/* </div> */}
      </div>

      <div className="card-list study">
        <HeadCard titles={["Código", "Paciente", "Pieza", "Fecha"]} />
        {filteredStudies.map((study, index) => (
          <StudyCard
            index={index}
            study={study}
            key={study.code}
            onStudySelected={handleStudySelected}
            isSelected={selectedStudies.includes(study.code)}
          />
        ))}
      </div>
      {/* </div> */}

      <AccionButtons selectedStudies={selectedStudies} handleEdit={handleEditStudy} handleDelete={handleDeleteClick} handleCreate={handleCreateStudy }/>
      {/* {selectedStudies.length == 0 ? (
        <Button
          iconNumber={1}
          details={"circular add"}
          action={handleCreateStudy}
        />
      ) : (
        <>
          <Button
            iconNumber={2}
            details={"circular edit"}
            action={handleEditStudy}
          />{" "}
          <Button
            iconNumber={3}
            details={"circular delete"}
            action={handleDeleteClick}
          />{" "}
        </>
      )} */}

    </div>
  );
}

export default StudyPage;
