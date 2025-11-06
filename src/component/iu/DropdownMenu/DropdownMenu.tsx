import { useState } from "react";

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="/profile">Perfil</a>
          <a href="/settings">Configuración</a>
        </div>
      )}
    </div>
  );
};
