// src/components/ProgramCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. ¡IMPORTANTE! Importamos Link

export const ProgramCard = ({ href, to, imgSrc, imgAlt, title, description }) => {

  // 2. Este es el contenido visual de la tarjeta
  const cardContent = (
    <div className="program-card-inner">
      <img 
        src={imgSrc} 
        alt={imgAlt} 
        className="program-card-image"
      />
      <h3 className="program-card-title">
        {title}
      </h3>
      <p className="program-card-description">
        {description}
      </p>
    </div>
  );

  // 3. ¡ESTA ES LA LÓGICA QUE FALTABA!
  // Si el componente recibe un prop 'to', usa <Link> (para rutas internas)
  if (to) {
    return (
      <Link to={to} className="program-card">
        {cardContent}
      </Link>
    );
  }

  // 4. Si no, usa un <a> normal (para rutas externas como "enam.com")
  return (
    <a 
      href={href} 
      className="program-card" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {cardContent}
    </a>
  );
};