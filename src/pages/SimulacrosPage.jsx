import React from 'react';
import { useSimulacros } from '../hooks/useSimulacros';
import { Layers, ArrowLeft, Edit3, Clock, HelpCircle, Play, Lock, CheckCircle, BarChart2 } from 'lucide-react';
import '../styles/Dashboard.css';

// --- COMPONENTE 1: Item de la Lista de Áreas (Vertical) ---
const AreaListItem = ({ area, onClick }) => (
  <div 
    onClick={() => onClick(area.id)}
    style={{
      backgroundColor: 'var(--superficie-color)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      border: '1px solid transparent',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(32,128,124,0.08)';
        e.currentTarget.style.borderColor = 'var(--verde-principal)';
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = 'transparent';
    }}
  >
    {/* Icono Verde Claro */}
    <div style={{
      width: '48px', height: '48px',
      backgroundColor: '#F0FDF4',
      borderRadius: '12px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--verde-principal)',
      flexShrink: 0
    }}>
      <Layers size={24} />
    </div>

    {/* Texto */}
    <div style={{ flex: 1 }}>
      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontFamily: 'var(--font-titulos)', color: 'var(--texto-principal)' }}>
        {area.nombre}
      </h3>
      <p style={{ margin: 0, color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>
        {area.descripcion}
      </p>
    </div>
  </div>
);

// --- COMPONENTE 2: Lista de Exámenes (Simulacros) ---
const SimulacroList = ({ category, simulacros, onBack }) => (
    <div className="fade-in">
      <button className="back-button" onClick={onBack} style={{background:'none', border:'none', cursor:'pointer', color:'var(--verde-principal)', display:'flex', alignItems:'center', marginBottom:'1rem'}}>
        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Volver
      </button>
      
      <div className="header-title-container" style={{ marginBottom: '2rem' }}>
        <h1>{category.titulo}</h1>
        <p style={{ color: 'var(--texto-secundario)' }}>Mide tus conocimientos con tiempo real.</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {simulacros.length > 0 ? simulacros.map((sim) => (
            <div key={sim.id} className="class-item" style={{ cursor: 'default', border: sim.estado === 'locked' ? '1px solid #eee' : '1px solid var(--borde-color)' }}>
                
                {/* Icono de Estado */}
                <div className="class-icon" style={{ 
                    background: sim.estado === 'completed' ? '#D1FAE5' : (sim.estado === 'locked' ? '#F3F4F6' : '#E0F2FE'),
                    color: sim.estado === 'completed' ? 'var(--success)' : (sim.estado === 'locked' ? '#9CA3AF' : 'var(--verde-principal)')
                }}>
                  {sim.estado === 'completed' ? <CheckCircle size={20} /> : (sim.estado === 'locked' ? <Lock size={20} /> : <Edit3 size={20} />)}
                </div>

                {/* Info */}
                <div className="class-info" style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{sim.titulo}</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><HelpCircle size={14}/> {sim.preguntas} Pregs</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> {sim.tiempo} min</span>
                    </div>
                </div>

                {/* Acciones */}
                <div>
                    {sim.estado === 'unlocked' && (
                        <button className="morganoboard-btn" onClick={() => alert(`Iniciando ${sim.titulo}`)}>
                            <Play size={16} style={{marginRight:5}}/> Iniciar
                        </button>
                    )}
                    {sim.estado === 'completed' && (
                         <div style={{ textAlign: 'right' }}>
                            <span style={{ display: 'block', fontWeight: 'bold', color: 'var(--verde-principal)', fontSize:'0.9rem', marginBottom:'4px' }}>Nota: {sim.nota}</span>
                            <button className="sidebar-btn" style={{ padding: '4px 8px', fontSize:'0.85rem', color: 'var(--texto-secundario)', height:'auto' }}>
                                <BarChart2 size={14} style={{marginRight:4}}/> Análisis
                            </button>
                        </div>
                    )}
                    {sim.estado === 'locked' && (
                        <button className="morganoboard-btn" style={{ background: 'var(--acento-violeta)', opacity: 0.8 }} onClick={() => window.open('https://morganomedic.com/serums/#precios', '_blank')}>
                            <Lock size={14} style={{marginRight:5}}/> PRO
                        </button>
                    )}
                </div>
            </div>
        )) : <p>Próximamente...</p>}
      </div>
    </div>
);

// --- COMPONENTE 3: Selección de Categorías ---
const CategorySelection = ({ area, categories, onSelectCategory, onBack }) => (
  <div className="fade-in">
    <button className="back-button" onClick={onBack} style={{background:'none', border:'none', cursor:'pointer', color:'var(--verde-principal)', display:'flex', alignItems:'center', marginBottom:'1rem'}}>
      <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Volver
    </button>
    <h1 style={{ marginBottom: '2rem' }}>{area.nombre}</h1>
    
    <div className="dashboard-grid">
      {categories.length > 0 ? categories.map((cat) => (
        <div key={cat.id} className="area-card" onClick={() => onSelectCategory(cat.id)} style={{cursor:'pointer', background:'white', padding:'1.5rem', borderRadius:'12px', border:'1px solid #eee'}}>
          <div style={{color:'var(--verde-principal)', marginBottom:'1rem'}}><Edit3 size={24}/></div>
          <h3>{cat.titulo}</h3>
          <p style={{color:'#666', fontSize:'0.9rem'}}>{cat.descripcion}</p>
        </div>
      )) : <p>No hay simulacros disponibles en esta área.</p>}
    </div>
  </div>
);

// --- PÁGINA PRINCIPAL ---
export default function SimulacrosPage() {
  const { 
    loading, areas, categories, simulacros, 
    selectedArea, selectedCategory, 
    selectArea, selectCategory, goBack 
  } = useSimulacros();

  if (loading) return <div style={{padding:'2rem'}}>Cargando simulacros...</div>;

  // Renderizado condicional de vistas
  if (selectedCategory) return <SimulacroList category={selectedCategory} simulacros={simulacros} onBack={goBack} />;
  if (selectedArea) return <CategorySelection area={selectedArea} categories={categories} onSelectCategory={selectCategory} onBack={goBack} />;

  // Vista Principal (Lista Vertical)
  return (
    <div className="fade-in">
        <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-titulos)' }}>Simulacros</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {areas.map((area) => (
                <AreaListItem 
                    key={area.id} 
                    area={area} 
                    onClick={selectArea} 
                />
            ))}
        </div>
    </div>
  );
}