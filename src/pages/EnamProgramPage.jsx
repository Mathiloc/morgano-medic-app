import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- COMPONENTES REUTILIZABLES ---
import { SerumsHeader } from '../components/SerumsHeader';
import { Footer } from '../components/Footer';
import { DoctorsCarousel } from '../components/DoctorsCarousel';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { CountdownTimer } from '../components/CountdownTimer';

// --- HOOKS ---
import { useOferta } from '../hooks/useOferta'; 

// --- ESTILOS & ASSETS ---
import '../styles/GlobalStyles.css'; 
import '../styles/EnamPage.css'; // 👈 Los estilos CSS puros que clonamos
import imgLlamitaEnam from '../assets/images/LLamita-ENAM.png';

// --- DATOS: UNIVERSIDADES ---
const UNIVERSITIES_DATA = [
  { id: 1, img: "https://i.ibb.co/qFDLkYKT/San-Marcos.png" },
  { id: 2, img: "https://i.ibb.co/xqw33pq7/Logo-Unsaac.png" },
  { id: 3, img: "https://i.ibb.co/mrHXS2Qb/Logo-Upc.png" },
  { id: 4, img: "https://i.ibb.co/7dpCbbkq/Logo-Villarreal.png" },
  { id: 5, img: "https://i.ibb.co/n8nBB56w/Logo-Cientifica-del-Sur.png" },
  { id: 6, img: "https://i.ibb.co/bfPsTxH/Logo-San-Juan-Bautista.png" },
  { id: 7, img: "https://i.ibb.co/fGtRrRM3/Logo-UPN.png" },
  { id: 8, img: "https://i.ibb.co/wrgJCJZ2/Logo-Usil.png" },
];

// --- DATOS: CARACTERÍSTICAS (Sección Interactiva) ---
const FEATURES_DATA = [
  { 
    id: 1, 
    title: "Aprende algo nuevo cada día", 
    desc: "Contenido actualizado y relevante para tu preparación.", 
    img: "https://i.ibb.co/TMC3bH6n/Llamita-dudosa-pero-estudiando.png",
    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  },
  { 
    id: 2, 
    title: "Rutas de estudio claras", 
    desc: "Te guían de estudiante a especialista.", 
    img: "https://i.ibb.co/zkg5kVc/Llamita1.png",
    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  },
  { 
    id: 3, 
    title: "Pon a prueba tu progreso", 
    desc: "Simulacros y Banqueos tipo ENAM.", 
    img: "https://i.ibb.co/5WH11S21/LLamita-con-espadas.png",
    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  },
  { 
    id: 4, 
    title: "Mide tu Rendimiento", 
    desc: "Ranking y estadísticas en tiempo real.", 
    img: "https://i.ibb.co/20Sbc0BL/Llamita-logro-su-objetivo.png",
    icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  }
];

