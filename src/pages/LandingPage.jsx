// src/pages/LandingPage.jsx
import React from 'react';
import { Header } from '../components/Header.jsx';
import { ProgramCard } from '../components/ProgramCard.jsx';
import { AffiliateBanner } from '../components/AffiliateBanner.jsx';
import { useAffiliateTracker } from '../hooks/useAffiliateTracker.js';
import '../styles/GlobalStyles.css';
export const LandingPage = () => {
  
  const { affiliateOffer } = useAffiliateTracker();
  
  // Esta clase ajustará el padding si el banner de afiliado aparece
  const mainClass = affiliateOffer ? 'page-main' : 'page-main-no-banner';

  return (
    <> {/* Fragmento para agrupar todo */}
      
      <Header />

      {/* El banner de afiliado se renderiza si existe la oferta */}
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
              
              <ProgramCard
                to="/serums"
                imgSrc="https://i.ibb.co/xqrQGp68/Llamita-Serums.png"
                imgAlt="Mascota Morgui para SERUMS"
                title="SERUMS 2026-I"
                description="La preparación más completa para tu examen."
              />
              
              <ProgramCard
                href="https://morganomedic.com/enam/"
                imgSrc="https://i.ibb.co/ZQCS4n0/LLamita-ENAM.png"
                imgAlt="Mascota Morgui para ENAM"
                title="ENAM 2025-II"
                description="Domina el Examen Nacional de Medicina."
              />
              
              <ProgramCard
                href="#"
                imgSrc="https://i.ibb.co/NdLcHqNd/Llamita-residentado.png"
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