import { component$, useStore, $ } from '@builder.io/qwik';
//Los imports de qwik se hacen con $ para que el código se ejecute solo cuando se invoca la función, no al cargar la página
import { fetchTemperatura, fetchPrecipitaciones} from '../services/clima';

// Para usar bien la api mapeamos las ciudades con sus coordenadas.
// Se pueden agregar más para agregar más opciones al desplegable
const CIUDADES = {
  ushuaia: { name: 'Ushuaia', lat: -54.8019, lon: -68.303 },
  rio_grande: { name: 'Río Grande', lat: -53.7877, lon: -67.7032 },
  tolhuin: { name: 'Tolhuin', lat: -54.5106, lon: -67.1923 },
};

export default component$(() => {
  const state = useStore({
    ciudadSeleccionada: 'ushuaia' as keyof typeof CIUDADES,
    loading: false,
    tempData: null as number | null,
    precipData: null as number | null,
    showModalTemp: false,
    showModalPrecip: false,
  }); //El estado inicial, qwik lo cambia si es necesario pero no se pierde al recargar la pagina

  const verTemperatura = $(async () => {
    state.loading = true;
    state.showModalTemp = true;
    const geo = CIUDADES[state.ciudadSeleccionada];
    
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
    const geo = CIUDADES[state.ciudadSeleccionada];

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
      <h1>Demo Clima TDF</h1>
      
      <label for="city-select" style={labelStyle}>
        Selecciona una ciudad:
      </label>
      <select
        id="city-select"
        value={state.ciudadSeleccionada}
        onChange$={(e, currentTarget) => {
          state.ciudadSeleccionada = currentTarget.value as keyof typeof CIUDADES;
        }}
        style={selectStyle}
      >
        <option value="ushuaia">Ushuaia</option>
        <option value="rio_grande">Río Grande</option>
        <option value="tolhuin">Tolhuin</option>
      </select>

      <div style={buttonContainerStyle}>
        <button onClick$={verTemperatura} style={buttonStyle}>
          Ver Temperatura      {/* el $onclick indica que se separa en un codigo js independiente*/}
        </button>
        <button onClick$={verPrecipitaciones} style={buttonStyle}>
          Ver Precipitaciones {/*qwik no usa hidratación, sabe cuál parte del html depende del state*/}
        </button>
      </div>

      {/* modal para la temperatura*/}
      {state.showModalTemp && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Temperatura en {CIUDADES[state.ciudadSeleccionada].name}</h3>
            {state.loading ? (
              <p>Cargando...</p>
            ) : (
              <p style={modalValueStyle}>{state.tempData} °C</p>
            )}
            <button onClick$={() => { state.showModalTemp = false; state.tempData = null; }}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* modal para precipitaciones */}
      {state.showModalPrecip && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Precipitaciones en {CIUDADES[state.ciudadSeleccionada].name}</h3>
            {state.loading ? (
              <p>Cargando...</p>
            ) : (
              <p style={modalValueStyle}>{state.precipData} mm</p>
            )}
            <button onClick$={() => { state.showModalPrecip = false; state.precipData = null; }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// Estilos de la aplicación
const containerStyle = {
  padding: '20px',
  fontFamily: 'sans-serif',
  maxWidth: '400px',
  margin: '0 auto'
};

const labelStyle = {
  display: 'block',
  marginBottom: '10px'
};

const selectStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '20px'
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px'
};

const buttonStyle = {
  flex: 1,
  padding: '10px',
  cursor: 'pointer'
};

const modalOverlayStyle = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  minWidth: '250px',
  color: '#000'
};

const modalValueStyle = {
  fontSize: '24px',
  fontWeight: 'bold'
};