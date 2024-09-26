import React, { useState } from "react";
import StudyForm from "../components/StudyForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DiagnosisForm from "../components/DiagnosisForm";
import { useForm } from "react-hook-form";
import { toastSuccess } from "../util/Notification";
import { useNavigate } from "react-router-dom";
import { useService } from "../util/useService";
import Button from "../components/Button";
import "../css/form.css";
import NecroForm from "../components/NecroForm";

export default function StudyFormPage({ typeStudy = "estudios", user }) {
  const [study, setStudy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [process, setProcess] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const params = useParams();
  // const {  process, diagnosis, isEditing } = useStudy(params);
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  const {
    fetchItem: fetchStudy,
    handleCreate: handleCreateStudy,
    handleUpdate: handleUpdateStudy,
  } = useService(typeStudy);
  const { fetchItem: fetchProcess, handleUpdate: handleUpdateProcess } =
    useService("procesos");

  useEffect(() => {
    loadStudy();
    console.log("usuario", user);
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
      if (location.pathname.includes("/view")) setIsViewing(true);
      else setIsEditing(true);
      const result = await fetchStudy(code, setStudy);
      if (result.success) {
        const process_diag = await fetchProcess(code, setProcess);
        const { diagnostico, ...proceso } = process_diag.data;
        setProcess(proceso);
        setDiagnosis(diagnostico);
      }
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    let studyData;
    if (typeStudy == "estudios") {
      studyData = {
        // code: data.code,
        tipo: data.tipo,
        hc_paciente: data.hc_paciente,
        medico: data.medico,
        especialista: data.especialista,
        imp_diag: data.imp_diag,
        pieza: data.pieza,
        fecha: data.fecha,
        entidad: data.entidad,
        finalizado: data.finalizado,
      };
    } else if (typeStudy == "necropsias") {
      studyData = {
        // code: data.code,
        hc_paciente: data.hc_paciente,
        especialista: data.especialista,
        habito_externo: data.habito_externo,
        hallazgos: data.hallazgos,
        certif_defuncion: data.certif_defuncion,
        finalizado: data.finalizado,
      };
    }

    const processData = {
      descripcion_micro: data.descripcion_micro,
      descripcion_macro: data.descripcion_macro,
      diagnostico: {
        diagnostico: data.diagnostico,
        observaciones: data.observaciones,
      },
    };

    const result = isEditing
      ? await handleUpdateStudy(data.code, data)
      : await handleCreateStudy(studyData);

    if (result.success) {
      let new_code;
      data.code ? (new_code = data.code) : (new_code = result.data.code);
      await handleUpdateProcess(new_code, processData);
      toastSuccess("ok");
    }
  };

  return (
    <div className="form-container component">
      <form onSubmit={handleSubmit(onSubmit)} className="study form ">
        {typeStudy == "estudios" ? (
          <StudyForm
            studyData={study}
            register={register}
            setValue={setValue}
            isViewing={isViewing}
            className="form"
            user={user}
          />
        ) : (
          <NecroForm
            studyData={study}
            register={register}
            setValue={setValue}
            className="form"
          />
        )}
        <DiagnosisForm
          diagnosisData={diagnosis}
          processData={process}
          register={register}
          setValue={setValue}
        />
        {/* <button type="submit">Guardar</button> */}
        {!isViewing ? <Button prop={"Enviar"} details={"formButton"} /> : <></>}
      </form>
    </div>
  );
}
