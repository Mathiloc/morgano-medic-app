import React from 'react';
import { useBanqueos } from '../hooks/useBanqueos';
import { Target, Layers, ArrowLeft, ChevronRight, Play, Lock, CheckCircle } from 'lucide-react';
import '../styles/Dashboard.css';

// --- COMPONENTE: Tarjeta de Área (Estilo Lista Vertical) ---
const AreaListItem = ({ area, onClick }) => (
  <div 
    onClick={() => onClick(area.id)}
    style={{
      backgroundColor: 'var(--superficie-color)', // Blanco
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem', // Espacio entre tarjetas
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      border: '1px solid transparent', // Borde invisible por defecto
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)', // Sombra sutil
      transition: 'all 0.2s ease'
    }}
    className="area-list-card" // Clase para hover en CSS si quieres
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
    {/* Icono Cuadrado Verde Claro */}
    <div style={{
      width: '48px',
      height: '48px',
      backgroundColor: '#F0FDF4', // Verde muy claro (tipo Tailwind green-50)
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--verde-principal)', // Icono verde oscuro
      flexShrink: 0
    }}>
      <Layers size={24} />
    </div>

    {/* Texto */}
    <div style={{ flex: 1 }}>
      <h3 style={{ 
        margin: '0 0 0.25rem 0', 
        fontSize: '1.1rem', 
        fontFamily: 'var(--font-titulos)',
        color: 'var(--texto-principal)' 
      }}>
        {area.nombre}
      </h3>
      <p style={{ margin: 0, color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>
        {area.descripcion}
      </p>
    </div>
  </div>
);

// --- COMPONENTE 2: Selección de Categorías ---
// (Reutilizamos la cuadrícula aquí, suele verse bien para subcategorías, o puedes cambiarlo a lista también)
const CategorySelection = ({ area, categories, onSelectCategory, onBack }) => (
  <div className="fade-in">
    <button className="back-button" onClick={onBack} style={{background:'none', border:'none', cursor:'pointer', color:'var(--verde-principal)', display:'flex', alignItems:'center', marginBottom:'1rem'}}>
      <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Volver
    </button>
    <h1 style={{ marginBottom: '2rem' }}>{area.nombre}</h1>
    
    <div className="dashboard-grid"> {/* Grid para categorías */}
      {categories.length > 0 ? categories.map((cat) => (
        <div key={cat.id} className="area-card" onClick={() => onSelectCategory(cat.id)} style={{cursor:'pointer', background:'white', padding:'1.5rem', borderRadius:'12px', border:'1px solid #eee'}}>
          <div style={{color:'var(--verde-principal)', marginBottom:'1rem'}}><Target size={24}/></div>
          <h3>{cat.titulo}</h3>
          <p style={{color:'#666', fontSize:'0.9rem'}}>{cat.descripcion}</p>
        </div>
      )) : <p>No hay categorías disponibles aún.</p>}
    </div>
  </div>
);

// --- COMPONENTE 3: Lista de Banqueos ---
const BanqueoList = ({ category, banqueos, onBack }) => (
    <div className="fade-in">
      <button className="back-button" onClick={onBack} style={{background:'none', border:'none', cursor:'pointer', color:'var(--verde-principal)', display:'flex', alignItems:'center', marginBottom:'1rem'}}>
        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Volver
      </button>
      <h1 style={{ marginBottom: '2rem' }}>{category.titulo}</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {banqueos.length > 0 ? banqueos.map((b) => (
            <div key={b.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ margin: '0 0 0.5rem' }}>{b.titulo}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{b.preguntas} Preguntas • {b.tiempo} min</p>
                </div>
                <button className="morganoboard-btn" style={{ padding: '8px 16px', display:'flex', alignItems:'center', gap:'5px' }}>
                    <Play size={16}/> Iniciar
                </button>
            </div>
        )) : <p>Próximamente...</p>}
      </div>
    </div>
);


// --- PÁGINA PRINCIPAL ---
export default function BanqueosPage() {
  const { 
    loading, areas, categories, banqueos, 
    selectedArea, selectedCategory, 
    selectArea, selectCategory, goBack 
  } = useBanqueos();

  if (loading) return <div style={{padding:'2rem'}}>Cargando...</div>;

  // Lógica de Vistas
  if (selectedCategory) return <BanqueoList category={selectedCategory} banqueos={banqueos} onBack={goBack} />;
  if (selectedArea) return <CategorySelection area={selectedArea} categories={categories} onSelectCategory={selectCategory} onBack={goBack} />;

  // VISTA PRINCIPAL (LISTA VERTICAL IDÉNTICA A TU DISEÑO)
  return (
    <div className="fade-in">
        <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-titulos)' }}>Banqueos Killer</h1>
        
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