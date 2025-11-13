import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
// import feather from 'feather-icons'; // ELIMINADO
import '../styles/Dashboard.css';

// --- COMPONENTE DE SKELETON (ESQUELETO) ---
const AffiliateSkeleton = () => (
  <div className="affiliate-dashboard-grid">
    <div className="affiliate-main-column">
      <div className="stats-grid stats-grid-2x2">
        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }}></div>
        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }}></div>
        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }}></div>
        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }}></div>
      </div>
      <div className="affiliate-card">
        <div className="skeleton" style={{ height: '28px', width: '60%', marginBottom: '1.5rem' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '0.5rem' }}></div>
        <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
      </div>
    </div>
    <div className="affiliate-side-column">
      <div className="skeleton" style={{ height: '120px', borderRadius: '12px' }}></div>
      <div className="skeleton" style={{ height: '220px', borderRadius: '12px' }}></div>
    </div>
  </div>
);

// --- DATOS DE SIMULACIÓN ---
const fakeDashboardData = {
  isAffiliate: true,
  data: {
    estadisticasGenerales: { saldoPendiente: 40.0, totalGanado: 120.0, totalReferidos: 6, totalClics: 82, referidosMeta: 5 },
    enlaceAfiliado: 'https://morganomedic.com/ref/DraAna',
    descuento: 20,
    nivel: { nombre: 'Afiliado Bronce', progresoActual: 6 },
    niveles: [ { nombre: 'Bronce', requeridos: 5 }, { nombre: 'Plata', requeridos: 10 }, { nombre: 'Oro', requeridos: 20 } ],
    referidosDetallados: [
      { referredName: 'Juan Pérez', date: '2025-10-20', commission: 20.0, planReferido: 'Pro' },
      { referredName: 'María Gómez', date: '2025-10-18', commission: 20.0, planReferido: 'Básico' },
    ],
    leaderboard: [ { rank: 1, name: 'Dr. Top', referrals: 15 }, { rank: 2, name: 'MedStudent', referrals: 10 }, { rank: 3, name: 'TuUsuario', referrals: 6 } ],
  },
};
// --- FIN DE DATOS DE SIMULACIÓN ---

// --- VISTA 1: UPSELL (No es PRO) ---
const AffiliateUpsellView = () => (
  <div id="affiliate-upsell-view" className="affiliate-upsell-container">
    <div className="affiliate-card affiliate-upsell-card">
      <img src="https://i.ibb.co/RT1XSMQf/Llamita-segura-de-si-misma.png" alt="Morgui te invita" className="affiliate-mascot" />
      <h2 className="affiliate-title">Conviértete en Afiliado y Gana</h2>
      <p className="affiliate-subtitle">Beneficio exclusivo para estudiantes con plan PRO.</p>
      <a href="https://morganomedic.com/serums/#precios" target="_blank" rel="noopener noreferrer" className="morganoboard-btn btn-full-width">
        ¡Quiero ser PRO!
      </a>
    </div>
  </div>
);

