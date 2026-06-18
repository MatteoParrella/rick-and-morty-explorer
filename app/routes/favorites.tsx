import { useState } from "react";
import { Link } from "react-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  HeartOutlined,
  CalendarOutlined,
  TeamOutlined,
  GlobalOutlined,
  CompassOutlined,
} from "@ant-design/icons";

export function meta() {
  return [{ title: "Preferiti | Rick and Morty Explorer" }];
}

import { useFavorites } from "../FavoritesContext";
import FavoriteButton from "../components/FavoriteButton";
import CharacterCard from "../components/CharacterCard";

const TABS = [
  { key: "characters", label: "Personaggi", icon: <UserOutlined /> },
  { key: "episodes",   label: "Episodi",    icon: <VideoCameraOutlined /> },
  { key: "locations",  label: "Locations",  icon: <EnvironmentOutlined /> },
] as const;

const SEASON_ACCENT: Record<string, string> = {
  S01: "#3b82f6", S02: "#06b6d4", S03: "#22c55e",
  S04: "#f97316", S05: "#ef4444", S06: "#a855f7", S07: "#ec4899",
};

export default function Favorites() {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<"characters" | "episodes" | "locations">("characters");

  const counts = {
    characters: favorites.characters.length,
    episodes:   favorites.episodes.length,
    locations:  favorites.locations.length,
  };
  const totalCount = counts.characters + counts.episodes + counts.locations;

  return (
    <main className="max-w-375 mx-auto px-6 py-10">
      {/* ── Header ── */}
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-1.5" style={{ color: "var(--app-text)" }}>
          Preferiti
        </h1>
        <p className="text-base" style={{ color: "var(--app-muted)" }}>
          {totalCount === 0
            ? "Non hai ancora salvato nessun preferito."
            : `${totalCount} element${totalCount === 1 ? "o" : "i"} salvati.`}
        </p>
      </section>

      {totalCount === 0 ? (
        <div
          className="rounded-2xl p-16 text-center border border-(--surface-border)"
          style={{ background: "var(--surface-bg)" }}
        >
          <div className="text-5xl mb-4 opacity-20">
            <HeartOutlined />
          </div>
          <p className="text-base font-semibold mb-2" style={{ color: "var(--app-text)" }}>
            Nessun preferito salvato
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--app-muted)" }}>
            Usa il cuore su qualsiasi scheda per salvarlo qui.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/characters">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                <UserOutlined /> Personaggi
              </button>
            </Link>
            <Link to="/episodes">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                <VideoCameraOutlined /> Episodi
              </button>
            </Link>
            <Link to="/locations">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
              >
                <EnvironmentOutlined /> Locations
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ── Tabs ── */}
          <div
            className="flex gap-1.5 p-1.5 rounded-2xl mb-8 w-fit"
            style={{ background: "var(--surface-bg)", border: "1px solid var(--surface-border)" }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={
                    isActive
                      ? {
                          background: tab.key === "characters" ? "linear-gradient(135deg,#22c55e,#16a34a)"
                            : tab.key === "episodes" ? "linear-gradient(135deg,#3b82f6,#2563eb)"
                            : "linear-gradient(135deg,#a855f7,#6366f1)",
                          color: "white",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }
                      : { color: "var(--app-muted)", background: "transparent" }
                  }
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    className="text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center"
                    style={
                      isActive
                        ? { background: "rgba(255,255,255,0.25)", color: "white" }
                        : { background: "var(--surface-bg-2)", color: "var(--app-muted)" }
                    }
                  >
                    {counts[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Characters tab ── */}
          {activeTab === "characters" && (
            counts.characters === 0 ? (
              <EmptyTab label="personaggi preferiti" to="/characters" />
            ) : (
              <div className="grid grid-cols-2 min-[560px]:grid-cols-3 min-[800px]:grid-cols-4 min-[1100px]:grid-cols-5 gap-4">
                {favorites.characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            )
          )}

          {/* ── Episodes tab ── */}
          {activeTab === "episodes" && (
            counts.episodes === 0 ? (
              <EmptyTab label="episodi preferiti" to="/episodes" />
            ) : (
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 gap-4">
                {favorites.episodes.map((episode) => {
                  const season = episode.episode.slice(0, 3);
                  const color = SEASON_ACCENT[season] ?? "#64748b";
                  return (
                    <div
                      key={episode.id}
                      className="pro-card flex flex-col"
                      style={{ borderLeft: `3px solid ${color}` }}
                    >
                      <div className="px-4 pt-4 pb-3 flex-1">
                        <span
                          className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3"
                          style={{ color, background: `${color}18` }}
                        >
                          {episode.episode}
                        </span>
                        <h3 className="text-sm font-semibold mb-3 line-clamp-2 min-h-10" style={{ color: "var(--app-text)" }}>
                          {episode.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--app-muted)" }}>
                          <CalendarOutlined style={{ fontSize: 10, color }} />
                          {episode.air_date}
                        </div>
                      </div>
                      <div className="px-4 pb-4 pt-3 border-t border-(--surface-border) flex gap-2">
                        <Link to={`/episodes/${episode.id}`} className="flex-1">
                          <button
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[12px] font-semibold text-white hover:opacity-90 transition-opacity"
                            style={{ background: color }}
                          >
                            <EyeOutlined /> Dettagli
                          </button>
                        </Link>
                        <FavoriteButton type="episodes" item={episode} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* ── Locations tab ── */}
          {activeTab === "locations" && (
            counts.locations === 0 ? (
              <EmptyTab label="locations preferite" to="/locations" />
            ) : (
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 gap-4">
                {favorites.locations.map((location) => (
                  <div key={location.id} className="pro-card flex flex-col">
                    <div className="px-4 pt-4 pb-3 flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <span
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                          style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}
                        >
                          <GlobalOutlined />
                        </span>
                        <h3 className="text-sm font-semibold leading-snug pt-1 flex-1" style={{ color: "var(--app-text)" }}>
                          {location.name}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span
                          className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start"
                          style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }}
                        >
                          {location.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--app-muted)" }}>
                          <CompassOutlined style={{ fontSize: 11, color: "#a855f7" }} />
                          {location.dimension}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--app-muted)" }}>
                          <TeamOutlined style={{ fontSize: 11, color: "#a855f7" }} />
                          {location.residents?.length ?? 0} residenti
                        </span>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-3 border-t border-(--surface-border) flex gap-2">
                      <Link to={`/locations/${location.id}`} className="flex-1">
                        <button
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[12px] font-semibold text-white hover:opacity-90 transition-opacity"
                          style={{ background: "linear-gradient(135deg,#a855f7,#6366f1)" }}
                        >
                          <EyeOutlined /> Dettagli
                        </button>
                      </Link>
                      <FavoriteButton type="locations" item={location} />
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </>
      )}
    </main>
  );
}

function EmptyTab({ label, to }: { label: string; to: string }) {
  return (
    <div
      className="rounded-2xl p-12 text-center border border-(--surface-border)"
      style={{ background: "var(--surface-bg)" }}
    >
      <div className="text-3xl mb-3 opacity-20">
        <HeartOutlined />
      </div>
      <p className="text-sm mb-4" style={{ color: "var(--app-muted)" }}>
        Nessun {label} ancora.
      </p>
      <Link to={to}>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--green-primary)" }}
        >
          Esplora ora
        </button>
      </Link>
    </div>
  );
}
