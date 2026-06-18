import { Link } from "react-router";
import { HeartFilled, HeartOutlined, EyeOutlined, CalendarOutlined, TeamOutlined } from "@ant-design/icons";
import { useFavorites } from "../FavoritesContext";

type EpisodeCardProps = {
  episode: {
    id: number;
    name: string;
    episode: string;
    air_date: string;
    characters: string[];
  };
};

const SEASON_ACCENT: Record<string, { color: string; bg: string; label: string }> = {
  S01: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", label: "Season 1" },
  S02: { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", label: "Season 2" },
  S03: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", label: "Season 3" },
  S04: { color: "#f97316", bg: "rgba(249,115,22,0.1)", label: "Season 4" },
  S05: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Season 5" },
  S06: { color: "#a855f7", bg: "rgba(168,85,247,0.1)", label: "Season 6" },
  S07: { color: "#ec4899", bg: "rgba(236,72,153,0.1)", label: "Season 7" },
};

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite("episodes", episode.id);

  const season = episode.episode.slice(0, 3);
  const acc = SEASON_ACCENT[season] ?? { color: "#64748b", bg: "rgba(100,116,139,0.1)", label: season };

  return (
    <div
      className="pro-card flex flex-col h-full"
      style={{ borderLeft: `3px solid ${acc.color}` }}
    >
      {/* Season badge */}
      <div className="px-4 pt-4 pb-0">
        <span
          className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3"
          style={{ color: acc.color, background: acc.bg }}
        >
          {episode.episode} · {acc.label}
        </span>
      </div>

      {/* Title */}
      <div className="px-4 pb-3 flex-1">
        <h3
          className="text-[15px] font-semibold leading-snug line-clamp-2 min-h-10 mb-3"
          style={{ color: "var(--app-text)" }}
        >
          {episode.name}
        </h3>

        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-2 text-[12px]" style={{ color: "var(--app-muted)" }}>
            <CalendarOutlined style={{ color: acc.color }} />
            {episode.air_date}
          </span>
          <span className="flex items-center gap-2 text-[12px]" style={{ color: "var(--app-muted)" }}>
            <TeamOutlined style={{ color: acc.color }} />
            {episode.characters.length} personaggi
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 pt-3 border-t border-(--surface-border) flex items-center gap-2">
        <Link to={`/episodes/${episode.id}`} className="flex-1">
          <button
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: acc.color }}
          >
            <EyeOutlined />
            Dettagli
          </button>
        </Link>

        <button
          onClick={() => toggleFavorite("episodes", episode)}
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
