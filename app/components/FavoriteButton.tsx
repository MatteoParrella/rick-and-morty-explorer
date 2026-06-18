import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useFavorites } from "../FavoritesContext";
import type { FavoriteType } from "../FavoritesContext";

type FavoriteButtonProps = {
  type: FavoriteType;
  item: any;
};

export default function FavoriteButton({ type, item }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(type, item.id);

  return (
    <button
      onClick={() => toggleFavorite(type, item)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer hover:-translate-y-px active:translate-y-0"
      style={
        saved
          ? {
              background: "rgba(239,68,68,0.08)",
              borderColor: "rgba(239,68,68,0.35)",
              color: "#ef4444",
            }
          : {
              background: "var(--surface-bg-2)",
              borderColor: "var(--surface-border)",
              color: "var(--app-muted)",
            }
      }
      aria-label={saved ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      {saved
        ? <HeartFilled style={{ fontSize: 14, color: "#ef4444" }} />
        : <HeartOutlined style={{ fontSize: 14 }} />
      }
      {saved ? "Rimuovi" : "Salva"}
    </button>
  );
}
