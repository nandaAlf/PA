import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForForm from "./InputForForm";
import InputContainer from "./InputContainer";
import Loader from "../Loader";
export default function NecroForm({
  studyData,
  register,
  setValue,
  isViewing,
  isEditing,
  user,
}) {
  const [loading,setLoading]=useState(true)

  // const [specialists, setSpecialists] = useState([{ username: "esp1", id: 8 }]);

  useEffect(() => {
    if (studyData) {
      for (const [key, value] of Object.entries(studyData)) {
        setValue(key, value);
      }
      // alert(studyData.especialista_nombre)
      setValue("fecha", studyData.fecha);
      setLoading(false);
    }
  }, [studyData, setValue]);
  useEffect(() => {
    if (user && !(isEditing || isViewing)) {
      setValue("especialista", user.id);
    }
  }, [user, setValue]);
  const formFields = [
    {
      labelText: "Historia Clinica",
      id: "hc_paciente",
      type: "text",
      required: true,
    },
    {
      labelText: "Certificado de Defunción",
      id: "certif_defuncion",
      type: "text",
      required: true,
    },
    {
      labelText: "Hábito Externo",
      id: "habito_externo",
      type: "text",
      required: true,
    },
    {
      labelText: "Hallazgos",
      id: "hallazgos",
      type: "textarea",
      required: true,
    },
    { labelText: "Fecha", id: "fecha", type: "date", required: true },
  ];

  if (loading) return <Loader />;
  return (
    <div className=" ">
      {(isViewing || isEditing) && studyData ? (
        <div className="  p-2  bg-[#f2faf8ff]   font-bold rounded-lg ">
          <label
            style={{
              color: "gray",
              borderRadius: "5px",
              // padding: "10px",
            }}
          >
            Código : {studyData.code}
          </label>
        </div>
      ) : (
        <></>
      )}
      {formFields.map((field) => (
        <InputForForm
          key={field.id}
          labelText={field.labelText}
          id={field.id}
          type={field.type}
          register={register}
          required={field.required}
          disabled={isViewing || field.disabled}
        />
      ))}

      <div>
        <label htmlFor="">Especialista:</label>
        <input
          id="especialista"
          type="text"
          // {...register("especialista", { required: true })}
          // value={studyData.especialista || user.first_name }
          value={
            isViewing || isEditing
              ? studyData?.especialista_nombre || "Dr."
              : user?.first_name || ""
          }
          disabled
        />
      </div>

      <input type="hidden" {...register("especialista", { required: true })} />
    </div>
  );
}
