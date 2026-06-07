// src/services/clima.ts
import { $ } from '@builder.io/qwik';

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

//Funcion de ver la temperatura, el signo $ en qwik indica
//que esta funcion solo se ejecuta en el cliente y cuando se invoca
export const fetchTemperatura = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m`
    );
    const data = await res.json();
    return data.current.temperature_2m as number;
  } catch (error) {
    console.error("Error al traer temperatura:", error);
    throw error;
  }
};

//Al igual que ver temperatura, la logica queda en el lado servidor 
//y solo se ejecuta cuando se invoca la funcion, no al cargar la pagina
export const fetchPrecipitaciones = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}?latitude=${lat}&longitude=${lon}&current=precipitation`
    );
    const data = await res.json();
    return data.current.precipitation as number;
  } catch (error) {
    console.error("Error al traer precipitaciones:", error);
    throw error;
  }
};