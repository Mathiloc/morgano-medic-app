import { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';

export const useAffiliate = () => {
  const [affiliateOffer, setAffiliateOffer] = useState(null);

  useEffect(() => {
    const checkAffiliate = async () => {
      // 1. Simulamos que pedimos al "Backend" verificar si hay un referido activo.
      // No leemos la cookie directamente en la vista.
      
      // (En un caso real, esto sería solo una llamada a api.get('/affiliate/current'))
      // Aquí mantenemos la lógica de la cookie PERO encapsulada, lejos de la vista.
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
      
      const affiliateId = getCookie('morgano_ref_id');
      
      if (affiliateId) {
        try {
          const response = await apiCall('getAffiliateOfferDetails', { affiliateId });
          if (response.success && response.data) {
            setAffiliateOffer({ 
              id: affiliateId, 
              discount: response.data.discountPercentage, 
              name: response.data.affiliateName 
            });
          }
        } catch (error) {
          console.error("Error verificando afiliado", error);
        }
      }
    };

    checkAffiliate();
  }, []);

  return { affiliateOffer };
};