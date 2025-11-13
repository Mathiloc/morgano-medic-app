import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
// import feather from 'feather-icons'; // ELIMINADO
import '../styles/Dashboard.css';

// --- COMPONENTE DE SKELETON (ESQUELETO) ---
const AreaSkeleton = ({ count = 3 }) => (
  <div>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="skeleton-card" aria-hidden="true">
        <div
          className="skeleton skeleton-icon"
          style={{ borderRadius: '12px' }}
        ></div>
        <div className="skeleton-text-group">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      </div>
    ))}
  </div>
);

// --- DATOS DE SIMULACIÓN ---
const fakeLearningPathData = {
  areas: [
    { nombre: 'Cardiología', descripcion: 'Domina el corazón y el sistema vascular.' },
    { nombre: 'Neumología', descripcion: 'Todo sobre pulmones y el sistema respiratorio.' },
    { nombre: 'Endocrinología', descripcion: 'Hormonas y metabolismo.' },
  ],
  cursosPorArea: {
    Cardiología: [
      { cursoId: 'cardio1', titulo: 'Lección 1: Anatomía Cardíaca', descripcion: 'Un repaso fundamental.', status: 'completed' },
      { cursoId: 'cardio2', titulo: 'Lección 2: Interpretación de ECG Básico', descripcion: 'Aprende a leer un ECG.', status: 'unlocked' },
      { cursoId: 'cardio3', titulo: 'Lección 3: Farmacología Cardiovascular (PRO)', descripcion: 'Requiere plan superior.', status: 'locked' },
    ],
    Neumología: [
      { cursoId: 'neumo1', titulo: 'Lección 1: Fisiología Pulmonar', descripcion: 'Intercambio gaseoso.', status: 'completed' },
    ],
    Endocrinología: [],
  },
};
// --- FIN DE DATOS DE SIMULACIÓN ---

// --- COMPONENTE DE ITEM DE TIMELINE ---
const TimelineItem = ({ lesson }) => {
  const { status, titulo, descripcion, cursoId } = lesson;
  let icon, button;

  switch (status) {
    case 'completed':
      icon = <i data-feather="check-circle"></i>;
      button = ( <a href={`/cursosmg/?cursoId=${cursoId}`} className="morganoboard-btn btn-secondary"> Repasar Clase </a> );
      break;
    case 'unlocked':
      icon = <i data-feather="play-circle"></i>;
      button = ( <a href={`/cursosmg/?cursoId=${cursoId}`} className="morganoboard-btn"> Empezar Lección </a> );
      break;
    default:
      icon = <i data-feather="lock"></i>;
      button = ( <a href="/precios" className="morganoboard-btn" style={{ background: 'var(--acento-violeta)' }} > Mejorar Plan </a> );
  }

  return (
    <div className={`timeline-item timeline-item--${status}`}>
      <div className="timeline-connector"></div>
      <div className="timeline-icon">{icon}</div>
      <div className="timeline-content">
        <h3 className="timeline-content__title">{titulo}</h3>
        <p className="timeline-content__description">{descripcion}</p>
        <div className="timeline-button-container">{button}</div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE VISTA DE TIMELINE ---
const LearningPathTimelineView = ({ areaTitle, lessons, onBack }) => (
  <div id="ruta-learning-path">
    <button className="back-button" onClick={onBack}>
      <i data-feather="arrow-left"></i> Volver a Áreas
    </button>
    <h1>{areaTitle}</h1>
    {lessons.map((lesson) => (
      <TimelineItem key={lesson.cursoId} lesson={lesson} />
    ))}
  </div>
);

// --- COMPONENTE DE VISTA DE ÁREAS ---
const AreaSelectionView = ({ areas, cursosPorArea, onSelectArea }) => (
  <div id="ruta-area-selection">
    {areas.map((area) => {
      if (cursosPorArea[area.nombre] && cursosPorArea[area.nombre].length > 0) {
        return (
          <div key={area.nombre} className="area-card" onClick={() => onSelectArea(area.nombre)} style={{ cursor: 'pointer' }}>
            <div className="area-card-icon">
              <i data-feather="layers"></i>
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
export function RutaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [learningPathData, setLearningPathData] = useState(null);
  const [selectedAreaName, setSelectedAreaName] = useState(null);
  const { currentUser } = useAuth();

  // Efecto para recargar los íconos de Feather cuando cambia la vista
  useEffect(() => {
    // CORREGIDO: Usamos window.feather
    if (!isLoading && window.feather) {
      window.feather.replace();
    }
  }, [isLoading, selectedAreaName]); // Se activa al cargar y al cambiar de vista

  // Efecto para cargar los datos (simulados)
  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      setTimeout(() => {
        setLearningPathData(fakeLearningPathData);
        setIsLoading(false);
      }, 1000);
    };
    loadData();
  }, [currentUser]);

  if (isLoading) {
    return <AreaSkeleton count={3} />;
  }

  if (!learningPathData) {
    return <p style={{ color: 'var(--error)' }}>No se pudieron cargar los datos.</p>;
  }

  if (!selectedAreaName) {
    return (
      <AreaSelectionView
        areas={learningPathData.areas}
        cursosPorArea={learningPathData.cursosPorArea}
        onSelectArea={setSelectedAreaName}
      />
    );
  }

  const lessons = learningPathData.cursosPorArea[selectedAreaName] || [];
  return (
    <LearningPathTimelineView
      areaTitle={selectedAreaName}
      lessons={lessons}
      onBack={() => setSelectedAreaName(null)}
    />
  );
}