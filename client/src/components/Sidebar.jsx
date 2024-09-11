import { Link } from 'react-router-dom';
import '../css/sidebar.css' // Puedes personalizar el estilo del Sidebar aquí
import { BsPeople } from "react-icons/bs";


function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Home</h2>
      <ul>
        <li><Link to="/patients"> <BsPeople color='#34db71'/> Pacientes</Link></li>
        <li><Link to="/studies"><BsPeople color='#34db71'/> Estudios</Link></li>
        <li><Link to="/necropsies"><BsPeople color='#34db71'/> Necropsias</Link></li>
        <li><Link to="/settings"><BsPeople color='#34db71'/> Ajustes</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
