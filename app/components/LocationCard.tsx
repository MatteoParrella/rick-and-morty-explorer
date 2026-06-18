import { Link } from "react-router";
import { EyeOutlined, TeamOutlined, GlobalOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useFavorites } from "../FavoritesContext";

type LocationCardProps = {
  location: {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
  };
};

export default function LocationCard({ location }: LocationCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite("locations", location.id);

  return (
    <div className="pro-card flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.15))",
              color: "#a855f7",
            }}
          >
            <GlobalOutlined />
          </div>
          <h3
            className="text-[15px] font-semibold leading-snug line-clamp-2 flex-1 pt-1"
            style={{ color: "var(--app-text)" }}
          >
            {location.name}
          </h3>
        </div>

        <div className="flex flex-col gap-1.5">
          <span
            className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start"
            style={{
              color: "#6366f1",
              background: "rgba(99,102,241,0.1)",
            }}
          >
            {location.type}
          </span>

          <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--app-muted)" }}>
            <GlobalOutlined style={{ fontSize: 11, color: "#a855f7" }} />
            {location.dimension}
          </span>

          <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--app-muted)" }}>
            <TeamOutlined style={{ fontSize: 11, color: "#a855f7" }} />
            {location.residents.length} residenti
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto px-4 pb-4 pt-3 border-t border-(--surface-border) flex items-center gap-2">
        <Link to={`/locations/${location.id}`} className="flex-1">
          <button
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
          >
            <EyeOutlined />
            Dettagli
          </button>
        </Link>

        <button
          onClick={() => toggleFavorite("locations", location)}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-(--surface-border) hover:border-red-300 transition-colors bg-(--surface-bg-2)"
          aria-label={saved ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          {saved
            ? <HeartFilled style={{ color: "#ef4444", fontSize: 13 }} />
            : <HeartOutlined style={{ color: "var(--app-muted)", fontSize: 13 }} />
          }
        </button>
      </div>
    </div>
  );
}
