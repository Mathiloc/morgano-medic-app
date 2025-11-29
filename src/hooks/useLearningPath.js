import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext'; 
// Asegúrate de que la ruta a 'api' sea correcta. 
// Si seguiste mi consejo de moverlo a 'services', cámbialo aquí.
import { apiCall } from '../utils/api'; 

export const useLearningPath = () => {
  // CORRECCIÓN: Usamos 'currentUser' para mantener consistencia con tu DashboardLayout
  const { currentUser } = useAuth(); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [areas, setAreas] = useState([]);      
  const [courses, setCourses] = useState({});   
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const fetchLearningPath = async () => {
      // Usamos currentUser.email
      if (!currentUser?.email) return;

      try {
        setLoading(true);
        setError(null);

        // Llamada a tu API
        const response = await apiCall('getLearningPathData', { email: currentUser.email });

        if (response.success) {
          setAreas(response.data.areas || []);
          setCourses(response.data.cursosPorArea || {});
        } else {
          setError(response.message || "No se pudo cargar la ruta de aprendizaje.");
        }
      } catch (err) {
        console.error("Error en useLearningPath:", err);
        setError("Error de conexión al cargar la ruta.");
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [currentUser]); // Dependencia actualizada

  const selectArea = (areaName) => {
    setSelectedArea(areaName);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Agregué smooth scroll para mejor UX
  };

  const goBack = () => {
    setSelectedArea(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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