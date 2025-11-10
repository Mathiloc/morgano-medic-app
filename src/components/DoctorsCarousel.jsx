import React from 'react';
// 1. Importa los componentes de Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
// 2. Importa los módulos de Swiper que necesitamos (Navegación, Autoplay)
import { Navigation, Autoplay } from 'swiper/modules';

// 3. Importa los estilos base de Swiper
import 'swiper/css';
import 'swiper/css/navigation';

// Este componente contendrá una sola tarjeta de Doctor
const DoctorCard = ({ imgSrc, alt, name, specialty, description }) => (
  <div className="doctor-card">
    <img loading="lazy" src={imgSrc} alt={alt} className="doctor-card-image" />
    <h3 className="doctor-card-name">{name}</h3>
    <p className="doctor-card-specialty">{specialty}</p>
    <p className="doctor-card-description">{description}</p>
  </div>
);

// Este es el componente principal del Carrusel
export const DoctorsCarousel = () => {
  return (
    <div className="doctors-carousel-wrapper">
      {/* 4. Aquí configuramos el componente Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]} // Le decimos a Swiper qué módulos usar
        loop={true} // Bucle infinito
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true} // Habilita las flechas de navegación
        
        // Configuración de cuántos slides mostrar (responsive)
        breakpoints={{
          // 1 slide en móvil (por defecto)
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // 2 slides en tablet
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // 3 slides en desktop
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // 4 slides en pantallas grandes
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="doctors-swiper"
      >
        {/* 5. Aquí va cada "Slide" (cada doctor) */}
        
        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/tph8LMGx/Dr-Octavio.png"
            alt="Foto Dr. Octavio Bustamante"
            name="Dr. Octavio Bustamante"
            specialty="Cardiólogo"
            description="Cardiólogo egresado del Hospital Regional de Ica. Cuenta con una Maestría en Gestión de los Servicios de Salud..."
          />
        </SwiperSlide>

        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/N61HK7Ht/Dra-Gina-Munive.png"
            alt="Foto Dra. Gina Munive"
            name="Dra. Gina Munive"
            specialty="Cirujana general"
            description="Docente exclusiva de la Academia MorganoMedic. Aprobó el examen Revalida 2024 y actualmente es médico residente de Cirugía Plástica..."
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/GvtCJR2c/Dra-Mayra.png"
            alt="Foto Dra. Mayra Cullanco"
            name="Dra. Mayra Cullanco"
            specialty="Administración y Gestión en Salud"
            description="Profesional de alto rendimiento académico, obtuvo el primer puesto en el proceso de admisión a la especialidad..."
          />
        </SwiperSlide>

        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/7JvMC6t2/Dra-Franci.png"
            alt="Foto Dra. Franci Calvo"
            name="Dra. Franci Calvo"
            specialty="Medico Internista"
            description="Médico residente de Medicina Interna en el Hospital Regional de Ica. Su carrera incluye una residencia en medicina cardiovascular (ASCARDIO)..."
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/Rkzvnczc/Dr-Valody-1.png"
            alt="Foto Dr. Valody"
            name="Dr. Valody"
            specialty="Pediatra"
            description="Especialista en Pediatría formado en el prestigioso Instituto Nacional de Salud del Niño - San Borja..."
          />
        </SwiperSlide>

        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/xKcXkJK3/Dr-Miguel.png"
            alt="Foto Dr. Miguel Arce"
            name="Dr. Miguel Arce"
            specialty="Admin. y Gestión de Salud - UNMSM"
            description="Doctor en Salud Pública y Salud Global, y Docente RENACYT. Magíster en Gerencia de Servicios de Salud..."
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <DoctorCard
            imgSrc="https://i.ibb.co/CKy7NLc1/Dr-Luigi.png"
            alt="Foto Dr. Luigi Hernandez"
            name="Dr. Luigi Hernandez"
            specialty="Medico General"
            description="Médico del Servicio de Emergencia del Hospital Regional de Ica. Magíster en Gerencia de Servicios de Salud..."
          />
        </SwiperSlide>

      </Swiper>
    </div>
  );
};