import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

// DATOS MOCK (Basados en tu imagen)
const MOCK_AREAS = [
  { id: 'generales', nombre: 'Generales', descripcion: 'Ver categorías' },
  { id: 'salud_publica_1', nombre: 'Salud Pública - I', descripcion: 'Ver categorías' },
  { id: 'clinicas', nombre: 'Clínicas', descripcion: 'Ver categorías' },
  { id: 'pediatria', nombre: 'Pediatría', descripcion: 'Ver categorías' },
];

const MOCK_CATEGORIES = {
  'generales': [
    { id: 'enam', titulo: 'Simulacros ENAM', progreso: 80, descripcion: 'Exámenes tipo ENAM.' },
    { id: 'essalud', titulo: 'Simulacros EsSalud', progreso: 20, descripcion: 'Exámenes tipo EsSalud.' }
  ],
  'salud_publica_1': [
    { id: 'sp_basico', titulo: 'SP Básico', progreso: 0, descripcion: 'Conceptos fundamentales.' }
  ]
};

const MOCK_SIMULACROS = {
  'enam': [
    { id: 's1', titulo: 'Simulacro ENAM 2024-I', preguntas: 180, tiempo: 200, estado: 'completed', nota: 14.5 },
    { id: 's2', titulo: 'Simulacro ENAM 2024-II', preguntas: 180, tiempo: 200, estado: 'unlocked', nota: null },
    { id: 's3', titulo: 'Simulacro ENAM Intensivo', preguntas: 200, tiempo: 240, estado: 'locked', nota: null },
  ]
};

export const useSimulacros = () => {
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState(MOCK_AREAS);
  const [categories, setCategories] = useState([]);
  const [simulacros, setSimulacros] = useState([]);

  // Estados de navegación
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectArea = (areaId) => {
    setLoading(true);
    setSelectedArea(MOCK_AREAS.find(a => a.id === areaId));
    // Simular carga de API
    setTimeout(() => {
      setCategories(MOCK_CATEGORIES[areaId] || []);
      setLoading(false);
    }, 500);
  };

  const selectCategory = (categoryId) => {
    setLoading(true);
    const cat = categories.find(c => c.id === categoryId);
    setSelectedCategory(cat);
    
    setTimeout(() => {
      setSimulacros(MOCK_SIMULACROS[categoryId] || []);
      setLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (selectedCategory) setSelectedCategory(null);
    else if (selectedArea) setSelectedArea(null);
  };

  return { 
    loading, 
    areas, 
    categories, 
    simulacros, 
    selectedArea, 
    selectedCategory, 
    selectArea, 
    selectCategory, 
    goBack 
  };
};