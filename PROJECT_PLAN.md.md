# Rick and Morty Explorer - Piano Progetto

## 1. Obiettivo del progetto

Creare una web app completa in React che utilizza le API pubbliche di Rick and Morty per mostrare:

- personaggi
- episodi
- locations
- dettagli dei singoli elementi
- preferiti salvati
- statistiche del progetto

Il progetto deve essere abbastanza lungo e completo da occupare circa 5 giorni di lavoro.

---

## 2. Tecnologie utilizzate

Il progetto userà:

- React
- React Router
- TypeScript
- Ant Design
- Ant Design Icons
- CSS personalizzato
- Fetch API
- LocalStorage
- Rick and Morty API

---

## 3. API utilizzata

API base:

```txt
https://rickandmortyapi.com/api
```

Endpoint principali:

```txt
/character
/character/:id
/episode
/episode/:id
/location
/location/:id
```

Esempi:

```txt
https://rickandmortyapi.com/api/character
https://rickandmortyapi.com/api/character/1
https://rickandmortyapi.com/api/episode
https://rickandmortyapi.com/api/location
```

---

## 4. Struttura attuale del progetto

Il progetto usa React Router in modalità framework.

Struttura principale:

```txt
app/
  root.tsx
  routes.ts
  app.css

  routes/
    home.tsx
    characters.tsx
    character-detail.tsx
    episodes.tsx
    episode-detail.tsx
    locations.tsx
    location-detail.tsx
    favorites.tsx
    statistics.tsx
```

---

## 5. Rotte configurate

Nel file `app/routes.ts` sono state configurate queste rotte:

```txt
/                  -> home.tsx
/characters        -> characters.tsx
/characters/:id    -> character-detail.tsx
/episodes          -> episodes.tsx
/episodes/:id      -> episode-detail.tsx
/locations         -> locations.tsx
/locations/:id     -> location-detail.tsx
/favorites         -> favorites.tsx
/statistics        -> statistics.tsx
```

Codice attuale:

```ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("characters", "routes/characters.tsx"),
  route("characters/:id", "routes/character-detail.tsx"),

  route("episodes", "routes/episodes.tsx"),
  route("episodes/:id", "routes/episode-detail.tsx"),

  route("locations", "routes/locations.tsx"),
  route("locations/:id", "routes/location-detail.tsx"),

  route("favorites", "routes/favorites.tsx"),
  route("statistics", "routes/statistics.tsx"),
] satisfies RouteConfig;
```

---

## 6. Cosa fa ogni pagina

### Home

Pagina iniziale del sito.

Deve contenere:

- titolo del progetto
- descrizione del progetto
- pulsanti per andare a personaggi, episodi e locations
- card introduttive

---

### Characters

Pagina lista personaggi.

Deve contenere:

- chiamata API a `/character`
- griglia di card
- immagine personaggio
- nome
- status
- specie
- genere
- pulsante dettagli
- pulsante preferiti
- ricerca per nome
- filtro per status
- filtro per genere
- paginazione

---

### Character Detail

Pagina dettaglio personaggio.

URL esempio:

```txt
/characters/1
```

Deve contenere:

- lettura dell'id dall'URL con `useParams`
- chiamata API a `/character/:id`
- immagine grande
- nome
- status
- specie
- genere
- origine
- location attuale
- lista episodi in cui appare
- pulsante per aggiungere ai preferiti

---

### Episodes

Pagina lista episodi.

Deve contenere:

- chiamata API a `/episode`
- lista episodi
- nome episodio
- codice episodio, esempio `S01E01`
- data uscita
- numero personaggi presenti
- ricerca per nome
- filtro per stagione
- paginazione
- pulsante dettagli

---

### Episode Detail

Pagina dettaglio episodio.

URL esempio:

```txt
/episodes/1
```

Deve contenere:

- lettura dell'id dall'URL
- chiamata API a `/episode/:id`
- nome episodio
- data uscita
- codice episodio
- lista personaggi presenti
- link ai dettagli dei personaggi

---

### Locations

Pagina lista locations.

Deve contenere:

- chiamata API a `/location`
- lista locations
- nome location
- tipo
- dimensione
- numero residenti
- ricerca per nome
- filtro per tipo o dimensione
- paginazione
- pulsante dettagli

---

### Location Detail

Pagina dettaglio location.

URL esempio:

```txt
/locations/1
```

Deve contenere:

- lettura dell'id dall'URL
- chiamata API a `/location/:id`
- nome location
- tipo
- dimensione
- lista residenti
- link ai dettagli dei residenti

---

### Favorites

Pagina dei preferiti.

Deve contenere:

