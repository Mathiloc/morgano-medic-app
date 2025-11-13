import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import { DashboardSkeleton } from '../components/DashboardSkeleton.jsx';
import '../styles/Dashboard.css'; // Importamos los estilos

// Componente de círculo de progreso
function ProgressCircle({ progress }) {
  const style = {
    background: `conic-gradient(var(--verde-principal) ${progress}%, var(--borde-color) 0)`,
  };
  return (
    <div className="progress-circle-container">
      <div className="progress-circle" style={style}>
        <div className="progress-value">{progress}%</div>
      </div>
      <p>Completado</p>
    </div>
  );
}

// --- DATOS DE SIMULACIÓN ---
const fakeDashboardData = {
  gamification: {
    progress: 75,
    streak: 3,
    badges: [
      {
        nombre: 'Pionero',
        iconoUrl: 'https://placehold.co/40x40/f4f7f5/20807C?text=P',
      },
    ],
  },
  lastClasses: [
    {
      cursoId: '123',
      titulo: 'Cardiología: Repaso Esencial',
      area: 'Cardiología',
    },
    {
      cursoId: '456',
      titulo: 'Neumología: Casos Clínicos',
      area: 'Neumología',
    },
  ],
};
// --- FIN DE DATOS DE SIMULACIÓN ---

export function InicioPage() {
  const { currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      setIsLoading(true);

      // Simulación
      setTimeout(() => {
        setDashboardData(fakeDashboardData);
        setIsLoading(false);
      }, 1000);
    };

    loadData();
  }, [currentUser]);

  // --- AÑADIDO: useEffect para Feather Icons ---
  useEffect(() => {
    if (!isLoading && window.feather) {
      // Dibuja los íconos (como "play-circle" y "zap")
      window.feather.replace();
    }
  }, [isLoading]); // Se activa cuando isLoading cambia

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!dashboardData) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--error)' }}>¡Ups! Hubo un problema</h3>
        <p>No se pudo cargar la información del dashboard.</p>
      </div>
    );
  }

  const { gamification, lastClasses } = dashboardData;
  const progress = gamification?.progress || 0;
  const streak = gamification?.streak || 0;

  return (
    <div className="dashboard-grid">
      <div
        id="last-classes-container"
        className="dashboard-widget"
        style={{ gridColumn: '1 / -1' }}
      >
        <h3 className="widget-title">Continuar Aprendiendo</h3>
        <div className="class-list">
          {lastClasses?.length > 0 ? (
            lastClasses.map((cls) => (
              <a
                key={cls.cursoId}
                href={`/cursosmg/?cursoId=${encodeURIComponent(cls.cursoId)}`}
                className="class-item"
              >
                <div className="class-icon">
                  <i data-feather="play-circle"></i>
                </div>
                <div className="class-info">
                  <h4>{cls.titulo}</h4>
                  <p>{cls.area}</p>
                </div>
              </a>
            ))
          ) : (
            <p>
              ¡Aún no has completado ninguna clase!{' '}
              <a href="/board/ruta">Empieza tu primera lección</a>.
            </p>
          )}
        </div>
      </div>
      <div id="progress-container" className="dashboard-widget">
        <h3 className="widget-title">Tu Progreso</h3>
        <ProgressCircle progress={progress} />
      </div>
      <div id="streak-container" className="dashboard-widget">
        <h3 className="widget-title">Racha de Estudio</h3>
        <div className="streak-container">
          <div className="streak-icon">
            <i data-feather="zap" style={{ color: 'var(--acento-ambar)' }}></i>
          </div>
          <div className="streak-info">
            <div className="days">{streak}</div>
            <div className="label">días seguidos</div>
          </div>
        </div>
      </div>
      <div id="badges-container" className="dashboard-widget">
        <h3 className="widget-title">Mis Insignias</h3>
        {gamification?.badges?.length > 0 ? (
          <div className="badges-grid">
            {gamification.badges.map((badge) => (
              <div
                key={badge.nombre}
                className="badge-item"
                title={badge.nombre}
              >
                <img
                  src={badge.iconoUrl}
                  alt={badge.nombre}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Gana insignias al completar cursos.</p>
        )}
      </div>
    </div>
  );
}