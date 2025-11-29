import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

// DATOS MOCK: El Top 10 de estudiantes
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Dra. Andrea L.', points: 15420, avatar: 'A', isCurrentUser: false },
  { rank: 2, name: 'Dr. Carlos M.', points: 14850, avatar: 'C', isCurrentUser: false },
  { rank: 3, name: 'Dr. Medrano', points: 14200, avatar: 'M', isCurrentUser: true }, // ¡Ese eres tú!
  { rank: 4, name: 'Dra. Sofia R.', points: 13900, avatar: 'S', isCurrentUser: false },
  { rank: 5, name: 'Dr. Juan P.', points: 12500, avatar: 'J', isCurrentUser: false },
  { rank: 6, name: 'Dra. Elena T.', points: 11200, avatar: 'E', isCurrentUser: false },
  { rank: 7, name: 'Dr. Luis G.', points: 10800, avatar: 'L', isCurrentUser: false },
];

// Estadísticas personales detalladas
const MOCK_STATS = {
  rank: 3,
  totalPoints: 14200,
  breakdown: [
    { label: 'Simulacros', value: 60, color: '#20807C' },
    { label: 'Banqueos', value: 30, color: '#48E5C2' },
    { label: 'Asistencia', value: 10, color: '#FFAA00' }
  ]
};

export const useRanking = () => {
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    // Simulamos carga de API
    setLoading(true);
    setTimeout(() => {
      setLeaderboard(MOCK_LEADERBOARD);
      setUserStats(MOCK_STATS);
      setLoading(false);
    }, 800);
  }, [currentUser]);

  return { loading, leaderboard, userStats };
};