import React from 'react';
import { useRanking } from '../hooks/useRanking';
import { Trophy, Medal, TrendingUp, User } from 'lucide-react';
import '../styles/Dashboard.css';

// --- COMPONENTE: Gráfico Donut Simple (SVG) ---
const SimpleDonutChart = ({ data }) => {
  // Cálculo simple para dibujar el gráfico SVG sin librerías externas
  let accumulatedDeg = 0;
  return (
    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
        {data.map((slice, i) => {
          const deg = (slice.value / 100) * 360;
          const strokeDasharray = `${deg} 360`;
          const style = {
             strokeDasharray: `${deg} 1000`, // Truco para el arco
             strokeDashoffset: -accumulatedDeg,
             stroke: slice.color,
             fill: 'none',
             strokeWidth: '15' // Grosor del anillo
          };
          accumulatedDeg += deg;
          // Radio 40 para que encaje en viewBox 100
          return <circle key={i} cx="50" cy="50" r="40" style={style} />;
        })}
      </svg>
      {/* Texto central */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#666' }}>Puntos</span>
      </div>
    </div>
  );
};

// --- COMPONENTE: Fila de la Tabla ---
const RankRow = ({ user }) => {
  const isTop3 = user.rank <= 3;
  let medalColor = '#6c757d'; // Gris default
  if (user.rank === 1) medalColor = '#FFD700'; // Oro
  if (user.rank === 2) medalColor = '#C0C0C0'; // Plata
  if (user.rank === 3) medalColor = '#CD7F32'; // Bronce

  return (
    <div 
      className="class-item" 
      style={{ 
        cursor: 'default',
        backgroundColor: user.isCurrentUser ? '#E9FBFB' : 'white', // Resalta tu fila
        border: user.isCurrentUser ? '1px solid var(--verde-principal)' : '1px solid var(--borde-color)',
        marginBottom: '0.5rem'
      }}
    >
      {/* Columna 1: Ranking */}
      <div style={{ width: '40px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: isTop3 ? medalColor : 'var(--texto-secundario)' }}>
        {isTop3 ? <Trophy size={20} fill={medalColor} /> : user.rank}
      </div>

      {/* Columna 2: Avatar e Info */}
      <div className="class-info" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
            width: '36px', height: '36px', borderRadius: '50%', 
            background: isTop3 ? medalColor : 'var(--fondo-principal)',
            color: isTop3 ? 'white' : 'var(--texto-secundario)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
        }}>
            {user.avatar}
        </div>
        <div>
            <h4 style={{ margin: 0 }}>
                {user.name} {user.isCurrentUser && <span style={{fontSize:'0.7rem', background:'var(--verde-principal)', color:'white', padding:'2px 6px', borderRadius:'4px', marginLeft:'5px'}}>TÚ</span>}
            </h4>
        </div>
      </div>

      {/* Columna 3: Puntos */}
      <div style={{ fontWeight: 'bold', color: 'var(--texto-principal)' }}>
        {user.points.toLocaleString()} pts
      </div>
    </div>
  );
};

export default function RankingPage() {
  const { loading, leaderboard, userStats } = useRanking();

  if (loading) return <div style={{padding:'2rem'}}>Cargando ranking...</div>;

  return (
    <div className="fade-in">
      <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-titulos)' }}>Ranking General</h1>

      {/* SECCIÓN SUPERIOR: ESTADÍSTICAS */}
      {userStats && (
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          {/* Card 1: Tu Puesto */}
          <div className="area-card" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'flex-start', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div className="area-card-icon"><Medal size={24}/></div>
                <span style={{ color: 'var(--texto-secundario)' }}>Tu Posición</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-titulos)', fontWeight: 'bold', color: 'var(--texto-principal)' }}>
                #{userStats.rank}
            </div>
          </div>

          {/* Card 2: Puntos Totales */}
          <div className="area-card" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'flex-start', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div className="area-card-icon"><TrendingUp size={24}/></div>
                <span style={{ color: 'var(--texto-secundario)' }}>Puntos Totales</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-titulos)', fontWeight: 'bold', color: 'var(--verde-principal)' }}>
                {userStats.totalPoints.toLocaleString()}
            </div>
          </div>

          {/* Card 3: Desglose (Gráfico) */}
          <div className="area-card" style={{ cursor: 'default', background: 'white', justifyContent: 'space-between' }}>
             <div>
                <h4 style={{marginBottom:'1rem'}}>Origen de Puntos</h4>
                <div style={{fontSize:'0.85rem', display:'flex', flexDirection:'column', gap:'5px'}}>
                    {userStats.breakdown.map((item, i) => (
                        <div key={i} style={{display:'flex', alignItems:'center', gap:'5px'}}>
                            <span style={{width:8, height:8, borderRadius:'50%', background:item.color}}></span>
                            <span>{item.label}: {item.value}%</span>
                        </div>
                    ))}
                </div>
             </div>
             <SimpleDonutChart data={userStats.breakdown} />
          </div>
        </div>
      )}

      {/* SECCIÓN INFERIOR: TABLA */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid var(--borde-color)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Clasificación</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header de la tabla (falso) */}
            <div style={{ display: 'flex', padding: '0 1rem', marginBottom: '0.5rem', color: 'var(--texto-secundario)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                <span style={{ width: '40px', textAlign: 'center' }}>#</span>
                <span style={{ flex: 1, paddingLeft: '1rem' }}>Estudiante</span>
                <span>Puntos</span>
            </div>
            
            {/* Filas */}
            {leaderboard.map((user) => (
                <RankRow key={user.rank} user={user} />
            ))}
        </div>
      </div>

    </div>
  );
}