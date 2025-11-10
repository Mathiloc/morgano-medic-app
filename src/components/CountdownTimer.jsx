
import React, { useState, useEffect } from 'react';

// Esta función calcula el tiempo restante
const calculateTimeLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - new Date().getTime();
  let timeLeft = { expired: false };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      expired: false,
    };
  } else {
    timeLeft.expired = true;
  }
  
  return timeLeft;
};

// Formatea el número a dos dígitos (ej. 7 -> "07")
const formatTime = (time) => {
  return String(time).padStart(2, '0');
};

export const CountdownTimer = ({ deadline }) => {
  // 1. Usamos useState para guardar el tiempo restante
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  // 2. Usamos useEffect para actualizar el contador cada segundo
  useEffect(() => {
    // Si ya expiró, no hacemos nada
    if (timeLeft.expired) return;

    // Creamos un intervalo que se ejecuta cada 1000ms (1 segundo)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);

    // 3. Limpiamos el intervalo cuando el componente se "desmonta"
    // Esto es crucial para evitar fugas de memoria
    return () => clearInterval(timer);

  }, [deadline, timeLeft.expired]); // Dependencias del efecto

  // Si la oferta terminó, mostramos un mensaje
  if (timeLeft.expired) {
    return <div className="countdown-expired">La oferta ha terminado</div>;
  }

  // Si no, mostramos el contador
  return (
    <div className="countdown-timer">
      <span className="countdown-label">La oferta termina en:</span>
      <div className="countdown-box">
        <span>{formatTime(timeLeft.days)}</span>
        <span className="countdown-unit">D</span>
      </div>
      <span className="countdown-separator">:</span>
      <div className="countdown-box">
        <span>{formatTime(timeLeft.hours)}</span>
        <span className="countdown-unit">H</span>
      </div>
      <span className="countdown-separator">:</span>
      <div className="countdown-box">
        <span>{formatTime(timeLeft.minutes)}</span>
        <span className="countdown-unit">M</span>
      </div>
      <span className="countdown-separator">:</span>
      <div className="countdown-box">
        <span>{formatTime(timeLeft.seconds)}</span>
        <span className="countdown-unit">S</span>
      </div>
    </div>
  );
};