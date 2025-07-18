import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import "../../css/form.css";
import Button from "../Button";
import { toastError } from "../../util/Notification";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function UserForm({ changeUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir al usuario

  useEffect(() => {
    if (error) {
      toastError(error);
      const timer = setTimeout(() => setError(""), 100);
      return () => clearTimeout(timer); // Limpia el timeout al desmontar
    }
  }, [error]);
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit event handled");
  
  try {
    const response = await loginUser({ username, password });
    console.log("Response:", response);

    // Validación robusta de la respuesta
    if (!response?.data?.token?.access) {
      throw new Error("Invalid response structure");
    }

    // Almacenamiento seguro
    localStorage.setItem("access_token", response.data.token.access);
    localStorage.setItem("refresh_token", response.data.token.refresh);
    localStorage.setItem("username", response.data.username);
    
    // Actualización de estado antes de navegar
    await changeUser(response.data);
    
    // Redirección sólo con token válido
    navigate("/home", { replace: true });

  } catch (error) {
    console.error("Login error:", error);
    localStorage.clear();
    
    // Manejo unificado de errores
    const errorMessage = error.response?.data?.error || 
                        "Ocurrió un error. Inténtalo de nuevo más tarde.";
    
    setError(errorMessage);
    toastError(errorMessage);
  }
};

  // const showErros = () => {
  //   toastError(error);
  // setError("");
  // };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login form-container">
      <form className="login form component" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          // value={username}
          placeholder="Username (Jon)"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="">Password</label>
        {/* <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /> */}
        <div className="h-full w-full relative rou ">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password (1234)"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "20px",
              top: "35px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6ab8a7ff",
              fontSize: "18px",
              // padding:"5px"
            }}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>
        <Button prop={"Enviar"} details={"formButton"} type={"submit"} />
      </form>
    </div>
  );
}