- elementi salvati nel LocalStorage
- personaggi preferiti
- episodi preferiti
- locations preferite
- possibilità di rimuovere un preferito
- messaggio se non ci sono preferiti

---

### Statistics

Pagina statistiche.

Deve contenere:

- numero preferiti salvati
- numero personaggi caricati
- numero episodi visualizzati
- numero locations visualizzate
- conteggio personaggi vivi, morti e sconosciuti
- statistiche semplici con card Ant Design

---

## 7. Componenti da creare

Cartella consigliata:

```txt
app/components/
```

Componenti:

```txt
Navbar.tsx
CharacterCard.tsx
EpisodeCard.tsx
LocationCard.tsx
Pagination.tsx
Loader.tsx
ErrorMessage.tsx
FavoriteButton.tsx
SearchBar.tsx
```

---

## 8. File API da creare

Creare cartella:

```txt
app/api/
```

File:

```txt
rickAndMortyApi.ts
```

Funzioni da inserire:

```ts
getCharacters()
getCharacterById(id)
getEpisodes()
getEpisodeById(id)
getLocations()
getLocationById(id)
```

Obiettivo: non scrivere `fetch` in ogni pagina, ma centralizzare le chiamate API in un solo file.

---

## 9. LocalStorage

Il LocalStorage servirà per salvare:

- preferiti
- eventuale tema chiaro/scuro
- cronologia delle ricerche

Chiavi consigliate:

```txt
rick-morty-favorites
rick-morty-theme
rick-morty-search-history
```

---

## 10. Ant Design

Ant Design verrà usato per:

- Button
- Card
- Input
- Select
- Pagination
- Spin
- Alert
- Tag
- Empty
- Statistic

Import da ricordare:

```ts
import { Button, Card, Input, Select, Pagination, Spin, Alert, Tag } from "antd";
```

CSS Ant Design da importare in `app/root.tsx`:

```ts
import "antd/dist/reset.css";
```

---

## 11. Ant Design Icons

Icone utili:

```ts
import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  BarChartOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
```

---

## 12. Piano di lavoro in 5 giorni

### Giorno 1 - Struttura base

Da fare:

- controllare installazione librerie
- sistemare `root.tsx`
- sistemare `routes.ts`
- creare tutte le pagine vuote
- creare Navbar
- creare CSS base
- controllare che tutte le rotte funzionino

Obiettivo finale:

- sito navigabile
- tutte le pagine principali esistono

---

### Giorno 2 - Personaggi

Da fare:

- creare file API
- creare `CharacterCard`
- chiamare API `/character`
- mostrare lista personaggi
- aggiungere ricerca
- aggiungere filtri
- aggiungere paginazione
- creare pagina dettaglio personaggio
- aggiungere preferiti personaggio

Obiettivo finale:

- sezione personaggi completa

---

### Giorno 3 - Episodi

Da fare:

- creare `EpisodeCard`
- chiamare API `/episode`
- mostrare lista episodi
- aggiungere ricerca
- aggiungere filtro stagione
- aggiungere paginazione
- creare dettaglio episodio
- mostrare personaggi presenti nell'episodio

Obiettivo finale:

- sezione episodi completa

---

### Giorno 4 - Locations e Preferiti

Da fare:

- creare `LocationCard`
- chiamare API `/location`
- mostrare lista locations
- aggiungere ricerca
- aggiungere paginazione
- creare dettaglio location
- mostrare residenti
- completare pagina preferiti
- salvare e rimuovere preferiti dal LocalStorage

Obiettivo finale:

- locations complete
- preferiti funzionanti

---

### Giorno 5 - Statistiche e rifinitura

Da fare:

- creare pagina statistiche
- migliorare CSS
- rendere il sito responsive
- sistemare errori
- aggiungere loader
- aggiungere messaggi se non ci sono dati
- pulire il codice
- scrivere README
- testare tutte le rotte
- preparare consegna

Obiettivo finale:

- progetto completo e presentabile

---

## 13. Prossimo passo immediato

Il prossimo passo dopo questo file è creare la Navbar.

File da creare:

```txt
app/components/Navbar.tsx
```

Poi importarla dentro:

```txt
app/root.tsx
```

La Navbar servirà per navigare tra:

```txt
Home
Personaggi
Episodi
Locations
Preferiti
Statistiche
```

---

## 14. Frase per descrivere il progetto

Il progetto è una Single Page Application sviluppata con React e React Router che utilizza le API pubbliche di Rick and Morty per esplorare personaggi, episodi e locations. L'app include navigazione tra pagine, dettagli dinamici, chiamate API, preferiti salvati in LocalStorage, statistiche e un'interfaccia realizzata con Ant Design.
