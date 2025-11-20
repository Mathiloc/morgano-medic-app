import { useState, useEffect } from 'react';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la petición al Backend (GET /api/dashboard)
    const fetchDashboard = () => {
      // Aquí están los datos que Romario marcó, ahora encapsulados
      const fakeData = {
        gamification: {
          progress: 75,
          streak: 3,
          badges: [
            {
              id: 1,
              nombre: 'Pionero',
              iconUrl: 'https://placehold.co/40x40/f4f7f5/20807C?text=P', // Ajusté el link para que funcione
            },
          ],
        },
        lastClasses: [
          {
            cursoId: '123',
            titulo: 'Cardiología: Repaso Esencial',
            area: 'Cardiología',
            thumbnail: 'https://placehold.co/60x60/20807C/ffffff?text=Cardio'
          },
          {
            cursoId: '456',
            titulo: 'Neumología: Casos Clínicos',
            area: 'Neumología',
            thumbnail: 'https://placehold.co/60x60/20807C/ffffff?text=Neumo'
          },
        ],
        stats: {
          simulacros: 12,
          promedio: 14.5,
          ranking: 45
        }
      };

      setTimeout(() => {
        setDashboardData(fakeData);
        setIsLoading(false);
      }, 1000);
    };

    fetchDashboard();
  }, []);

  return { dashboardData, isLoading };
};