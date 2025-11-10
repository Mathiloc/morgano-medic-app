
import React, { useRef } from 'react';

export function FaqItem({ faq, isOpen, onClick }) {
  const contentRef = useRef(null);

  // Usamos el ref para medir la altura del contenido y animar la propiedad max-height
  const contentHeight = contentRef.current ? contentRef.current.scrollHeight : 0;

  return (
    <div className="faq-item">
      {/* Botón de la Pregunta */}
      <button className="faq-question-button" onClick={onClick}>
        <span>{faq.q}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>

      {/* Contenido de la Respuesta (animado) */}
      <div
        ref={contentRef}
        style={{ maxHeight: `${isOpen ? contentHeight : 0}px` }}
        className="faq-answer-content"
      >
        <p>{faq.a}</p>
      </div>
    </div>
  );
}