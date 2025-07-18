import React from "react";
import { FaEdit } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
// TuComponente.js
import { Link } from 'react-router-dom';

// import '../css/dropdown.css';  // Importa tus estilos personalizados
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

const DropdownToggle = ({
  label = "",
  items,
  onSelect = null,
  styles,
  icon,
}) => (
  <Dropdown>
    <Dropdown.Toggle
      style={styles}
      className="custom-dropdown-toggle"
      id="dropdown-basic"
    >
      {label}
      {icon}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {items?.map((item, index) => (
        <Dropdown.Item
          key={index}
           as={Link}
            to={item.url}
          // href={item.url}
          // onClick={() => onSelect([item.eventKey])}
          style={{
            display: "flex",
            alignItems: "center",
            gap:"10px",
            color: "",
          }}
          eventKey={item.eventKey}
        >
          {item.icon}
          {item.label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownToggle;
