import { component$, QRL } from '@builder.io/qwik';
import WeatherLoader from './WeatherLoader';

interface WeatherModalProps {
  isOpen: boolean;
  title: string;
  emoji: string;
  value: number | null;
  unit: string;
  loading: boolean;
  onClose$: QRL<() => void>;
}

export default component$<WeatherModalProps>(
  ({ isOpen, title, emoji, value, unit, loading, onClose$ }) => {
    if (!isOpen) return null;

    return (
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle} class="modal-enter">
          <div>
            <button 
              onClick$={onClose$}
              style={closeButtonStyle}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>

          <div style={modalBodyStyle}>
            {loading ? (
              <div style={loaderStyle}>
                <WeatherLoader
                  size="md"
                  speedFactor={1}
                />
                <p>Cargando datos...</p>
              </div>
            ) : value !== null ? (
              <>
                  <div style={modalHeaderStyle}>
                    <div style={titleHeaderStyle}>
                      <span style={emojiHeaderStyle}>
                        {emoji}
                      </span>
                      <h2 style={modalTitleStyle}>
                        {title}
                      </h2>
                    </div>
                    <div style={weatherContainerStyle}>
                      <WeatherLoader
                        size="lg"
                        speedFactor={1}
                      />
                    </div>
                  </div>
                  <div style={modalDataStyle}>
                    <p style={modalValueStyle}>
                      {value}
                    </p>
                    <span style={unitStyle}>
                      {unit}
                    </span>
                  </div>
              </>
            ) : (
              <div style={loaderStyle}>
                <WeatherLoader
                  size="md"
                  speedFactor={1}
                />
                <p style={errorStyle}>No se pudo cargar los datos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

// ==================== ESTILOS ====================

const modalOverlayStyle = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(26, 58, 82, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  backdropFilter: 'blur(4px)',
  padding: '20px',
};

const modalContentStyle = {
  backgroundColor: '#ffffff',
  padding: '0',
  borderRadius: '24px',
  width: '100%',
  maxWidth: '380px',
  overflow: 'hidden',
  boxShadow: '0 30px 80px rgba(26, 58, 82, 0.25)',
  position: 'relative' as const,
  color: '#1a3a52',
};

const closeButtonStyle = {
  position: 'absolute' as const,
  top: '16px',
  right: '16px',
  width: '36px',
  height: '36px',
  border: 'none',
  background: 'rgba(26, 58, 82, 0.08)',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '20px',
  color: '#1a3a52',
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  zIndex: 10,
};

const modalHeaderStyle = {
  position: 'relative' as const,
  display: 'flex' as const,
  width: '100%',
  alignItems: 'center' as const,
  padding: '30px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0f8 100%)',
};

const weatherContainerStyle = {
  position: 'absolute' as const,
  right: '-30px',
  top: '-20px',
  transform: 'scale(0.65)',
}

const titleHeaderStyle = {
  display: 'flex' as const,
  alignItems: 'center' as const,
  gap: '10px',
}

const emojiHeaderStyle = {
  fontSize: '32px',
};

const modalTitleStyle = {
  fontSize: '35px',
  fontWeight: 700,
  fontFamily: "'Syne', sans-serif",
  color: '#1a3a52',
  margin: 0,
};

const modalBodyStyle = {
  margin: 0,
  textAlign: 'center' as const,
};


const modalValueStyle = {
  fontSize: '56px',
  fontWeight: 700,
  fontFamily: "'Syne', sans-serif",
  color: '#2980b9',
  margin: '0',
  lineHeight: 1,
};

const modalDataStyle = {
  display: 'flex' as const,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  padding: '40px',
  gap: '4px',
}

const unitStyle = {
  fontSize: '32px',
  marginLeft: '4px',
  color: '#2980b9',
};

const loaderStyle = {
  display: 'flex' as const,
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  justifyContent: 'center',
  padding: '40px 0',
};

const errorStyle = {
  color: '#d32f2f',
  fontSize: '14px',
  margin: 0,
};
