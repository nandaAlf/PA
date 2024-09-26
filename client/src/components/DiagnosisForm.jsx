import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateStudy, apiUpdateStudy } from "../services/api";
import InputContainer from "./InputContainer";

export default function DiagnosisForm({
  diagnosisData,
  processData,
  register,
  setValue,
}) {
  useEffect(() => {
    if (diagnosisData) {
      for (const [key, value] of Object.entries(diagnosisData)) {
        setValue(key, value);
      }
      for (const [key, value] of Object.entries(processData)) {
        setValue(key, value);
      }
    }
  }, [diagnosisData, setValue, processData]);

  return (
    <div className="">


      <div>
        <label htmlFor="descripcion_macro">Macro:</label>
        <input
          id="descripcion_macro"
          type="text"
          {...register("descripcion_macro", { required: false })}
        />
      </div>

      <div>
        <label htmlFor="descripcion_micro">Micro:</label>
        <input
          id="descripcion_micro"
          type="text"
          {...register("descripcion_micro", { required: false })}
        />
      </div>
      <div>
        <label htmlFor="observaciones">Observaciones:</label>
        <input
          id="observaciones"
          type="text"
          {...register("observaciones", { required: false })}
        />
      </div>
      <div>
        <label htmlFor="diagnostico">Diagnostico:</label>
        <input
          id="diagnostico"
          type="text"
          {...register("diagnostico", { required: false })}
        />
      </div>
      <div>
        <label htmlFor="finalizado">Finalizado:</label>
        <input
          id="finalizado"
          type="checkbox"
          {...register("finalizado", { required: false})}
          defaultChecked={false}
        />
      </div>
    </div>
  );
}