export const EnamProgramPage = () => {
  const { deadline, isLoading, precioRegular, precioDescuento, moneda } = useOferta();
  const [activeFeatureImg, setActiveFeatureImg] = useState(FEATURES_DATA[0].img);
  const [activeFeatureId, setActiveFeatureId] = useState(FEATURES_DATA[0].id);

  return (
    <div className="enam-page-wrapper">
      <SerumsHeader />
      
      <main>
        {/* === HERO SECTION (Fondo Radial) === */}
        <div className="hero-bg">
            <section className="enam-hero-section">
                <div className="enam-container">
                    
                    {/* Banner de Oferta (Pastilla) */}
                    <div className="discount-banner">
                        <div className="discount-banner-inner">
                            <div className="price-box">
                                <span className="price-old">{moneda} {precioRegular + 300}</span>
                                <span style={{margin:'0 10px', opacity: 0.5}}>|</span>
                                <span>Ahora {moneda} {precioDescuento - 100}</span>
                            </div>
                            
                            {!isLoading && (
                                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                    <span style={{opacity:0.8, fontSize: '0.9rem'}}>Cierra en:</span>
                                    <div className="countdown-box"><CountdownTimer deadline={deadline} /></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Título y Subtítulo */}
                    <div>
                        <h1 className="enam-hero-title">
                            Tu éxito en el <span className="text-gradient">ENAM 2025</span> empieza aquí.
                        </h1>
                        <p className="enam-hero-subtitle">
                            Domina los conceptos clave, practica con simulacros ilimitados y asegura tu éxito con nuestra tecnología de estudio avanzada.
                        </p>
                        <Link to="/login" className="enam-cta-button">
                            Empieza a estudiar gratis
                        </Link>
                    </div>
                </div>
            </section>
        </div>

        {/* === SOCIAL PROOF (Logos de Universidades) === */}
        <section style={{padding: '4rem 0'}}>
            <div className="enam-container">
                <p className="social-title">ESTUDIANTES DE LAS MEJORES UNIVERSIDADES NOS ELIGEN</p>
                <div className="social-grid">
                    {UNIVERSITIES_DATA.map((uni) => (
                        <img 
                            key={uni.id} 
                            src={uni.img} 
                            alt="Logo Universidad" 
                            className="social-logo" 
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>
        </section>

        {/* === SECCIÓN AUTORIDAD (Interactivo) === */}
        <section id="autoridad" style={{padding: '5rem 0'}}>
            <div className="enam-container">
                <div className="authority-grid">
                    {/* Columna Izquierda: Lista */}
                    <div>
                        <h2 className="section-title" style={{fontSize: '2.5rem', textAlign: 'left', marginBottom: '2rem'}}>
                            Líderes en preparación para el ENAM.
                        </h2>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            {FEATURES_DATA.map((feature) => (
                                <div 
                                    key={feature.id}
                                    onMouseEnter={() => { setActiveFeatureImg(feature.img); setActiveFeatureId(feature.id); }}
                                    className={`feature-item ${activeFeatureId === feature.id ? 'active' : ''}`}
                                >
                                    <div className="feature-icon-box">
                                        {feature.icon}
                                    </div>
                                    <div className="feature-text">
                                        <h3>{feature.title}</h3>
                                        <p>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Columna Derecha: Imagen */}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img 
                            src={activeFeatureImg} 
                            alt="Feature Preview" 
                            style={{maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(72,229,194,0.2))'}} 
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* === PROGRAMA (Tarjeta Destacada) === */}
        <section id="cursos" style={{padding: '5rem 0', backgroundColor: 'rgba(0,0,0,0.2)'}}>
             <div className="enam-container">
                <div className="text-center" style={{marginBottom: '3rem'}}>
                    <h2 className="section-title" style={{fontSize: '2.5rem'}}>Nuestro Programa</h2>
                    <p className="enam-hero-subtitle">Intensivo y diseñado para el mejor puntaje.</p>
                </div>
                
                {/* Usamos la clase .enam-card-dark del nuevo CSS */}
                <div className="enam-card-dark" style={{maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem'}}>
                    <div style={{width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #20807C, #13161C)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                        <img src={imgLlamitaEnam} alt="Llamita" style={{width: '60%', objectFit: 'contain'}}/>
                    </div>
                    <div style={{flex: 1, textAlign: 'left'}}>
                        <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>ENAM 2025</h3>
                        <p style={{color: '#9ca3af'}}>El programa completo para dominar los temas clave y asegurar un gran puntaje.</p>
                    </div>
                    <Link to="/login" className="enam-cta-button" style={{marginTop: 0, padding: '0.75rem 2rem', fontSize: '1rem'}}>Inscríbete</Link>
                </div>
             </div>
        </section>

        {/* === DOCTORES === */}
        <section id="doctores" style={{padding: '5rem 0'}}>
            <div className="enam-container">
                <h2 className="section-title text-center" style={{fontSize: '2.5rem', marginBottom: '3rem'}}>Aprende de los mejores</h2>
                <DoctorsCarousel />
            </div>
        </section>

        {/* === TESTIMONIOS === */}
        <section id="resenas" style={{padding: '5rem 0', backgroundColor: 'rgba(0,0,0,0.2)'}}>
            <div className="enam-container">
                 <h2 className="section-title text-center" style={{fontSize: '2.5rem', marginBottom: '3rem'}}>Comunidad Estudiantil</h2>
                 <TestimonialsCarousel />
            </div>
        </section>

        {/* === PLANES === */}
        <section id="precios" style={{padding: '5rem 0'}}>
             <div className="enam-container">
                <div className="text-center">
                    <h2 className="section-title" style={{fontSize: '2.5rem'}}>Planes Transparentes</h2>
                </div>
                <div className="plans-grid">
                   
                   {/* Plan Básico */}
                   <div className="plan-card">
                      <h3 className="plan-title" style={{color: 'white'}}>Básico</h3>
                      <p className="plan-desc">Para empezar</p>
                      <div className="plan-price">S/29<span>/mes</span></div>
                      <Link to="/login" className="plan-btn outline">Empezar</Link>
                   </div>
                   
                   {/* Plan Pro (Destacado) */}
                   <div className="plan-card featured">
                      <div style={{position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(to right, #48E5C2, #00B4D8)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'}}>MÁS POPULAR</div>
                      <h3 className="plan-title" style={{color: 'white'}}>Pro</h3>
                      <p className="plan-desc">Recomendado</p>
                      <div className="plan-price">S/59<span>/mes</span></div>
                      <Link to="/login" className="plan-btn filled plan-btn-gradient">Elegir Plan Pro</Link>
                   </div>
                   
                   {/* Plan Tutoría */}
                   <div className="plan-card">
                      <h3 className="plan-title" style={{color: 'white'}}>Tutoría</h3>
                      <p className="plan-desc">Personalizado</p>
                      <div className="plan-price">S/199<span>/mes</span></div>
                      <Link to="/login" className="plan-btn outline">Contactar</Link>
                   </div>

                </div>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default EnamProgramPage;