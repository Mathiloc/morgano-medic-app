// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  // Revisa el localStorage al cargar
  useEffect(() => {
    try {
      const userString = localStorage.getItem('morganoUser');
      if (userString) {
        setCurrentUser(JSON.parse(userString));
      }
    } catch (error) {
      console.warn("Error al cargar usuario de localStorage:", error);
      localStorage.clear();
    }
    setLoading(false); // Avisa que ya terminó de cargar
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Funciones de Login/Logout
  const login = (userData) => {
    localStorage.setItem('morganoUser', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* Forzamos que la app se renderice siempre.
        Los componentes hijos (Layout y Login) decidirán qué mostrar
        basado en el estado 'loading'.
      */}
      {children}
    </AuthContext.Provider>
  );
}

// Hook simple para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};