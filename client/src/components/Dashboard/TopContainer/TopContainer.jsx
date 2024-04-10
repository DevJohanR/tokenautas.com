import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import logoTokenautas from "/logos/tokenautasCompletoBlancoLogo.png";

function TopContainer() {
  return (
    <div className="topContainer">
      <div className="inputBox">
        <input type="text" placeholder="Busca aqui tu plataforma webcam" />
        <i><BiSearchAlt /></i>
      </div>

      <div className="profileContainer">
        <i className="profileIcon"><FaSignOutAlt /></i>
        <div className="profileImage" style={{ backgroundImage: `url(${logoTokenautas})` }}>
        
        </div>
      </div>
    </div>
  );
}

export default TopContainer;
