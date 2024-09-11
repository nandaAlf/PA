import React from "react";
import { BsMenuButton } from "react-icons/bs";
import { BsMenuButtonFill } from "react-icons/bs";
import AccionBar from "../components/AccionBar";
import SearchFilter from "../components/SearchFilter";

 function HeaderBar({
//   searchTerm,
//   setSearchTerm,
//   searchBy,
//   setSearchBy,
  handleCreatePatient,
  handleEditSelected,
//   handleDeleteClick,
//   handleDeletePatient,
//   selectedPatients
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("nombre");
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        {menuOpen ? <BsMenuButtonFill /> : <BsMenuButton />}
        {menuOpen && (
          <AccionBar
            onInsert={handleCreatePatient}
            onEdit={handleEditSelected}
            onDelete={handleDeleteClick}
          />
        )}

        <div className="search-bar">
          <SearchFilter
            searchTerm={searchTerm}
            onChange={setSearchTerm}
            searchBy={searchBy}
            onSearchByChange={setSearchBy}
          />
        </div>
      </div>
    </div>
  );
}
export default HeaderBar;

