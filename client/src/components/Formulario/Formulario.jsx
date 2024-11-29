import React, { useState } from "react";

const opcionesPlataforma = {
  independientes: ["Chaturbate", "Xvideos", "Stripchat", "Camsoda", "Cam4", "BongaCams"],
  agencias: ["Chaturbate", "Xvideos", "Stripchat", "Camsoda", "Cam4", "BongaCams"],
};

const opcionesGestion = {
  independientes: ["Modelo con cuenta antigua", "Modelo nueva"],
  agencias: ["Registrar cuenta", "Actualizar Datos", "Migrar Modelos"],
};

const opcionesPagina = ["Cambiar pagina", "Crear pagina",];

const Formulario = () => {
  const [tipo, setTipo] = useState("independientes");
  const [tipoDocumento, setTipoDocumento] = useState("Cédula de Ciudadanía");
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    fechaNacimiento: "",
    ciudadResidencia: "",
    departamento: "",
    telefono: "",
    numeroDocumento: "",
    plataforma: "",
    tipoGestion: "",
    tipoPagina: "",
    tipoDocumento: "Cédula de Ciudadanía",
  });
  const [archivos, setArchivos] = useState({
    fotoCedulaFrontal: null,
    fotoCedulaTrasera: null,
    fotoCedulaConRostro: null,
    licenciaConducir: null,
    fotoDocumentoHojaEnBlanco: null, // Nuevo campo
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setArchivos((prev) => ({ ...prev, [name]: e.target.files[0] }));
  };

  const handleTipoDocumentoChange = (e) => {
    const value = e.target.value;
    setTipoDocumento(value);
    setFormData((prev) => ({ ...prev, tipoDocumento: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(archivos).forEach((key) => {
      if (archivos[key]) data.append(key, archivos[key]);
    });

    try {
      const response = await fetch(`https://tokenautasreact-node.onrender.com/api/submit/${tipo}`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Error al enviar los datos");
        return;
      }

      alert("Datos enviados con éxito");

      setFormData({
        email: "",
        nombre: "",
        fechaNacimiento: "",
        ciudadResidencia: "",
        departamento: "",
        telefono: "",
        numeroDocumento: "",
        plataforma: "",
        tipoGestion: "",
        tipoPagina: "",
        tipoDocumento: "Cédula de Ciudadanía",
      });
      setArchivos({
        fotoCedulaFrontal: null,
        fotoCedulaTrasera: null,
        fotoCedulaConRostro: null,
        licenciaConducir: null,
        fotoDocumentoHojaEnBlanco: null,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar los datos");
    }
  };

  const containerStyle = {
    padding: "30px",
    borderRadius: "15px",
    color: "#fff",
    maxWidth: "600px",
    margin: "20px auto",
    fontFamily: "'Roboto', sans-serif",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7), 0px 0px 10px #fc466b",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #fc466b",
    backgroundColor: "#1a1433",
    color: "#fff",
    fontSize: "1rem",
  };

  const selectStyle = { ...inputStyle };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "20px",
    backgroundColor: "#fc466b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "uppercase",
    boxShadow: "0px 4px 6px rgba(252, 70, 107, 0.5)",
  };

  const fileLabelStyle = {
    marginBottom: "10px",
    display: "block",
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <h2 style={titleStyle}>Formulario de {tipo}</h2>

      <div>
        <label style={fileLabelStyle}>Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={selectStyle}
        >
          <option value="independientes">Independientes</option>
          <option value="agencias">Agencias</option>
        </select>
      </div>

      <div>
        <label style={fileLabelStyle}>
          Tipo de Documento con el que te identificarás
        </label>
        <select
          value={tipoDocumento}
          onChange={handleTipoDocumentoChange}
          style={selectStyle}
        >
          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
      </div>

      {["email", "nombre", "fechaNacimiento", "ciudadResidencia", "departamento", "telefono", "numeroDocumento"].map((field) => (
        <div key={field}>
          <label style={fileLabelStyle}>
            {field
              .replace(/([A-Z])/g, " $1")
              .replace(/^[a-z]/, (char) => char.toUpperCase())}
          </label>
          <input
            type={field === "fechaNacimiento" ? "date" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
      ))}

      <div>
        <label style={fileLabelStyle}>Plataforma</label>
        <select
          name="plataforma"
          value={formData.plataforma}
          onChange={handleSelectChange}
          style={selectStyle}
        >
          <option value="" disabled>
            Selecciona una plataforma
          </option>
          {opcionesPlataforma[tipo].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={fileLabelStyle}>Tipo de Gestión</label>
        <select
          name="tipoGestion"
          value={formData.tipoGestion}
          onChange={handleSelectChange}
          style={selectStyle}
        >
          <option value="" disabled>
            Selecciona un tipo de gestión
          </option>
          {opcionesGestion[tipo].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={fileLabelStyle}>Tipo de Página</label>
        <select
          name="tipoPagina"
          value={formData.tipoPagina}
          onChange={handleSelectChange}
          style={selectStyle}
        >
          <option value="" disabled>
            Selecciona un tipo de página
          </option>
          {opcionesPagina.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={fileLabelStyle}>
          {tipoDocumento === "Pasaporte"
            ? "Foto del Pasaporte"
            : "Foto Cédula Frontal"}
        </label>
        <input
          type="file"
          name="fotoCedulaFrontal"
          onChange={handleFileChange}
          style={inputStyle}
        />
      </div>

      {tipoDocumento !== "Pasaporte" && (
        <div>
          <label style={fileLabelStyle}>Foto Cédula Trasera</label>
          <input
            type="file"
            name="fotoCedulaTrasera"
            onChange={handleFileChange}
            style={inputStyle}
          />
        </div>
      )}

      <div>
        <label style={fileLabelStyle}>
          {tipoDocumento === "Pasaporte"
            ? "Foto Pasaporte con Rostro"
            : "Foto Cédula con Rostro"}
        </label>
        <input
          type="file"
          name="fotoCedulaConRostro"
          onChange={handleFileChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={fileLabelStyle}>Foto Documento Secundario</label>
        <input
          type="file"
          name="licenciaConducir"
          onChange={handleFileChange}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={fileLabelStyle}>Foto Documento Hoja en Blanco</label>
        <input
          type="file"
          name="fotoDocumentoHojaEnBlanco"
          onChange={handleFileChange}
          style={inputStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Enviar
      </button>
      <br />
      <br />
    </form>
  );
};

export default Formulario;
