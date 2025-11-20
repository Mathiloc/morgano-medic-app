import React, { useEffect } from 'react';
// Corregimos la ruta a minúsculas "context" para evitar errores en producción
import { useAuth } from '../Context/AuthContext.jsx'; 
import { DashboardSkeleton } from '../components/DashboardSkeleton.jsx';
import { useDashboard } from '../hooks/useDashboard'; // 👈 1. IMPORTAMOS EL CEREBRO
import '../styles/Dashboard.css';

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

export function InicioPage() {
  const { currentUser } = useAuth();
  
  // 👇 2. USAMOS EL HOOK
  // Ya no hay datos falsos aquí. El componente pide los datos y el hook se encarga.
  const { dashboardData, isLoading } = useDashboard();

  // --- useEffect para Feather Icons ---
  useEffect(() => {
    // Verificamos si ya cargó y si window.feather existe
    if (!isLoading && window.feather) {
      window.feather.replace();
    }
  }, [isLoading]); 

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
      
      {/* WIDGET: CLASES */}
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

      {/* WIDGET: PROGRESO */}
      <div id="progress-container" className="dashboard-widget">
        <h3 className="widget-title">Tu Progreso</h3>
        <ProgressCircle progress={progress} />
      </div>

      {/* WIDGET: RACHA */}
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

      {/* WIDGET: INSIGNIAS */}
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
                  // Usamos la propiedad correcta del hook (iconUrl)
                  src={badge.iconUrl || badge.iconoUrl} 
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