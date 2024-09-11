import axios from "axios";
import { toastError, toastInfo } from "../util/Notification";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    // Interceptor para manejar el vencimiento del token
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no es una petición de refrescar token
        if (error.response.status === 401 && !originalRequest._retry) {
          // toastInfo("se va a refrescar el token")
          originalRequest._retry = true;
          try {
            // Intentamos refrescar el token
            const refreshToken = localStorage.getItem("refresh_token");
            // console.log("refresh tok", refreshToken);
            const response = await axios.post(
              "http://127.0.0.1:8000/account/token/refresh/",
              {
                refresh: refreshToken,
              }
            );

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", newRefreshToken);
            // Actualizamos el token en los headers
            this.api.defaults.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            // Reintentamos la solicitud original
            return this.api(originalRequest);
          } catch (refreshError) {
            // Si el refresco del token falla, redirigimos al usuario al login
            console.error("No se pudo refrescar el token:", refreshError);
            // Redirigir al usuario al login o realizar alguna acción
            toastInfo("Su sesion ha expirado, inicie sesion nuevamente");
            //esperar un tiempio
            // window.location.href = "/login"; // O como manejes la redirección
            setTimeout(() => {
              window.location.href = "/login"; // O como manejes la redirección
            }, 3000); // 3 segundos de espera
            return Promise.reject(refreshError);
          }
        }

        // Si el error no es 401 o si el retry ya falló, rechazamos la promesa
        return Promise.reject(error);
      }
    );
  }

  async get(url) {
    return this.request("get", url);
  }

  async post(url, data) {
    return this.request("post", url, data);
  }

  async put(url, data) {
    return this.request("put", url, data);
  }

  async delete(url) {
    return this.request("delete", url);
  }

  async request(method, url, data = null) {
    try {
      const response = await this.api({ method, url, data });
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    console.log("error", error);
    if (error.response) {
      console.log(error.response);
      const errorMessages = error.response.data;
      console.log("lol", error.response.data);
      let errorMessage = "Error(s):\n";

      Object.keys(errorMessages).forEach((key) => {
        const message = errorMessages[key];
        if (Array.isArray(message)) {
          // Si el mensaje es un array, lo unimos en una sola cadena
          errorMessage += `- ${message.join(", ")}\n`;
        } else {
          // Si no es un array, lo tratamos como una cadena de texto
          errorMessage += `- ${message}\n`;
        }
        // errorMessage += `- ${errorMessages[key].join(', ')}\n`;
      });
      // toastError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response from server.",
        status: null,
      };
    } else {
      return {
        success: false,
        message: "Error setting up request.",
        status: null,
      };
    }
  }
}

// local
export default new ApiService("http://127.0.0.1:8000/pa");
