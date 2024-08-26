import React from 'react'
// import "../css/AccionBar.css"

export default function AccionBar({onInsert,onDelete,onEdit}) {
  return (
    <div className="menu-options open">
      <button onClick={onInsert}>Insertar Paciente</button>
      <button onClick={onEdit}>Editar Paciente</button>
      <button onClick={onDelete}>Eliminar Paciente</button>
    </div>
  )
}
