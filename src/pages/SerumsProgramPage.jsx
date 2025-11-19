import React from 'react';
import { Link } from 'react-router-dom';
import { SerumsHeader } from '../components/SerumsHeader';
import { CountdownTimer } from '../components/CountdownTimer';
import { DoctorsCarousel } from '../components/DoctorsCarousel';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { useOferta } from '../hooks/useOferta'; 
import '../styles/SerumsPage.css';
import '../styles/Dashboard.css';

// --- DATOS: UNIVERSIDADES (Prueba Social) ---
// Romario estará orgulloso: Si quieres agregar una, solo la pones aquí.
const UNIVERSITIES_DATA = [
  { id: 1, name: "San Marcos", img: "https://i.ibb.co/qFDLkYKT/San-Marcos.png" },
  { id: 2, name: "Unsaac", img: "https://i.ibb.co/xqw33pq7/Logo-Unsaac.png" },
  { id: 3, name: "UPC", img: "https://i.ibb.co/mrHXS2Qb/Logo-Upc.png" },
  { id: 4, name: "Villarreal", img: "https://i.ibb.co/7dpCbbkq/Logo-Villarreal.png" },
  { id: 5, name: "Cientifica del Sur", img: "https://i.ibb.co/n8nBB56w/Logo-Cientifica-del-Sur.png" },
  { id: 6, name: "San Juan Bautista", img: "https://i.ibb.co/bfPsTxH/Logo-San-Juan-Bautista.png" },
  { id: 7, name: "UPN", img: "https://i.ibb.co/fGtRrRM3/Logo-UPN.png" },
  { id: 8, name: "Usil", img: "https://i.ibb.co/wrgJCJZ2/Logo-Usil.png" },
  { id: 9, name: "UAP", img: "https://i.ibb.co/sJNJW7Hw/Logo-UAP.png" },
  { id: 10, name: "Andina del Cusco", img: "https://i.ibb.co/xKYRfGPw/Logo-Andina-del-cusco.png" },
  { id: 11, name: "U. Peruana de los Andes", img: "https://i.ibb.co/KpxSgb1h/Logo-universidad-Peruana-de-los-andes.png" },
  { id: 12, name: "Catolica Sedes Sapiens", img: "https://i.ibb.co/V0L417q6/Universidad-Catolica-Sedes-Sapiens.png" },
  { id: 13, name: "Nacional del Centro", img: "https://i.ibb.co/1YXkx0HJ/Logo-Nacional-del-centro-del-peru-huancayo.png" },
  { id: 14, name: "Los Angeles de Chimbote", img: "https://i.ibb.co/fYGrHj2w/Logo-universidad-los-angeles-de-Chimbote.webp" },
  { id: 15, name: "Nacional Intercultural Amazonas", img: "https://i.ibb.co/HDMmr8sd/Universidad-Nacional-Intercultural-Amazonas.png" },
  { id: 16, name: "Nacional de Ucayali", img: "https://i.ibb.co/qFLDbghf/Logo-de-universidad-nacional-de-Ucayali.png" },
];

// --- DATOS: ESPECIALIDADES ---
const SPECIALTIES_DATA = [
  { id: 1, name: "MEDICINA", img: "https://i.ibb.co/bk188P8/Llamita-Medicina.png" },
  { id: 2, name: "PSICOLOGÍA", img: "https://i.ibb.co/wND2bDJP/Llamita-Psicologia.png" },
  { id: 3, name: "ENFERMERÍA", img: "https://i.ibb.co/Kx0PrvHn/Llamita-Enfermeria.png" },
  { id: 4, name: "ODONTOLOGÍA", img: "https://i.ibb.co/nsykCndz/Llamita-Odontologia.png" },
  { id: 5, name: "QUÍMICO F.", img: "https://i.ibb.co/HfFkyTPb/Lllamita-Quimico-Farmaceutico.png" },
  { id: 6, name: "OBSTETRICIA", img: "https://i.ibb.co/RkBbR7JM/llama-obstetra.png" },
  { id: 7, name: "NUTRICIÓN", img: "https://i.ibb.co/Ng3MDJK0/llamita-nutricion.png" },
  { id: 8, name: "BIOLOGÍA", img: "https://i.ibb.co/yFgtbVjd/llamita-biologia.png" },
  { id: 9, name: "TRABAJO S.", img: "https://i.ibb.co/TMW42YgF/llamita-trabajo-social.png" },
  { id: 10, name: "ING. SANITARIA", img: "https://i.ibb.co/jvFPKByT/Llamita-Ingeneria-Sanitario.png" },
  { id: 11, name: "TECNOLOGÍA M.", img: "https://i.ibb.co/XZwDZFV4/llamita-T-Terapia-fisica.png" },
];

