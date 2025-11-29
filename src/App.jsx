// src/App.jsx (VERSIÓN INTEGRADA: Ruta + Banqueos + Simulacros + RANKING)
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx';

// --- Páginas Públicas ---
import LandingPage from './pages/LandingPage.jsx';
import SerumsProgramPage from './pages/SerumsProgramPage.jsx';
import EnamProgramPage from './pages/EnamProgramPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';

// --- Layout y Páginas del Dashboard ---
import { DashboardLayout } from './components/DashboardLayout.jsx';
import { InicioPage } from './pages/InicioPage.jsx';

// --- Páginas REALES del Dashboard (Las que ya creamos) ---
import RutaPage from './pages/RutaPage.jsx';
import BanqueosPage from './pages/BanqueosPage.jsx';
import SimulacrosPage from './pages/SimulacrosPage.jsx';
import RankingPage from './pages/RankingPage.jsx'; // ✅ 1. IMPORTADO

// --- Placeholders (Solo para lo que AÚN falta) ---
// ❌ RankingPage ELIMINADO de aquí porque ya es real
const AfiliadosPage = () => <div>Vista de Afiliados (Pronto)</div>;
// --- Fin de placeholders ---

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/serums", element: <SerumsProgramPage /> },
  { path: "/enam", element: <EnamProgramPage /> },
  { path: "/login", element: <LoginPage /> },
  
  {
    path: "/board",
    element: <DashboardLayout />, 
    children: [
      { index: true, element: <Navigate to="/board/inicio" replace /> },
      
      { path: "inicio", element: <InicioPage /> },
      { path: "ruta", element: <RutaPage /> }, 
      { path: "banqueos", element: <BanqueosPage /> },
      { path: "simulacros", element: <SimulacrosPage /> },
      
      // ✅ 2. Ahora apunta al componente real importado arriba
      { path: "ranking", element: <RankingPage /> },
      
      { path: "afiliados", element: <AfiliadosPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;