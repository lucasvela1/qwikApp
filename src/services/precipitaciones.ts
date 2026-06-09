import { API_URL } from "../constants/api";

export const fetchPrecipitaciones = async (lat: number, lon: number) => {
    try {
        const url = `${API_URL}?latitude=${lat}&longitude=${lon}&current=precipitation`;
        
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }
        
        const data = await res.json();
        return data.current?.precipitation ?? 0;
        
    } catch (error) {
        console.error("Error al traer precipitaciones:", error);
        throw error;
    }
};