import React from "react";
import DropdownToggle from "./DropdownToggle";
import { BsFilter } from "react-icons/bs";
import SearchFilter from "./SearchFilter";

export default function SearchSection({items,onSelect,options,searchTerm,searchBy,setSearchTerm,setSearchBy}) {
  return (
    <>
      <div className="dropdow-menu">
        <DropdownToggle
          icon={<BsFilter />}
          label="Filtrar"
          styles={{
            backgroundColor: "#65b5a2ff",
            color: "white",
            border: "none",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"10px",
            width:"100%",
            padding:"16px 8px",
            fontSize:"16px",
            // fontFamily:"Poppins, sans-serif"
          }}
          items={items}
          onSelect={onSelect}
        />
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onChange={setSearchTerm}
        searchBy={searchBy}
        onSearchByChange={setSearchBy}
        options={options}
      />
    </>
  );
}
