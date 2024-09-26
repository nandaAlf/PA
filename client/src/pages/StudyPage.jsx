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
      : [
          {
            label: "No diagnosticados",
            eventKey: { filterKey: "finalizado", value: false },
          },
        ];
  const dataField =
    service === "estudios" || service === "necropsias"
      ? ["code", "hc_paciente", "fecha", "finalizado"]
      : [];
  const headerTable =
    service === "estudios" || service === "necropsias"
      ? ["#", "Código", "Paciente", "Fecha", "Diagnostico", "Acciones"]
      : [];
  const optionsSearch =
    service === "estudios" || service === "necropsias"
      ? ["code", "hc_paciente"]
      : [];

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
  } = usePage(service, optionsSearch);

  const params = new URLSearchParams(location.search);
  const [route, setRoute] = useState("");
  useEffect(() => {
    handleURLParams();

    if (service === "estudios") {
      setRoute("study");
    } else if (service === "necropsias") {
      setRoute("necro");
    }
  }, [service, params]);

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

  //   studies[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const handleStudySelected = (code) => {
  //   setSelectedStudies((prevSelected) =>
  //     prevSelected.includes(code)
  //       ? prevSelected.filter((selectedCode) => selectedCode !== code)
  //       : [...prevSelected, code]
  //   );
  // };

  // const handleCreateStudy = () => {
  //   navigate(`/study/create/`);
  // };

  // const handleEditStudy = () => {
  //   if (selectedStudies.length != 1) {
  //     toastInfo("Solo es posible editar un estudio a la vez");
  //     return;
  //   }
  //   navigate(`/study/${selectedStudies[0]}`);
  // };

  // const handleDeleteClick = () => {
  //   if (selectedStudies.length <= 0) return;

  //   const confirmed = window.confirm(
  //     "¿Estás seguro de que deseas eliminar este estudio?"
  //   );
  //   if (!confirmed) return;
  //   console.log("eliminar",selectedStudies)
  //   {
  //     for (let i = 0; i < selectedStudies.length; i++) {
  //       // const result = handleDeleteStudy(selectedStudies[i]);

  //       handleDelete(selectedStudies[i]);
  //     }
  //   }
  // };

  // const handleTypeSelect = (eventKey) => {
  //   fetchStudies("-fecha", { tipo: eventKey }); // Trae los estudios filtrados por el tipo
  // };
  return (
    <div className="component study">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <InformationCard
          title="Total Pacientes"
          total={6}
          description={66}
          value={`Mujeres: `}
        />
        <InformationCard
          title="Pacientes fallecidos"
          total={8}
          description="Total Patients 10 today"
        />
        <InformationCard title="Menores de 16 años" total={0} description={9} />
      </div>

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
                url: `/${route}/view/${item.code}`,
                icon: <BsEye size={12} />,
              },
              {
                label: "Editar",
                url: `/${route}/${item.code}`,
                icon: <FaEdit size={12} />,
              },
            ]}
            handleRowSelect={handleStudySelected}
            selectedRows={selectedStudies}
          />
        </>

        {/* <div className="card-list study">
        <HeadCard titles={["Código", "Paciente", "Fecha", "Diagnosticado"]} />
        {filteredStudies.map((study, index) => (
          <StudyCard
            index={index}
            values={[
              study.code,
              study.hc_paciente,
              study.fecha,
              study.finalizado,
            ]}
            key={study.code}
            onStudySelected={handleStudySelected}
            isSelected={selectedStudies.includes(study.code)}
            type={route}
          />
        ))}
      </div> */}
      </div>
      <AccionButtons
        selectedStudies={selectedStudies}
        handleDelete={handleDeleteClick}
        handleCreate={() => {
          handleNavigate(`/${route}/create/`);
        }}
      />
    </div>
  );
}

export default StudyPage;
