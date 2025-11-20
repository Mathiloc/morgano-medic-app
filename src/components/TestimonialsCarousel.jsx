import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Importamos el Hook (Cerebro)
import { useTestimonials } from '../hooks/useTestimonials';

// Componente para una sola tarjeta (Reutilizable)
const TestimonialCard = ({ data }) => (
  <div className="testimonial-card">
    <p className="testimonial-card-text">"{data.text}"</p>
    <div className="testimonial-card-author-wrapper">
      <img 
        loading="lazy" 
        src={data.img} 
        alt={`Foto de ${data.name}`} 
        className="testimonial-card-image" 
      />
      <div className="testimonial-card-author-info">
        <p className="testimonial-card-name">{data.name}</p>
        <p className="testimonial-card-school">{data.school}</p>
      </div>
    </div>
  </div>
);

export const TestimonialsCarousel = () => {
  // Obtenemos los datos del hook
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) return <div className="text-center py-4">Cargando testimonios...</div>;

  return (
    <div className="testimonials-carousel-wrapper">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="testimonials-swiper"
      >
        {/* Generamos los slides dinámicamente con un bucle */}
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <TestimonialCard data={item} />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
};