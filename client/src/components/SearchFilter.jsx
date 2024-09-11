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
      {/* <select value={searchBy} onChange={(e) => onSearchByChange(e.target.value)}>
        {options.map(op=>(
          <option key={op} value={op}>{op}</option>
        ))}
        
      </select> */}
      <div className="dropdown-menu-container">
        <Dropdown onSelect={(eventKey) => onSearchByChange(eventKey)}>
          <Dropdown.Toggle
            style={{
              backgroundColor: "#f7f9faff",
              color: "black",
              border: "1px solid #ccc",
              // borderRadius:1px
            }}
            id="dropdown-basic"
          >
            Search by
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
        placeholder={`Buscar paciente por ${searchBy}...`}
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
