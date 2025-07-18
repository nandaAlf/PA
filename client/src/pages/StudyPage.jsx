import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import AccionButtons from "../components/AccionButtons";
import InformationCard from "../components/InformationCard";
import SearchSection from "../components/SearchSection";
import Table from "../components/Table";
import "../css/page.css";
import { usePage } from "../util/usePage";
import { BsEye } from "react-icons/bs";
import Loader from "../components/Loader";
import ModalComponent from "../components/Modal";

function StudyPage({ service }) {
  const filterOptions =
    service === "estudios"
      ? [
          { label: "Biopsias", eventKey: { filterKey: "tipo", value: "B" } },
          { label: "Citologías", eventKey: { filterKey: "tipo", value: "C" } },
          {
            label: "No diagnosticados",
            eventKey: { filterKey: "finalizado", value: false },
          },
        ]
      : service === "necropsias"
      ? [
          {
            label: "No diagnosticados",
            eventKey: { filterKey: "finalizado", value: false },
          },
        ]
      : [];
  const dataField =
    service === "estudios" || service === "necropsias"
      ? ["code", "hc_paciente", "fecha", "finalizado"]
      : ["nombre", "cid", "dpto"];
  const headerTable =
    service === "estudios" || service === "necropsias"
      ? ["#", "Código", "Paciente", "Fecha", "Diagnostico", "Acciones"]
      : ["#", "Nombre", "ID", "Departamento", "Acciones"];
  const optionsSearch =
    service === "estudios" || service === "necropsias"
      ? ["code", "hc_paciente"]
      : ["nombre", "cid", "dpto"];

  const identifier=service === "estudios" || service === "necropsias" ? "code" : "id"

  const {
    items: filteredStudies,
    searchBy,
    searchTerm,
    setSearchBy,
    setSearchTerm,
    selectedItems: selectedStudies,
    handleItemSelected: handleStudySelected,
    handleNavigate,
    fetchStats,
    handleTypeSelect,
    handleDeleteClick,
    loading,
    setLoading,
    showModal,
    setShowModal,
    confirmDelete
  } = usePage(service, optionsSearch);

  const params = new URLSearchParams(location.search);
  const [route, setRoute] = useState("");
  const [stats, setStats] = useState(null);
  
  // const [loading, setLoading] = useState(true); // Estado para manejar el Loader
  // const [loading, setLoading] = useState(false);
  const statsData =
    stats && service === "estudios"
      ? [
          {
            title: "Total Estudios",
            total: stats.total_studies,
            description: `Biopsia: ${stats.total_b}`,
            value: ` Citología: ${stats.total_c}`,
          },

          {
            title: "Total año:",
            total: stats.total_year,
            description: `Mes: ${stats.total_month}`,
            value: ` Día: ${stats.total_day}`,
          },
        ]
      : stats && service === "necropsias"
      ? [
          {
            title: "Total Necropsias",
            total: stats.total_necro,
            description: `Finalizado: ${stats.finished}%`,
            value: `No finalizado: ${stats.no_finished} %`,
          },
          {
            title: "Total año:",
            total: stats.necro_year,
            description: `Mes: ${stats.necro_month}`,
            value: ` Día: ${stats.necro_day}`,
          },
        ]
      : [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await handleURLParams();
        
        if (service === "estudios") {
          setRoute("study");
          const fetchedStats = await fetchStats();
          setStats(fetchedStats);
        } else if (service === "necropsias") {
          setRoute("necro");
          const fetchedStats = await fetchStats();
          setStats(fetchedStats);
        } else {
          setRoute("doctor");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service]);

  const handleURLParams = () => {
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
  // if (
  //   !service ||
  //   !filterOptions ||
  //   !dataField ||
  //   !headerTable ||
  //   !optionsSearch ||
  //   !route
  // )

  
  //   return;
  if (loading) {
    return (
    
     <Loader/>
 
    
    );
  } 
  return (
    <div className="component study ">
     
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-8 ">
          {console.log(statsData)}
          {statsData.map((stat, index) => (
            <InformationCard
              key={index}
              title={stat.title}
              total={stat.total}
              description={stat.description}
              value={stat.value}
            />
          ))}
        </div>
      )}

      {/* <div className="search-card-container"> */}
      <div className="bg-white my-8 rounded-xl border-[1px] border-border p-4">
        <div className="section-search">
          <SearchSection
            items={filterOptions}
            onSelect={handleTypeSelect}
            options={optionsSearch}
            searchTerm={searchTerm}
            searchBy={searchBy}
            setSearchTerm={setSearchTerm}
            setSearchBy={setSearchBy}
          />
        </div>
        <>
          <Table
            data={filteredStudies}
            headerTable={headerTable}
            dataFields={dataField}
            actions={(item) => [
              {
                label: "Ver",
                url: `/${route}/view/${item.code || item.id}`,
                icon: <BsEye size={12} />,
              },
              {
                label: "Editar",
                url: `/${route}/${item.code || item.id}`,
                icon: <FaEdit size={12} />,
              },
            ]}
            id={identifier}
            handleRowSelect={handleStudySelected}
            selectedRows={selectedStudies}
          />
        </>
      </div>
      <AccionButtons
        selectedStudies={selectedStudies}
        handleDelete={handleDeleteClick}
        handleCreate={() => {
          handleNavigate(`/${route}/create/`);
        }}
      />
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={confirmDelete}
        title={`Eliminar ${service}`}
        description={`Está seguro que desea eliminar los elementos seleccionados ?`}
      />
    </div>
  );
}

export default StudyPage;
