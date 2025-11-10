import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import { useNavigate, Navigate } from 'react-router-dom';
import { apiCall } from '../utils/api.js';
import { RegisterForm } from '../components/RegisterForm.jsx';
import '../styles/Dashboard.css'; // Esto es correcto (para los estilos del card)

const logoVerde = "https://i.ibb.co/3YWQn17F/Logo-Verde.png";

export function LoginPage() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [authMessage, setAuthMessage] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [affiliateOffer, setAffiliateOffer] = useState(null);
  
  // Estados para el formulario de email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleButtonContainerRef = useRef(null);

  // --- Lógica de Afiliados ---
  useEffect(() => {
    // (Tu lógica de getCookie y apiCall para afiliados va aquí)
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const affiliateId = getCookie('morgano_ref_id');
    if (affiliateId) {
      apiCall('getAffiliateOfferDetails', { affiliateId }).then(response => {
        if (response.success && response.data) {
          setAffiliateOffer({ 
            id: affiliateId, 
            discount: response.data.discountPercentage, 
            name: response.data.affiliateName 
          });
        }
      });
    }
  }, []);

  // --- Callback de Google GSI ---
  const handleSignIn = useCallback(async (googleResponse) => {
    setAuthMessage('Verificando...');
    const payload = { 
      credential: googleResponse.credential,
      affiliateId: affiliateOffer ? affiliateOffer.id : null,
      discountApplied: affiliateOffer ? affiliateOffer.discount : null
    };
    const backendResponse = await apiCall('handleGoogleSignIn', payload);
    
    if (backendResponse.success) {
      if (backendResponse.userExists) {
        login(backendResponse.userData);
        navigate('/board/inicio');
      } else {
        setGoogleUserData(backendResponse.googleData);
        setShowRegisterForm(true);
      }
    } else {
      setAuthMessage(backendResponse.message || 'Error al iniciar sesión.');
    }
  }, [login, navigate, affiliateOffer]);

  // --- Carga del Script de Google ---
  useEffect(() => {
    // ❌ EL 'useEffect' QUE AÑADÍA 'dashboard-body' SE HA QUITADO
    
    // Carga el script de Google GSI
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "160669319361-pqtig8ihoi8is22oeegmis1qjdt3q0t8.apps.googleusercontent.com",
          callback: handleSignIn
        });
        if (googleButtonContainerRef.current) {
          window.google.accounts.id.renderButton(
            googleButtonContainerRef.current,
            { theme: "outline", size: "large", width: "300" }
          );
        }
      }
    };
    return () => {
      // Limpia solo el script
      document.body.removeChild(script);
    };
  }, [handleSignIn]); // Dependencia del callback

  
  // --- Handler para el login con email ---
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setAuthMessage('Verificando...');
    
    // Simulación de API
    setTimeout(() => {
      if (email === "test@morgano.com" && password === "1234") {
        login({ email: email, nombres: "Usuario Test", programa: "SERUMS 2026 - I" });
        navigate('/board/inicio');
      } else {
        setAuthMessage('Email o contraseña incorrectos. (Prueba test@morgano.com / 1234)');
      }
    }, 1000);
  };
  
  if (currentUser) {
    return <Navigate to="/board/inicio" replace />;
  }

  return (
    <div className="morganoboard-auth-wrapper"> {/* 👈 Este div ahora es transparente */}
      <div className="morganoboard-card">
        
        {/* Panel de Bienvenida */}
        <div className="morganoboard-welcome-panel">
          <img src="https://i.ibb.co/zkg5kVc/Llamita1.png" alt="Morgui" className="mascot" />
          {affiliateOffer ? (
            <>
              <h2>¡Gracias a {affiliateOffer.name}!</h2>
              <p>Has sido invitado/a y tienes un <strong>{affiliateOffer.discount}% de descuento</strong>. ¡Inicia sesión para reclamarlo!</p>
            </>
          ) : (
            <>
              <h2>Bienvenido/a al Futuro</h2>
              <p>Estás a un paso de unirte a la nueva generación de médicos.</p>
            </>
          )}
        </div>

        {/* Panel de Formulario (con Login o Registro) */}
        <div className="morganoboard-form-panel">
          
          {!showRegisterForm ? (
            // --- VISTA DE LOGIN ---
            <div id="morganoboard-login-view" style={{ width: '100%' }}>
              <div className="form-header">
                <img src={logoVerde} alt="Logo MorganoMedic" />
              </div>
              
              {/* 1. Botón de Google */}
              <div id="google-signin-btn-container" ref={googleButtonContainerRef}></div>
              
              {/* 2. Separador "O" */}
              <div className="auth-separator">O</div>
              
              {/* 3. Formulario de Email */}
              <form id="email-login-form" onSubmit={handleEmailLogin}>
                <div className="morganoboard-form-group">
                  <label htmlFor="mb-login-email">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="mb-login-email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="morganoboard-form-group">
                  <label htmlFor="mb-login-pass">Contraseña</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="mb-login-pass" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="morganoboard-btn btn-full-width" style={{marginTop: '0.5rem'}}>
                  Ingresar
                </button>
              </form>
              
              <div id="auth-message" className="morganoboard-message error">
                {authMessage}
              </div>
            </div>

          ) : (
            
            // --- VISTA DE REGISTRO (sin cambios) ---
            <RegisterForm 
              googleData={googleUserData}
              affiliateData={affiliateOffer}
            />

          )}
        </div>
      </div>
    </div>
  );
}