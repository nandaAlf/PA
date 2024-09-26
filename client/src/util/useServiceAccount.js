import { accountService } from "../services/apiService.js";
import { useState, useEffect } from "react";
import { handleApiError, toastSuccess } from "./Notification.js";
import axios from "axios";
export const useServiceAccount = () => {
  const handleGetUser = async () => {
    const result = await accountService.get("/user-profile/");
    return result;
  };

  const handleChangePassword = async (data) => {
    const result = await accountService.post("/password-change/", data);
    console.log("a", result);
    if (!result.success) {
      handleApiError(result);
    }

    return result.success;
  };

  const changeProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('profile_image', file);  // Asegúrate de usar el nombre correcto del campo que espera el backend
  
    try {
      const response = await axios.put("http://127.0.0.1:8000/account/user-profile/",formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res",response)
      return response.data; // Retorna la respuesta para manejarla en el componente
    } catch (error) {
      console.error("Error changing profile picture:", error);
      return {
        success: false,
        message: "Error al cambiar la imagen de perfil",
      }; // Manejo del error
    }
  };

  return { handleGetUser, handleChangePassword, changeProfilePicture };
};
