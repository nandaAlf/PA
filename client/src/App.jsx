import { useState, useEffect } from "react";
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
import SidebarMenu from "./components/SideBarMenu";
import Header from "./components/Header";
import { FaBars } from "react-icons/fa"; // Importar el ícono de menú
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { accountService, apiService } from "./services/apiService";
import { useServiceAccount } from "./util/useServiceAccount";
import DoctorFormPage from "./pages/DoctorFormPage";
import { useNavigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar el sidebar
  const changeUser=(newUser)=>{
    setUser(newUser)
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alternar entre mostrar/ocultar el sidebar
    console.log("open", isSidebarOpen);
  };
  const { handleGetUser } = useServiceAccount();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // alert(user)
        const response = await handleGetUser();
        console.log("USUARIO", response.data);
        setUser(response.data);

      } catch (error) {
      }
    };
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUser(); // Llamada a la función para obtener el perfil
    }
  }, [!user]);

  return (
    <>
      <BrowserRouter>
        <div className="app-container ">
          <nav className="">
            <SidebarMenu isOpen={isSidebarOpen} />
          </nav>
          <header>
            <Header toggleSidebar={toggleSidebar} user={user} setUser={setUser}/>
          </header>

          {/* <button className={`hamburger-menu`} onClick={toggleSidebar}>
            <FaBars size={24} />
          </button> */}
          {/* <nav className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </nav> */}

          {/* <div className="user-bar">
            <UserBar user={user} /> 
          </div> */}

          <div
            className={`main-content ${isSidebarOpen ? "" : "sidebar-closed"}`}
          >
            <Routes>
              <Route path="/" element={<LoginPage changeUser={changeUser} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage changeUser={changeUser} />} />

              <Route path="/user-profile" element={<UserPage />} />
              <Route path="/patients" element={<PatientPage />} />
              <Route path="/patient/:id" element={<PatientFormPage />} />
              <Route path="/patient/view/:id" element={<PatientFormPage />} />
              <Route path="patient/create/" element={<PatientFormPage />} />

              <Route
                path="/studies/"
                element={<StudyPage service="estudios" />}
              />
              <Route
                path="/study/create/:hc/"
                element={<StudyFormPage user={user} />}
              />
              <Route
                path="/study/:code/"
                element={<StudyFormPage user={user} />}
              />
              <Route path="/study/view/:code" element={<StudyFormPage />} />

              <Route
                path="/necropsies"
                element={<StudyPage service="necropsias" />}
              />
              <Route
                path="/necro/create/:hc"
                element={<StudyFormPage typeStudy={"necropsias"} user={user} />}
              />
              <Route
                path="/necro/:code/"
                element={<StudyFormPage typeStudy={"necropsias"} user={user} />}
              />
              <Route
                path="/necro/view/:code"
                element={<StudyFormPage typeStudy={"necropsias"} user={user} />}
              />

              <Route
                path="/doctors"
                element={<StudyPage service="doctores" />}
              />

              <Route path="/doctor/create/" element={<DoctorFormPage />} />
              <Route path="/doctor/:id" element={<DoctorFormPage />} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
