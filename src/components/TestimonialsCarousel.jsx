import React from 'react';
// 1. Importa los componentes de Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
// 2. Importa los módulos de Swiper
import { Navigation, Autoplay } from 'swiper/modules';

// 3. Importa los estilos base de Swiper (ya los instalamos)
import 'swiper/css';
import 'swiper/css/navigation';

// Componente para una sola tarjeta de testimonio
const TestimonialCard = ({ text, imgSrc, alt, name, school }) => (
  <div className="testimonial-card">
    <p className="testimonial-card-text">"{text}"</p>
    <div className="testimonial-card-author-wrapper">
      <img loading="lazy" src={imgSrc} alt={alt} className="testimonial-card-image" />
      <div className="testimonial-card-author-info">
        <p className="testimonial-card-name">{name}</p>
        <p className="testimonial-card-school">{school}</p>
      </div>
    </div>
  </div>
);

export const TestimonialsCarousel = () => {
  return (
    <div className="testimonials-carousel-wrapper">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true} // Habilita las flechas
        
        // Configuración responsive
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="testimonials-swiper"
      >
        {/* Aquí van los 4 testimonios */}
        
        <SwiperSlide>
          <TestimonialCard
            text="MorganoMedic cambió mi forma de estudiar. Los simulacros son idénticos al examen real. ¡Lo recomiendo al 100%!"
            imgSrc="https://i.ibb.co/k2c8Rz40/alumno1.png"
            alt="Foto de Fiorella Espinoza"
            name="Fiorella Espinoza"
            school="Enfermería"
          />
        </SwiperSlide>

        <SwiperSlide>
          <TestimonialCard
            text="Gracias por todos los doctores. Gracias a la academia pude fortalecer mis conocimientos y el acompañamiento fue increíble. Muchas gracias :)"
            imgSrc="https://i.ibb.co/DDQK6W7m/alumno2.png"
            alt="Foto de Edith Zea Pfoccori"
            name="Edith Zea Pfoccori"
            school="Medicina"
          />
        </SwiperSlide>

        <SwiperSlide>
          <TestimonialCard
            text="Gratificante <3"
            imgSrc="https://i.ibb.co/dsgQpBVR/alumno3.png"
            alt="Foto de Isabel Moscoso"
            name="Isabel Moscoso"
            school="Medicina"
          />
        </SwiperSlide>

        <SwiperSlide>
          <TestimonialCard
            text="El material de estudio 10/10"
            imgSrc="https://i.ibb.co/0pc9Q427/alumno4.png"
            alt="Foto de Leonardo Villegas"
            name="Leonardo Villegas"
            school="Estudiante, Plan Free"
          />
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};