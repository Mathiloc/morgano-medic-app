import React from 'react';
import { Link } from 'react-router-dom'; // 1. ¡IMPORTANTE! Importamos Link

export const ProgramCard = ({ href, to, imgSrc, imgAlt, title, description }) => {

  // 2. Este es el contenido visual de la tarjeta
  // (Lo guardamos en una variable para no repetirlo dos veces)
  const cardContent = (
    <div className="program-card-inner">
      <img 
        src={imgSrc} 
        alt={imgAlt} 
        className="program-card-image"
        loading="lazy"
      />
      <div className="program-card-content">
        <h3 className="program-card-title">
          {title}
        </h3>
        <p className="program-card-description">
          {description}
        </p>
      </div>
    </div>
  );

  // 3. LÓGICA DE NAVEGACIÓN
  // Si el componente recibe un prop 'to', usa <Link> de React Router
  // Esto evita que la página se recargue por completo (ideal para /enam, /serums)
  if (to) {
    return (
      <Link to={to} className="program-card">
        {cardContent}
      </Link>
    );
  }

  // 4. Si no hay 'to', usa un enlace normal <a>
  // Ideal para enlaces externos como WhatsApp, Facebook, etc.
  return (
    <a 
      href={href || "#"} 
      className="program-card" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {cardContent}
    </a>
  );
};

export default ProgramCard;