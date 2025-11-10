// src/utils/cache.js
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

const get = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    if (timestamp && (Date.now() - timestamp) < CACHE_TTL_MS) {
      return { fresh: true, data }; // Cache fresco
    }
    return { fresh: false, data }; // Cache expirado, pero tenemos datos
  } catch {
    return null;
  }
};

const set = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (e) {
    console.warn("Error al guardar en caché:", e);
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn("Error al eliminar de caché:", e);
  }
};

export const Cache = { get, set, remove };