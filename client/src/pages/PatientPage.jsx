import React, { useEffect } from "react";
import PatientCard from "../components/PatientCard";
import { useState } from "react";
import "../css/PatientCard2.css";
import { useNavigate } from "react-router-dom";
// import "../css/prueba.css";
import "../css/page.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ApiService from "../services/apiService";
import { handleApiError } from "../util/Notification";
import HeadCard from "../components/HeadCard";
import Button from "../components/Button";
import { Dropdown } from "react-bootstrap";
import SearchFilter from "../components/SearchFilter";

function PatientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [searchBy, setSearchBy] = useState("nombre");
  const [selectedPatients, setSelectedPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients(es_fallecido = "") {
    const result = await ApiService.get(
      `/pacientes/?es_fallecido=${es_fallecido}`
    );
    if (result.success) {
      setPatients(result.data);
      handleURLParams();
    } else {
      alert("ver")
      handleApiError(result);
    }
  }

  const handleURLParams = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("hc");
    if (id) {
      setSearchBy("hc");
      setSearchTerm(id);
    }
  };

  const filteredPatients = patients.filter((patients) =>
    patients[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePatient = () => {
    navigate(`/patient/create/`);
  };

  const handlePatientSelected = (hc) => {
    setSelectedPatients((prevSelected) =>
      prevSelected.includes(hc)
        ? prevSelected.filter((selectedHc) => selectedHc !== hc)
        : [...prevSelected, hc]
    );
  };

  const handleEditPatinet = () => {
    if (selectedPatients.length != 1) {
      toastInfo("Solo es posible editar un estudio a la vez");
      return;
    }
    navigate(`/patient/${selectedPatients[0]}`);
  };
  const handleDeletePatient = async (id) => {
    // const response = await apiDeletePatient(id);
    const result = await ApiService.delete(`/pacientes/${id}`);
    if (result.success) {
      toastSuccess(`Paciente${id} eliminado`);
    } else {
      handleApiError(result);
    }
  };

  const handleDeleteClick = async (event) => {
    if (selectedPatients.length <= 0) return;

    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este paciente?"
    );
    if (!confirmed) return;

    {
      for (let i = 0; i < selectedPatients.length; i++) {
        handleDeletePatient(selectedPatients[i]);
      }
      // location.reload();
    }

    // event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta
  };

  const removeBody = () => {
    document.body.classList.remove("show-details");
  };

  const handleTypeSelect = (eventKey) => {
    // alert(eventKey)
    // setType(eventKey); // Actualiza el estado del tipo seleccionado
    fetchPatients(eventKey); // Trae los estudios filtrados por el tipo
  };

  return (
    <div className="component patient">
      {/* <div className="container"> */}
      {/* <div className="header"> */}
      <div className="section-search">
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
              <Dropdown.Item eventKey={true}>Fallecidos</Dropdown.Item>{" "}
              <Dropdown.Item eventKey={false}>No fallecidos</Dropdown.Item>{" "}
              <Dropdown.Item eventKey="F">Hombres</Dropdown.Item>{" "}
              <Dropdown.Item eventKey="M">Mujeres</Dropdown.Item>{" "}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          searchBy={searchBy}
          onSearchByChange={setSearchBy}
          options={["hc", "cid", "nombre"]}
        />
        {/* <AccionBar
            onInsert={handleCreatePatient}
            onEdit={handleEditPatinet}
            onDelete={handleDeleteClick}
          /> */}
        {/* <div className="search-bar">
            <SearchBar
              searchTerm={searchTerm}
              onChange={setSearchTerm}
              searchBy={searchBy}
              onSearchByChange={setSearchBy}
              options={["cid", "hc", "nombre"]}
            />
          </div> */}
      </div>
      {/* </div> */}

      <div className={`card-list patient`}>
        <HeadCard titles={["HC", "Nombre", "Id", "Fallecido"]} />
        {filteredPatients.map((patients, index) => (
          <PatientCard
            key={patients.hc}
            patient={patients}
            onPatientDeleted={handleDeletePatient}
            removeBody={removeBody}
            onPatientSelected={handlePatientSelected}
            isSelected={selectedPatients.includes(patients.hc)}
            index={index}
          />
        ))}
      </div>

      {selectedPatients.length == 0 ? (
        <Button
          iconNumber={1}
          details={"circular add"}
          action={handleCreatePatient}
        />
      ) : (
        <>
          <Button
            iconNumber={2}
            details={"circular edit"}
            action={handleEditPatinet}
          />{" "}
          <Button
            iconNumber={3}
            details={"circular delete"}
            action={handleDeleteClick}
          />{" "}
        </>
      )}
    </div>
  );
}

export default PatientPage;
