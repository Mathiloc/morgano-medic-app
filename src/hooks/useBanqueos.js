import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

// DATOS MOCK (Actualizados según tu diseño)
const MOCK_AREAS = [
  { id: 'salud_publica', nombre: '1. Salud Publica', descripcion: 'Ver categorías' },
  { id: 'cuidado_integral', nombre: '2. Cuidado Integral de Salud', descripcion: 'Ver categorías' },
  { id: 'etica', nombre: '3. Etica e Interculturalidad', descripcion: 'Ver categorías' },
  { id: 'investigacion', nombre: '4. Investigación', descripcion: 'Ver categorías' },
  { id: 'gestion', nombre: '5. Gestión de Servicios de Salud', descripcion: 'Ver categorías' },
];

const MOCK_CATEGORIES = {
  'salud_publica': [
    { id: 'cat1', titulo: 'Epidemiología', progreso: 30, descripcion: 'Mediciones y vigilancia.' },
    { id: 'cat2', titulo: 'Estadística', progreso: 0, descripcion: 'Conceptos básicos.' }
  ]
};

const MOCK_BANQUEOS = {
  'cat1': [
    { id: 'b1', titulo: 'Banqueo Epidemiología 2024', preguntas: 20, tiempo: 40, estado: 'unlocked' }
  ]
};

export const useBanqueos = () => {
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState(MOCK_AREAS); // Carga inicial directa
  const [categories, setCategories] = useState([]);
  const [banqueos, setBanqueos] = useState([]);

  // Estados de navegación
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectArea = (areaId) => {
    setLoading(true);
    setSelectedArea(MOCK_AREAS.find(a => a.id === areaId));
    // Simular carga
    setTimeout(() => {
      setCategories(MOCK_CATEGORIES[areaId] || []); // Carga vacía si no hay mock definido
      setLoading(false);
    }, 500);
  };

  const selectCategory = (categoryId) => {
    setLoading(true);
    setSelectedCategory(categories.find(c => c.id === categoryId));
    setTimeout(() => {
        setBanqueos(MOCK_BANQUEOS[categoryId] || []);
        setLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (selectedCategory) setSelectedCategory(null);
    else if (selectedArea) setSelectedArea(null);
  };

  return { loading, areas, categories, banqueos, selectedArea, selectedCategory, selectArea, selectCategory, goBack };
};