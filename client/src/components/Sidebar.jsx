import { Link ,useLocation} from "react-router-dom";
import "../css/sidebar.css"; // Puedes personalizar el estilo del Sidebar aquí
import { BsPeopleFill } from "react-icons/bs";
import { useState } from "react";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaBookDead } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; // Importar el ícono de menú

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  // const [pressed,setPresssed]=useState(null)
  const location = useLocation(); // Para obtener la ruta actual

  // Función para verificar si el enlace está activo
  const isActive = (path) => location.pathname === path;
  return (
    <>
      {/* <h2>Home</h2> */}
      <ul className="nav-menu">
        <li className={isActive("/home") ? "active" : ""}>
          <Link to="/home">
            {" "}
            <FaHome color="#65b5a2ff" /> Inicio
          </Link>
        </li>
        <li className={isActive("/patients") ? "active" : ""}>
          <Link to="/patients">
            {" "}
            <BsPeopleFill color="#65b5a2ff" /> Pacientes
          </Link>
        </li>
        <li  className={isActive("/studies") ? "active" : ""}>
          <Link to="/studies">
            <FaBookMedical color="#65b5a2ff" /> Estudios
          </Link>
        </li>
        <li  className={isActive("/necropsies") ? "active" : ""}>
          <Link to="/necropsies">
            <FaBookDead color="#65b5a2ff" /> Necropsias
          </Link>
        </li>
        <li  className={isActive("/settings") ? "active" : ""}>
          <Link to="/settings">
            <IoMdSettings color="#65b5a2ff" /> Ajustes
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;
