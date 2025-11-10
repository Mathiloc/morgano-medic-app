import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para que el logo te lleve al inicio

// Tu logo de marca
const LOGO_BLANCO = "https://i.ibb.co/9k43qpSZ/Logo-Blanco.png";

export const SerumsHeader = () => {
  // 1. Reemplazamos 'x-data' de Alpine.js con 'useState' de React
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Función para cerrar el menú (la usaremos en los enlaces)
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="serums-header">
      <div className="container serums-header-container">
        
        {/* Logo */}
        <Link to="/" className="serums-logo-link">
          <img src={LOGO_BLANCO} alt="Logo MorganoMedic" className="serums-logo-img" />
        </Link>
        
        {/* 3. Navegación de Escritorio */}
        <nav className="serums-nav-desktop">
          <a href="#metodo">Nuestro Método</a>
          <a href="#cursos">Programas</a>
          <a href="#doctores">Doctores</a>
          <a href="#resenas">Testimonios</a>
          <a href="#precios">Planes</a>
          <a href="#faq">FAQs</a>
        </nav>

        {/* Botón de Ingresar (Escritorio) */}
        <div className="serums-nav-desktop-actions">
          <Link to="/login" className="nav-button gradient-tech-flow">Ingresar</Link>
        </div>

        {/* 4. Botón del Menú Móvil (reemplaza @click) */}
        <div className="serums-nav-mobile-toggle">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="icon-menu" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 5. Menú Móvil Desplegable (reemplaza 'x-show') */}
      {/* Usamos renderizado condicional de React */}
      {isMobileMenuOpen && (
        <div className="serums-nav-mobile-menu">
          {/* Hacemos que al hacer clic en un enlace se cierre el menú */}
          <nav onClick={closeMenu}>
            <a href="#metodo">Nuestro Método</a>
            <a href="#cursos">Programas</a>
            <a href="#doctores">Doctores</a>
            <a href="#resenas">Testimonios</a>
            <a href="#precios">Planes</a>
            <a href="#faq">FAQs</a>
            <a href="https://morganomedic.com/morganoboard/" className="nav-button gradient-tech-flow">Ingresar</a>
          </nav>
        </div>
      )}
    </header>
  );
};