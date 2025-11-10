// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importa los estilos GLOBALES (fondo oscuro)
// Se aplicarán a todo el sitio por defecto.
import './styles/GlobalStyles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);