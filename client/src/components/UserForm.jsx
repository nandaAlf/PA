import React,{useState }  from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/api";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const response = await login(data);
    console.log("res login",response)
  });

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      alert("Login exitoso");
      console.log(response);
    
      localStorage.setItem('access_token', response.data.token.access);
      localStorage.setItem('refresh_token', response.data.token.refresh);
      // Puedes hacer algo con el token, como redirigir o almacenar en localStorage
      return response
    } catch (error) {
      localStorage.clear()
      if (error.response && error.response.status === 401) {
        alert(error.response.data.error);
      } else {
        alert("Ocurrió un error. Inténtalo de nuevo más tarde.");
        alert(error)
      }
      return error;
    }
  };

  return (
    <div>
      <h2>Login from user</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>error de username</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>error de password</span>}
        <button>Send</button>
      </form>
    </div>
  );
}
