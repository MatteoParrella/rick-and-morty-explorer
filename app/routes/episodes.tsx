import { useEffect, useState } from "react";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Select, Pagination } from "antd";

export function meta() {
  return [{ title: "Episodi | Rick and Morty Explorer" }];
}

import { getAllEpisodes } from "../api/rickAndMortyApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EpisodeCard from "../components/EpisodeCard";

export default function Episodes() {
  const [allEpisodes, setAllEpisodes] = useState<any[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadEpisodes() {
    try {
      setLoading(true);
      setError("");
      const data = await getAllEpisodes();
      setAllEpisodes(data);
      setFilteredEpisodes(data);
    } catch {
      setError("Errore nel caricamento degli episodi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadEpisodes(); }, []);

  useEffect(() => {
    let results = [...allEpisodes];
    if (search.trim()) {
      results = results.filter((ep) =>
        ep.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (season) {
      results = results.filter((ep) => ep.episode.startsWith(season));
    }
    setFilteredEpisodes(results);
    setPage(1);
  }, [search, season, allEpisodes]);

  const startIndex = (page - 1) * pageSize;
  const visibleEpisodes = filteredEpisodes.slice(startIndex, startIndex + pageSize);
  const hasFilters = search || season;

  return (
    <main className="max-w-375 mx-auto px-6 py-10">
      {/* ── Header ── */}
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-1.5" style={{ color: "var(--app-text)" }}>
          Episodi
        </h1>
        <p className="text-base" style={{ color: "var(--app-muted)" }}>
          Esplora tutti gli episodi e scopri i personaggi di ogni puntata.
        </p>
      </section>

      {/* ── Filters ── */}
      <section
        className="flex flex-wrap items-center gap-3 p-4 rounded-2xl border border-(--surface-border) bg-(--surface-bg) mb-4 shadow-(--card-shadow)"
      >
        <FilterOutlined style={{ color: "var(--app-muted)", fontSize: 16 }} />

        <div className="relative flex-1 min-w-52">
          <SearchOutlined
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
            style={{ color: "var(--app-muted)" }}
          />
          <input
            type="text"
            placeholder="Cerca episodio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-(--surface-border) bg-(--surface-bg-2) outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            style={{ color: "var(--app-text)" }}
          />
        </div>

        <Select
          placeholder="Stagione"
          value={season || undefined}
          onChange={(v) => setSeason(v ?? "")}
          allowClear
          style={{ width: 150 }}
          options={[
            { value: "S01", label: "Season 1" },
            { value: "S02", label: "Season 2" },
            { value: "S03", label: "Season 3" },
            { value: "S04", label: "Season 4" },
            { value: "S05", label: "Season 5" },
            { value: "S06", label: "Season 6" },
            { value: "S07", label: "Season 7" },
          ]}
        />

        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setSeason(""); }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            style={{
              color: "#3b82f6",
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            Azzera
          </button>
        )}
      </section>

      {/* Result count */}
      {!loading && !error && (
        <p className="text-sm mb-6" style={{ color: "var(--app-muted)" }}>
          <span className="font-bold" style={{ color: "var(--app-text)" }}>{filteredEpisodes.length}</span>{" "}
          episod{filteredEpisodes.length === 1 ? "io" : "i"} trovati
        </p>
      )}

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={loadEpisodes} />}

      {!loading && !error && visibleEpisodes.length === 0 && (
        <div
          className="rounded-2xl p-12 text-center border border-(--surface-border)"
          style={{ background: "var(--surface-bg)" }}
        >
          <p className="text-sm" style={{ color: "var(--app-muted)" }}>
            Nessun episodio trovato con questi filtri.
          </p>
        </div>
      )}

      {!loading && !error && visibleEpisodes.length > 0 && (
        <>
          <section className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1100px]:grid-cols-4 gap-4">
            {visibleEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </section>

          <div className="mt-10 flex justify-center">
            <Pagination
              current={page}
              total={filteredEpisodes.length}
              pageSize={pageSize}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </main>
  );
}
