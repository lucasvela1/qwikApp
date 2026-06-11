import { component$, useStore, $, useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

interface Ciudad {
  nombre: string;
  lat: number;
  lon: number;
  emoji: string;
}

export default component$(() => {
  const nav = useNavigate();
  const state = useStore({
    nuevoNombreCiudad: '',
    nuevaLatitud: '',
    nuevaLongitud: '',
    ciudadesGuardadas: {} as Record<string, Ciudad>,
    alertMessage: '',
    alertType: '' as 'success' | 'error' | '',
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const locales = localStorage.getItem('ciudadesCustom');
    if (locales) {
      try {
        state.ciudadesGuardadas = JSON.parse(locales);
      } catch (e) {
        console.error("Error al parsear ciudades del localStorage", e);
      }
    }
  });

  const mostrarAlerta = $((msg: string, tipo: 'success' | 'error') => {
    state.alertMessage = msg;
    state.alertType = tipo;

    if (tipo === 'success') {
      setTimeout(() => {
        state.alertMessage = '';
        state.alertType = '';
        nav('/');
      }, 1500);
    } else {
      setTimeout(() => {
        state.alertMessage = '';
        state.alertType = '';
      }, 3500);
    }
  });

  const agregarCiudad = $(() => {
    const nombre = state.nuevoNombreCiudad.trim();
    const lat = parseFloat(state.nuevaLatitud);
    const lon = parseFloat(state.nuevaLongitud);

    if (!nombre || isNaN(lat) || isNaN(lon)) {
      mostrarAlerta("Por favor completa todos los campos con valores numéricos válidos.", "error");
      return;
    }

    const key = nombre.toLowerCase().replace(/\s+/g, '_');
    
    const nuevaCiudad: Ciudad = {
      nombre,
      lat,
      lon,
      emoji: '🏙️'
    };

    const locales = JSON.parse(localStorage.getItem('ciudadesCustom') || '{}');
    locales[key] = nuevaCiudad;
    localStorage.setItem('ciudadesCustom', JSON.stringify(locales));

    state.nuevoNombreCiudad = '';
    state.nuevaLatitud = '';
    state.nuevaLongitud = '';
    state.ciudadesGuardadas = locales;

    mostrarAlerta(`✅ Ciudad "${nombre}" agregada correctamente`, "success");
  });

  return (
    <div style={containerStyle}>
      <div style={bgDecorativeStyle}></div>
      
      {state.alertMessage && (
        <div style={{
          ...alertCustomBaseStyle,
          backgroundColor: state.alertType === 'success' ? '#2ecc71' : '#e74c3c',
        }}>
          {state.alertMessage}
        </div>
      )}

      <header style={headerStyle}>
        <h1 style={titleStyle}>Agregar ubicación</h1>
        <p style={subtitleStyle}>Añade una nueva ciudad personalizada</p>
      </header>

      <div style={cardStyle}>
        <div style={inputGroupStyle}>
          <input 
            type="text" 
            placeholder="Nombre de la ciudad" 
            value={state.nuevoNombreCiudad}
            onInput$={(e, el) => state.nuevoNombreCiudad = el.value}
            style={inputStyle}
          />
        </div>

        <div style={inlineInputsStyle}>
          <input 
            type="number" 
            step="any"
            placeholder="Latitud (ej: -54.8)" 
            value={state.nuevaLatitud}
            onInput$={(e, el) => state.nuevaLatitud = el.value}
            style={inputStyle}
          />
          <input 
            type="number" 
            step="any"
            placeholder="Longitud (ej: -68.3)" 
            value={state.nuevaLongitud}
            onInput$={(e, el) => state.nuevaLongitud = el.value}
            style={inputStyle}
          />
        </div>

        <button 
          onClick$={agregarCiudad} 
          style={addButtonStyle}
          class="btn-add"
        >
          <span class="shine"></span>
          <span style={buttonIconStyle}>➕</span>
          Guardar ubicación
        </button>

        {Object.keys(state.ciudadesGuardadas).length > 0 && (
          <>
            <hr style={separadorStyle}/>
            <h3 style={formTitleStyle}>Ubicaciones guardadas</h3>
            {Object.entries(state.ciudadesGuardadas).map(([key, ciudad]) => (
              <div key={key} style={{color: 'white', padding: '4px 0'}}>
                {ciudad.emoji} {ciudad.nombre} ({ciudad.lat}, {ciudad.lon})
              </div>
            ))}
          </>
        )}
      </div>
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
  background: 'rgba(53, 105, 143, 0.75)',
  borderRadius: '20px',
  padding: '40px 30px',
  boxShadow: '0 20px 60px rgba(169, 212, 245, 0.3)',
  backdropFilter: 'blur(10px)',
  position: 'relative' as const,
  zIndex: 1,
};

const inputGroupStyle = {
  width: '100%',
  marginBottom: '16px',
};

const inlineInputsStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '24px',
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '16px',
  border: '2px solid #cccccc',
  borderRadius: '12px',
  background: '#ffffff',
  color: '#1a3a52',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  boxSizing: 'border-box' as const,
};

const addButtonStyle = {
  width: '100%',
  padding: '14px 20px',
  fontSize: '15px',
  fontWeight: 600,
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '16px',
  cursor: 'pointer',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center',
  gap: '8px',
  fontFamily: "'Inter', sans-serif",
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  backdropFilter: 'blur(10px)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const separadorStyle = {
  width: '100%',
  border: '0',
  margin: '10px 0',
  background: 'rgba(255, 255, 255, 0.2)',
};

const formTitleStyle = {
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '16px',
};

const alertCustomBaseStyle = {
  position: 'fixed' as const,
  top: '24px',
  padding: '14px 28px',
  borderRadius: '14px',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '15px',
  zIndex: 2000,
  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
  fontFamily: "'Inter', sans-serif",
  animation: 'alertDropIn 0.3s ease-out',
};

const buttonIconStyle = {
  fontSize: '20px',
};