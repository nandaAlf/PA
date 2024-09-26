import {apiService} from "../services/apiService.js"
import { useState,useEffect } from "react";
export const useStudy = (params) => {
    const [study, setStudy] = useState({});
    const [studies, setStudies] = useState({});
    const [process, setProcess] = useState(null);
    const [diagnosis, setDiagnosis] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      const { hc, code } = params;
      if (hc) {
        setStudy({ hc_paciente: hc });
      } else if (code === "create") {
        setStudy({});
      } else if (code) {
        setIsEditing(true);
        fetchStudy(code);
      }
    }, [params]);
  
    const fetchStudy = async (code) => {
      try {
        const result = await ApiService.get(`/estudios/${code}`);
        if (result.success) {
          setStudy(result.data);
          console.log("a",study)
          fetchProcess(code);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    const fetchProcess = async (code) => {
      try {
        const result = await ApiService.get(`/procesos/${code}`);
        if (result.success) {
          const { diagnostico, ...proceso } = result.data;
          setProcess(proceso);
          setDiagnosis(diagnostico);
          console.log("p",process)
          console.log("f",diagnosis)
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    const fetchStudies = async (date = "-fecha", type = "") => {
        const result = await ApiService.get(`/estudios/?ordering=${date}&tipo=${type}`);
        if (result.success) {
          setStudies(result.data);
        } else {
          handleApiError(result);
        }
    };
  
    return { study, process, diagnosis, isEditing ,studies,fetchStudies};
  };
  