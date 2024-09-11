import React from 'react'
import { Dropdown } from "react-bootstrap";
import "../css/userBar.css"

export default function UserBar() {
  return (
    <div className='container user-bar'>
       <Dropdown onSelect={null}>
            <Dropdown.Toggle
              style={{
                backgroundColor: "black",
                color: "black",
                border: "none",
                borderRadius:"50%",
                width:"50px",
                height:"50px",
                right:"0",
              }}
              id="dropdown-basic"
            >
              <img src='../../public/vite.svg' alt="user-profile" style={{
                borderRadius:"50%",

              }}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={true}>Profile</Dropdown.Item>{" "}
              <Dropdown.Item eventKey={false}>Logout</Dropdown.Item>{" "}
           
            </Dropdown.Menu>
            Dr. Juan
          </Dropdown>
    </div>
  )
}
