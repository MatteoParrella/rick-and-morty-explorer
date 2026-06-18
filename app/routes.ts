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
] satisfies RouteConfig;