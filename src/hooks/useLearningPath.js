import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext'; // Ajusta la ruta si tu carpeta es 'context' o 'Context'
import { apiCall } from '../utils/api';

export const useLearningPath = () => {
  const { user } = useAuth();
  
  // Estados para los datos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [areas, setAreas] = useState([]);       // Lista de áreas (Cardiología, etc.)
  const [courses, setCourses] = useState({});   // Objeto con los cursos por área
  
  // Estado para la navegación interna (null = ver áreas, "Nombre" = ver timeline)
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const fetchLearningPath = async () => {
      // Si no hay usuario, no hacemos nada
      if (!user?.email) return;

      try {
        setLoading(true);
        setError(null);

        // Llamada a tu API real (Google Apps Script)
        const response = await apiCall('getLearningPathData', { email: user.email });

        if (response.success) {
          // Guardamos los datos tal como vienen del backend
          setAreas(response.data.areas || []);
          setCourses(response.data.cursosPorArea || {});
        } else {
          setError(response.message || "No se pudo cargar la ruta de aprendizaje.");
        }
      } catch (err) {
        console.error(err);
        setError("Error de conexión al cargar la ruta.");
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [user]);

  // Funciones auxiliares para la vista
  const selectArea = (areaName) => {
    setSelectedArea(areaName);
    // Scroll arriba al cambiar de vista
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setSelectedArea(null);
    window.scrollTo(0, 0);
  };

  // Retornamos todo lo que la UI necesita
  return { 
    loading, 
    error, 
    areas, 
    courses, 
    selectedArea, 
    selectArea, 
    goBack 
  };
};