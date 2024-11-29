import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginSpace = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Cargar la contraseña almacenada en localStorage (si existe)
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberPassword(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales en el frontend
    if (username === "tokenautas" && password === "spacemodels") {
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
      });

      // Si "Recordar contraseña" está habilitado, guarda las credenciales
      if (rememberPassword) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        // Si no, elimina cualquier credencial almacenada
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      // Guardar estado de sesión
      localStorage.setItem("isAuthenticated", "true");

      // Redirigir al panel de administración
      navigate("/administrador");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  // Estilos
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw", // Ocupa todo el ancho de la ventana
    backgroundColor: "#1a1433",
    padding: "20px", // Para manejar dispositivos pequeños
  };

  const formWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  };

  const formStyle = {
    backgroundColor: "#2c2547",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    color: "#fff",
    width: "100%", // Asegura que el formulario ocupe todo el espacio del contenedor
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#fc466b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const checkboxContainerStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "20px",
  };

  const checkboxStyle = {
    marginRight: "10px",
  };

  const labelStyle = {
    color: "#fff",
    fontSize: "14px",
  };

  const errorStyle = {
    color: "#fc466b",
    marginBottom: "15px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <form style={formStyle} onSubmit={handleLogin}>
          <h2 style={{ marginBottom: "30px", fontSize: "1.8rem" }}>Login Space</h2>
          {error && <p style={errorStyle}>{error}</p>}
          <input
            style={inputStyle}
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={checkboxContainerStyle}>
            <input
              style={checkboxStyle}
              type="checkbox"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
            />
            <label style={labelStyle}>Recordar contraseña</label>
          </div>
          <button style={buttonStyle} type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSpace;
