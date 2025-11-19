import { useState, useEffect } from 'react';

export const useOferta = () => {
  // 1. Estado inicial (puedes cambiar estos valores base aquí)
  const [oferta, setOferta] = useState({
    precioRegular: 500,    // Ejemplo: Precio normal
    precioDescuento: 350,  // Ejemplo: Precio con oferta
    moneda: "S/",
    deadline: null,        // La fecha límite se calculará automáticamente
    isLoading: true
  });

  useEffect(() => {
    // 2. Aquí va la lógica que pidió Romario para la fecha
    const calcularDeadline = () => {
      const year = new Date().getFullYear();
      // Configurado para el 30 de Septiembre del año actual, como en la foto
      return `${year}-09-30T23:59:59`;
    };

    // 3. Actualizamos el estado con la fecha calculada
    setOferta(prev => ({
      ...prev,
      deadline: calcularDeadline(),
      isLoading: false
    }));
  }, []);

  // 4. Retornamos los datos para que cualquier componente los use
  return oferta;
};