const SerumsProgramPage = () => {
  // 2. USAMOS EL HOOK
  // Extraemos los datos calculados automáticamente. Si cambias useOferta.js, cambia toda la página.
  const { deadline, precioRegular, precioDescuento, moneda, isLoading } = useOferta();

  return (
    <div className="serums-page-wrapper">
      <SerumsHeader />
      
      <main className="serums-main-content">
        
        {/* === SECCIÓN 1: HERO === */}
        <div className="hero-bg">
          <section className="serums-hero-section container">
            
            {/* Banner de Descuento */}
            <div className="discount-banner">
              <div className="discount-banner-inner">
                <div className="discount-price">
                  {/* Usamos los datos del hook en lugar de texto fijo */}
                  <span className="price-old">{moneda} {precioRegular}</span>
                  <span className="price-separator">|</span>
                  <span className="price-new">Ahora {moneda} {precioDescuento}</span>
                </div>
                
                {/* El contador usa el deadline del hook */}
                {!isLoading && <CountdownTimer deadline={deadline} />}
                
              </div>
            </div>

            {/* Título Principal y CTA */}
            <div className="hero-content">
              <h1 className="hero-title-serums">
                Tu plaza para el <span className="gradient-tech-flow">SERUMS 2026-I</span> empieza aquí.
              </h1>
              <p className="hero-subtitle-serums">
                Domina los conceptos clave, practica con simulacros ilimitados y asegura tu éxito con nuestra tecnología de estudio avanzada.
              </p>
              <Link to="/login" className="hero-cta-button gradient-tech-flow">
                Empieza a estudiar gratis
              </Link>
            </div>

          </section>
        </div>


        {/* === SECCIÓN 2: PRUEBA SOCIAL (OPTIMIZADA CON LOOP) === */}
        <section className="social-proof-section">
          <div className="container social-proof-container">
            <p className="social-proof-title">
              ESTUDIANTES DE LAS MEJORES UNIVERSIDADES NOS ELIGEN
            </p>
            <div className="social-proof-grid">
              {/* 👇 AQUÍ ESTÁ LA MAGIA DEL LOOP (MAP) */}
              {UNIVERSITIES_DATA.map((uni) => (
                <img 
                  key={uni.id} 
                  loading="lazy" 
                  src={uni.img} 
                  alt={`Logo ${uni.name}`} 
                />
              ))}
            </div>
          </div>
        </section>


        {/* === SECCIÓN 3: FRUSTRACIÓN === */}
        {/* (He dejado el contenido estático aquí porque tiene SVGs complejos, 
            pero ya hemos limpiado lo más pesado arriba) */}
        <section id="problematica" className="frustration-section">
          <div className="container frustration-container">
            <div className="section-title-wrapper">
              <h2 className="section-title">
                No dejes tu futuro al azar: Entendemos tu frustración
              </h2>
              <p className="section-subtitle">
                El camino al SERUMS no es solo un examen, es la primera gran decisión que marcará tu carrera. Sabemos que enfrentas desafíos que generan gran ansiedad.
              </p>
            </div>

            <div className="frustration-grid">
              {/* Card 1 */}
              <div className="frustration-card">
                <div className="frustration-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <h3 className="frustration-card-title">Demasiada Información</h3>
                <p className="frustration-card-description">
                  La enorme cantidad de temas y la incertidumbre de no saber por dónde empezar o qué es realmente importante te agobia.
                </p>
              </div>
              {/* Card 2 */}
              <div className="frustration-card">
                <div className="frustration-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="frustration-card-title">Competencia Feroz</h3>
                <p className="frustration-card-description">
                  Miles de colegas compiten por un número limitado de plazas. La presión de superar a otros es enorme.
                </p>
              </div>
              {/* Card 3 */}
              <div className="frustration-card">
                <div className="frustration-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                </div>
                <h3 className="frustration-card-title">Falta de Guía</h3>
                <p className="frustration-card-description">
                  Te sientes a ciegas, sin una hoja de ruta clara sobre cómo es el examen o cuáles son las reglas del juego.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* === SECCIÓN 4: MÉTODO === */}
        <section id="metodo" className="method-section">
           {/* Mantenemos esta sección igual por ahora para no abrumar con SVGs */}
           {/* (El código es el mismo que tenías, solo asegurando que esté limpio) */}
           <div className="container method-container">
            <div className="section-title-wrapper">
              <h2 className="section-title">Nuestro Método: Tu Camino Directo al Éxito</h2>
              <p className="section-subtitle">Hemos diseñado un sistema de preparación integral que ataca cada pilar fundamental del examen.</p>
            </div>
            {/* ... Grid de métodos (resumido para claridad) ... */}
             <div className="method-grid">
                <div className="method-card">
                    <div className="method-card-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div>
                    <h3 className="method-card-title">Clases 100% Enfocadas</h3>
                    <p className="method-card-description">Clases en vivo y grabadas basadas en los temas más preguntados.</p>
                </div>
                <div className="method-card">
                    <div className="method-card-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.73 18a2.5 2.5 0 0 1-3.46 0"></path><path d="M19 8a7 7 0 0 0-14 0c0 4.5 3 7 3 7h8s3-2.5 3-7Z"></path><path d="M12 2v2"></path></svg></div>
                    <h3 className="method-card-title">Banco Inteligente</h3>
                    <p className="method-card-description">Practica con miles de preguntas tipo SERUMS y estadísticas.</p>
                </div>
                <div className="method-card">
                    <div className="method-card-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                    <h3 className="method-card-title">Simulacros Nacionales</h3>
                    <p className="method-card-description">Mídete en tiempo real y acostúmbrate a la presión.</p>
                </div>
                <div className="method-card">
                    <div className="method-card-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>
                    <h3 className="method-card-title">Plataforma 24/7</h3>
                    <p className="method-card-description">Accede a todo tu material desde cualquier dispositivo.</p>
                </div>
                 <div className="method-card">
                    <div className="method-card-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                    <h3 className="method-card-title">Tutoría y Asesoría</h3>
                    <p className="method-card-description">Te guiamos en el proceso de inscripción y adjudicación.</p>
                </div>
                 <div className="method-card">
                    <div className="method-card-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
                    <h3 className="method-card-title">Material de Impacto</h3>
                    <p className="method-card-description">Resúmenes, mapas y flashcards para repaso efectivo.</p>
                </div>
            </div>
           </div>
        </section>


        {/* === SECCIÓN 5: PROGRAMAS (OPTIMIZADA CON LOOP) === */}
        <section id="cursos" className="programs-section">
          <div className="container programs-container">

            <div className="section-title-wrapper">
              <h2 className="section-title">Nuestro Programa de Preparación</h2>
              <p className="section-subtitle">El programa intensivo para asegurar tu plaza. Elige tu especialidad.</p>
            </div>

            <div className="programs-main-card-wrapper">
              {/* Card Principal */}
              <div className="program-card-main">
                <div className="program-card-main-content">
                  <div className="program-card-main-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div className="program-card-main-text">
                    <h3 className="program-card-main-title">SERUMS 2026 - I</h3>
                    <p className="program-card-main-description">
                      El programa completo para dominar los temas clave y asegurar tu plaza.
                    </p>
                  </div>
                  <Link to="/login" className="nav-button gradient-tech-flow program-card-main-button">
                    Inscríbete ahora
                  </Link>
                </div>

                {/* Sub-sección: Especialidades (CON LOOP) */}
                <div className="specialty-section">
                  <h4 className="specialty-section-title">Preparación por Especialidad</h4>
                  <div className="specialty-grid">
                    
                    {/* 👇 AQUÍ ESTÁ LA MAGIA: GENERAMOS LAS LLAMITAS CON UN LOOP */}
                    {SPECIALTIES_DATA.map((spec) => (
                      <Link key={spec.id} to="/login" className="specialty-card">
                        <img loading="lazy" src={spec.img} alt={`Llamita ${spec.name}`} />
                        <h3>{spec.name}</h3>
                      </Link>
                    ))}

                    {/* Card Extra "OTRO" */}
                    <Link to="/login" className="specialty-card">
                      <div className="specialty-card-icon-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      </div>
                      <h3>OTRO</h3>
                    </Link>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
         
        
        {/* === SECCIÓN DOCTORES === */}
        <section id="doctores" className="doctors-section">
           <div className="container doctors-container">
             <div className="section-title-wrapper">
               <h2 className="section-title">Aprende de los mejores especialistas</h2>
               <p className="section-subtitle">Instructores con amplia experiencia clínica y académica.</p>
             </div>
             <DoctorsCarousel />
           </div>
        </section>


        {/* === SECCIÓN TESTIMONIOS === */}
        <section id="resenas" className="testimonials-section">
           <div className="container testimonials-container">
             <div className="section-title-wrapper">
               <h2 className="section-title">Lo que dicen nuestros estudiantes</h2>
               <p className="section-subtitle">El éxito de nuestros alumnos es nuestra carta de presentación.</p>
             </div>
             <TestimonialsCarousel />
           </div>
        </section>


        {/* === SECCIÓN PRECIOS === */}
        <section id="precios" className="pricing-section">
          <div className="container pricing-container">
            <div className="section-title-wrapper">
              <h2 className="section-title">Elige el plan perfecto</h2>
              <p className="section-subtitle">Invierte en tu preparación profesional.</p>
            </div>

            <div className="pricing-grid">
              {/* Plan Esencial */}
              <div className="pricing-card">
                <h3 className="pricing-card-title">Plan Esencial</h3>
                <p className="pricing-card-subtitle">Para empezar con bases sólidas.</p>
                <p className="pricing-card-price">S/ 99</p>
                <ul className="pricing-card-features">
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Acceso a clases + grabadas</span></li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Banco de 1,200 preguntas</span></li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Simulacros mensuales</span></li>
                </ul>
                <a href="https://wa.me/51978308053?text=Hola%20MorganoMedic%2C%20quiero%20inscribirme%20al%20plan%20Esencial" target="_blank" rel="noopener noreferrer" className="pricing-card-button-outline">
                  Inscribirme Ahora
                </a>
              </div>

              {/* Plan Premium (CON HOOK Y DESCUENTO) */}
              <div className="pricing-card premium">
                <div className="pricing-card-badge">MÁS POPULAR</div>
                <h3 className="pricing-card-title">Plan Premium</h3>
                <p className="pricing-card-subtitle">La preparación más completa.</p>

                <div className="pricing-card-price-wrapper">
                  {/* PRECIOS DEL HOOK */}
                  <p className="pricing-card-price-old">{moneda} {precioRegular}</p>
                  <p className="pricing-card-price premium">{moneda} {precioDescuento}</p>
                </div>
                <p className="pricing-card-promo-text">(solo hasta que acabe el contador)</p>

                <ul className="pricing-card-features">
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Todo lo del plan Esencial</span></li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Clases en vivo (Temario Minsa)</span></li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Banqueos y simulacros en vivo</span></li>
                  <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Asesoría adjudicación</span></li>
                </ul>

                <div className="pricing-countdown-wrapper">
                  <p className="pricing-countdown-label">La oferta termina en:</p>
                  {!isLoading && <CountdownTimer deadline={deadline} />}
                </div>

                <a href="https://wa.me/51978308053?text=Hola%20MorganoMedic%2C%20quiero%20inscribirme%20al%20plan%20Premium" target="_blank" rel="noopener noreferrer" className="pricing-card-button-primary gradient-tech-flow">
                  Elegir Plan Premium
                </a>
              </div>

              {/* Plan VIP */}
              <div className="pricing-card">
                <h3 className="pricing-card-title">Plan Vip</h3>
                <p className="pricing-card-subtitle">Acompañamiento personalizado.</p>
                <p className="pricing-card-price">S/ 799</p>
                <ul className="pricing-card-features">
                   <li className="feature-highlight"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Todo lo del Plan Premium</span></li>
                   <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Tutoría personalizada 1 a 1</span></li>
                </ul>
                <a href="https://wa.me/51978308053?text=Hola%20MorganoMedic%2C%20quiero%20inscribirme%20al%20plan%20VIP" target="_blank" rel="noopener noreferrer" className="pricing-card-button-outline">
                  Inscribirme Ahora
                </a>
              </div>
            </div>

            {/* Plan Gratuito */}
            <div className="free-plan-card">
              <h3 className="free-plan-title">Plan Gratuito</h3>
              <p className="free-plan-subtitle">
                Prueba la plataforma con acceso a un banco de preguntas limitado.
              </p>
              <Link to="/login" className="free-plan-button">
                Empezar Gratis
              </Link>
            </div>

          </div>
        </section>
        
        <FaqSection />

      </main>
      <Footer />
    </div>
  );
};

export default SerumsProgramPage;