import { useState, useEffect } from 'react';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la petición a la Base de Datos
    const fetchTestimonials = () => {
      const data = [
        {
          id: 1,
          name: "Fiorella Espinoza",
          school: "Enfermería",
          text: "MorganoMedic cambió mi forma de estudiar. Los simulacros son idénticos al examen real. ¡Lo recomiendo al 100%!",
          img: "https://i.ibb.co/k2c8Rz40/alumno1.png"
        },
        {
          id: 2,
          name: "Edith Zea Pfoccori",
          school: "Medicina",
          text: "Gracias por todos los doctores. Gracias a la academia pude fortalecer mis conocimientos y el acompañamiento fue increíble. Muchas gracias :)",
          img: "https://i.ibb.co/DDQK6W7m/alumno2.png"
        },
        {
          id: 3,
          name: "Isabel Moscoso",
          school: "Medicina",
          text: "Gratificante <3",
          img: "https://i.ibb.co/dsgQpBVR/alumno3.png"
        },
        {
          id: 4,
          name: "Leonardo Villegas",
          school: "Estudiante, Plan Free",
          text: "El material de estudio 10/10",
          img: "https://i.ibb.co/0pc9Q427/alumno4.png"
        }
      ];

      setTestimonials(data);
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  return { testimonials, isLoading };
};