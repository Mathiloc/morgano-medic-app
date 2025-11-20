// src/App.jsx (CORREGIDO)
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx'; // 👈 1. Importa el Provider

// --- Páginas Públicas ---
import LandingPage from './pages/LandingPage.jsx';
import SerumsProgramPage from './pages/SerumsProgramPage.jsx';
import EnamProgramPage from './pages/EnamProgramPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';

// --- Layout y Páginas del Dashboard ---
import { DashboardLayout } from './components/DashboardLayout.jsx';
import { InicioPage } from './pages/InicioPage.jsx';

// --- Placeholders (los necesitarás para que el router no falle) ---
const RutaPage = () => <div>Vista de Ruta de Aprendizaje</div>;
const BanqueosPage = () => <div>Vista de Banqueos</div>;
const SimulacrosPage = () => <div>Vista de Simulacros</div>;
const RankingPage = () => <div>Vista de Ranking</div>;
const AfiliadosPage = () => <div>Vista de Afiliados</div>;
// --- Fin de placeholders ---

// 2. Define TODAS las rutas
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/serums", element: <SerumsProgramPage /> },
  { path: "/enam", element: <EnamProgramPage /> },
  { path: "/login", element: <LoginPage /> }, // 👈 Esta ruta ahora existe
  {
    path: "/board",
    element: <DashboardLayout />, 
    children: [
      { index: true, element: <Navigate to="/board/inicio" replace /> },
      { path: "inicio", element: <InicioPage /> },
      { path: "ruta", element: <RutaPage /> },
      { path: "banqueos", element: <BanqueosPage /> },
      { path: "simulacros", element: <SimulacrosPage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "afiliados", element: <AfiliadosPage /> },
    ],
  },
]);

// 3. Define el componente App
function App() {
  return (
    // 4. Envuelve el RouterProvider en el AuthProvider
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

// 5. Asegúrate de que sea export default
export default App;