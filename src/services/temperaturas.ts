export const fetchTemperatura = async (lat: number, lon: number) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        return data.current?.temperature_2m ?? 0;
        
    } catch (error) {
        console.error("Error al traer temperatura:", error);
        throw error;
    }
};