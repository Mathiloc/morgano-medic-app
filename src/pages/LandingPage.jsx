import React from 'react';
import { Header } from '../components/Header.jsx';
import { ProgramCard } from '../components/ProgramCard.jsx';
import { AffiliateBanner } from '../components/AffiliateBanner.jsx';
import { useAffiliateTracker } from '../hooks/useAffiliateTracker.js';
import '../styles/GlobalStyles.css';



import imgSerums from '../assets/images/Llamita-Serums.png';
import imgEnam from '../assets/images/Llamita-ENAM.png';
import imgResidentado from '../assets/images/Llamita-residentado.png';

export const LandingPage = () => {
  
  const { affiliateOffer } = useAffiliateTracker();
  
  const mainClass = affiliateOffer ? 'page-main' : 'page-main-no-banner';

  return (
    <> 
      <Header />

      {affiliateOffer && <AffiliateBanner offer={affiliateOffer} />}
      
      <main className={mainClass} id="hero">
        <div className="container hero-section">
          
          <h1 className="hero-title">
            Vamos a <span className="gradient-tech-flow">exigirte</span> hasta que logres tu plaza.
          </h1>
          
          <p className="hero-subtitle">
            Elige el programa que te llevará al éxito.
          </p>

          <div className="program-cards-container">
              
              {/* TARJETA 1: SERUMS */}
              <ProgramCard
                to="/serums"
                imgSrc={imgSerums} 
                imgAlt="Mascota Morgui para SERUMS"
                title="SERUMS 2026-I"
                description="La preparación más completa para tu examen."
              />
              
              {/* TARJETA 2: ENAM */}
              <ProgramCard
                to="/enam" 
                imgSrc={imgEnam} 
                imgAlt="Mascota Morgui para ENAM"
                title="ENAM 2025-II"
                description="Domina el Examen Nacional de Medicina."
              />
              
              {/* TARJETA 3: RESIDENTADO */}
              <ProgramCard
                to="/residentado" 
                imgSrc={imgResidentado}
                imgAlt="Mascota Morgui para Residentado"
                title="Residentado"
                description="Tu camino hacia la especialización."
              />

          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;