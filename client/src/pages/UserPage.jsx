import React from "react";
import "../css/page.css";
import "../css/userPage.css";
import { useEffect, useState } from "react";
import { useServiceAccount } from "../util/useServiceAccount";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputForForm from "../components/forms/InputForForm";
import Button from "../components/Button";
import { toastError, toastSuccess } from "../util/Notification";
import Loader from "../components/Loader";
import { FaPencilAlt } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";
// import "../css/userPage";

function UserPage() {
  const { handleGetUser, handleChangePassword, changeProfilePicture } =
    useServiceAccount();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { handleSubmit, register, setValue } = useForm();
  const [selectedButton, setSelectedButton] = useState(true); // E
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const result = await handleGetUser();
    if (result.success) {
      setUserData(result.data);
      console.log("ud", userData);
    }
    setLoading(false);
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      changeProfilePicture(file);
      window.location.reload();
    } else {
      console.log("No file selected");
    }
  };
  const onSubmit = async (data) => {
    console.log("dataa", data);
    const { old_password, new_password, confirm_password } = data;
    // Validar que las contraseñas coinciden
    if (new_password !== confirm_password) {
      toastError("Las contraseñas no coinciden");
      return;
    }

    // Llamada a la función handleChangePassword
    const response = await handleChangePassword({
      old_password,
      new_password,
    });
    console.log("res", response);
    if (response) {
      toastSuccess("Contraseña cambiada exitosamente");
      navigate("/login");
    }
  };

  while (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-container">
      <div className="user-profile form ">
        {userData && (
          <>
            <div className="profile-picture-container ">
              <img
                src={`http://127.0.0.1:8000${userData.profile_image}`} // Ruta de la foto o foto por defecto
                alt="Foto de perfil"
                className="profile-picture"
              />
              <input
                type="file"
                id="profilePictureInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                onClick={() =>
                  document.getElementById("profilePictureInput").click()
                }
              >
                <FaPencilAlt color="#6ab8a7ff"/>
              </button>
            </div>
            <div className="user-info text-slate-700 flex-col justify-start items-start ml-5  mt-3 ">
              <p className="items-center">
                {userData.first_name} {userData.last_name}
              </p>

              <p>{userData.email}</p>
              <p>Usuario: @{userData.username}</p>
              <p>ID : {userData.cid}</p>
              {/* <p>
                Departamento:{userData.dpto} 
              </p> */}
            </div>
            <div className="user-actions">
              {/* <Button
                prop={"Personal Information"}
                details={`grayButton ${
                  selectedButton ? "selected-button" : ""
                }`}
                action={() => {
                  setShowChangePassword(false);
                  setSelectedButton(true);
                }}
              /> */}
              {/* <Button
                prop={"Change Password"}
                action={() => {
                  // // setShowChangePassword(true);
                  // setSelectedButton(false);
                  setShowChangePassword(true);
                  setSelectedButton(true);
                }}
                details={`grayButton ${
                  selectedButton == false ? "selected-button" : "selected-button"
                }`}
              /> */}
            </div>
          </>
        )}
      </div>

      <div className="form password text-slate-700">
        {/* {showChangePassword ? (
          <> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <InputForForm
              labelText="Old Password"
              id="old_password"
              type="password"
              register={register}
              required={true}
            />
            <InputForForm
              labelText="New Password"
              id="new_password"
              type="password"
              register={register}
              required={true}
            />
            <InputForForm
              labelText="Confirm Password"
              id="confirm_password"
              type="password"
              register={register}
              required={true}
            />
          </>
          <Button prop={"Enviar"} details={"formButton"} />
          <></>
        </form>
        {/* </>
        ) : (
          <>
            <label htmlFor="">Email:</label>
            <input type="text" name="" id="" value={userData.email} disabled />
            <label htmlFor="">Id</label>
            <input type="text" name="" id="" value={userData.cid} disabled />
            <label htmlFor="">Dpto:</label>
            <input type="text" name="" id="" value={userData.dpto} disabled />
            <label htmlFor="">Titulo:</label>
            <input type="text" name="" id="" value={userData.titulo} disabled />
          </>
        )} */}
      </div>
    </div>
  );
}

export default UserPage;
