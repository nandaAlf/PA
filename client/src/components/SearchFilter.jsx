import React from "react";
import "../css/search.css";
import { Dropdown } from "react-bootstrap";

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
            style={{
              backgroundColor: "#f7f9faff",
              color: "gray",
              border: "none",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"10px",
              width:"100%",
              padding:"16px 8px",
              fontSize:"16px",
              // fontFamily:"Poppins, sans-serif",
              // borderRadius:"1px"
            }}
            id="dropdown-basic"
          >
            <p>Search by</p>
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

      <input
        type="text"
        placeholder={`Buscar por ${searchBy}...`}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    // <input
    //   type="text"
    //   placeholder="Buscar paciente..."
    //   value={searchTerm}
    //   onChange={(e) => onChange(e.target.value)}
    // />
  );
};

export default SearchFilter;
