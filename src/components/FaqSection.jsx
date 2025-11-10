import React, { useState } from 'react';
import { FaqItem } from './FaqItem'; // Importamos el componente hijo

// Los datos de tus FAQs (del script original)
const faqs = [
    { q: '¿Cuándo inician las clases del ciclo 2026-I?', a: 'Nuestro ciclo de preparación para el SERUMS 2026-I Online inicia en el 29 de setiembre de 2025. Las clases en vivo del plan Ofrecemos un ciclo regular y un ciclo intensivo que comienza el 15 de noviembre 2026.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'PUedes pagar mediante transferencia bancaria o Yape/Plin.' },
    { q: '¿Las clases en vivo quedan grabadas?', a: 'Sí, todas nuestras clases en vivo son grabadas y subidas a la plataforma virtual dentro de las 24 horas siguientes para que puedas repasarlas cuantas veces quieras.' },
    { q: '¿Qué pasa si no puedo asistir a una clase en vivo?', a: 'No hay problema. Podrás ver la grabación completa en la plataforma. Además, mantenemos un foro de dudas por cada clase donde los docentes responden preguntas.' },
    { q: '¿Ofrecen algún tipo de garantía de ingreso?', a: 'Aunque no podemos garantizar un resultado que depende del esfuerzo individual, sí garantizamos que recibirás la preparación más completa y actualizada del mercado. Nuestra tasa de éxito del 95% en adjudicación preferente nos respalda.' },
];

export function FaqSection() {
  // Estado para rastrear el índice del item abierto (null = ninguno)
  const [openIndex, setOpenIndex] = useState(null);

  // Manejador para abrir/cerrar un item
  const handleClick = (index) => {
    // Si se hace clic en el que ya está abierto, se cierra (se setea a null)
    // Si no, se abre el nuevo (se setea al índice)
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-mm-fondo-premium">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          {/* Título con la fuente Poppins de tu marca */}
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white">
            Resolvemos Todas Tus Dudas
          </h2>
        </div>
        <div className="space-y-4">
          {/* Mapeamos los datos y creamos un FaqItem para cada uno */}
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index} // Le decimos si debe estar abierto
              onClick={() => handleClick(index)} // Le pasamos la función de clic
            />
          ))}
        </div>
      </div>
    </section>
  );
}