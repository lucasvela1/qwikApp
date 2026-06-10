import { component$, useStore, $, useVisibleTask$ } from '@builder.io/qwik';
import { fetchPrecipitaciones } from '~/services/precipitaciones';
import { fetchTemperatura } from '~/services/temperaturas';
import WeatherModal from '../components/WeatherModal';

// Para usar bien la api mapeamos las ciudades con sus coordenadas.
// Se pueden agregar más para agregar más opciones al desplegable
const CIUDADES = {
  ushuaia: { nombre: 'Ushuaia', lat: -54.8019, lon: -68.303, emoji: '🏔️' },
  rio_grande: { nombre: 'Río Grande', lat: -53.7877, lon: -67.7032, emoji: '🌾' },
  tolhuin: { nombre: 'Tolhuin', lat: -54.5106, lon: -67.1923, emoji: '🌲' },
};

//No usamos el const anterior si quueremos agregar nuevas
interface Ciudad {
  nombre: string;
  lat: number;
  lon: number;
  emoji: string;
}

export default component$(() => {
  const state = useStore({
    ciudades: {...CIUDADES} as Record<string, Ciudad>,//Haceemos un spread para agregar más ciudades como copia
    ciudadSeleccionada: 'ushuaia' as string, //Ciudad por defecto al cargar la pagina
    ciudadModal: 'Ushuaia',
    loading: false,
    tempData: null as number | null,
    precipData: null as number | null,
    showModalTemp: false,
    showModalPrecip: false,
  });//El estado inicial, qwik lo cambia si es necesario pero no se pierde al recargar la pagina

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const locales = localStorage.getItem('ciudadesCustom');
    if (locales) {
      try {
        const parsedCustom = JSON.parse(locales);
        state.ciudades = { ...CIUDADES, ...parsedCustom };
      } catch (e) {
        console.error("Error al parsear ciudades del localStorage", e);
      }
    }
  });

  const verTemperatura = $(async () => {
    state.loading = true;
    state.showModalTemp = true;
    const geo = state.ciudades[state.ciudadSeleccionada];
    state.ciudadModal = geo.nombre;
    try {
      state.tempData = await fetchTemperatura(geo.lat, geo.lon);
    } catch {
      state.tempData = null;
    } finally {
      state.loading = false;
    }
  });

  const verPrecipitaciones = $(async () => {
    state.loading = true;
    state.showModalPrecip = true;
    const geo = state.ciudades[state.ciudadSeleccionada];
    state.ciudadModal = geo.nombre;
    try {
      state.precipData = await fetchPrecipitaciones(geo.lat, geo.lon);
    } catch {
      state.precipData = null;
    } finally {
      state.loading = false;
    }
  });

  return (
    <div style={containerStyle}>
      <div style={bgDecorativeStyle}></div>
      
      <header style={headerStyle}>
        <h1 style={titleStyle}>Clima TDF</h1>
        <p style={subtitleStyle}>Tierra del Fuego, Argentina</p>
      </header>

      <div style={cardStyle}>
        <div style={selectorContainerStyle}>
          <label for="city-select" style={labelStyle}>
            Selecciona tu ubicación
          </label>
          <select
            id="city-select"
            value={state.ciudadSeleccionada}
            onChange$={(e, currentTarget) => {
              state.ciudadSeleccionada = currentTarget.value as string;
            }}
            style={selectStyle}
          >
            {Object.entries(state.ciudades).map(([key, ciudad]) => (
              <option key={key} value={key}>
                {`${ciudad.emoji} ${ciudad.nombre}`}
              </option>
            ))}
          </select>
        </div>

        <div style={buttonContainerStyle}>
          <button 
            onClick$={verTemperatura} 
            style={buttonStyle}
            class="btn-primary"
          >
            <span class="shine"></span>
            <span style={buttonIconStyle}>🌡️</span>
            Temperatura
          </button>
          <button 
            onClick$={verPrecipitaciones} 
            style={buttonStyle}
            class="btn-secondary"
          >
            <span class="shine"></span>
            <span style={buttonIconStyle}>☔</span>
            Precipitaciones
          </button>
        </div>
      </div>

      <WeatherModal
        isOpen={state.showModalTemp}
        title={state.ciudadModal}
        emoji="🌡️"
        value={state.tempData}
        unit="°C"
        loading={state.loading}
        onClose$={$(() => {
          state.showModalTemp = false;
          state.tempData = null;
        })}
      />

      <WeatherModal
        isOpen={state.showModalPrecip}
        title={state.ciudadModal}
        emoji="💧"
        value={state.precipData}
        unit="milímetros"
        loading={state.loading}
        onClose$={$(() => {
          state.showModalPrecip = false;
          state.precipData = null;
        })}
      />
    </div>
  );
});

const containerStyle = {
  minHeight: 'calc(100vh - 80px)',
  padding: '20px',
  fontFamily: "'Inter', sans-serif",
  position: 'relative' as const,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const,   
  justifyContent: 'center',
  alignItems: 'center',
};

const bgDecorativeStyle = {
  position: 'fixed' as const,
  width: '800px',
  height: '800px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(41, 128, 185, 0.6) 0%, transparent 70%)',
  pointerEvents: 'none' as const,
  zIndex: 0,
};

const headerStyle = {
  textAlign: 'center' as const,
  marginBottom: '40px',
  position: 'relative' as const,
  zIndex: 1,
};

const titleStyle = {
  fontSize: '48px',
  fontWeight: 700,
  fontFamily: "'Syne', sans-serif",
  color: '#fff',
  marginBottom: '8px',
  letterSpacing: '-1px',
};

const subtitleStyle = {
  fontSize: '16px',
  color: '#d3ebffff',
  fontWeight: 400,
  letterSpacing: '0.5px',
};

const cardStyle = {
  maxWidth: '500px',
  width: '100%',
  margin: '0 0 40px',
  background: 'rgba(53, 105, 143, 0.75)',
  borderRadius: '20px',
  padding: '40px 30px',
  boxShadow: '0 20px 60px rgba(169, 212, 245, 0.3)',
  backdropFilter: 'blur(10px)',
  position: 'relative' as const,
  zIndex: 1,
};

const selectorContainerStyle = {
  marginBottom: '32px',
};

const labelStyle = {
  display: 'block' as const,
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const selectStyle = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '16px',
  border: '2px solid #cccccc',
  borderRadius: '12px',
  background: '#ffffff',
  color: '#1a3a52',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontWeight: 500,
};

const buttonContainerStyle = {
  display: 'flex' as const,
  gap: '16px',
  justifyContent: 'stretch',
};

const buttonStyle = {
  flex: 1,
  padding: '14px 20px',
  fontSize: '15px',
  fontWeight: 600,
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '16px',
  color: '#000',
  cursor: 'pointer',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  fontFamily: "'Inter', sans-serif",
  backdropFilter: 'blur(10px)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const buttonIconStyle = {
  fontSize: '20px',
};