import React from "react";
import "../css/search.css";
import { Dropdown } from "react-bootstrap";
import { VscSearch } from "react-icons/vsc";
const SearchFilter = ({
  searchTerm,
  onChange,
  searchBy,
  onSearchByChange,
  options,
}) => {
  return (
    <div className="search-filter">
      <div className="dropdown-menu-container">
        <Dropdown onSelect={(eventKey) => onSearchByChange(eventKey)}>
          <Dropdown.Toggle
            // style={{
            //   backgroundColor: "#f7f9faff",
            //   color: "gray",
            //   border: "none",
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   gap: "10px",
            //   width: "100%",
            //   padding: "16px 8px",
            //   fontSize: "16px",
            //   // fontFamily:"Poppins, sans-serif",
            //   borderRadius: "0",
            // }}
            style={{
              backgroundColor: "#f7f9faff",
              color: "white",
              border: "none",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"10px",
              width:"100%",
              padding:"19px 0px",
              fontSize:"16px",
              borderRadius: "0",
              border:"none"
              
              // fontFamily:"Poppins, sans-serif"
            }}
            id="dropdown-basic"
          >
            {/* <p>Buscar por </p> */}
            <VscSearch  size={"18px"} color="#65b5a2ff"/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {options.map((op, index) => (
              <Dropdown.Item eventKey={op} key={index}>
                {op}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="input-menu-containet">
        <input
          type="text"
          placeholder={`Buscar por ${searchBy}...`}
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
