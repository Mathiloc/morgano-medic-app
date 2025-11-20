import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Simulamos una petición al servidor (API)
    // Esto es lo que Romario quería que abstrajeras para limpiar la vista
    return new Promise((resolve) => {
      setTimeout(() => {
        // LÓGICA MOCK (Simulada)
        // En el futuro, aquí reemplazarás esto por: await api.post('/login', { email, password })
        
        // Usuario de prueba aceptado
        if (email === 'test@morgano.com' && password === '1234') {
          // Login Exitoso: Definimos el usuario que "nos devuelve" el backend
          const mockUser = {
            id: 1,
            name: 'Usuario Test',
            email: email,
            program: 'SERUMS 2026 - I',
            role: 'student'
          };
          
          // Guardamos en localStorage para que al recargar no se pierda la sesión (básico)
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          // Redirigimos al usuario a su Dashboard automáticamente
          navigate('/board/inicio');
          
          // Resolvemos la promesa con éxito
          resolve({ success: true, user: mockUser });
        } else {
          // Login Fallido
          const errorMsg = 'Correo o contraseña incorrectos.';
          setError(errorMsg);
          resolve({ success: false, error: errorMsg });
        }
        
        setIsLoading(false);
      }, 1500); // Simulamos 1.5 segundos de tiempo de respuesta del servidor
    });
  };

  // Retornamos solo lo que la vista necesita saber
  return { login, isLoading, error };
};