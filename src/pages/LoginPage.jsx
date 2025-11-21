import React, { useEffect, useRef, useState, useCallback } from 'react';
// Asegúrate de que la ruta coincida con tu carpeta real (context vs Context)
import { useAuth } from '../Context/AuthContext.jsx'; 
import { useNavigate, Navigate } from 'react-router-dom';
import { apiCall } from '../utils/api.js';
import { RegisterForm } from '../components/RegisterForm.jsx';
// 👇 IMPORTAMOS LOS NUEVOS HOOKS (CEREBROS)
import { useLogin } from '../hooks/useLogin';     
import { useAffiliate } from '../hooks/useAffiliate'; 
import '../styles/Dashboard.css';
import logoVerde from '../assets/images/Logo-Verde.png';


// ✅ SEGURIDAD: Leemos el ID desde el archivo .env
// Si no existe, evitará que la app se rompa pero mostrará un error en consola
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function LoginPage() {
  const { login: authLogin, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // 👇 USAMOS LOS HOOKS PARA LIMPIAR LA VISTA
  // useLogin: Maneja la carga, errores y validación con el backend simulado
  const { login: loginAPI, isLoading, error: loginError } = useLogin();
  // useAffiliate: Maneja la lectura de cookies y cálculo de descuentos
  const { affiliateOffer } = useAffiliate(); 

  const [authMessage, setAuthMessage] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [googleUserData, setGoogleUserData] = useState(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const googleButtonContainerRef = useRef(null);

  // Sincronizar errores del hook de login con el mensaje de la UI
  useEffect(() => {
    if (loginError) setAuthMessage(loginError);
  }, [loginError]);

  // Callback de Google (Simplificado gracias al hook useAffiliate)
  const handleSignIn = useCallback(async (googleResponse) => {
    setAuthMessage('Verificando con Google...');
    
    // Ya tenemos los datos de afiliado limpios gracias al hook
    const payload = { 
      credential: googleResponse.credential,
      affiliateId: affiliateOffer?.id || null,
      discountApplied: affiliateOffer?.discount || null
    };
    
    const backendResponse = await apiCall('handleGoogleSignIn', payload);
    
    if (backendResponse.success) {
      if (backendResponse.userExists) {
        authLogin(backendResponse.userData);
        navigate('/board/inicio');
      } else {
        setGoogleUserData(backendResponse.googleData);
        setShowRegisterForm(true);
      }
    } else {
      setAuthMessage(backendResponse.message || 'Error al iniciar sesión.');
    }
  }, [authLogin, navigate, affiliateOffer]);

  // Carga del Script de Google (Ahora usa la variable segura)
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.error("Falta VITE_GOOGLE_CLIENT_ID en el archivo .env");
      setAuthMessage("Error de configuración: Falta Google Client ID");
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID, // 👈 Usamos la variable de entorno
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
      document.body.removeChild(script);
    };
  }, [handleSignIn]);

  // Handler para el login con email (REFACTORIZADO Y LIMPIO)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setAuthMessage(''); 
    
    // Llamamos al hook. Toda la lógica de setTimeout y validación está oculta.
    const result = await loginAPI(email, password);
    
    if (result.success) {
      authLogin(result.user);
      // La navegación ya la maneja el hook, o el AuthContext si así lo configuraste.
    }
  };
  
  if (currentUser) return <Navigate to="/board/inicio" replace />;

  return (
    <div className="morganoboard-auth-wrapper">
      <div className="morganoboard-card">
        
        {/* Panel de Bienvenida */}
        <div className="morganoboard-welcome-panel">
          <img src="https://i.ibb.co/zkg5kVc/Llamita1.png" alt="Morgui" className="mascot" />
          {affiliateOffer ? (
            <>
              <h2>¡Gracias a {affiliateOffer.name}!</h2>
              <p>Has sido invitado/a y tienes un <strong>{affiliateOffer.discount}% de descuento</strong>.</p>
            </>
          ) : (
            <>
              <h2>Bienvenido/a al Futuro</h2>
              <p>Estás a un paso de unirte a la nueva generación de médicos.</p>
            </>
          )}
        </div>

        {/* Panel de Formulario */}
        <div className="morganoboard-form-panel">
          {!showRegisterForm ? (
            <div id="morganoboard-login-view" style={{ width: '100%' }}>
              <div className="form-header">
                <img src={logoVerde} alt="Logo MorganoMedic" />
              </div>
              
              {/* Botón de Google */}
              <div id="google-signin-btn-container" ref={googleButtonContainerRef}></div>
              
              <div>
                   
                   
              </div>
              
              {/* Formulario Email */}
              <form id="email-login-form" onSubmit={handleEmailLogin}>
                <div className="morganoboard-form-group">
                  <label htmlFor="mb-login-email">Email</label>
                  <input 
                    type="email" name="email" id="mb-login-email" required 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="morganoboard-form-group">
                  <label htmlFor="mb-login-pass">Contraseña</label>
                  <input 
                    type="password" name="password" id="mb-login-pass" required 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="morganoboard-btn btn-full-width" 
                  style={{marginTop: '0.5rem'}}
                  disabled={isLoading} // Deshabilitado mientras carga
                >
                  {isLoading ? 'Verificando...' : 'Ingresar'}
                </button>
              </form>
              
              <div id="auth-message" className={`morganoboard-message ${authMessage ? 'error' : ''}`}>
                {authMessage}
              </div>
            </div>
          ) : (
            <RegisterForm googleData={googleUserData} affiliateData={affiliateOffer} />
          )}
        </div>
      </div>
    </div>
  );
}