import { useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import PatientFormPage from "./pages/PatientFormPage";
import StudyPage from "./pages/StudyPage";
import StudyFormPage from "./pages/StudyFormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../components/SideBar";
import Sidebar from "./components/Sidebar";
import PageSection from "./components/PageSection";
import { BsPeople } from "react-icons/bs";
import UserBar from "./components/UserBar";

import { FaBars } from "react-icons/fa"; // Importar el ícono de menú
import HomePage from "./pages/HomePage";
function App() {
  const [user, setUser] = useState(() => {
    // Al inicializar el estado, restauramos el usuario desde localStorage si existe
    const savedUser = localStorage.getItem("username"); // Puedes guardar más datos si los necesitas
    return savedUser ? { username: savedUser } : { username: "" } ;
  });
  const changeUser = (newUser) => {
    setUser(newUser);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar el sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alternar entre mostrar/ocultar el sidebar
  };
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <button className={`hamburger-menu`} onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
          <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div className="user-bar">
            <UserBar user={user} /> 
          </div>

          <div
            className={`main-content ${isSidebarOpen ? "" : "sidebar-closed"}`}
          >
            {/* <UserBar/> */}
            <Routes>
              {/* <Route path='/' element={<Navigate to "/">} /> */}
              <Route path="/home" element={<HomePage/>} />
              <Route
                path="/login"
                element={<LoginPage changeUser={changeUser} />}
              />
              <Route path="/patients" element={<PatientPage />} />
              <Route path="/patient/:id" element={<PatientFormPage />} />
              <Route path="/patient/view/:id" element={<PatientFormPage />} />
              {/* <Route path="/patient/:id" element={<PatientFormPage />} /> */}
              <Route path="patient/create/" element={<PatientFormPage />} />
              <Route path="/studies/" element={<StudyPage />} />
              <Route path="study/create/:hc/" element={<StudyFormPage />} />
              <Route path="study/:code/" element={<StudyFormPage />} />
            </Routes>
          </div>
        </div>

        <ToastContainer theme="dark" />
      </BrowserRouter>
      {console.log("aaa", user)}
    </>
  );
}

export default App;
