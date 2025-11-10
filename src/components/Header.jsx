// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// ¡Usamos tu logo de marca guardado!
const LOGO_BLANCO = "https://i.ibb.co/9k43qpSZ/Logo-Blanco.png";

export const Header = () => {
  return (
    // Clases CSS personalizadas en lugar de Tailwind
    <header className="site-header">
      <div className="container site-header-container">
        <a href="#hero" className="site-logo-link">
          <img src={LOGO_BLANCO} alt="Logo de MorganoMedic" className="site-logo-img" />
        </a>
        <nav className="site-nav">
          <Link to="/login" className="nav-button gradient-tech-flow">
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
};