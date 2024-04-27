import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FaSignOutAlt } from "react-icons/fa";
import logoTokenautas from "/logos/tokenautasCompletoBlancoLogo.png";

function TopContainer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar los datos de sesión del localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    // Redireccionar al usuario a la página de login
    navigate('/login');
  };

  return (
    <div className="topContainer">
      <div className="inputBox">
      <i className="profileIcon" onClick={handleLogout} style={{ cursor: 'pointer' }}><FaSignOutAlt /></i>

      </div>
      <div className="profileContainer">
        <div className="profileImage" style={{ backgroundImage: `url(${logoTokenautas})` }}>
        </div>
      </div>
    </div>
  );
}

export default TopContainer;
