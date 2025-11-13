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
  'SERUMS 2026 - I': [
    { categoriaId: 'cat-serums-1', titulo: 'Simulacros Integrales SERUMS', descripcion: 'Simulacros completos.', progreso: 100 },
  ],
  'ENAM 2025 - II': [
    { categoriaId: 'cat-enam-1', titulo: 'Simulacros Integrales ENAM', descripcion: 'Simulacros completos.', progreso: 50 },
  ],
};

// --- DATOS DE SIMULACIÓN (NIVEL 3: LISTA) ---
const fakeSimulacrosData = {
  'cat-serums-1': [
    { simulacroID: 'sim-serums-1', titulo: '1er Simulacro SERUMS 2026', numeroPreguntas: 200, tiempoMinutos: 180, completado: true, tieneAcceso: true, resultado: '150/200 (75%)' },
  ],
  'cat-enam-1': [
    { simulacroID: 'sim-enam-1', titulo: '1er Simulacro ENAM 2025', numeroPreguntas: 200, tiempoMinutos: 180, completado: false, tieneAcceso: true },
    { simulacroID: 'sim-enam-2', titulo: '2do Simulacro ENAM 2025 (PRO)', numeroPreguntas: 200, tiempoMinutos: 180, completado: false, tieneAcceso: false },
  ],
};
// --- FIN DE DATOS DE SIMULACIÓN ---

// --- VISTAS... (Nivel 1 y 2) ---
const AreaSelectionView = ({ areas, onSelectArea }) => (
  <div id="simulacros-areas-view">
    {areas.map((areaName) => (
      <div key={areaName} className="area-card" onClick={() => onSelectArea(areaName)}>
        <div className="area-card-icon"><i data-feather="layers"></i></div>
        <div className="area-card-info"><h3>{areaName}</h3><p>Explora las categorías...</p></div>
      </div>
    ))}
  </div>
);

const CategorySelectionView = ({ areaTitle, categories, onSelectCategory, onBack }) => (
  <div id="simulacros-categories-view">
    <button className="back-button" onClick={onBack}><i data-feather="arrow-left"></i> Volver a Áreas</button>
    <h1>{areaTitle}</h1>
    {categories.map((cat) => (
      <div key={cat.categoriaId} className="area-card">
        <div className="category-card-content">
          <div className="area-card-icon"><i data-feather="edit-3"></i></div>
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
          <button className="morganoboard-btn" onClick={() => onSelectCategory(cat)}>Ver Simulacros</button>
        </div>
      </div>
    ))}
  </div>
);

// --- COMPONENTE DE VISTA DE LISTA (Nivel 3) ---
const SimulacroListView = ({ category, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [simulacros, setSimulacros] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSimulacros(fakeSimulacrosData[category.categoriaId] || []);
      setIsLoading(false);
      // CORREGIDO: Usamos window.feather
      if (window.feather) window.feather.replace();
    }, 500);
  }, [category.categoriaId]);

  if (isLoading) {
    return (
      <>
        <button className="back-button" onClick={onBack}><i data-feather="arrow-left"></i> Volver</button>
        <h1>{category.titulo}</h1>
        <AreaSkeleton count={2} />
      </>
    );
  }

  return (
    <div id="simulacros-list-view">
      <button className="back-button" onClick={onBack}><i data-feather="arrow-left"></i> Volver a Categorías</button>
      <h1>{category.titulo}</h1>
      {simulacros.length === 0 ? (
        <p>No hay simulacros disponibles.</p>
      ) : (
        simulacros.map((sim) => {
          let icon, button, result;
          if (sim.tieneAcceso) {
            if (sim.completado) {
              icon = <i data-feather="check-circle"></i>;
              result = <div className="simulacro-list-item__result">Resultado: {sim.resultado}</div>;
              button = <a href={`/reviewSimulacro?simulacroId=${sim.simulacroID}`} className="morganoboard-btn btn-secondary action-btn">Revisar</a>;
            } else {
              icon = <i data-feather="edit-3"></i>;
              button = <a href={`/quizsimulacro?simulacroId=${sim.simulacroID}`} className="morganoboard-btn action-btn">Iniciar</a>;
            }
          } else {
            icon = <i data-feather="lock"></i>;
            button = <a href="/precios" className="morganoboard-btn action-btn" style={{ background: 'var(--acento-violeta)' }}><i data-feather="star" style={{ width: '1em', height: '1em' }}></i> Ver Planes</a>;
          }
          return (
            <div key={sim.simulacroID} className={`simulacro-list-item ${!sim.tieneAcceso ? 'simulacro-list-item--locked' : ''}`}>
              <div className="simulacro-list-item__icon">{icon}</div>
              <div className="simulacro-list-item__info">
                <h3 className="simulacro-list-item__title">{sim.titulo}</h3>
                <div className="simulacro-list-item__meta">
                  <span className="meta-preguntas">{sim.numeroPreguntas} Preguntas</span>
                  <span>&bull;</span>
                  <span className="meta-tiempo">{sim.tiempoMinutos} Minutos</span>
                </div>
                {result}
              </div>
              <div className="simulacro-button-container">{button}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

// --- PÁGINA PRINCIPAL DE SIMULACROS ---
export function SimulacrosPage() {
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
    return <SimulacroListView category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  if (selectedArea) {
    return <CategorySelectionView areaTitle={selectedArea} categories={dataByArea[selectedArea] || []} onSelectCategory={setSelectedCategory} onBack={() => setSelectedArea(null)} />;
  }

  return <AreaSelectionView areas={areas} onSelectArea={setSelectedArea} />;
}