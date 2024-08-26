import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/pa/", // Cambia esta URL por la URL base de tu API
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});
const account = axios.create({
  baseURL: "http://127.0.0.1:8000/account/", // Cambia esta URL por la URL base de tu API
});

// export const getItems = () => api.get('/items/');
// export const getItem = (id) => api.get(`/items/${id}/`);
// export const createItem = (data) => api.post('/items/', data);
// export const updateItem = (id, data) => api.put(`/items/${id}/`, data);
// export const deleteItem = (id) => api.delete(`/items/${id}/`);

export const loginUser = (data) => account.post(`/login/`, data);


export const apiGetPatients = async() => {
  try {
    const response = await api.get(`/pacientes/`);
    // alert("consulta pacientes completada")
    // console.log(response)
    return response;
  } catch (error) {
    alert("Ha ocurrido un error")
    return error;
  }
};
export const apiGetPatient = (id) =>{
  try{
    const response=api.get(`/pacientes/${id}/`);
    return response
  }
  catch(error){
    console.log(error)
    alert('error')
    return(error)
  }
} 
export const apiCreatePatient=async(data)=>{
  try{
    const response = await api.post(`/pacientes/`,data)
    return { success: true, data: response.data };
  }
  catch(error){
    if (error.response) {
      // El servidor respondió con un código de estado que está fuera del rango de 2xx
      const errorMessages = error.response.data;
      let errorMessage = "Error(s):\n";
      
      if (errorMessages.hc) {
        errorMessage += `- ${errorMessages.hc.join(', ')}\n`;
      }
      if (errorMessages.raza) {
        errorMessage += `- ${errorMessages.raza.join(', ')}\n`;
      }
      if (errorMessages.cid) {
        errorMessage += `- ${errorMessages.cid.join(', ')}\n`;
      }
      if (errorMessages.edad) {
        errorMessage += `- ${errorMessages.edad.join(', ')}\n`;
      }
      return { success: false, message: errorMessage };
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      return { success: false, message: "No response from server." };
    } else {
      // Algo pasó al configurar la solicitud
      return { success: false, message: "Error setting up request." };
    }
  }
}
export const apiDeletePatient = (id) =>{
  try{
    const response=api.delete(`/pacientes/${id}/`);
    return response
  }
  catch(error){
    console.log(error)
    // console.log(error.response.data)
    return error
  }
} 
export const apiUpdatePatient = (id, data) =>{
  try{
    const response=api.put(`/pacientes/${id}/`,data)
    return response
  }
  catch(error){
    console.log(error)
    alert('error')
    return(error)
  }
} 



export const apiGetDefunct = (id) =>{
  try{
    const response=api.get(`/fallecidos/${id}/`);
    return response
  }
  catch(error){
    console.log(error)
    alert('error')
    return(error)
  }
} 




// export const logOutUser = () => account.post(`/logut/`, data);

//CHECK LATER
export const refreshAccessToken = async () => {
  try {
    const response = await account.post(`/token/refresh/`, 
       {
        refresh: localStorage.getItem("refresh_token"),
      },
    );
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.access;
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    // Redirigir al usuario al login si el refresh token ha expirado
    alert("token refresh error")
    return null;
  }
};
//CHECK LATER
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const newAccessToken =  await refreshAccessToken();
//       if (newAccessToken) {
//         // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
//        console.log("original requet")
//         console.log(originalRequest)
//         // return api(originalRequest);
//         return axios(originalRequest); 
//       }
//     }
//     return Promise.reject(error);
//   }
// );

