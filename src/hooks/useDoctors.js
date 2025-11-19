import { useState, useEffect } from 'react';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la petición a la Base de Datos
    // (En el futuro, aquí iría un fetch a tu API real)
    const fetchDoctors = () => {
      const data = [
        {
          id: 1,
          name: "Dr. Octavio Bustamante",
          specialty: "Cardiólogo",
          img: "https://i.ibb.co/tph8LMGx/Dr-Octavio.png",
          description: "Cardiólogo egresado del Hospital Regional de Ica. Cuenta con una Maestría en Gestión de los Servicios de Salud..."
        },
        {
          id: 2,
          name: "Dra. Gina Munive",
          specialty: "Cirujana general",
          img: "https://i.ibb.co/N61HK7Ht/Dra-Gina-Munive.png",
          description: "Docente exclusiva de la Academia MorganoMedic. Aprobó el examen Revalida 2024 y actualmente es médico residente de Cirugía Plástica..."
        },
        {
          id: 3,
          name: "Dra. Mayra Cullanco",
          specialty: "Administración y Gestión en Salud",
          img: "https://i.ibb.co/GvtCJR2c/Dra-Mayra.png",
          description: "Profesional de alto rendimiento académico, obtuvo el primer puesto en el proceso de admisión a la especialidad..."
        },
        {
          id: 4,
          name: "Dra. Franci Calvo",
          specialty: "Medico Internista",
          img: "https://i.ibb.co/7JvMC6t2/Dra-Franci.png",
          description: "Médico residente de Medicina Interna en el Hospital Regional de Ica. Su carrera incluye una residencia en medicina cardiovascular (ASCARDIO)..."
        },
        {
          id: 5,
          name: "Dr. Valody",
          specialty: "Pediatra",
          img: "https://i.ibb.co/Rkzvnczc/Dr-Valody-1.png",
          description: "Especialista en Pediatría formado en el prestigioso Instituto Nacional de Salud del Niño - San Borja..."
        },
        {
          id: 6,
          name: "Dr. Miguel Arce",
          specialty: "Admin. y Gestión de Salud - UNMSM",
          img: "https://i.ibb.co/xKcXkJK3/Dr-Miguel.png",
          description: "Doctor en Salud Pública y Salud Global, y Docente RENACYT. Magíster en Gerencia de Servicios de Salud..."
        },
        {
          id: 7,
          name: "Dr. Luigi Hernandez",
          specialty: "Medico General",
          img: "https://i.ibb.co/CKy7NLc1/Dr-Luigi.png",
          description: "Médico del Servicio de Emergencia del Hospital Regional de Ica. Magíster en Gerencia de Servicios de Salud..."
        }
      ];

      setDoctors(data);
      setIsLoading(false);
    };

    fetchDoctors();
  }, []);

  return { doctors, isLoading };
};