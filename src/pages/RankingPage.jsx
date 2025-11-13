import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../styles/Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- COMPONENTE DE SKELETON (ESQUELETO) ---
const RankingSkeleton = () => (
  <div>
    <div className="user-stats-grid">
      <div className="stat-card skeleton" style={{ height: '110px' }}></div>
      <div className="stat-card skeleton" style={{ height: '110px' }}></div>
      <div className="stat-card stat-card--chart skeleton" style={{ height: '230px' }}></div>
    </div>
    <h2 className="skeleton" style={{ height: '28px', width: '40%', marginTop: '2rem', fontFamily: 'var(--font-titulos)' }}></h2>
    <div className="ranking-table-container skeleton">
      <div style={{ padding: '1rem' }}>
        <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
        <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
        <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
      </div>
    </div>
  </div>
);

// --- DATOS DE SIMULACIÓN ---
const fakeRankingData = {
  currentUser: { rank: 5, points: 850, breakdown: { Banqueos: 400, Simulacros: 300, Clases: 150 } },
  ranking: [
    { rank: 1, name: 'Dra. House', points: 1500, isCurrentUser: false },
    { rank: 2, name: 'Dr. Strange', points: 1250, isCurrentUser: false },
    { rank: 3, name: 'Dr. John Doe', points: 1100, isCurrentUser: false },
    { rank: 4, name: 'InternoTop', points: 900, isCurrentUser: false },
    { rank: 5, name: 'TuUsuario', points: 850, isCurrentUser: true },
    { rank: 6, name: 'EstudianteX', points: 700, isCurrentUser: false },
  ],
};
// --- FIN DE DATOS DE SIMULACIÓN ---

// --- COMPONENTE DE ESTADÍSTICAS DEL USUARIO (Nivel 1) ---
const UserStatsGrid = ({ stats }) => {
  const chartData = {
    labels: Object.keys(stats.breakdown || {}),
    datasets: [{
      data: Object.values(stats.breakdown || {}),
      backgroundColor: ['#20807C', '#48E5C2', '#FFAA00', '#9333EA', '#6c757d'],
      borderWidth: 0,
    }],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: { legend: { display: false } },
  };
  const legendItems = Object.entries(stats.breakdown || {});

  return (
    <div className="user-stats-grid">
      <div className="stat-card">
        <h3 className="stat-card__title">Tu Ranking</h3>
        <p className="stat-card__value">#{stats.rank ?? '-'}</p>
      </div>
      <div className="stat-card">
        <h3 className="stat-card__title">Puntaje Total</h3>
        <p className="stat-card__value">{(stats.points ?? 0).toLocaleString('es-PE')}</p>
      </div>
      <div className="stat-card stat-card--chart">
        <div className="chart-container">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="chart-legend">
          <h3 className="stat-card__title">Puntos por Actividad</h3>
          <ul id="legend-list" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '.9rem' }}>
            {legendItems.map(([label, value], i) => (
              <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: chartData.datasets[0].backgroundColor[i] }}></span>
                <strong>{label}:</strong> {value.toLocaleString('es-PE')} pts
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE TABLA DE RANKING (Nivel 2) ---
const RankingTable = ({ rankingList, currentUserEmail }) => {
  const colors = ['#20807C', '#48E5C2', '#FFAA00', '#9333EA', '#6c757d'];
  return (
    <div className="ranking-table-container">
      <table className="ranking-table">
        <thead>
          <tr><th>Pos.</th><th>Estudiante</th><th>Puntos</th></tr>
        </thead>
        <tbody>
          {rankingList.map((user) => {
            const color = colors[(user.rank - 1) % colors.length];
            const initial = (user.name || 'U').charAt(0).toUpperCase();
            return (
              <tr key={user.rank} className={user.isCurrentUser ? 'current-user-row' : ''}>
                <td className="rank-cell">{user.rank}</td>
                <td className="user-cell">
                  <div className="user-initial-cell" style={{ backgroundColor: color }}>{initial}</div>
                  <span>{user.name}</span>
                </td>
                <td className="points-cell">{(user.points || 0).toLocaleString('es-PE')} pts</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// --- PÁGINA PRINCIPAL DE RANKING ---
export function RankingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [rankingData, setRankingData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      setTimeout(() => {
        const data = fakeRankingData;
        data.ranking = data.ranking.map((r) => ({ ...r, isCurrentUser: r.name === 'TuUsuario' }));
        data.currentUser = data.ranking.find(r => r.isCurrentUser) || data.currentUser;
        setRankingData(data);
        setIsLoading(false);
      }, 1000);
    };
    loadData();
  }, [currentUser]);

  if (isLoading) {
    return <RankingSkeleton />;
  }

  if (!rankingData) {
    return <p style={{ color: 'var(--error)' }}>No se pudo cargar el ranking.</p>;
  }

  return (
    <div id="view-ranking">
      <div id="user-stats-container">
        <UserStatsGrid stats={rankingData.currentUser} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-titulos)', marginTop: '2.5rem' }}>
        Clasificación General
      </h2>
      <div id="ranking-list-container">
        <RankingTable rankingList={rankingData.ranking} />
      </div>
    </div>
  );
}