import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api.js';

// Logo verde de tu marca
const logoVerde = "https://i.ibb.co/3YWQn17F/Logo-Verde.png";

export function RegisterForm({ googleData, affiliateData }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');
  
  // Estado para TODOS los campos del formulario
  const [formData, setFormData] = useState({
    // Pre-llenamos con los datos de Google
    nombres: googleData?.nombres || '',
    apellidos: googleData?.apellidos || '',
    username: '',
    dni: '',
    fechaNacimiento: '',
    whatsApp: '',
    universidad: '',
    carrera: '',
    programa: '',
    anioEgreso: '',
    departamento: '',
    provincia: '',
    distrito: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => setCurrentStep(2);
  const handlePrevStep = () => setCurrentStep(1);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage('Procesando...');
    
    const finalUserData = { ...googleData, ...formData };
    
    const payload = {
      userData: finalUserData,
      affiliateId: affiliateData ? affiliateData.id : null,
      discountApplied: affiliateData ? affiliateData.discount : null
    };

    const response = await apiCall('registerGoogleUser', payload);

    if (response.success) {
      login(response.userData); // ¡Login exitoso!
      navigate('/board/inicio'); // Redirige al dashboard
    } else {
      setMessage(response.message || 'Error en el registro.');
    }
  };

  return (
    <div id="morganoboard-register-view">
      <div className="form-header"><img src={logoVerde} alt="Logo MorganoMedic" /></div>
      <h3 style={{ fontFamily: 'var(--font-titulos)', textAlign: 'center', marginTop: 0, marginBottom: '1rem' }}>
        Completa tu Registro
      </h3>
      
      {/* Barra de Progreso */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: currentStep === 1 ? '50%' : '100%' }}
        ></div>
      </div>
      
      <form id="morganoboard-register-form" onSubmit={handleRegisterSubmit}>
        
        {/* --- PASO 1 --- */}
        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
          <h3>1. Datos Personales y de Usuario</h3>
          <div className="morganoboard-form-group">
            <label htmlFor="mb-reg-nombres">Nombres</label>
            <input type="text" name="nombres" id="mb-reg-nombres" required value={formData.nombres} onChange={handleInputChange} placeholder="Ej: Ana Lucía" />
          </div>
          <div className="morganoboard-form-group">
            <label htmlFor="mb-reg-apellidos">Apellidos</label>
            <input type="text" name="apellidos" id="mb-reg-apellidos" required value={formData.apellidos} onChange={handleInputChange} placeholder="Ej: Pérez Gómez" />
          </div>
          {/* ... (resto de campos del paso 1) ... */}
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-username">Nombre de usuario (alias)</label><input type="text" name="username" id="mb-reg-username" required value={formData.username} onChange={handleInputChange} placeholder="Ej: DraAnaPerez" /></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-dni">DNI</label><input type="text" name="dni" id="mb-reg-dni" required value={formData.dni} onChange={handleInputChange} placeholder="Ej: 12345678" /></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-fnac">Fecha de Nacimiento</label><input type="date" name="fechaNacimiento" id="mb-reg-fnac" required value={formData.fechaNacimiento} onChange={handleInputChange} /></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-wsp">WhatsApp</label><input type="tel" name="whatsApp" id="mb-reg-wsp" required value={formData.whatsApp} onChange={handleInputChange} placeholder="Ej: 987654321" /></div>
          
          <div className="form-navigation-buttons">
            <button type="button" onClick={handleNextStep} className="morganoboard-btn" style={{ width: '100%' }}>
              Siguiente
            </button>
          </div>
        </div>

        {/* --- PASO 2 --- */}
        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
          <h3>2. Datos Académicos y de Ubicación</h3>
          <div className="morganoboard-form-group">
            <label htmlFor="mb-reg-uni">Universidad</label>
            <input type="text" name="universidad" id="mb-reg-uni" required value={formData.universidad} onChange={handleInputChange} placeholder="Ej: Universidad Nacional Mayor de San Marcos" />
          </div>
          <div className="morganoboard-form-group">
            <label htmlFor="mb-reg-carrera">Carrera</label>
            <select id="mb-reg-carrera" name="carrera" required value={formData.carrera} onChange={handleInputChange}>
              <option value="" disabled>Selecciona tu carrera</option>
              <option value="Medicina">Medicina</option>
              {/* ... (todas las otras opciones) ... */}
              <option value="Otro">Otro</option>
            </select>
          </div>
          {/* ... (resto de campos del paso 2) ... */}
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-programa">Programa de Interés</label><select id="mb-reg-programa" name="programa" required value={formData.programa} onChange={handleInputChange}><option value="" disabled>Selecciona tu programa</option><option value="SERUMS 2026 - I">SERUMS 2026 - I</option><option value="ENAM 2025 - II">ENAM 2025 - II</option><option value="Residentado">Residentado</option></select></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-aegreso">Año de Egreso</label><input type="number" name="anioEgreso" id="mb-reg-aegreso" required value={formData.anioEgreso} onChange={handleInputChange} placeholder="Ej: 2023" min="1950" max="2050" /></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-dep">Departamento</label><input type="text" name="departamento" id="mb-reg-dep" required value={formData.departamento} onChange={handleInputChange} /></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-prov">Provincia</label><input type="text" name="provincia" id="mb-reg-prov" required value={formData.provincia} onChange={handleInputChange} /></div>
          <div className="morganoboard-form-group"><label htmlFor="mb-reg-dist">Distrito</label><input type="text" name="distrito" id="mb-reg-dist" required value={formData.distrito} onChange={handleInputChange} /></div>

          <div className="form-navigation-buttons">
            <button type="button" onClick={handlePrevStep} className="morganoboard-btn btn-secondary">
              Anterior
            </button>
            <button type="submit" id="morganoboard-register-button" className="morganoboard-btn">
              Crear mi Cuenta
            </button>
          </div>
        </div>
      </form>
      <div id="morganoboard-register-message" className="morganoboard-message error">
        {message}
      </div>
    </div>
  );
}