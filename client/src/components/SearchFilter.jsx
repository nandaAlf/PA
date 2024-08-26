import React from 'react';
// import "../css/searchBar.css"

const SearchFilter = ({ searchTerm, onChange , searchBy, onSearchByChange}) => {
  return (
    <div className="search-filter">
      <select value={searchBy} onChange={(e) => onSearchByChange(e.target.value)}>
        <option value="nombre">Nombre</option>
        <option value="cid">CID</option>
        <option value="hc">HC</option>
      </select>
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
