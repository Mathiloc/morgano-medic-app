// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import logoBlanco from '../assets/images/Logo-Blanco.png'
// ¡Usamos tu logo de marca guardado!


export const Header = () => {
  return (
    // Clases CSS personalizadas en lugar de Tailwind
    <header className="site-header">
      <div className="container site-header-container">
        <a href="#hero" className="site-logo-link">
          <img src={logoBlanco} alt="Logo de MorganoMedic" className="site-logo-img" />
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