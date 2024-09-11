import { toast } from "react-toastify";
export const toastSuccess = (message) => {
  toast.success(message);
};

export const toastError = (message) => {
  toast.error(message);
};

export const toastInfo = (message) => {
  toast.info(message);
};

export const toastWarning = (message) => {
  toast.warn(message);
};

// import { toast } from 'react-toastify';

export const handleApiError = (response) => {
  const { message, status } = response;
 
  switch (status) {
    case 401:
      toastError("No estás autenticado. Por favor, inicia sesión.");
      break;
    case 403:
      toastError("No tienes permiso para acceder a este recurso.");
      break;
    case 404:
      toastError("El recurso solicitado no fue encontrado.");
      break;
    case 500:
      toastError(
        "Ocurrió un error en el servidor. Intenta nuevamente más tarde."
      );
      break;
    default:
      toastError(message || "Ocurrió un error desconocido.");
      break;
  }
};
