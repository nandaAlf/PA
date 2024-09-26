import {apiService} from "../services/apiService.js";
import { useState, useEffect } from "react";
import { handleApiError } from "./Notification.js";

export const useService = (baseUrls) => {
  const fetchItem = async (id, setItem) => {
    const result = await apiService.get(`/${baseUrls}/${id}`);
    if (result.success) {
      // console.log(result.data)
      setItem(result.data);
      return result;
      // setItem(result.data);
      // setStudy(result.data);
      // fetchProcess(code);
    } else handleApiError(result);
  };

  const fetchItems = async ({ ordering = "", filters = {} } = {}) => {
    // Filtrar solo los parámetros válidos
    const validFilters = {};
    // Recorrer los filtros pasados y agregar solo los que son válidos para este recurso
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== "") {
        validFilters[key] = filters[key];
      }
    }
    const filterParams = new URLSearchParams({
      ordering, // Ordenamiento
      ...validFilters, // Filtros adicionales
    }).toString();
    const result = await apiService.get(`/${baseUrls}/?${filterParams}`);
    console.log("aqui", `/${baseUrls}/?${filterParams}`);
    if (result.success) {
      console.log("resul", result);
      return result.data;
    } else {
      handleApiError(result);
    }
  };
  const handleDelete = async (id) => {
    const result = await apiService.delete(`/${baseUrls}/${id}`);
    if (!result.success) {
      handleApiError(result);
    }
    return result.success;
  };
  const handleCreate = async (data) => {
    const result = await apiService.post(`/${baseUrls}/`, data);
    console.log(result)
    if (!result.success) {
      handleApiError(result);
    }
    return result;
  };
  const handleUpdate = async (id, data) => {
    const result = await apiService.put(`/${baseUrls}/${id}/`, data);
    if (!result.success) handleApiError(result);
    return result;
  };
  const fetchStats= async()=>{
    const result=await apiService.get(`/${baseUrls}-estadisticas/`);
    return result.data
  }
  return { fetchItem, fetchItems, handleCreate, handleUpdate, handleDelete, fetchStats };
};
