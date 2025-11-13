import React, { useEffect } from 'react';
import { Outlet, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
// NO importamos 'feather-icons'
import '../styles/Dashboard.css';

// --- Lista de items del menú ---
const menuItems = [
  { view: 'inicio', icon: 'home', text: 'Inicio' },
  { view: 'ruta', icon: 'map', text: 'Ruta de Aprendizaje' },
  { view: 'banqueos', icon: 'target', text: 'Banqueos Killer' },
  { view: 'simulacros', icon: 'edit-3', text: 'Simulacros' },
  { view: 'ranking', icon: 'bar-chart-2', text: 'Ranking' },
  { view: 'afiliados', icon: 'dollar-sign', text: 'Programa de Referidos' },
  { view: 'notificaciones', icon: 'bell', text: 'Notificaciones' },
];

// --- Componentes Reales (reemplazan tus placeholders) ---

const Sidebar = () => (
  <nav className="sidebar" aria-label="Navegación principal">
    <NavLink to="inicio">
      <img
        src="https://i.ibb.co/3YWQn17F/Logo-Verde.png"
        alt="MorganoMedic Isotipo"
        className="sidebar-logo"
      />
    </NavLink>
    <div className="sidebar-nav">
      {menuItems.map((item) => (
        <NavLink
          key={item.view}
          to={item.view}
          className="sidebar-btn"
          end={item.view === 'inicio'}
        >
          {/* Volvemos a usar 'data-feather' */}
          <i data-feather={item.icon}></i>
          <span className="sidebar-text">{item.text}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);

const MobileNav = () => (
  <nav id="mobile-nav" className="mobile-nav">
    <div className="mobile-nav-inner">
      {menuItems.map((item) => (
        <NavLink
          key={item.view}
          to={item.view}
          className="sidebar-btn"
          end={item.view === 'inicio'}
        >
          <i data-feather={item.icon}></i>
          <span className="sidebar-text">{item.text}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);

const BoardHeader = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userName = currentUser?.username || 'Usuario';
  const userInitial = currentUser?.nombres
    ? currentUser.nombres.charAt(0).toUpperCase()
    : 'M';

  return (
    <header className="board-header">
      <div className="header-title-container">
        <h1 id="view-title">Bienvenido</h1>
      </div>
      <div className="user-profile">
        <span className="user-name" id="board-user-name">
          {userName}
        </span>
        <div className="user-initial" id="board-user-initial">
          {userInitial}
        </div>
        <span
          id="morganoboard-logout-button"
          className="logout-icon"
          title="Cerrar Sesión"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <i data-feather="log-out"></i>
        </span>
      </div>
    </header>
  );
};

// --- Layout Principal (Tu componente original, ahora con 'useEffect') ---

export function DashboardLayout() {
  const { currentUser, loading } = useAuth();

  // Este useEffect llama a 'feather.replace()' cuando el layout se carga.
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
    // Lo ejecutamos cada vez que el usuario (y por ende el layout) carga
  }, [loading, currentUser]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '5rem',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Cargando sesión...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div id="page-wrapper" className="page-wrapper">
      <Sidebar />
      <MobileNav />

      <main className="main-content">
        <BoardHeader />
        <div id="view-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}