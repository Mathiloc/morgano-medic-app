import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
// import feather from 'feather-icons'; // ELIMINADO
import '../styles/Dashboard.css';

// --- COMPONENTE DE SKELETON (ESQUELETO) ---
const AreaSkeleton = ({ count = 3 }) => (
  <div>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="skeleton-card" aria-hidden="true">
        <div className="skeleton skeleton-icon" style={{ borderRadius: '12px' }}></div>
        <div className="skeleton-text-group">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      </div>
    ))}
  </div>
);

// --- DATOS DE SIMULACIÓN (NIVEL 1 Y 2) ---
const fakeCategoriasData = {
  Medicina: [
    { categoriaId: 'cat-cardio', titulo: 'Cardiología', descripcion: 'Banqueos de cardio.', progreso: 80 },
    { categoriaId: 'cat-neumo', titulo: 'Neumología', descripcion: 'Banqueos de neumo.', progreso: 20 },
  ],
  Cirugía: [
    { categoriaId: 'cat-general', titulo: 'Cirugía General', descripcion: 'Banqueos de cirugía.', progreso: 0 },
  ],
};

// --- DATOS DE SIMULACIÓN (NIVEL 3: TIMELINE) ---
const fakeTimelineData = {
  'cat-cardio': [
    { banqueoID: 'b-cardio-1', resultadoId: 'res-123', titulo: 'Banqueo de Arritmias', numPreguntas: 20, tiempoSegundos: 30, completado: true, tieneAcceso: true },
    { banqueoID: 'b-cardio-2', titulo: 'Banqueo de Insuficiencia Cardíaca', numPreguntas: 25, tiempoSegundos: 30, completado: false, tieneAcceso: true },
  ],
  'cat-neumo': [
    { banqueoID: 'b-neumo-1', titulo: 'Banqueo de EPOC y Asma', numPreguntas: 15, tiempoSegundos: 30, completado: false, tieneAcceso: true },
  ],
  'cat-general': [
    { banqueoID: 'b-ciru-1', titulo: 'Banqueo de Abdomen Agudo (PRO)', numPreguntas: 30, tiempoSegundos: 30, completado: false, tieneAcceso: false, planRequerido: 'PRO' },
  ],
};
// --- FIN DE DATOS DE SIMULACIÓN ---

// --- COMPONENTE DE VISTA DE ÁREAS (Nivel 1) ---
const AreaSelectionView = ({ areas, onSelectArea }) => (
  <div id="banqueos-areas-view">
    {areas.map((areaName) => (
      <div key={areaName} className="area-card" onClick={() => onSelectArea(areaName)}>
        <div className="area-card-icon"><i data-feather="layers"></i></div>
        <div className="area-card-info">
          <h3>{areaName}</h3>
          <p>Explora las categorías de esta área.</p>
        </div>
      </div>
    ))}
  </div>
);

// --- COMPONENTE DE VISTA DE CATEGORÍAS (Nivel 2) ---
const CategorySelectionView = ({ areaTitle, categories, onSelectCategory, onBack }) => (
  <div id="banqueos-categories-view">
    <button className="back-button" onClick={onBack}>
      <i data-feather="arrow-left"></i> Volver a Áreas
    </button>
    <h1>{areaTitle}</h1>
    {categories.map((cat) => (
      <div key={cat.categoriaId} className="area-card">
        <div className="category-card-content">
          <div className="area-card-icon"><i data-feather="target"></i></div>
          <div className="area-card-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{cat.titulo}</h3>
              <span className="progress-text">{cat.progreso}%</span>
            </div>
            <p>{cat.descripcion}</p>
            <div className="progress-bar-container" style={{ marginBottom: 0 }}>
              <div className="progress-bar" style={{ width: `${cat.progreso}%` }}></div>
            </div>
          </div>
          <button className="morganoboard-btn" onClick={() => onSelectCategory(cat)}>
            Ver Banqueos
          </button>
        </div>
      </div>
    ))}
  </div>
);

// --- COMPONENTE DE VISTA DE TIMELINE (Nivel 3) ---
const BanqueoTimelineView = ({ category, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [banqueos, setBanqueos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setBanqueos(fakeTimelineData[category.categoriaId] || []);
      setIsLoading(false);
      // CORREGIDO: Usamos window.feather
      if (window.feather) window.feather.replace();
    }, 500);
  }, [category.categoriaId]);

  if (isLoading) {
    return (
      <>
        <button className="back-button" onClick={onBack}>
          <i data-feather="arrow-left"></i> Volver a Categorías
        </button>
        <h1>{category.titulo}</h1>
        <AreaSkeleton count={2} />
      </>
    );
  }

  return (
    <div id="banqueos-timeline-view">
      <button className="back-button" onClick={onBack}>
        <i data-feather="arrow-left"></i> Volver a Categorías
      </button>
      <h1>{category.titulo}</h1>
      {banqueos.length === 0 ? (
        <p>No hay banqueos disponibles.</p>
      ) : (
        banqueos.map((b) => {
          const status = b.completado ? 'completed' : b.tieneAcceso ? 'unlocked' : 'locked';
          let icon, button;
          switch (status) {
            case 'completed':
              icon = <i data-feather="check"></i>;
              button = <a href={`/morganoboard/repaso?resultadoId=${b.resultadoId}`} className="morganoboard-btn btn-secondary">Repasar</a>;
              break;
            case 'unlocked':
              icon = <i data-feather="play"></i>;
              button = <a href={`/quizbanqueo?banqueoId=${b.banqueoID}&tiempoSegundos=${b.tiempoSegundos}`} className="morganoboard-btn">Iniciar</a>;
              break;
            default:
              icon = <i data-feather="lock"></i>;
              button = <a href="/precios" className="morganoboard-btn" style={{ background: 'var(--acento-violeta)' }}>Mejorar Plan</a>;
              break;
          }
          return (
            <div key={b.banqueoID} className={`timeline-item timeline-item--${status}`}>
              <div className="timeline-connector"></div>
              <div className="timeline-icon">{icon}</div>
              <div className="timeline-content">
                <h3 className="timeline-content__title">{b.titulo} {status === 'locked' && `(Plan ${b.planRequerido})`}</h3>
                <p className="timeline-content__description">Contiene {b.numPreguntas} preguntas...</p>
                <div className="timeline-button-container">{button}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

// --- PÁGINA PRINCIPAL DE BANQUEOS ---
export function BanqueosPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [dataByArea, setDataByArea] = useState({});
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      setTimeout(() => {
        setDataByArea(fakeCategoriasData);
        setAreas(Object.keys(fakeCategoriasData));
        setIsLoading(false);
      }, 1000);
    };
    loadData();
  }, [currentUser]);

  // Efecto para recargar los íconos de Feather
  useEffect(() => {
    // CORREGIDO: Usamos window.feather
    if (!isLoading && window.feather) {
      window.feather.replace();
    }
  }, [isLoading, selectedArea, selectedCategory]);

  if (isLoading) {
    return <AreaSkeleton count={4} />;
  }

  if (selectedArea && selectedCategory) {
    return <BanqueoTimelineView category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  if (selectedArea) {
    return <CategorySelectionView areaTitle={selectedArea} categories={dataByArea[selectedArea] || []} onSelectCategory={setSelectedCategory} onBack={() => setSelectedArea(null)} />;
  }

  return <AreaSelectionView areas={areas} onSelectArea={setSelectedArea} />;
}