import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "./useService";

export const usePage = (serviceName,searchFields = []) => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchBy, setSearchBy] = useState(searchFields[0] || ""); // El primer campo por defecto
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const { fetchItems, handleDelete, fetchStats } = useService(serviceName);
  
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    fetchListItems("-fecha");
    console.log("a",filteredItems)
  }, [serviceName]);

  useEffect(() => {
    handleURLParams();
  }, [params]);

  const handleURLParams = () => {
    // const params = new URLSearchParams(location.search);
    // alert("ss")
    const searchParams = [
      { key: "code", setter: setSearchBy },
      { key: "hc_paciente", setter: setSearchBy },
    ];

    for (let param of searchParams) {
      const value = params.get(param.key);
      if (value) {
        console.log("Parametro encontrado:", param.key, value); // Verifica qué valor recibe
        param.setter(param.key);
        setSearchTerm(value);
        break;
      }
    }
  };

  const fetchListItems = async (orderParam = "", filterParam = {}) => {
    const items = await fetchItems({
      ordering: orderParam,
      filters: filterParam,
    });
    setItems(items);
  };
  const handleItemSelected = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };
  const filteredItems = items?.filter((item) =>
    item[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
    // item
  );
  const handleNavigate = (url) => {
    navigate(url);
  };
  const handleTypeSelect = (eventKey) => {
    const { filterKey, value } = eventKey[0];
    // console.log("filtro",eventKey)
    fetchListItems("-fecha", { [filterKey]: value }); // Trae los estudios filtrados por el tipo
  };
  const handleDeleteClick = () => {
    if (selectedItems.length <= 0) return;

    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar?"
    );
    if (!confirmed) return;
    {
      for (let i = 0; i < selectedItems.length; i++) {
        // const result = handleDeleteStudy(selectedStudies[i]);
      
        handleDelete(selectedItems[i]);
      }
    }
  };
  return {
    items: filteredItems,
    searchBy,
    searchTerm,
    setSearchBy,
    setSearchTerm,
    selectedItems,
    handleItemSelected,
    handleNavigate,
    fetchStats,
    handleTypeSelect,
    handleDeleteClick
  };
};
