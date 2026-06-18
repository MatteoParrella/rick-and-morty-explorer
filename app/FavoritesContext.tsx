import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type FavoriteType = "characters" | "episodes" | "locations";

type Favorites = {
  characters: any[];
  episodes:   any[];
  locations:  any[];
};

type FavoritesContextType = {
  favorites:      Favorites;
  isFavorite:     (type: FavoriteType, id: number) => boolean;
  toggleFavorite: (type: FavoriteType, item: any) => void;
};

const STORAGE_KEY = "rick-morty-favorites";
const empty: Favorites = { characters: [], episodes: [], locations: [] };

function loadFromStorage(): Favorites {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return JSON.parse(raw);
  } catch {
    return empty;
  }
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites:      empty,
  isFavorite:     () => false,
  toggleFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorites>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (type: FavoriteType, id: number) => favorites[type].some((item) => item.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((type: FavoriteType, item: any) => {
    setFavorites((prev) => {
      const list = prev[type];
      const exists = list.some((i) => i.id === item.id);
      return {
        ...prev,
        [type]: exists ? list.filter((i) => i.id !== item.id) : [...list, item],
      };
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
