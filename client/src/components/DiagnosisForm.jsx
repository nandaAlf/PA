import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateStudy, apiUpdateStudy } from "../services/api";
import ApiService from "../services/apiService"
import apiService from "../services/apiService";

export default function DiagnosisForm({ diagnosisData,processData,register,setValue}) {
  
  useEffect(() => {
    if (diagnosisData) {
      for (const [key, value] of Object.entries(diagnosisData)) {
        setValue(key, value);
      }
      for (const [key, value] of Object.entries(processData)) {
        setValue(key, value);
      }
    }
  }, [diagnosisData, setValue,processData]);

  return (
    <div className="">
        <div>
          <label htmlFor="diagnostico">diagnostico:</label>
          <input
            id="diagnostico"
            type="text"
            {...register("diagnostico", { required: false })}
          />
        </div>

        <div>
          <label htmlFor="observaciones">observaciones:</label>
          <input
            id="observaciones"
            type="text"
            {...register("observaciones", { required: false })}
          />
        </div>

        
        <div>
          <label htmlFor="descripcion_macro">macro:</label>
          <input
            id="descripcion_macro"
            type="text"
            {...register("descripcion_macro", { required: false })}
          />
        </div>

        <div>
          <label htmlFor="descripcion_micro">micro:</label>
          <input
            id="descripcion_micro"
            type="text"
            {...register("descripcion_micro", { required: false })}
          />
        </div>
    </div>
  );
}
