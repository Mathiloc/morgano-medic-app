
import React, { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../styles/Dashboard.css';
// --- Componentes placeholder (para que funcione) ---

// Placeholder para el Header
const BoardHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 1. Llama al logout (solo limpia el estado)
    navigate('/login'); // 2. Redirige al usuario
  };
  
  return (
    <header className="board-header" style={{ display: 'flex', alignItems: 'center' }}>
      [Board Header]
      {/* Botón de simulación de logout */}
      <button onClick={handleLogout} style={{marginLeft: 'auto', background: '#FF6B6B', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer'}}>
        Simular Logout
      </button>
    </header>
  );
};

const Sidebar = () => <nav className="sidebar">[Sidebar]</nav>;
const MobileNav = () => <nav className="mobile-nav">[Mobile Nav]</nav>;
// --- Fin de placeholders ---

export function DashboardLayout() {
  const { currentUser, loading } = useAuth();

  // 1. Muestra un loader mientras se verifica el localStorage
  if (loading) {
    return <div style={{textAlign: 'center', padding: '5rem', fontFamily: 'Inter, sans-serif'}}>Cargando sesión...</div>;
  }

  // 2. Si terminó de cargar y NO hay usuario, redirige
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay usuario, muestra el Dashboard
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