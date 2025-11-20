import React from 'react';
// 1. Importamos el hook que creamos (asegúrate de haber creado el archivo en hooks/)
import { useLearningPath } from '../hooks/useLearningPath';
// 2. Importamos iconos modernos de Lucide (reemplaza a feather)
import { Layers, ArrowLeft, CheckCircle, PlayCircle, Lock } from 'lucide-react';
import '../styles/Dashboard.css';

// --- COMPONENTE DE SKELETON (Lo mantenemos igual, se ve bien) ---
const AreaSkeleton = ({ count = 3 }) => (
  <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="skeleton-card" style={{ background: 'var(--superficie-color)' }}>
        <div className="skeleton skeleton-icon" style={{ borderRadius: '12px', width:'48px', height:'48px' }}></div>
        <div className="skeleton-text-group">
          <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
          <div className="skeleton skeleton-text short" style={{ width: '40%' }}></div>
        </div>
      </div>
    ))}
  </div>
);

// --- COMPONENTE DE ITEM DE TIMELINE ---
const TimelineItem = ({ lesson }) => {
  const { status, titulo, descripcion, cursoId } = lesson;
  
  // Lógica de iconos y botones actualizada a React + Lucide
  let icon, button;

  switch (status) {
    case 'completed':
      icon = <CheckCircle size={20} />;
      button = (
        <button 
          onClick={() => window.location.href = `/cursosmg/?cursoId=${cursoId}`} 
          className="morganoboard-btn btn-secondary"
        >
          Repasar Clase
        </button>
      );
      break;
    case 'unlocked':
      icon = <PlayCircle size={20} />;
      button = (
        <button 
          onClick={() => window.location.href = `/cursosmg/?cursoId=${cursoId}`} 
          className="morganoboard-btn"
        >
          Empezar Lección
        </button>
      );
      break;
    default: // locked
      icon = <Lock size={20} />;
      button = (
        <button 
          onClick={() => window.open('https://morganomedic.com/serums/#precios', '_blank')}
          className="morganoboard-btn" 
          style={{ background: 'var(--acento-violeta)' }}
        >
          Mejorar Plan
        </button>
      );
  }

  return (
    <div className={`timeline-item timeline-item--${status}`}>
      <div className="timeline-connector"></div>
      <div className="timeline-icon">
        {/* Renderizamos el icono directamente */}
        {icon}
      </div>
      <div className="timeline-content">
        <h3 className="timeline-content__title">{titulo}</h3>
        <p className="timeline-content__description">{descripcion}</p>
        <div className="timeline-button-container">{button}</div>
      </div>
    </div>
  );
};

// --- VISTA DE LÍNEA DE TIEMPO ---
const LearningPathTimelineView = ({ areaTitle, lessons, onBack }) => (
  <div id="ruta-learning-path">
    <button className="back-button" onClick={onBack}>
      <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Volver a Áreas
    </button>
    <h1 style={{ fontFamily: 'var(--font-titulos)', marginBottom: '2rem' }}>{areaTitle}</h1>
    
    <div className="timeline-container">
        {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
                <TimelineItem key={lesson.cursoId || index} lesson={lesson} />
            ))
        ) : (
            <p>No hay clases disponibles en esta área.</p>
        )}
    </div>
  </div>
);

// --- VISTA DE SELECCIÓN DE ÁREAS ---
const AreaSelectionView = ({ areas, cursosPorArea, onSelectArea }) => (
  <div id="ruta-area-selection" className="dashboard-grid">
    {areas.map((area) => {
      // Verificamos si el área tiene cursos antes de mostrarla
      if (cursosPorArea[area.nombre] && cursosPorArea[area.nombre].length > 0) {
        return (
          <div 
            key={area.nombre} 
            className="area-card" 
            onClick={() => onSelectArea(area.nombre)} 
            style={{ cursor: 'pointer' }}
          >
            <div className="area-card-icon">
              <Layers size={24} />
            </div>
            <div className="area-card-info">
              <h3>{area.nombre}</h3>
              <p>{area.descripcion}</p>
            </div>
          </div>
        );
      }
      return null;
    })}
  </div>
);

// --- PÁGINA PRINCIPAL DE LA RUTA ---
export default function RutaPage() {
  // 3. Usamos el hook personalizado para toda la lógica y estado
  // Esto reemplaza tu useState manual, useEffect y setTimeout
  const { 
    loading, 
    error, 
    areas, 
    courses, 
    selectedArea, 
    selectArea, 
    goBack 
  } = useLearningPath();

  // Renderizado condicional basado en el estado del Hook

  if (loading) {
    return <AreaSkeleton count={4} />;
  }

  if (error) {
    return (
        <div className="dashboard-widget" style={{ textAlign: 'center', color: 'var(--error)' }}>
            <h3>Error de conexión</h3>
            <p>{error}</p>
            <button className="morganoboard-btn" onClick={() => window.location.reload()}>Recargar</button>
        </div>
    );
  }

  // Si hay un área seleccionada, mostramos el Timeline
  if (selectedArea) {
    const lessons = courses[selectedArea] || [];
    return (
      <LearningPathTimelineView
        areaTitle={selectedArea}
        lessons={lessons}
        onBack={goBack}
      />
    );
  }

  // Si no, mostramos la selección de áreas
  return (
    <AreaSelectionView
      areas={areas}
      cursosPorArea={courses}
      onSelectArea={selectArea}
    />
  );
}