// import { useState } from 'react';
// import ApiService from '../ApiService'; // Ajusta la ruta según la ubicación de ApiService

// export const useApiService = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const executeRequest = async (requestFunc, ...args) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await requestFunc(...args);
//       setLoading(false);
//       if (!response.success) {
//         setError(response.message);
//       }
//       return response;
//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//       throw err;
//     }
//   };

//   const get = async (url) => executeRequest(ApiService.get, url);

//   const post = async (url, data) => executeRequest(ApiService.post, url, data);

//   const put = async (url, data) => executeRequest(ApiService.put, url, data);

//   const remove = async (url) => executeRequest(ApiService.delete, url);

//   return { get, post, put, remove, loading, error };
// };
