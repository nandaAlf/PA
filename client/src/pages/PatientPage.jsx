import React, { useEffect } from "react";
import PatientCard from "../components/PatientCard";
import { useState } from "react";
import "../css/PatientCard2.css";
import { useNavigate } from "react-router-dom";
// import "../css/prueba.css";
import "../css/page.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaClock } from "react-icons/fa"; // Usa react-icons para los íconos
import ApiService from "../services/apiService";
import { handleApiError, toastSuccess } from "../util/Notification";
import HeadCard from "../components/HeadCard";
import Button from "../components/Button";
import { Dropdown } from "react-bootstrap";
import SearchFilter from "../components/SearchFilter";
import { InfoCard } from "../components/InfoCard";
import { useService } from "../util/useService";
import AccionButtons from "../components/AccionButtons";
import { toast } from "react-toastify";

function PatientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [searchBy, setSearchBy] = useState("nombre");
  const [selectedPatients, setSelectedPatients] = useState([]);
  const navigate = useNavigate();
  
  const {fetchItems,handleDelete} =useService("pacientes");

  useEffect(() => {
    fetchPatients("nombre");
  }, []);

  async function fetchPatients(orderParam="",filterParm={}) {
    const patients = await fetchItems({ ordering: orderParam, filters:filterParm});
    setPatients(patients)
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

  const handleDeletePatient = async (id) => {
    if(await handleDelete(id)){
      toastSuccess(`Se ha eliminado el paciente ${id} `)
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
      navigate("/patients")
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
      <div className="section-info">
        <InfoCard
          title="Total Pacientes"
          patientCount={10}
          description={`Hombres ${10} Mujeres ${29}`}
          icon={<FaClock size={24} color="#28a745" />}
        />
        <InfoCard
          title="Pacientes fallecidos"
          patientCount={10}
          description="Total Patients 10 today"
          icon={<FaClock size={24} color="#28a745" />}
        />
        <InfoCard
          title="Menores de 16 años"
          patientCount={10}
          description="Total Patients 10 today"
          icon={<FaClock size={24} color="#28a745" />}
        />
      </div>

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
       
      </div>
      {/* </div> */}

      <div className={`card-list patient`}>
        <HeadCard titles={["HC", "Nombre", "Id", "Fallecido",]} />
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

     <AccionButtons selectedStudies={selectedPatients} handleDelete={handleDeleteClick} handleCreate={handleCreatePatient}/>
      
    </div>
  );
}

export default PatientPage;
