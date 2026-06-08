import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import './global.css';
import RainBackground from './components/RainBackground';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <title>Demo Clima Qwik</title>
      </head>
      <body>
        <RainBackground>
          <RouterOutlet />
        </RainBackground>
      </body>
    </QwikCityProvider>
  );
});