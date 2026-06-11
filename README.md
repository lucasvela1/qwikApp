# Aplicación de Clima con Qwik

Una aplicación web para consultar información meteorológica (temperatura y precipitaciones) de ciudades argentinas. Está construida con **Qwik**, un framework web de última generación optimizado para el rendimiento, junto con **Qwik City** para el enrutamiento.

## 🌦️ Características

- **Consulta de clima**: Visualiza temperatura y precipitaciones de ciudades predefinidas
- **Ciudades por defecto**: Ushuaia, Río Grande y Tolhuin
- **Agregar ciudades**: Permite agregar nuevas ciudades de forma personalizada
- **Almacenamiento local**: Guarda las ciudades agregadas en `localStorage`
- **Interfaz responsive**: Diseño adaptable a diferentes dispositivos
- **Renderizado en servidor**: SSR (Server-Side Rendering) para mejor SEO y rendimiento
- **Zero-JS**: Carga inicial mínima de JavaScript

## 🛠️ Tecnologías

- **Qwik 1.19** - Framework moderno y ultrarrápido
- **Qwik City 1.19** - Meta-framework con enrutamiento basado en directorios
- **TypeScript** - Tipado estático para JavaScript
- **Vite 7** - Herramienta de compilación y bundling
- **Prettier** - Formateador de código
- **ESLint** - Linter para validar el código

## 📁 Estructura del Proyecto

```
src/
├── routes/              # Rutas de la aplicación (enrutamiento basado en directorios)
│   ├── index.tsx        # Página principal de clima
│   ├── layout.tsx       # Layout global
│   └── agregar-ciudad/  # Ruta para agregar ciudades
│       └── index.tsx
├── components/          # Componentes reutilizables
│   ├── RainBackground.tsx
│   ├── WeatherLoader.tsx
│   └── WeatherModal.tsx
├── services/            # Servicios para llamadas API
│   ├── precipitaciones.ts
│   └── temperaturas.ts
├── constants/           # Constantes de configuración
│   └── api.ts
├── root.tsx             # Componente raíz
└── entry.*.tsx          # Puntos de entrada para SSR, preview, etc.
```

## 🚀 Instalación y Ejecución

### Requisitos previos

- Node.js (v18.17 o superior)
- npm o yarn

### Pasos de instalación

1. Navega a la carpeta del proyecto:

```bash
cd qwikApp
```

2. Instala las dependencias:

```bash
npm install
```

### Comandos disponibles

- **Iniciar servidor de desarrollo**:

```bash
npm run dev
```

o

```bash
npm start
```

Abre http://localhost:5173 en tu navegador (con SSR habilitado).

- **Compilar para producción**:

```bash
npm run build
```

Genera una compilación optimizada para producción.

- **Compilar solo cliente**:

```bash
npm run build.client
```

- **Vista previa de la compilación**:

```bash
npm run preview
```

Sirve la compilación de producción localmente.

- **Validar código con ESLint**:

```bash
npm run lint
```

- **Formatear código con Prettier**:

```bash
npm run fmt
```

- **Validar formato con Prettier**:

```bash
npm run fmt.check
```

- **Validar tipos de TypeScript**:

```bash
npm run build.types
```

## ℹ️ Información adicional

- [Documentación oficial de Qwik](https://qwik.dev/)
- [Documentación de Qwik City](https://qwik.dev/qwikcity/)
- [Discord de Qwik](https://qwik.dev/chat)
- [GitHub - QwikDev](https://github.com/QwikDev/qwik)

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```
