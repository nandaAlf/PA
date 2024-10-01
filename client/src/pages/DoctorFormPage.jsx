import { toastSuccess } from "../util/Notification";
import { useNavigate } from "react-router-dom";
import { useService } from "../util/useService";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputForForm from "../components/forms/InputForForm";
import Button from "../components/Button";
import Loader from "../components/Loader";
export default function DoctorFormPage({}) {
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    unregister,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const navigate = useNavigate();
  const {
    fetchItem: fetchDoctor,
    handleCreate: handleCreateDoctor,
    handleUpdate: handleUpdateDoctor,
  } = useService("doctores");

  useEffect(() => {
    loadStudy();
  }, [params]);

  const loadStudy = async () => {
    const { id } = params;

    if (id) {
      fetchDoctor(id, setDoctor);
      for (const [key, value] of Object.entries(doctor)) {
        setValue(key, value);
      }
    } else setIsEditing(true);
  };

  const onSubmit = async (data) => {
    const result = isEditing
      ? await handleCreateDoctor(data)
      : await handleUpdateDoctor(data.id, data);

    if (result.success) {
      toastSuccess("ok");
    }
  };

  const formInputs = [
    { labelText: "Nombre", id: "nombre", maxLength: 50 },
    { labelText: "ID", id: "cid", maxLength: 11 },
    { labelText: "Departamento", id: "dpto", maxLength: 50 },
  ];

 
  return (
    <div className="form-container component">
      
      <form onSubmit={handleSubmit(onSubmit)} className="doctor form ">
        <div className="flex flex-col">
          {formInputs.map((input, index) => (
            <InputForForm
              key={index}
              labelText={input.labelText}
              id={input.id}
              register={register}
              required={input.required}
              type={input.type}
              disabled={input.disabled}
              options={input.options}
              maxLength={input.maxLength}
              placeholder={input.placeholder}
              defaultValue={input.defaultValue}
              validation={input.validation} // Pasa las reglas de validación aquí
              error={errors[input.id]}
            />
          ))}
        </div>
        <Button prop={"Enviar"} details={"formButton"} />
      </form>
    </div>
  );
}
