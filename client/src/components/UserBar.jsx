import React from "react";
import { Dropdown } from "react-bootstrap";
import "../css/userBar.css";

export default function UserBar({ user }) {
  // const name = localStorage.getItem('name'); // Obtener el nombre de usuario
  {
    console.log("jjj", user);
  }
  return (
    <div className="user-info">
      <Dropdown onSelect={null}>
        <Dropdown.Toggle
          style={{
            backgroundColor: "black",
            color: "black",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
          id="dropdown-basic"
        >
          <img
            src="../../vite.svg"
            alt="user-profile"
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={true} href="/user-profile">Profile</Dropdown.Item>
          <Dropdown.Item eventKey={false}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <span></span>
      <span className="user-name">{user.username}</span>
    </div>
  );
}
