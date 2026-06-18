# Rick & Morty Explorer

A full-featured web app to explore the Rick and Morty universe — characters, episodes, and locations — powered by the [Rick and Morty API](https://rickandmortyapi.com/).

Built with **React 19**, **React Router v7**, **TypeScript**, **Tailwind CSS v4**, and **Ant Design v6**.

---

## Features

- **Characters** — browse, search by name, filter by status and gender, paginate results
- **Episodes** — explore all episodes across 7 seasons, filter by season
- **Locations** — discover planets, dimensions, and places of the multiverse
- **Detail pages** — each character, episode, and location has a dedicated detail page with linked data (e.g. episodes a character appears in, residents of a location)
- **Favorites** — save characters, episodes, and locations to a personal list, persisted via `localStorage`
- **Dark / Light theme** — system-preference detection with manual toggle, persisted via `localStorage`
- **Debounced search** — search input waits before firing API calls to avoid unnecessary requests
- **Responsive layout** — adapts from mobile to wide desktop

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + custom CSS variables |
| UI components | Ant Design v6 + `@ant-design/icons` |
| Build tool | Vite 8 |
| Data source | [Rick and Morty API](https://rickandmortyapi.com/api) |
| Containerization | Docker (multi-stage build) |

---

## Project structure

```
app/
├── api/
│   └── rickAndMortyApi.ts      # Centralised fetch functions
├── components/
│   ├── CharacterCard.tsx
│   ├── EpisodeCard.tsx
│   ├── LocationCard.tsx
│   ├── FavoriteButton.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Loader.tsx
│   └── ErrorMessage.tsx
├── hooks/
│   └── useDebounce.ts
├── routes/
│   ├── home.tsx
│   ├── characters.tsx
│   ├── character-detail.tsx
│   ├── episodes.tsx
│   ├── episode-detail.tsx
│   ├── locations.tsx
│   ├── location-detail.tsx
│   └── favorites.tsx
├── FavoritesContext.tsx         # Global favorites state (localStorage)
├── ThemeContext.tsx             # Global dark/light theme state
├── app.css                     # CSS custom properties & global styles
├── root.tsx                    # App shell (Navbar, Outlet, providers)
└── routes.ts                   # Route definitions
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero, live stats, feature overview |
| `/characters` | Character list with search, status & gender filters |
| `/characters/:id` | Character detail with linked episodes |
| `/episodes` | Episode list with search and season filter |
| `/episodes/:id` | Episode detail with linked characters |
| `/locations` | Location list with search |
| `/locations/:id` | Location detail with linked residents |
| `/favorites` | Saved favorites (characters, episodes, locations) |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build      # Production build
npm run start      # Serve the production build
npm run typecheck  # Run TypeScript type checking
```

---

## Docker

The project includes a multi-stage `Dockerfile` for production deployment.

```bash
# Build the image
docker build -t rick-and-morty-explorer .

# Run the container
docker run -p 3000:3000 rick-and-morty-explorer
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## API reference

All data comes from the public [Rick and Morty REST API](https://rickandmortyapi.com/).

Base URL: `https://rickandmortyapi.com/api`

| Endpoint | Description |
|---|---|
| `GET /character` | Paginated character list (supports `name`, `status`, `gender` filters) |
| `GET /character/:id` | Single character |
| `GET /episode` | Paginated episode list (supports `name`, `episode` filters) |
| `GET /episode/:id` | Single episode |
| `GET /location` | Paginated location list (supports `name` filter) |
| `GET /location/:id` | Single location |

---

## Author

Made by [Matteo Parrella](https://github.com/MatteoParrella).
