import React from 'react';
import { SerumsHeader } from '../components/SerumsHeader';
import { CountdownTimer } from '../components/CountdownTimer';
import '../styles/SerumsPage.css'; // Importa todos nuestros estilos
import { DoctorsCarousel } from '../components/DoctorsCarousel';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { FaqSection } from '../components/FaqSection'; // 👈 1. IMPORTAR FAQ
import { Footer } from '../components/Footer'; // 👈 2. IMPORTAR FOOTER
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
// Definimos la fecha límite de la oferta
const getDeadline = () => {
  const year = new Date().getFullYear();
  return `${year}-09-30T23:59:59`; // 30 de Septiembre
};


const SerumsProgramPage = () => {
  const deadline = getDeadline();

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
                  <span className="price-old">S/ 350</span>
                  <span className="price-separator">|</span>
                  <span className="price-new">Ahora S/ 299</span>
                </div>
                
                {/* El Contador React */}
                <CountdownTimer deadline={deadline} />
                
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
        {/* === FIN SECCIÓN HERO === */}


        {/* === SECCIÓN 2: PRUEBA SOCIAL (LOGOS) === */}
        <section className="social-proof-section">
          <div className="container social-proof-container">
            <p className="social-proof-title">
              ESTUDIANTES DE LAS MEJORES UNIVERSIDADES NOS ELIGEN
            </p>
            <div className="social-proof-grid">
              <img loading="lazy" src="https://i.ibb.co/qFDLkYKT/San-Marcos.png" alt="Logo Universidad San Marcos" />
              <img loading="lazy" src="https://i.ibb.co/xqw33pq7/Logo-Unsaac.png" alt="Logo Unsaac" />
              <img loading="lazy" src="https://i.ibb.co/mrHXS2Qb/Logo-Upc.png" alt="Logo UPC" />
              <img loading="lazy" src="https://i.ibb.co/7dpCbbkq/Logo-Villarreal.png" alt="Logo Villarreal" />
              <img loading="lazy" src="https://i.ibb.co/n8nBB56w/Logo-Cientifica-del-Sur.png" alt="Logo Cientifica del Sur" />
              <img loading="lazy" src="https://i.ibb.co/bfPsTxH/Logo-San-Juan-Bautista.png" alt="Logo San Juan Bautista" />
              <img loading="lazy" src="https://i.ibb.co/fGtRrRM3/Logo-UPN.png" alt="Logo UPN" />
              <img loading="lazy" src="https://i.ibb.co/wrgJCJZ2/Logo-Usil.png" alt="Logo Usil" />
              <img loading="lazy" src="https://i.ibb.co/sJNJW7Hw/Logo-UAP.png" alt="Logo UAP" />
              <img loading="lazy" src="https://i.ibb.co/xKYRfGPw/Logo-Andina-del-cusco.png" alt="Logo Andina del Cusco" />
              <img loading="lazy" src="https://i.ibb.co/KpxSgb1h/Logo-universidad-Peruana-de-los-andes.png" alt="Logo Universidad Peruana de los Andes" />
              <img loading="lazy" src="https://i.ibb.co/V0L417q6/Universidad-Catolica-Sedes-Sapiens.png" alt="Logo Universidad Catolica Sedes Sapiens" />
              <img loading="lazy" src="https://i.ibb.co/1YXkx0HJ/Logo-Nacional-del-centro-del-peru-huancayo.png" alt="Logo Nacional del centro del peru huancayo" />
              <img loading="lazy" src="https://i.ibb.co/fYGrHj2w/Logo-universidad-los-angeles-de-Chimbote.webp" alt="Logo universidad los angeles de Chimbote" />
              <img loading="lazy" src="https://i.ibb.co/HDMmr8sd/Universidad-Nacional-Intercultural-Amazonas.png" alt="Logo Universidad Nacional Intercultural Amazonas" />
              <img loading="lazy" src="https://i.ibb.co/qFLDbghf/Logo-de-universidad-nacional-de-Ucayali.png" alt="Logo de universidad nacional de Ucayali" />
            </div>
          </div>
        </section>
        {/* === FIN SECCIÓN PRUEBA SOCIAL === */}


        {/* === SECCIÓN 3: FRUSTRACIÓN === */}
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

              <div className="frustration-card">
                <div className="frustration-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <h3 className="frustration-card-title">Demasiada Información</h3>
                <p className="frustration-card-description">
                  La enorme cantidad de temas y la incertidumbre de no saber por dónde empezar o qué es realmente importante te agobia y te impide concentrarte.
                </p>
              </div>

              <div className="frustration-card">
                <div className="frustration-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="frustration-card-title">Competencia Feroz</h3>
                <p className="frustration-card-description">
                  Miles de colegas compiten por un número limitado de plazas. La presión de tener que superar a otros para asegurar un buen lugar es enorme.
                </p> {/* <--- ¡AQUÍ ESTABA EL ERROR! (Decía </Si>) */}
              </div>

              <div className="frustration-card">
                <div className="frustration-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                </div>
                <h3 className="frustration-card-title">Falta de Guía y Estrategia</h3>
                <p className="frustration-card-description">
                  Te sientes a ciegas, sin una hoja de ruta clara sobre cómo es el examen, qué patrones existen o cuáles son las reglas del juego para la adjudicación.
                </p>
              </div>

            </div>
          </div>
        </section>
        {/* === FIN SECCIÓN FRUSTRACIÓN === */}


        {/* === SECCIÓN 4: MÉTODO === */}
        <section id="metodo" className="method-section">
          <div className="container method-container">

            {/* Título (Reutilizamos las clases) */}
            <div className="section-title-wrapper">
              <h2 className="section-title">
                Nuestro Método: Tu Camino Directo al Éxito
              </h2>
              <p className="section-subtitle">
                Hemos diseñado un sistema de preparación integral que ataca cada pilar fundamental del examen SERUMS, asegurando que llegues en tu máximo potencial.
              </p>
            </div>

            {/* Cuadrícula de 6 Tarjetas */}
            <div className="method-grid">

              <div className="method-card">
                <div className="method-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <h3 className="method-card-title">Clases 100% Enfocadas</h3>
                <p className="method-card-description">
                  Clases en vivo (y grabadas) basadas en los temas más preguntados y de mayor rentabilidad en el examen.
                </p>
              </div>

              <div className="method-card">
                <div className="method-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.73 18a2.5 2.5 0 0 1-3.46 0"></path><path d="M19 8a7 7 0 0 0-14 0c0 4.5 3 7 3 7h8s3-2.5 3-7Z"></path><path d="M12 2v2"></path></svg>
                </div>
                <h3 className="method-card-title">Banco de Preguntas Inteligente</h3>
                <p className="method-card-description">
                  Practica con miles de preguntas tipo SERUMS, con estadísticas de rendimiento para enfocarte en tus debilidades.
                </p>
              </div>

              <div className="method-card">
                <div className="method-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <h3 className="method-card-title">Simulacros Nacionales</h3>
                <p className="method-card-description">
                  Mídete en tiempo real contra miles de postulantes y acostúmbrate a la presión del día del examen.
                </p>
              </div>

              <div className="method-card">
                <div className="method-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <h3 className="method-card-title">Plataforma Virtual 24/7</h3>
                <p className="method-card-description">
                  Accede a todo tu material, clases y simulacros desde cualquier dispositivo, en cualquier momento.
                </p>
              </div>

              <div className="method-card">
                <div className="method-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="method-card-title">Tutoría y Asesoría</h3>
                <p className="method-card-description">
                  Te guiamos en el proceso de inscripción y adjudicación para que tomes la mejor decisión estratégica.
                </p>
              </div>

              <div className="method-card">
                <div className="method-card-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </div>
                <h3 className="method-card-title">Material de Alto Impacto</h3>
                <p className="method-card-description">
                  Resúmenes, mapas mentales y flashcards diseñados para una memorización y repaso efectivos.
                </p>
              </div>

            </div>
          </div>
        </section>
        {/* === FIN SECCIÓN MÉTODO === */}


        {/* === SECCIÓN 5: PROGRAMAS (ESPECIALIDADES) === */}
        <section id="cursos" className="programs-section">
          <div className="container programs-container">

            {/* Título (Reutilizamos las clases) */}
            <div className="section-title-wrapper">
              <h2 className="section-title">
                Nuestro Programa de Preparación para el SERUMS
              </h2>
              <p className="section-subtitle">
                El programa intensivo diseñado para asegurar tu plaza en el SERUMS 2026-I. Elige tu especialidad y empecemos.
              </p>
            </div>

            {/* Tarjeta Principal del Programa */}
            <div className="programs-main-card-wrapper">
              <div className="program-card-main">
                <div className="program-card-main-content">
                  <div className="program-card-main-icon">
                    {/* Icono de libro */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
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

                {/* Sub-sección de Especialidades */}
                <div className="specialty-section">
                  <h4 className="specialty-section-title">
                    Preparación por Especialidad
                  </h4>
                  <div className="specialty-grid">
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/bk188P8/Llamita-Medicina.png" alt="Llamita Medicina" />
                      <h3>MEDICINA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/wND2bDJP/Llamita-Psicologia.png" alt="Llamita Psicologia" />
                      <h3>PSICOLOGÍA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/Kx0PrvHn/Llamita-Enfermeria.png" alt="Llamita Enfermeria" />
                      <h3>ENFERMERÍA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/nsykCndz/Llamita-Odontologia.png" alt="Llamita Odontologia" />
                      <h3>ODONTOLOGÍA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/HfFkyTPb/Lllamita-Quimico-Farmaceutico.png" alt="Llamita Quimico Farmaceutico" />
                      <h3>QUÍMICO F.</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/RkBbR7JM/llama-obstetra.png" alt="Llamita Obstetricia" />
                      <h3>OBSTETRICIA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/Ng3MDJK0/llamita-nutricion.png" alt="Llamita Nutricion" />
                      <h3>NUTRICIÓN</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/yFgtbVjd/llamita-biologia.png" alt="Llamita Biologia" />
                      <h3>BIOLOGÍA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/TMW42YgF/llamita-trabajo-social.png" alt="Llamita Trabajo Social" />
                      <h3>TRABAJO S.</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/jvFPKByT/Llamita-Ingeneria-Sanitario.png" alt="Llamita Ing Sanitario" />
                      <h3>ING. SANITARIA</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <img loading="lazy" src="https://i.ibb.co/XZwDZFV4/llamita-T-Terapia-fisica.png" alt="Llamita Tecnologia Medica" />
                      <h3>TECNOLOGÍA M.</h3>
                    </a>
                    <a href="#" className="specialty-card">
                      <div className="specialty-card-icon-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <h3>OTRO</h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
                 {/* === FIN SECCIÓN PROGRAMAS === */}
         
                 <section id="doctores" className="doctors-section">
           <div className="container doctors-container">
         
             {/* --- Título (Reutilizamos las clases) --- */}
             <div className="section-title-wrapper">
               <h2 className="section-title">
                 Aprende de los mejores especialistas
               </h2>
               <p className="section-subtitle">
                 Nuestros instructores son médicos con amplia experiencia clínica y académica, comprometidos con tu éxito.
               </p>
             </div>
         
             {/* --- Carrusel de Doctores --- */}
             {/* Aquí llamamos al componente que acabamos de crear */}
             <DoctorsCarousel />
         
           </div>
    </section>

        {/* ... Aquí continuaremos con las siguientes secciones ... */}
    <section id="resenas" className="testimonials-section">
       <div className="container testimonials-container">
     
         {/* --- Título (Reutilizamos las clases) --- */}
         <div className="section-title-wrapper">
           <h2 className="section-title">
             Lo que dicen nuestros estudiantes
           </h2>
           <p className="section-subtitle">
             El éxito de nuestros alumnos es nuestra mejor carta de presentación.
           </p>
         </div>
     
         {/* --- Carrusel de Testimonios --- */}
         <TestimonialsCarousel />
     
       </div>
    </section>

    <section id="precios" className="pricing-section">
  <div className="container pricing-container">

    {/* --- Título (Reutilizamos las clases) --- */}
    <div className="section-title-wrapper">
      <h2 className="section-title">
        Elige el plan perfecto para tu futuro SERUMS
      </h2>
      <p className="section-subtitle">
        Invierte en la preparación que te convertirá en el profesional que quieres ser.
      </p>
    </div>

    {/* --- Cuadrícula de 3 Planes --- */}
    <div className="pricing-grid">

      {/* --- Plan Esencial --- */}
      <div className="pricing-card">
        <h3 className="pricing-card-title">Plan Esencial</h3>
        <p className="pricing-card-subtitle">Para empezar con bases sólidas.</p>
        <p className="pricing-card-price">S/ 99</p>
        <ul className="pricing-card-features">
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Acceso a clases en vivo + clases grabadas</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Banco de 1,200 preguntas</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Simulacros Nacionales mensuales</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Guías y material de estudio</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span><b>Inicio: 28 de setiembre</b></span></li>
        </ul>
        <a href="https://wa.me/51978308053?text=Hola%20MorganoMedic%2C%20quiero%20inscribirme%20al%20plan%20Esencial" className="pricing-card-button-outline">
          Inscribirme Ahora
        </a>
      </div>

      {/* --- Plan Premium (Destacado) --- */}
      <div className="pricing-card premium">
        <div className="pricing-card-badge">MÁS POPULAR</div>
        <h3 className="pricing-card-title">Plan Premium</h3>
        <p className="pricing-card-subtitle">La preparación más completa para el SERUMS.</p>

        <div className="pricing-card-price-wrapper">
          <p className="pricing-card-price-old">S/ 350</p>
          <p className="pricing-card-price premium">S/ 299</p>
        </div>
        <p className="pricing-card-promo-text">(solo hasta el 30 de setiembre)</p>

        <ul className="pricing-card-features">
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Todo lo que incluye el plan Esencial <b>y además:</b></span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Clases según temario Minsa <b>en vivo</b></span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Banqueos y simulacros <b>en vivo</b></span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Asesoría para adjudicación</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span><b>Inicio: 15 de noviembre 2025</b></span></li>
        </ul>

        {/* --- Reutilizamos el CountdownTimer --- */}
        <div className="pricing-countdown-wrapper">
          <p className="pricing-countdown-label">La oferta termina en:</p>
          {/* Le pasamos el deadline y el CSS se encargará del estilo */}
          <CountdownTimer deadline={deadline} />
        </div>

        <a href="https://wa.me/51978308053?text=Hola%20MorganoMedic%2C%20quiero%20inscribirme%20al%20plan%20Premium" className="pricing-card-button-primary gradient-tech-flow">
          Elegir Plan Premium
        </a>
      </div>

      {/* --- Plan VIP --- */}
      <div className="pricing-card">
        <h3 className="pricing-card-title">Plan Vip</h3>
        <p className="pricing-card-subtitle">Acompañamiento personalizado.</p>
        <p className="pricing-card-price">S/ 799</p>
        <ul className="pricing-card-features">
          <li className="feature-highlight"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Todo lo del Plan Premium, y además:</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Tutoría personalizada 1 a 1</span></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg><span>Grupo de estudio exclusivo</span></li>
        </ul>
        <a href="#precios" className="pricing-card-button-outline">
          Inscribirme Ahora
        </a>
      </div>

    </div>

    {/* --- Plan Gratuito (al final) --- */}
    <div className="free-plan-card">
      <h3 className="free-plan-title">Plan Gratuito</h3>
      <p className="free-plan-subtitle">
        Prueba la plataforma con acceso a un banco de preguntas limitado y un simulacro gratuito.
      </p>
      <Link href="#planes" className="free-plan-button">
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