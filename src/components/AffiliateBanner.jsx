// src/components/AffiliateBanner.jsx
import React from 'react'; // <-- AÑADIR ESTA LÍNEA

export const AffiliateBanner = ({ offer }) => {
  const bannerStyle = {
    animation: 'fadeInDown 0.5s ease-out forwards',
  };

  return (
    <div 
      id="affiliate-banner" 
      className="bg-mm-gris-oscuro border-b-4 border-mm-verde-menta text-white p-4 shadow-lg"
      style={bannerStyle}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4">
        <img src="https://i.ibb.co/gNFCHMN/Llamita2.png" alt="Morgui Motivadora" className="h-16 w-16 hidden sm:block" />
        <div>
          <p className="font-poppins font-bold text-lg md:text-xl">
            ¡Una invitación especial de {offer.affiliateName}!
          </p>
          <p className="text-gray-300">
            Obtén un <span className="font-bold text-mm-verde-menta text-lg">{offer.discountPercentage}% DE DESCUENTO</span> exclusivo en tu inscripción.
          </p>
        </div>
      </div>
    </div>
  );
};