import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForForm from "./InputForForm";
// import InputContainer from "./InputContainer";
import { useService } from "../../util/useService";
import Loader from "../Loader";
import { useFormContext } from "react-hook-form"; // Asegúrate de importar esto si no lo has hecho

export default function StudyForm({
  studyData,
  register,
  setValue,
  isViewing,
  isEditing,
  user,
}) {
  const [doctors, setDoctors] = useState([{ nombre: "", dpto: "", id: "" }]);
  const [loading, setLoading] = useState(true);

  const formFields = [
    {
      labelText: "Historia Clinica",
      id: "hc_paciente",
      required: true,
    },
    {
      labelText: "Tipo",
      id: "tipo",
      required: true,
      options: [
        { value: "B", label: "Biopsia" },
        { value: "C", label: "Citología" },
      ],
    },
    {
      labelText: "Entidad",
      id: "entidad",
      required: true,
      options: [
        { value: "H", label: "Hospital Pediátrico" },
        { value: "CE", label: "Clínica Especialidades" },
        { value: "HP", label: "Hospital Provincial" },
      ],
    },
    {
      labelText: "Fecha",
      id: "fecha",
      type: "date",
      required: true,
    },
    {
      labelText: "Impresión Diagnóstica",
      id: "imp_diag",
      // disabled: isViewing,
    },
    {
      labelText: "Pieza",
      id: "pieza",
      required: true,
      // disabled: isViewing,
    },
  ];

  useEffect(() => {
    if (studyData) {
      // setLoading(true)
      for (const [key, value] of Object.entries(studyData)) {
        setValue(key, value);
      }
      setValue("fecha", studyData.fecha);
      setLoading(false);
    }
    if (user && !(isEditing || isViewing)) {
      setValue("especialista", user.id);
      // setLoading(false);
    }
    if (!isViewing) {
      const { fetchItems } = useService("doctores");
      // setLoading(true)
      const fetchDoctors = async () => {
        const response = await fetchItems();
        setLoading(true)
        console.log(response);
        setDoctors(response); // Aquí guardas los doctores en el estado
        setLoading(false);
      };

      fetchDoctors();
    }
  }, [studyData, setValue, user, isViewing, isEditing]);

  if (loading) return <Loader />;
  return (
    <>
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
      <div className="grid-input-container">
        {formFields.map((field, index) => (
          <InputForForm
            key={index}
            labelText={field.labelText}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder || ""}
            options={field.options || []}
            register={register}
            required={field.required}
            disabled={isViewing || field.disabled}
          />
        ))}
        <div className="select-input-container">
          <label>Médico:</label>
          <select
            className="select-input"
            id="doctor"
            {...register("doctor", { required: false })}
            disabled={isViewing}
          >
            <option value="">{"Seleccione un médico"}</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {`${doctor.nombre} / ${doctor.dpto}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Especialista:</label>
          <input
            id="especialista"
            type="text"
            // value={studyData.especialista || user.first_name}
            value={
              isViewing || isEditing
                ? studyData?.especialista_nombre || "Dr."
                : user?.first_name || ""
            }
            disabled
          />
        </div>
      </div>

      {/* El campo oculto que realmente enviará el ID del especialista */}
      <input type="hidden" {...register("especialista", { required: true })} />
    </>
  );
}
