import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import "../../css/form.css";
import Button from "../Button";
import { toastError } from "../../util/Notification";
export default function UserForm({changeUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirigir al usuario

  useEffect(() => {
    if (error) {
      toastError(error);
      setError(""); // Limpiamos el error para evitar que se repita el `toast`.
    }
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit event handled");
    try {
      const response = await loginUser({ username, password });
      console.log("papa",response);
      changeUser(response.data)
      localStorage.setItem("access_token", response.data.token.access);
      localStorage.setItem("refresh_token", response.data.token.refresh);
      localStorage.setItem("username", response.data.username);
     
      navigate("/home");
    } catch (error) {
      localStorage.clear();
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        // alert(error.response.data.error);
        setError(error.response.data.error);
      } else {
        alert("Ocurrió un error1. Inténtalo de nuevo más tarde.");
        // alert(error)
        setError("Ocurrió un error8. Inténtalo de nuevo más tarde.");
      }

      // setError('')
      return error;
    }
  };

  // const showErros = () => {
  //   toastError(error);
    // setError("");
  // };

  return (
    <div className="login form-container">

      <form className="login form component" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button prop={"Enviar"} details={"formButton"} type={"submit"} />
      </form>
    </div>
  );
}