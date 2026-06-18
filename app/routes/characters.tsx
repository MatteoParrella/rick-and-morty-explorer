import { useCallback, useEffect, useState } from "react";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Pagination, Select } from "antd";

import { getCharacters } from "../api/rickAndMortyApi";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export function meta() {
  return [{ title: "Personaggi | Rick and Morty Explorer" }];
}

export default function Characters() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const loadCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const filters: Record<string, string> = {};
      if (debouncedSearch) filters.name = debouncedSearch;
      if (status) filters.status = status;
      if (gender) filters.gender = gender;
      const data = await getCharacters(page, filters);
      setCharacters(data.results);
      setTotalCharacters(data.info.count);
    } catch {
      setCharacters([]);
      setTotalCharacters(0);
      setError("Nessun personaggio trovato con questi filtri.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, gender, page]);

  useEffect(() => { loadCharacters(); }, [loadCharacters]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  const hasFilters = search || status || gender;

  return (
    <main className="max-w-350 mx-auto px-6 py-10">
      {/* ── Header ── */}
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-1.5" style={{ color: "var(--app-text)" }}>
          Personaggi
        </h1>
        <p className="text-base" style={{ color: "var(--app-muted)" }}>
          Cerca, filtra e visualizza i personaggi dell&apos;universo di Rick and Morty.
        </p>
      </section>

      {/* ── Filters ── */}
      <section className="flex flex-wrap items-center gap-3 p-4 rounded-2xl border border-(--surface-border) bg-(--surface-bg) mb-4 shadow-(--card-shadow)">
        <FilterOutlined style={{ color: "var(--app-muted)", fontSize: 16 }} />

        <div className="relative flex-1 min-w-52">
          <SearchOutlined
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
            style={{ color: "var(--app-muted)" }}
          />
          <input
            type="text"
            placeholder="Cerca personaggio..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-(--surface-border) bg-(--surface-bg-2) outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all"
            style={{ color: "var(--app-text)" }}
          />
        </div>

        <Select
          placeholder="Status"
          value={status || undefined}
          onChange={(v) => { setStatus(v ?? ""); setPage(1); }}
          allowClear
          style={{ width: 140 }}
          options={[
            { value: "alive", label: "Vivo" },
            { value: "dead", label: "Morto" },
            { value: "unknown", label: "Sconosciuto" },
          ]}
        />

        <Select
          placeholder="Genere"
          value={gender || undefined}
          onChange={(v) => { setGender(v ?? ""); setPage(1); }}
          allowClear
          style={{ width: 140 }}
          options={[
            { value: "female", label: "Femmina" },
            { value: "male", label: "Maschio" },
            { value: "genderless", label: "Senza genere" },
            { value: "unknown", label: "Sconosciuto" },
          ]}
        />

        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setStatus(""); setGender(""); setPage(1); }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            style={{
              color: "var(--green-primary)",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            Azzera filtri
          </button>
        )}
      </section>

      {/* Result count */}
      {!loading && !error && (
        <p className="text-sm mb-6" style={{ color: "var(--app-muted)" }}>
          <span className="font-bold" style={{ color: "var(--app-text)" }}>{totalCharacters}</span>{" "}
          personagg{totalCharacters === 1 ? "io" : "i"} trovati
        </p>
      )}

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={loadCharacters} />}

      {!loading && !error && (
        <>
          <section className="grid grid-cols-2 min-[560px]:grid-cols-3 min-[800px]:grid-cols-4 min-[1100px]:grid-cols-5 gap-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </section>

          <div className="mt-10 flex justify-center">
            <Pagination
              current={page}
              total={totalCharacters}
              pageSize={20}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </main>
  );
}
