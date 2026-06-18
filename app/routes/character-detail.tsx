import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftOutlined, CalendarOutlined, EnvironmentOutlined, UserOutlined, ManOutlined, WomanOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { getCharacterById, getMultipleFromUrls } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FavoriteButton from "../components/FavoriteButton";

export function meta({ params }: { params: { id?: string } }) {
  return [{ title: `Personaggio #${params.id ?? ""} | Rick and Morty Explorer` }];
}

export default function CharacterDetail() {
  const { id } = useParams();

  const [character, setCharacter] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCharacter() {
    try {
      setLoading(true);
      setError("");
      const characterData = await getCharacterById(id);
      setCharacter(characterData);
      const episodeData = await getMultipleFromUrls(characterData.episode);
      setEpisodes(episodeData);
    } catch {
      setError("Errore nel caricamento del personaggio.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCharacter();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <main className="px-6 py-10 max-w-7xl mx-auto">
        <ErrorMessage message={error} onRetry={loadCharacter} />
      </main>
    );
  }

  if (!character) return null;

  const statusConfig = {
    Alive: { dot: "status-dot-alive", color: "#22c55e", bg: "rgba(34,197,94,0.1)", label: "Vivo" },
    Dead: { dot: "status-dot-dead", color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Morto" },
    unknown: { dot: "status-dot-unknown", color: "#94a3b8", bg: "rgba(148,163,184,0.1)", label: "Sconosciuto" },
  };
  const status = statusConfig[character.status as keyof typeof statusConfig] ?? statusConfig.unknown;

  const SEASON_COLOR: Record<string, string> = {
    S01: "#3b82f6", S02: "#06b6d4", S03: "#22c55e",
    S04: "#f97316", S05: "#ef4444", S06: "#a855f7", S07: "#ec4899",
  };

  const infoRows = [
    { label: "Specie", value: character.species, icon: <UserOutlined /> },
    { label: "Tipo", value: character.type || "Non specificato", icon: <QuestionCircleOutlined /> },
    { label: "Genere", value: character.gender, icon: character.gender === "Female" ? <WomanOutlined /> : <ManOutlined /> },
    { label: "Origine", value: character.origin.name, icon: <EnvironmentOutlined /> },
    { label: "Location", value: character.location.name, icon: <EnvironmentOutlined /> },
  ];

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      {/* Back */}
      <Link
        to="/characters"
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors no-underline"
        style={{ color: "var(--app-muted)" }}
      >
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center border border-(--surface-border) bg-(--surface-bg) hover:bg-(--surface-bg-2) transition-colors"
          style={{ color: "var(--green-primary)" }}
        >
          <ArrowLeftOutlined />
        </span>
        Torna ai personaggi
      </Link>

      {/* ── Hero ── */}
      <section className="grid grid-cols-1 min-[800px]:grid-cols-[300px_1fr] gap-8 mb-12 items-start">
        {/* Portrait */}
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full rounded-2xl shadow-2xl"
            style={{ boxShadow: `0 20px 60px ${status.color}33` }}
          />
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 backdrop-blur-md rounded-full px-3 py-1.5"
            style={{ background: status.bg, border: `1px solid ${status.color}55` }}
          >
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${status.dot}`} />
            <span className="text-xs font-bold" style={{ color: status.color }}>{status.label}</span>
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl min-[800px]:text-5xl font-black mb-3 leading-tight" style={{ color: "var(--app-text)" }}>
              {character.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(34,197,94,0.1)", color: "var(--green-primary)", border: "1px solid rgba(34,197,94,0.25)" }}
              >
                {character.species}
              </span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "var(--surface-bg-2)", color: "var(--app-muted)", border: "1px solid var(--surface-border)" }}
              >
                {character.gender}
              </span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "var(--surface-bg-2)", color: "var(--app-muted)", border: "1px solid var(--surface-border)" }}
              >
                {episodes.length} episodi
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 gap-3">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-3 p-4 rounded-xl border border-(--surface-border) bg-(--surface-bg)"
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"
                  style={{ background: "rgba(34,197,94,0.08)", color: "var(--green-primary)" }}
                >
                  {row.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--app-muted)" }}>
                    {row.label}
                  </p>
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--app-text)" }}>
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <FavoriteButton type="characters" item={character} />
          </div>
        </div>
      </section>

      {/* ── Episodes ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "var(--app-text)" }}>
            Episodi in cui appare
          </h2>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.1)", color: "var(--green-primary)" }}
          >
            {episodes.length}
          </span>
        </div>

        <div className="grid grid-cols-1 min-[560px]:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {episodes.map((episode) => {
            const season = episode.episode.slice(0, 3);
            const color = SEASON_COLOR[season] ?? "#64748b";
            return (
              <div
                key={episode.id}
                className="pro-card p-4 flex flex-col gap-2"
                style={{ borderLeft: `3px solid ${color}` }}
              >
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start"
                  style={{ background: `${color}18`, color }}
                >
                  {episode.episode}
                </span>
                <h3
                  className="text-[13px] font-semibold leading-snug line-clamp-2"
                  style={{ color: "var(--app-text)" }}
                >
                  {episode.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--app-muted)" }}>
                  <CalendarOutlined style={{ fontSize: 10 }} />
                  {episode.air_date}
                </div>
                <Link
                  to={`/episodes/${episode.id}`}
                  className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold no-underline transition-opacity hover:opacity-75"
                  style={{ color }}
                >
                  Vai all&apos;episodio →
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );  
}
