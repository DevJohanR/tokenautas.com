import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { type, email } = useParams(); // Obtiene los parámetros de la URL
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    try {
      const res = await fetch(`https://tokenautasreact-node.onrender.com/api/detail/${type}/${email}`);
      if (!res.ok) {
        throw new Error(`Error al obtener los datos: ${res.statusText}`);
      }
      const data = await res.json();
      setUserDetail(data);
    } catch (error) {
      console.error("Error al obtener el detalle del usuario:", error);
      setError("No se pudo cargar la información del usuario.");
    }
  };

  const containerStyle = {
    padding: "30px",
   
    borderRadius: "15px",
    color: "#fff",
  
    maxWidth: "800px",
    margin: "20px auto",
    fontFamily: "'Roboto', sans-serif",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: "30px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7), 0px 0px 10px #fc466b",
  };

  const detailStyle = {
    backgroundColor: "#1a1433",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  const fieldStyle = {
    marginBottom: "10px",
    color: "#fff",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#fc466b",
  };

  const linkStyle = {
    color: "#3f5efb",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s",
  };

  const errorStyle = {
    color: "#fc466b",
    textAlign: "center",
    marginBottom: "20px",
  };

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!userDetail) {
    return (
      <div style={{ textAlign: "center", color: "#fff", fontSize: "1.2rem" }}>
        Cargando información del usuario...
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Detalle del Usuario</h1>
      <div style={detailStyle}>
        <p style={fieldStyle}>
          <span style={labelStyle}>Email:</span> {userDetail.email}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Nombre:</span> {userDetail.nombre}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Fecha de Nacimiento:</span>{" "}
          {new Date(userDetail.fechaNacimiento).toLocaleDateString()}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Ciudad de Residencia:</span> {userDetail.ciudadResidencia}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Departamento:</span> {userDetail.departamento}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Teléfono:</span> {userDetail.telefono}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Número de Documento:</span> {userDetail.numeroDocumento}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Plataforma:</span> {userDetail.plataforma}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Tipo de Gestión:</span> {userDetail.tipoGestion}
        </p>
        <p style={fieldStyle}>
          <span style={labelStyle}>Tipo de Página:</span> {userDetail.tipoPagina}
        </p>

        {/* Archivos cargados */}
        <div style={fieldStyle}>
          <span style={labelStyle}>Archivos Cargados:</span>
          <ul>
            {userDetail.fotoCedulaFrontal && (
              <li>
                <a
                  href={`https://tokenautasreact-node.onrender.com/uploads/${userDetail.fotoCedulaFrontal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Descargar Documento Frontal
                </a>
              </li>
            )}
            {userDetail.fotoCedulaTrasera && (
              <li>
                <a
                  href={`https://tokenautasreact-node.onrender.com/uploads/${userDetail.fotoCedulaTrasera}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Descargar Documento Reverso
                </a>
              </li>
            )}
            {userDetail.fotoCedulaConRostro && (
              <li>
                <a
                  href={`https://tokenautasreact-node.onrender.com/uploads/${userDetail.fotoCedulaConRostro}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Descargar Documento con Rostro
                </a>
              </li>
            )}
            {userDetail.licenciaConducir && (
              <li>
                <a
                  href={`https://tokenautasreact-node.onrender.com/uploads/${userDetail.licenciaConducir}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Descargar Licencia de Conducir
                </a>
              </li>
            )}
            {userDetail.fotoDocumentoHojaEnBlanco && (
              <li>
                <a
                  href={`https://tokenautasreact-node.onrender.com/uploads/${userDetail.fotoDocumentoHojaEnBlanco}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  Descargar Foto Documento Hoja en Blanco
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
