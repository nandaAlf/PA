import { Link } from "react-router-dom";
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
  return (
    <>
      {/* <h2>Home</h2> */}
      <ul>
        <li>
          <Link to="/home">
            {" "}
            <FaHome color="#34db71" /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/patients">
            {" "}
            <BsPeopleFill color="#34db71" /> Pacientes
          </Link>
        </li>
        <li>
          <Link to="/studies">
            <FaBookMedical color="#34db71" /> Estudios
          </Link>
        </li>
        <li>
          <Link to="/necropsies">
            <FaBookDead color="#34db71" /> Necropsias
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <IoMdSettings color="#34db71" /> Ajustes
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;
