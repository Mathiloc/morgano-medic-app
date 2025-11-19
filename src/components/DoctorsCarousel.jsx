import React from 'react';
// Importamos Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Importamos nuestro Hook (El Cerebro)
import { useDoctors } from '../hooks/useDoctors';

// Componente de Tarjeta (Pequeño y reutilizable)
const DoctorCard = ({ doctor }) => (
  <div className="doctor-card">
    <img 
      loading="lazy" 
      src={doctor.img} 
      alt={`Foto ${doctor.name}`} 
      className="doctor-card-image" 
    />
    <h3 className="doctor-card-name">{doctor.name}</h3>
    <p className="doctor-card-specialty">{doctor.specialty}</p>
    <p className="doctor-card-description">{doctor.description}</p>
  </div>
);

// Componente Principal
export const DoctorsCarousel = () => {
  // 1. Obtenemos los datos del hook
  const { doctors, isLoading } = useDoctors();

  // (Opcional) Podrías mostrar un spinner mientras carga
  if (isLoading) return <div style={{textAlign: 'center', padding: '20px'}}>Cargando especialistas...</div>;

  return (
    <div className="doctors-carousel-wrapper">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="doctors-swiper"
      >
        {/* 🔥 AQUÍ ESTÁ LA MAGIA:
           En lugar de escribir <SwiperSlide> 7 veces, 
           lo escribimos 1 sola vez y React lo repite por cada doctor.
        */}
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};