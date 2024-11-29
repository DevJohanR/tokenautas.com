import React, { useState, useEffect } from "react";

const WhatsAppList = () => {
  const [whatsappList, setWhatsappList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWhatsAppNumbers();
  }, []);

  const fetchWhatsAppNumbers = async () => {
    try {
      const res = await fetch("https://tokenautasreact-node.onrender.com/api/whatsapp");
      if (!res.ok) {
        throw new Error(`Error al obtener los números de WhatsApp: ${res.statusText}`);
      }
      const data = await res.json();
      setWhatsappList(data);
    } catch (error) {
      console.error("Error al obtener los números de WhatsApp:", error);
      setError("No se pudieron cargar los números de WhatsApp. Intenta nuevamente.");
    }
  };

  // Estilos
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%", // Asegura que el contenedor ocupe todo el ancho
    backgroundColor: "#1a1433",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
    textAlign: "center",
  };

  const listContainerStyle = {
    width: "100%",
    maxWidth: "600px", // Limita el tamaño del contenedor
    backgroundColor: "#2c2547",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    padding: "20px",
    boxSizing: "border-box",
  };

  const listStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  const listItemStyle = {
    padding: "15px",
    borderBottom: "1px solid #444",
    color: "#fc466b",
    textAlign: "center",
    fontWeight: "bold",
  };

  const titleStyle = {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#fff",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
  };

  const backButtonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#fc466b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>WhatsApps Modelos Anonimas</h1>
      {error ? (
        <p style={{ color: "#fc466b" }}>{error}</p>
      ) : (
        <div style={listContainerStyle}>
          <ul style={listStyle}>
            {whatsappList.map((item) => (
              <li key={item.id} style={listItemStyle}>
                {item.whatsapp}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        style={backButtonStyle}
        onClick={() => (window.location.href = "/admin")}
      >
        Volver al Panel
      </button>
    </div>
  );
};

export default WhatsAppList;
