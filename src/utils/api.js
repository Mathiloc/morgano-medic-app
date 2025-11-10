// src/utils/api.js
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyX7tbMIpbkhPhrJeTPNbAWTrO2_-QEoWx9BkLGtm6Cu8JZBArawIFNN5fm7w9vq3G/exec';

export const apiCall = async (action, payload) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action, payload }),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error en API:', action, error);
    return { success: false, message: error?.message || 'Error de conexión.' };
  }
};