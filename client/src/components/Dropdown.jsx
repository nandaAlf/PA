import React from "react";


// TuComponente.js

// import '../css/dropdown.css';  // Importa tus estilos personalizados
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';





const DropdownComponent = () => (


  <Dropdown>
    <Dropdown.Toggle style={{ backgroundColor: '#ff6347', color: 'white'  }}className="custom-dropdown-toggle"  id="dropdown-basic">
      Filter
    </Dropdown.Toggle>

    <Dropdown.Menu >
      <Dropdown.Item >Biopsia</Dropdown.Item>
      <Dropdown.Item >Citologias</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownComponent; 

