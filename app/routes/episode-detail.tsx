import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftOutlined, CalendarOutlined, TeamOutlined } from "@ant-design/icons";

import { getEpisodeById, getMultipleFromUrls } from "../api/rickAndMortyApi";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FavoriteButton from "../components/FavoriteButton";

const SEASON_ACCENT: Record<string, { color: string; bg: string; label: string }> = {
  S01: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", label: "Season 1" },
  S02: { color: "#06b6d4", bg: "rgba(6,182,212,0.12)", label: "Season 2" },
  S03: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Season 3" },
  S04: { color: "#f97316", bg: "rgba(249,115,22,0.12)", label: "Season 4" },
  S05: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Season 5" },
  S06: { color: "#a855f7", bg: "rgba(168,85,247,0.12)", label: "Season 6" },
  S07: { color: "#ec4899", bg: "rgba(236,72,153,0.12)", label: "Season 7" },
};

export function meta({ params }: { params: { id?: string } }) {
  return [{ title: `Episodio #${params.id ?? ""} | Rick and Morty Explorer` }];
}

export default function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadEpisode() {
    try {
      setLoading(true);
      setError("");
      const episodeData = await getEpisodeById(id);
      setEpisode(episodeData);
      const charactersData = await getMultipleFromUrls(episodeData.characters);
      setCharacters(charactersData);
    } catch {
      setError("Errore nel caricamento dell'episodio.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadEpisode(); }, [id]);

  if (loading) return <Loader />;
  if (error) return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <ErrorMessage message={error} onRetry={loadEpisode} />
    </main>
  );
  if (!episode) return null;

  const season = episode.episode.slice(0, 3);
  const acc = SEASON_ACCENT[season] ?? { color: "#64748b", bg: "rgba(100,116,139,0.12)", label: season };

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      {/* Back */}
      <Link
        to="/episodes"
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 no-underline transition-colors"
        style={{ color: "var(--app-muted)" }}
      >
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center border border-(--surface-border) bg-(--surface-bg) hover:bg-(--surface-bg-2) transition-colors"
          style={{ color: acc.color }}
        >
          <ArrowLeftOutlined />
        </span>
        Torna agli episodi
      </Link>

      {/* ── Episode Hero ── */}
      <section className="mb-12">
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: `linear-gradient(135deg, ${acc.bg}, var(--surface-bg))`,
            borderColor: `${acc.color}30`,
          }}
        >
          {/* Season badge */}
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{ background: acc.bg, color: acc.color, border: `1px solid ${acc.color}40` }}
          >
            {episode.episode} · {acc.label}
          </span>

          <h1 className="text-4xl font-black mb-6 leading-tight" style={{ color: "var(--app-text)" }}>
            {episode.name}
          </h1>

          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2">
              <CalendarOutlined style={{ color: acc.color }} />
              <span className="text-sm font-medium" style={{ color: "var(--app-muted)" }}>
                {episode.air_date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TeamOutlined style={{ color: acc.color }} />
              <span className="text-sm font-medium" style={{ color: "var(--app-muted)" }}>
                {characters.length} personaggi
              </span>
            </div>
          </div>

          <FavoriteButton type="episodes" item={episode} />
        </div>
      </section>

      {/* ── Characters ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "var(--app-text)" }}>
            Personaggi nell&apos;episodio
          </h2>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: acc.bg, color: acc.color }}
          >
            {characters.length}
          </span>
        </div>

        <div className="grid grid-cols-2 min-[560px]:grid-cols-3 min-[800px]:grid-cols-4 min-[1100px]:grid-cols-5 gap-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </main>
  );
}
