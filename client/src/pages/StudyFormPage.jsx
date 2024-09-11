import React, { useState } from "react";
import StudyForm from "../components/StudyForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../services/apiService";
import DiagnosisForm from "../components/DiagnosisForm";
import { useForm } from "react-hook-form";
import { handleApiError, toastSuccess } from "../util/Notification";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../util/useStudy";
import { useService } from "../util/useService";

export default function StudyFormPage() {
  const [study, setStudy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [process, setProcess] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const params = useParams();
  // const {  process, diagnosis, isEditing } = useStudy(params);
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  const {
    fetchItem: fetchStudy,
    handleCreate: handleCreateStudy,
    handleUpdate: handleUpdateStudy,
  } = useService("estudios");
  const { fetchItem: fetchProcess, handleUpdate: handleUpdateProcess } =
    useService("procesos");

  useEffect(() => {
    // const { hc, code } = params;

    loadStudy();
    // if (hc) {
    //   // Caso de crear un nuevo estudio para un paciente específico
    //   setStudy({ hc_paciente: hc });
    // } else if (code === "create") {
    //   // Caso de crear un nuevo estudio desde cero
    //   setStudy({}); // Iniciar con un objeto vacío
    // } else if (code) {
    //   // Caso de editar un estudio existente
    //   // setIsEditing(true);
    //   //  await fetchStudy(code,{setStudy});
    //   const load=async()=>{await fetchStudy(code,{setStudy})}
    //   load()
    //   // setStudy(studyData)
    //   // fetchProcess(code)
    //   // // fetchDiagnosiss(process.id)
    // }
  }, [params]);

  const loadStudy = async () => {
    const { hc, code } = params;

    if (hc) {
      // Caso de crear un nuevo estudio para un paciente específico
      setStudy({ hc_paciente: hc });
    } else if (code === "create") {
      // Caso de crear un nuevo estudio desde cero
      setStudy({}); // Iniciar con un objeto vacío
    } else if (code) {
      // Caso de editar un estudio existente
      setIsEditing(true);
      const result = await fetchStudy(code, setStudy);
      if (result.success) {
        const process_diag = await fetchProcess(code, setProcess);
        const { diagnostico, ...proceso } = process_diag.data;
        setProcess(proceso);
        setDiagnosis(diagnostico);
      }
    }
  };
  // const fetchStudy = async (code) => {
  //   const result = await ApiService.get(`/estudios/${code}`);
  //   if (result.success) {
  //     setStudy(result.data);
  //     // console.log(result.data)
  //     fetchProcess(code);
  //   } else handleApiError(error);
  // };
  // const fetchProcess = async (code) => {
  //   const result = await ApiService.get(`/procesos/${code}`);
  //   if (result.success) {
  //     const { diagnostico, ...proceso } = result.data;
  //     setProcess(proceso);
  //     setDiagnosis(diagnostico);
  //     console.log(diagnosis)
  //     // console.log("process",proceso)
  //     // console.log("diags",diagnostico)
  //     // fetchDiagnosiss(result.data.id);
  //   } else handleApiError(error);
  // };
  // // const fetchDiagnosiss = async (id) => {
  // //   const result = await ApiService.get(`/diagnosticos/${id}`);
  // //   if (result.success) {
  // //     setDiagnosis(result.data);
  // //   } else handleApiError(error);
  // // };

  // const handleCreateStudy = async (data) => {
  //   const result = await ApiService.post("/estudios/", data);
  //   if (result.success) {
  //     toastSuccess("Estudio creado con exito");
  //   } else handleApiError(result);
  //   console.log(result);
  //   return result.success;
  // };
  // const handleUpdateStudy = async (code, data) => {
  //   const result = await ApiService.put(`/estudios/${code}/`, data);
  //   if (result.success) {
  //     // toastSuccess("Estudio actualizado con éxito.");
  //   } else handleApiError(result);
  //   return result.success;
  // };
  // const handleUpdateProcess = async (code, data) => {
  //   const result = await ApiService.put(`/procesos/${code}/`, data);
  //   if (!result.success) {
  //     handleApiError(result);
  //   }
  //   return result;
  // };
  // const handleUpdateDiagnosis = async (id, data) => {
  //   const result = await ApiService.put(`/diagnosticos/${id}/`, data);
  //   if (!result.success) {
  //     handleApiError(result);
  //   }
  //   return result;
  // };

  // const handleDiagnosisProcess = async (code, processData) => {
  //   const process_result = await handleUpdateProcess(code, processData);
  //   if (process_result.success) {
  //     // console.log("ok")
  //     toastSuccess("Estudio actualizado con éxito.");
  //   } else {
  //     return process_result;
  //   }
  // };

  const onSubmit = async (data) => {
    console.log("data", data);
    const studyData = {
      code: data.code,
      tipo: data.tipo,
      hc_paciente: data.hc_paciente,
      medico: data.medico,
      especialista: data.especialista,
      imp_diag: data.imp_diag,
      pieza: data.pieza,
      fecha: data.fecha,
      entidad: data.entidad,
    };
    const processData = {
      descripcion_micro: data.descripcion_micro,
      descripcion_macro: data.descripcion_macro,
      diagnostico: {
        diagnostico: data.diagnostico,
        observaciones: data.observaciones,
      },
    };

    let result;
    if (isEditing) {
      result = await handleUpdateStudy(studyData.code, data);
    } else {
      result = await handleCreateStudy(studyData);
    }

    // const result = isEditing
    // ? await handleUpdateStudy(studyData.code, data)
    // : await handleCreateStudy(studyData);

    if (result) {
      console.log("aaaaaa");
      await handleUpdateProcess(studyData.code, processData);
      // navigate("/studies/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StudyForm studyData={study} register={register} setValue={setValue} />
        <DiagnosisForm
          diagnosisData={diagnosis}
          processData={process}
          register={register}
          setValue={setValue}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
