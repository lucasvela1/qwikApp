import { component$ } from '@builder.io/qwik';

interface WeatherLoaderProps {
  size?: 'sm' | 'md' | 'lg'; // Para controlar el tamaño según dónde se use
  speedFactor?: number;      // 1 por defecto, menor número = más rápido, mayor = más lento
}

export default component$<WeatherLoaderProps>(({ size = 'md', speedFactor = 1 }) => {
  // Calculamos la velocidad dinámica basada en la prop speedFactor
  const frontSpeed = `${8 * speedFactor}s`;
  const backSpeed = `${12 * speedFactor}s`;

  return (
    <div 
      class={`loader-weather-container size-${size}`}
      style={{ position: 'relative' }}
    >
      <div 
        class="loader-cloud front" 
        style={{ animationDuration: frontSpeed }}
      >
        <span class="loader-left-front"></span>
        <span class="loader-right-front"></span>
      </div>
      <span class="loader-sun loader-sunshine"></span>
      <span class="loader-sun"></span>
      <div 
        class="loader-cloud back" 
        style={{ animationDuration: backSpeed }}
      >
        <span class="loader-left-back"></span>
        <span class="loader-right-back"></span>
      </div>
    </div>
  );
});