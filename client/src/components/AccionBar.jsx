import React from "react";
// import "../css/AccionBar.css"
import { BsMenuButton } from "react-icons/bs";
import { BsMenuButtonFill } from "react-icons/bs";
import { useState } from "react";

export default function AccionBar({ onInsert, onDelete, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
      {menuOpen ? <BsMenuButtonFill /> : <BsMenuButton />}
      {menuOpen && (
        <div className="menu-options open">
          <button onClick={onInsert}>Insertar </button>
          <button onClick={onEdit}>Editar </button>
          <button onClick={onDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
}
