import React, { createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config"; // Importa la instancia de autenticación de Firebase

export const authContext = createContext(); // Crea un Context para la autenticación

export const useAuth = () => {
  const context = useContext(authContext); // Permite consumir el Context de autenticación
  if (!context) {
    console.log("error creating auth context"); // Se registra un error si no hay Context
  }
  return context; // Retorna el Context para su uso
};

export function AuthProvider({children}){
    return <authContext.Provider>{children}</authContext.Provider>
}