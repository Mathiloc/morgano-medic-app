import React from 'react';
import { Outlet, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
// Importamos los íconos como componentes (Más rápido, sin bugs de renderizado)
import { 
  Home, 
  Map, 
  Target, 
  Edit3, 
  BarChart2, 
  DollarSign, 
  Bell, 
  LogOut,
  Menu // Para el botón móvil si lo necesitas
} from 'lucide-react';

import '../styles/Dashboard.css';
import '../styles/GlobalStyles.css';

// --- Configuración de Íconos ---
// Mapeamos los strings a componentes reales de Lucide
const menuItems = [
  { view: 'inicio', icon: Home, text: 'Inicio' },
  { view: 'ruta', icon: Map, text: 'Ruta de Aprendizaje' },
  { view: 'banqueos', icon: Target, text: 'Banqueos Killer' },
  { view: 'simulacros', icon: Edit3, text: 'Simulacros' },
  { view: 'ranking', icon: BarChart2, text: 'Ranking' },
  { view: 'afiliados', icon: DollarSign, text: 'Programa de Referidos' },
  { view: 'notificaciones', icon: Bell, text: 'Notificaciones' },
];

// --- Componentes ---

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
          className={({ isActive }) => 
            `sidebar-btn ${isActive ? 'active' : ''}`
          }
          end={item.view === 'inicio'}
        >
          {/* Renderizamos el componente del ícono directamente */}
          <item.icon size={20} />
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
          className={({ isActive }) => 
            `sidebar-btn ${isActive ? 'active' : ''}`
          }
          end={item.view === 'inicio'}
        >
          <item.icon size={20} />
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

  // Obtenemos el título basado en la ruta actual (opcional, lógica simple)
  // Nota: Para títulos dinámicos perfectos, se suele usar un contexto o custom hook,
  // pero por ahora "Bienvenido" funciona como base.
  
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
          className="logout-icon"
          title="Cerrar Sesión"
          onClick={handleLogout}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <LogOut size={20} />
        </span>
      </div>
    </header>
  );
};

// --- Layout Principal ---

export function DashboardLayout() {
  const { currentUser, loading } = useAuth();

  // ✅ YA NO NECESITAMOS useEffect PARA LOS ÍCONOS
  // Lucide-React se encarga de renderizarlos como SVGs nativos.

  if (loading) {
    return (
      <div className="loading-container" style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        <div className="skeleton-circle" style={{ width: 50, height: 50 }}></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-wrapper">
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

export default DashboardLayout;