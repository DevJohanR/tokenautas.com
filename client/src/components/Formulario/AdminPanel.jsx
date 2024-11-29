import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [independientes, setIndependientes] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData("independientes", setIndependientes);
    fetchData("agencias", setAgencias);
  }, []);

  const fetchData = async (type, setState) => {
    try {
      const res = await fetch(`https://tokenautasreact-node.onrender.com/api/admin/${type}`);
      if (!res.ok) {
        throw new Error(`Error al obtener los datos: ${res.statusText}`);
      }
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setError(`No se pudieron cargar los datos de ${type}. Intenta nuevamente.`);
    }
  };

  // Verificar si es móvil
  const isMobile = window.innerWidth <= 768;

  // Estilos
  const containerStyle = {
    padding: isMobile ? "20px" : "30px",
    borderRadius: "15px",
    color: "#fff",
    maxWidth: "1200px",
    margin: "20px auto",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: isMobile ? "20px" : "30px",
  };

  const logoStyle = {
    height: isMobile ? "50px" : "70px",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: isMobile ? "2rem" : "2.8rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7), 0px 0px 20px #fc466b",
    marginBottom: isMobile ? "20px" : "30px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: isMobile ? "15px" : "30px",
  };

  const sectionStyleIndependientes = {
    backgroundColor: "#1a1433",
    borderRadius: "10px",
    padding: isMobile ? "15px" : "20px",
    boxShadow: "0 4px 8px rgba(252, 70, 107, 0.6)",
  };

  const sectionStyleAgencias = {
    backgroundColor: "#14243a",
    borderRadius: "10px",
    padding: isMobile ? "15px" : "20px",
    boxShadow: "0 4px 8px rgba(63, 94, 251, 0.6)",
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? "1.5rem" : "1.8rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    marginBottom: "15px",
  };

  const listStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  const listItemStyle = {
    marginBottom: "15px",
    backgroundColor: "#2c2547",
    borderRadius: "8px",
    padding: isMobile ? "10px" : "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  };

  const linkStyle = {
    color: "#fc466b",
    textDecoration: "none",
    fontSize: isMobile ? "1rem" : "1.2rem",
    fontWeight: "bold",
    transition: "color 0.3s",
  };

  const linkHoverStyle = {
    color: "#3f5efb",
  };

  const errorStyle = {
    color: "#fc466b",
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <img
          src="/logos/tokenautasCompletoBlancoLogo.png"
          alt="Tokenautas Logo"
          style={{display: "none"}}
        />
        <h1 style={titleStyle}>Panel de Administración</h1>
      </div>
      {error && <div style={errorStyle}>{error}</div>}

      <div style={gridStyle}>
        {/* Lista de Independientes */}
        <div style={sectionStyleIndependientes}>
          <h2 style={sectionTitleStyle}>Independientes</h2>
          <ul style={listStyle}>
            {independientes.map((user) => (
              <li key={user.email} style={listItemStyle}>
                <Link
                  to={`/admin/independientes/${user.email}`}
                  style={linkStyle}
                  onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
                  onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
                >
                  {user.email}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Lista de Agencias */}
        <div style={sectionStyleAgencias}>
          <h2 style={sectionTitleStyle}>Agencias</h2>
          <ul style={listStyle}>
            {agencias.map((user) => (
              <li key={user.email} style={listItemStyle}>
                <Link
                  to={`/admin/agencias/${user.email}`}
                  style={linkStyle}
                  onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)}
                  onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
                >
                  {user.email}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default AdminPanel;
