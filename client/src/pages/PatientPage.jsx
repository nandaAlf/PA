import React, { useEffect } from "react";
import { apiGetPatients } from "../services/api";
import PatientCard from "../components/PatientCard";
import SearchFilter from "../components/SearchFilter";
import { useState } from "react";
import "../css/PatientCard2.css";
import { useNavigate } from "react-router-dom";
import { BsPersonAdd } from "react-icons/bs";
import { BsMenuButton } from "react-icons/bs";
import { BsMenuButtonFill } from "react-icons/bs";
import AccionBar from "../components/AccionBar";
import "../css/prueba.css";
import { apiDeletePatient } from "../services/api";

function PatientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [searchBy, setSearchBy] = useState("nombre");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPatientsList() {
      const response = await apiGetPatients();
      if (response.status === 200) {
        setPatients(response.data);
      } else {
        alert("Por favor, inicie sesion nuevamente ");
        navigate("/login");
      }
    }
    getPatientsList();
  }, []);


  const handleDeletePatient = async (hc) => {
    try {
      const response = await apiDeletePatient(hc);
      if (response.status === 204) {
        alert("Paciente `${hc} eliminado con éxito");
        // onPatientDeleted(patient.hc); // Actualiza la lista de pacientes en el componente padre
        setPatients(patients.filter((patient) => patient.hc !== hc));
        // removeBody();
        // handlePatientDeleted(hc)
      } else {
        alert("Error al eliminar el paciente");
      }
    } catch (error) {
      alert("Hubo un error al intentar eliminar el paciente");
      console.error(error);
    }
  };
  const handlePatientSelected = (hc) => {
    setSelectedPatients((prevSelected) =>
      prevSelected.includes(hc)
        ? prevSelected.filter((selectedHc) => selectedHc !== hc)
        : [...prevSelected, hc]
    );
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
      location.reload();
    }

    // event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta
  };
  const handleCreatePatient = () => {
    // setShowForm(!showForm);
    // document.body.classList.toggle("show-details", !showForm);
    navigate(`/patient/create/`);
  };
  const handleEditSelected = () => {
    if (selectedPatients.length != 1) return;
    navigate(`/patient/${selectedPatients[0]}`);
  };
  const filteredPatients = patients.filter((patients) =>
    patients[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const closeForm = () => {
  //   setShowForm(false);
  //   setEditingPatient(null);
  //   document.body.classList.remove("show-details");
  // };

  const removeBody = () => {
    document.body.classList.remove("show-details");
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div
            className={`menu-icon ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            {/* className={`patient-card ${showDetails ? "selected" : ""}`} */}
            {/* <BsMenuButton /> */}
            {menuOpen ? <BsMenuButtonFill />:<BsMenuButton/>}
            {menuOpen && (
              <AccionBar
                onInsert={handleCreatePatient}
                onEdit={handleEditSelected}
                onDelete={handleDeleteClick}
              />
            )}
          </div>
          <div className="search-bar">
            <SearchFilter
              searchTerm={searchTerm}
              onChange={setSearchTerm}
              searchBy={searchBy}
              onSearchByChange={setSearchBy}
            />
          </div>
        </div>
      </div>

      <div className={`patient-list`}>
        {filteredPatients.map((patients) => (
          <PatientCard
            key={patients.hc}
            patient={patients}
            onPatientDeleted={handleDeletePatient}
            removeBody={removeBody}
            onPatientSelected={handlePatientSelected}
            isSelected={selectedPatients.includes(patients.hc)}
          />
        ))}
      </div>
    </div>
  );
}

export default PatientPage;
