import React from 'react';

// Logo blanco de tu marca
const logoBlanco = "https://i.ibb.co/9k43qpSZ/Logo-Blanco.png";

export function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-grid">
          
          {/* Columna 1: Logo y Redes */}
          <div className="footer-col-main">
            <a href="/">
              <img src={logoBlanco} alt="Logo MorganoMedic" className="footer-logo" />
            </a>
            <p className="footer-description">
              La preparación inteligente para los médicos del futuro.
            </p>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/morganomedic/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/MorganoMedic" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.tiktok.com/@morganomedic" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Columna 2: Producto */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">Producto</h3>
            <ul>
              <li><a href="#cursos">Cursos</a></li>
              <li><a href="#precios">Planes</a></li>
              <li><a href="#metodo">Nuestro Método</a></li>
              <li><a href="#resenas">Comunidad</a></li>
            </ul>
          </div>

          {/* Columna 3: Blog */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">Blog</h3>
            <ul>
              <li><a href="#">Eventos</a></li>
              <li><a href="#">Foro</a></li>
            </ul>
          </div>
          
          {/* Columna 4: Compañía */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">Compañía</h3>
            <ul>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 5: Legal */}
          <div className="footer-col-links">
            <h3 className="footer-col-title">Legal</h3>
            <ul>
              <li><a href="#">Términos</a></li>
              <li><a href="#">Privacidad</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} MorganoMedic. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}