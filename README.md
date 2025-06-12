# Hidalgo Games - Catálogo de Videojuegos

![Logo de Hidalgo Games](public/vite.svg)

Hidalgo Games es una aplicación web moderna desarrollada con React que te permite explorar y descubrir videojuegos utilizando la API de RAWG. La aplicación incluye características como búsqueda de juegos, filtrado por etiquetas, detalles de juegos y más.

## Características

- Explorar juegos populares
- Búsqueda de videojuegos
- Filtrado por etiquetas
- Búsqueda por editoras
- Diseño responsive con Tailwind CSS
- Carga rápida con Vite
- Enrutamiento con React Router

## Tecnologías Utilizadas

- React 19
- React Router DOM
- Tailwind CSS
- Vite
- API de RAWG
- Hero Icons
- Swiper (para carruseles)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/luishidalgoo27/Games-Hidalgo.git]
   cd hidalgo-games
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en:
   ```
   http://localhost:5173
   ```

## Estructura del Proyecto

```
src/
├── assets/           # Imágenes y recursos estáticos
├── components/       # Componentes reutilizables
│   ├── GameCard.jsx  # Tarjeta de juego individual
│   ├── Pagination.jsx # Componente de paginación
│   ├── PublisherDetails.jsx # Detalles de la editora
│   ├── SearchBar.jsx # Barra de búsqueda
│   └── TagGames.jsx  # Juegos por etiqueta
├── pages/            # Páginas de la aplicación
│   ├── GameDetails.jsx # Detalles de un juego
│   ├── Games.jsx     # Lista de juegos
│   ├── Home.jsx      # Página de inicio
│   └── PublisherSearch.jsx # Búsqueda de editoras
├── services/         # Servicios de API
│   └── api.js       # Llamadas a la API de RAWG
├── App.jsx          # Componente principal
└── main.jsx         # Punto de entrada de la aplicación
```

## Uso

- **Página de Inicio**: Muestra los juegos más populares en un carrusel interactivo.
- **Búsqueda**: Utiliza la barra de búsqueda para encontrar juegos específicos.
- **Filtrado por Etiquetas**: Explora juegos por categorías o géneros.
- **Detalles del Juego**: Haz clic en cualquier juego para ver información detallada.
- **Editoras**: Busca y explora juegos por editora.

## Licencia

Este proyecto está bajo la Licencia MIT.

## Agradecimientos

- [RAWG Video Games Database API](https://rawg.io/apidocs)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

---

Desarrollado con  por Luis Hidalgo