// --- VISTA 2: REGISTRO (Es PRO, falta Yape) ---
const AffiliateRegisterView = ({ onRegister }) => {
  const [yapeNumber, setYapeNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (yapeNumber.length !== 9) {
      setMessage('Por favor, ingresa un número de 9 dígitos.');
      return;
    }
    setIsSubmitting(true);
    setMessage('Registrando...');
    setTimeout(() => {
      onRegister(yapeNumber);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div id="affiliate-register-view" className="affiliate-register-container">
      <div className="affiliate-card affiliate-register-card">
        <img src="https://i.ibb.co/tMqxDv0T/Llamita-con-diploma.png" alt="Activa tu beneficio" className="affiliate-mascot small" />
        <h2 className="affiliate-title">¡Estás a un paso!</h2>
        <p className="affiliate-subtitle">Como estudiante PRO, este beneficio ya es tuyo. Ingresa tu Yape.</p>
        <form id="affiliate-register-form" onSubmit={handleSubmit}>
          <div className="morganoboard-form-group">
            <label htmlFor="aff-yape">Tu Número de Celular asociado a Yape</label>
            <input type="tel" id="aff-yape" name="yapeNumber" required placeholder="Ej: 987654321" pattern="[0-9]{9}" value={yapeNumber} onChange={(e) => setYapeNumber(e.target.value)} disabled={isSubmitting} />
          </div>
          <button type="submit" id="aff-register-btn" className="morganoboard-btn btn-full-width" disabled={isSubmitting}>
            {isSubmitting ? 'Activando...' : 'Activar mi Cuenta'}
          </button>
        </form>
        <div id="aff-register-message" className="morganoboard-message">{message}</div>
      </div>
    </div>
  );
};

// --- VISTA 3: DASHBOARD (Afiliado activo) ---
const AffiliateDashboardView = ({ data }) => {
  const [copyFeedback, setCopyFeedback] = useState('');
  const { estadisticasGenerales: stats, enlaceAfiliado, descuento, nivel, niveles, referidosDetallados, leaderboard } = data;

  const handleCopy = (text, feedbackMsg) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(feedbackMsg);
    setTimeout(() => setCopyFeedback(''), 2500);
  };
  
  const enlace = enlaceAfiliado;
  const mensajeWhatsapp = encodeURIComponent(`¡Hola! Te invito a prepararte con MorganoMedic. Usa mi enlace y obtén un ${descuento}% de descuento. ${enlace}`);
  const meta = stats.referidosMeta;
  const progreso = Math.min((stats.totalReferidos / meta) * 100, 100);
  const faltantes = Math.max(0, meta - stats.totalReferidos);

  return (
    <div id="affiliate-dashboard-view" className="affiliate-dashboard-grid">
      <div className="affiliate-main-column">
        <div className="stats-grid stats-grid-2x2">
          <div className="stat-card"><div className="stat-icon yellow"><i data-feather="clock"></i></div><div><p>Saldo Pendiente</p><h3>S/ {stats.saldoPendiente.toFixed(2)}</h3></div></div>
          <div className="stat-card"><div className="stat-icon green"><i data-feather="check-circle"></i></div><div><p>Total Pagado</p><h3>S/ {(stats.totalGanado - stats.saldoPendiente).toFixed(2)}</h3></div></div>
          <div className="stat-card"><div className="stat-icon blue"><i data-feather="users"></i></div><div><p>Total Referidos</p><h3>{stats.totalReferidos}</h3></div></div>
          <div className="stat-card"><div className="stat-icon violet"><i data-feather="mouse-pointer"></i></div><div><p>Total Clics</p><h3>{stats.totalClics}</h3></div></div>
        </div>
        <div className="affiliate-card">
          <div className="card-header">
            <div>
              <h2 className="affiliate-card-title">Tu Centro de Mando</h2>
              <p className="affiliate-card-subtitle">Copia tu enlace y compártelo.</p>
            </div>
            <img src="https://i.ibb.co/20Sbc0BL/Llamita-logro-su-objetivo.png" alt="Morgui Festejando" className="affiliate-mascot tiny" />
          </div>
          <div className="morganoboard-form-group">
            <label htmlFor="aff-link">Tu Enlace de Afiliado Único</label>
            <div className="input-group">
              <input type="text" id="aff-link" value={enlace} readOnly />
              <button id="copy-aff-link-btn" className="morganoboard-btn btn-icon" title="Copiar enlace" onClick={() => handleCopy(enlace, '¡Enlace copiado!')}>
                <i data-feather="copy"></i>
              </button>
            </div>
            <p id="copy-link-feedback" style={{ height: '1.2rem', marginTop: '0.5rem', color: 'var(--success)', fontWeight: 500 }}>{copyFeedback}</p>
          </div>
          <div className="share-section">
            <p>O compártelo directamente:</p>
            <div className="share-buttons">
              <a id="share-whatsapp" href={`https://api.whatsapp.com/send?text=${mensajeWhatsapp}`} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp" title="WhatsApp"><i data-feather="message-circle"></i></a>
              <a id="share-facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${enlace}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook" title="Facebook"><i data-feather="facebook"></i></a>
              <a id="share-instagram" href="#" onClick={(e) => { e.preventDefault(); handleCopy(enlace, 'Copiado para Instagram'); }} className="share-btn instagram" title="Copiar para Instagram"><i data-feather="instagram"></i></a>
              <a id="share-tiktok" href="#" onClick={(e) => { e.preventDefault(); handleCopy(enlace, 'Copiado para TikTok'); }} className="share-btn tiktok" title="Copiar para TikTok"><i data-feather="music"></i></a>
            </div>
          </div>
        </div>
        <div className="affiliate-card">
          <h2 className="affiliate-card-title">Detalle de Tus Referidos</h2>
          <div className="table-wrapper">
            <table id="referrals-table">
              <thead><tr><th>Referido</th><th>Fecha</th><th style={{ textAlign: 'right' }}>Comisión</th><th style={{ textAlign: 'center' }}>Plan</th></tr></thead>
              <tbody>
                {referidosDetallados.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--texto-secundario)' }}>Aún no tienes referidos.</td></tr>
                ) : (
                  referidosDetallados.map(ref => (
                    <tr key={ref.referredName}>
                      <td>{ref.referredName}</td><td>{ref.date}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--verde-principal)' }}>S/ {ref.commission.toFixed(2)}</td>
                      <td style={{ textAlign: 'center' }} className={ref.planReferido.toLowerCase() === 'pro' ? 'plan-pro' : ''}>{ref.planReferido}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="affiliate-side-column">
        <div className="affiliate-card">
          <h3 className="affiliate-card-title">Meta: ¡Tu Plan Gratis!</h3>
          <p id="goal-progress-text" className="affiliate-card-subtitle">{faltantes > 0 ? `¡Te faltan ${faltantes} referidos!` : '¡Felicidades! ¡Alcanzaste la meta!'}</p>
          <div className="progress-bar-container" style={{ marginTop: '1rem' }}>
            <div id="goal-progress-bar" className="progress-bar" style={{ width: `${progreso}%`, height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--texto-principal)', fontWeight: 600, fontSize: '0.8rem' }}>
              {stats.totalReferidos} / {meta}
            </div>
          </div>
        </div>
        <div className="affiliate-card">
          <div className="card-header-icon"><div className="stat-icon violet"><i data-feather="award"></i></div><h3 className="affiliate-card-title" style={{ fontSize: '1.2rem' }}>Tu Nivel de Afiliado</h3></div>
          <p id="level-progress-text" className="affiliate-card-subtitle">Tu nivel actual: {nivel.nombre}</p>
          <div id="level-tracker" className="level-tracker-container">
            {niveles.map(lvl => {
              const isAchieved = nivel.progresoActual >= lvl.requeridos;
              let statusClass = isAchieved ? 'achieved' : 'locked';
              let icon = isAchieved ? <i data-feather="check"></i> : <i data-feather="lock"></i>;
              if (!isAchieved && (niveles.find(n => n.requeridos > nivel.progresoActual) === lvl)) {
                statusClass = 'in-progress';
                icon = <i data-feather="trending-up"></i>;
              }
              return (
                <div key={lvl.nombre} className={`level-item ${statusClass}`}>
                  <div className="icon">{icon}</div>
                  <div className="info">
                    <p>{lvl.nombre}</p>
                    <span>{isAchieved ? `Meta cumplida (${lvl.requeridos})` : `${nivel.progresoActual} / ${lvl.requeridos} referidos`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="affiliate-card">
          <div className="card-header-icon"><div className="stat-icon coral"><i data-feather="trending-up"></i></div><h3 className="affiliate-card-title" style={{ fontSize: '1.2rem' }}>Top 5 Afiliados</h3></div>
          <ul id="leaderboard-list" className="leaderboard">
            {leaderboard.map(af => (
              <li key={af.rank}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><span className="rank">{af.rank}.</span><span className="name">{af.name}</span></div>
                <span className="points">{af.referrals} ref.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


// --- PÁGINA PRINCIPAL DE AFILIADOS ---
export function AfiliadosPage() {
  const [viewState, setViewState] = useState('loading'); // 'loading', 'upsell', 'register', 'dashboard'
  const [data, setData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadData = () => {
      if (!currentUser) return;
      setViewState('loading');
      
      // Simulación
      setTimeout(() => {
        if (fakeDashboardData.isAffiliate) {
          setData(fakeDashboardData.data);
          setViewState('dashboard');
        } else {
          setViewState('register');
        }
      }, 1500);
    };
    loadData();
  }, [currentUser]);

  // Efecto para recargar los íconos de Feather
  useEffect(() => {
    // CORREGIDO: Usamos window.feather
    if (viewState !== 'loading' && window.feather) {
      window.feather.replace();
    }
  }, [viewState]);
  
  const handleRegistration = (yapeNumber) => {
    setViewState('loading');
    setTimeout(() => {
      setData(fakeDashboardData.data);
      setViewState('dashboard');
    }, 1000);
  };

  switch (viewState) {
    case 'loading':
      return <AffiliateSkeleton />;
    case 'upsell':
      return <AffiliateUpsellView />;
    case 'register':
      return <AffiliateRegisterView onRegister={handleRegistration} />;
    case 'dashboard':
      return <AffiliateDashboardView data={data} />;
    default:
      return <AffiliateSkeleton />;
  }
}