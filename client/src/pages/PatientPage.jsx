import React, { useEffect } from "react";
import PatientCard from "../components/PatientCard";
import { useState } from "react";
import "../css/PatientCard2.css";
import { useNavigate } from "react-router-dom";
// import "../css/prueba.css";
import "../css/page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";

import { BsEye } from "react-icons/bs";
import { FaFileMedical } from "react-icons/fa"; // Usa react-icons para los íconos
import { toastSuccess } from "../util/Notification";
import HeadCard from "../components/HeadCard";
import { InfoCard } from "../components/InfoCard";
import { useService } from "../util/useService";
import AccionButtons from "../components/AccionButtons";
import SearchSection from "../components/SearchSection";
import InformationCard from "../components/InformationCard";
import Table from "../components/Table";
function PatientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState([]);
  const [searchBy, setSearchBy] = useState("nombre");
  const [selectedPatients, setSelectedPatients] = useState([]);
  const navigate = useNavigate();

  const { fetchItems, handleDelete, fetchStats } = useService("pacientes");

  useEffect(() => {
    fetchPatients("nombre");
    fetchPatientStats();
    handleURLParams();
  }, []);

  async function fetchPatients(orderParam = "", filterParm = {}) {
    const patients = await fetchItems({
      ordering: orderParam,
      filters: filterParm,
    });
    setPatients(patients);
  }
  async function fetchPatientStats() {
    const stats = await fetchStats();
    setStats(stats);
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
    if (await handleDelete(id)) {
      toastSuccess(`Se ha eliminado el paciente ${id} `);
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
      navigate("/patients");
    }

    // event.stopPropagation(); // Evita que el clic cierre o abra la tarjeta
  };

  const removeBody = () => {
    document.body.classList.remove("show-details");
  };

  const handleTypeSelect = (eventKey) => {
    console.log(eventKey);
    // setType(eventKey); // Actualiza el estado del tipo seleccionado
    fetchPatients("nombre", { es_fallecido: eventKey }); // Trae los estudios filtrados por el tipo
  };

  return (
    <div className="component patient">
      {/* <div className="container"> */}
      {/* <div className="header"> */}
      {/* <div className="section-info"> */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <InformationCard
          title="Total Pacientes"
          total={stats.total_patients}
          description={`Hombres: ${stats.total_men}`}
          value={`Mujeres: ${stats.total_women}`}
        />
        <InformationCard
          title="Pacientes fallecidos"
          total={stats.total_deceased}
          description="Total Patients 10 today"
        />
        <InformationCard
          title="Menores de 16 años"
          total={stats.total_under_16}
          description={`Menores de 1 año: ${stats.total_under_1}`}
        />
        {/* <InfoCard
          title="Total Pacientes"
          patientCount={stats.total_patients}
          description={`Hombres: ${stats.total_men} Mujeres: ${stats.total_women}`}
          icon={<FaClock size={24} color="#28a745" />}
        />
        <InfoCard
          title="Pacientes fallecidos"
          patientCount={stats.total_deceased}
          description="Total Patients 10 today"
          icon={<FaClock size={24} color="#28a745" />}
        />
        <InfoCard
          title="Menores de 16 años"
          patientCount={stats.total_under_16}
          description={`Menores de 1 año: ${stats.total_under_1}`}
          icon={<FaClock size={24} color="#28a745" />}
        /> */}
      </div>

      <div className="bg-white my-8 rounded-xl border-[1px] border-border p-4">
        <div className="section-search">
          <SearchSection
            items={[
              { label: "Fallecido", eventKey: true },
              {
                label: "No Feallecido",
                eventKey: false,
              },
            ]}
            onSelect={handleTypeSelect}
            options={["hc", "cid", "nombre"]}
            searchTerm={searchTerm}
            searchBy={searchBy}
            setSearchTerm={setSearchTerm}
            setSearchBy={setSearchBy}
          />
        </div>
        <>
          <Table
            data={filteredPatients}
            headerTable={["#", "HC", "Nombre", "Id", "Fallecido", "Acciones"]}
            dataFields={["hc", "nombre", "cid", "es_fallecido"]}
            // actions={[
            //   {
            //     label: "Ver",
            //     url: (item) => `/patient/view/${item.hc}`,
            //     icon: <BsEye size={12} />,
            //   },
            //   {
            //     label: "Editar",
            //     url: (item) => `/patient/${item.hc}`,
            //     icon: <FaEdit size={12} />,
            //   },
            //   {
            //     label: "Ver",
            //     url: (item) => `/patient/view/${item.hc}`,
            //     icon: <BsEye size={12} />,
            //   },
            //   {
            //     label: "Editar",
            //     url: (item) => `/patient/${item.hc}`,
            //     icon: <FaEdit size={12} />,
            //   },
            //   // Acción condicional para añadir estudio o necropsia
            //   (item) => {
            //     if (item.es_fallecido) {
            //       return {
            //         label: "Añadir Necropsia",
            //         url: (item) => `/necropsy/add/${item.hc}`,
            //         icon: <FaFileMedical size={12} />,
            //       };
            //     } else {
            //       return {
            //         label: "Añadir Estudio",
            //         url: (item) => `/study/add/${item.hc}`,
            //         icon: <FaFileMedical size={12} />,
            //       };
            //     }
            //   },
            // ].flat()}

            actions={(item) => [
              {
                label: "Ver",
                url: `/patient/view/${item.hc}`,
                icon: <BsEye size={12} />,
              },
              {
                label: "Editar",
                url: `/patient/${item.hc}`,
                icon: <FaEdit size={12} />,
              },
              // Acción condicional para añadir estudio o necropsia
              item.es_fallecido
                ? {
                    label: "Necropsia",
                    url: `/necro/create/${item.hc}`,
                    icon: <FaFileMedical size={12} />,
                  }
                : {
                    label: "Estudio",
                    url: `/study/create/${item.hc}`,
                    icon: <FaFileMedical size={12} />,
                  },
            ]}
            handleRowSelect={handlePatientSelected}
            selectedRows={selectedPatients}
          />
        </>
      </div>
      {/* <div className="search-card-container">
        <div className="section-search">
          <SearchSection
            items={[
              { label: "Fallecido", eventKey: true },
              {
                label: "No Feallecido",
                eventKey: false,
              },
            ]}
            onSelect={handleTypeSelect}
            options={["hc", "cid", "nombre"]}
            searchTerm={searchTerm}
            searchBy={searchBy}
            setSearchTerm={setSearchTerm}
            setSearchBy={setSearchBy}
          />
        </div>

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
      </div> */}

      <AccionButtons
        selectedStudies={selectedPatients}
        handleDelete={handleDeleteClick}
        handleCreate={handleCreatePatient}
      />
    </div>
  );
}

export default PatientPage;
