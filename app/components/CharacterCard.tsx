import { Link } from "react-router";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useFavorites } from "../FavoritesContext";

type CharacterCardProps = {
  character: {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
  };
};

const STATUS_MAP: Record<string, { dot: string; label: string }> = {
  Alive:   { dot: "status-dot-alive",   label: "Alive" },
  Dead:    { dot: "status-dot-dead",    label: "Dead" },
  unknown: { dot: "status-dot-unknown", label: "Unknown" },
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved  = isFavorite("characters", character.id);
  const status = STATUS_MAP[character.status] ?? STATUS_MAP.unknown;

  return (
    <div className="group relative rounded-2xl overflow-hidden flex flex-col bg-(--surface-bg) border border-(--surface-border) shadow-(--card-shadow) hover:shadow-(--card-shadow-hover) transition-all duration-300 hover:-translate-y-1">

      {/* ── Entire card is a link (works on mobile too) ── */}
      <Link to={`/characters/${character.id}`} className="block no-underline flex-1">

        {/* Image */}
        <div className="relative overflow-hidden aspect-4/5">
          <img
            alt={character.name}
            src={character.image}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent pointer-events-none" />

          {/* Status pill – top left */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/55 backdrop-blur-md rounded-full px-2.5 py-1 pointer-events-none">
            <span className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} />
            <span className="text-white text-[10px] font-semibold leading-none">{status.label}</span>
          </div>

          {/* Hover CTA – desktop only enhancement */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg"
              style={{ background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
            >
              Vedi dettagli →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-0.5">
          <h3
            className="text-[13px] font-semibold leading-snug line-clamp-2 min-h-10"
            style={{ color: "var(--app-text)" }}
            title={character.name}
          >
            {character.name}
          </h3>
          <p className="text-[11px]" style={{ color: "var(--app-muted)" }}>{character.species}</p>
          <p className="text-[11px]" style={{ color: "var(--app-muted)" }}>{character.gender}</p>
        </div>
      </Link>

      {/* ── Favorite button – outside the Link, absolute positioned ── */}
      <button
        onClick={() => toggleFavorite("characters", character)}
        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer z-10"
        aria-label={saved ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      >
        {saved
          ? <HeartFilled  style={{ color: "#ef4444", fontSize: 13 }} />
          : <HeartOutlined style={{ color: "white",  fontSize: 13 }} />
        }
      </button>
    </div>
  );
}
