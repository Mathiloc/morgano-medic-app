// src/hooks/useAffiliateTracker.js

// ¡AÑADIR ESTAS IMPORTACIONES!
import { useState, useEffect } from 'react'; 

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvrsoY40qGUuixjrkSWo6ZCtACUYrOHc-1k3zA2I3z51QPeyl7RyzNYXAg0xj2iynO/exec';

const callApi = async (action, payload) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action, payload }),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    return { success: false, message: error.message };
  }
};

export const useAffiliateTracker = () => {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    
    const runTracker = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const refId = urlParams.get('ref');

      if (refId) {
        const expires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toUTCString();
        const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `morgano_ref_id=${refId}; expires=${expires}; path=/; SameSite=Lax${secureFlag}`;
        
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
        
        callApi('trackAffiliateClick', { affiliateId: refId });

        const response = await callApi('getAffiliateOfferDetails', { affiliateId: refId });
        if (response.success && response.data) {
          setOffer(response.data); 
        }
      }
    };

    runTracker();
  
  }, []); 

  return { affiliateOffer: offer };
};