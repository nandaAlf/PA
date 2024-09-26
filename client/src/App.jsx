import { useState ,useEffect} from "react";
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
function App() {
  const [user, setUser] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar el sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Alternar entre mostrar/ocultar el sidebar
    console.log("open", isSidebarOpen);
  };
  const {handleGetUser}=useServiceAccount();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await handleGetUser() ;
        console.log("aa",response)
        setUser(response.data); 
       
      } catch (error) {
        // setError("Error al cargar los datos del usuario");
        // setLoading(false);
      }
    };
   
    fetchUser(); // Llamada a la función para obtener el perfil
  }, []);
  // useEffect(() => {
  //   if (user) {
  //     console.log("Estado del usuario actualizado", user);
  //   }
  // }, [user]);  // Este useEffect se ejecuta cada vez que 'user' cambia.
  if (!user) {
    // return <p>No se pudo cargar el usuario</p>; // Mostrar un mensaje si no se pudo obtener el usuario
  }
  return (
    <>
      <BrowserRouter>
        <div className="app-container ">
          <nav className="">
            <SidebarMenu isOpen={isSidebarOpen} />
          </nav>
          <header>
            <Header toggleSidebar={toggleSidebar} />
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
              <Route path="/" element={<LoginPage changeUser={null}/>} />
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/login"
                element={<LoginPage changeUser={null} />}
              />
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
              <Route path="/study/:code/" element={<StudyFormPage user={user} />} />
              <Route path="/study/view/:code" element={<StudyFormPage user={user} />} />

              <Route
                path="/necropsies"
                element={<StudyPage service="necropsias" />}
              />
              <Route
                path="/necro/create/:hc"
                element={<StudyFormPage typeStudy={"necropsias"} />}
              />
              <Route
                path="/necro/:code/"
                element={<StudyFormPage typeStudy={"necropsias"} />}
              />
              <Route
                path="/necro/view/:code"
                element={<StudyFormPage typeStudy={"necropsias"} />}
              />
            </Routes>
          </div>

        </div>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
