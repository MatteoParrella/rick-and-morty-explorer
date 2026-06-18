import { useCallback, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

export function meta() {
  return [{ title: "Locations | Rick and Morty Explorer" }];
}

import { getLocations } from "../api/rickAndMortyApi";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import LocationCard from "../components/LocationCard";

export default function Locations() {
  const [locations, setLocations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const loadLocations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const filters: Record<string, string> = {};
      if (debouncedSearch.trim()) filters.name = debouncedSearch;
      const data = await getLocations(page, filters);
      setLocations(data.results);
      setTotalPages(data.info.pages);
      setTotalCount(data.info.count);
    } catch {
      setLocations([]);
      setTotalPages(1);
      setTotalCount(0);
      setError("Nessuna location trovata con questa ricerca.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => { loadLocations(); }, [loadLocations]);

  return (
    <main className="max-w-375 mx-auto px-6 py-10">
      <section className="mb-8">
        <h1 className="text-4xl font-black mb-1.5" style={{ color: "var(--app-text)" }}>
          Locations
        </h1>
        <p className="text-base" style={{ color: "var(--app-muted)" }}>
          Esplora pianeti, dimensioni e luoghi dell&apos;universo di Rick and Morty.
        </p>
      </section>

      <section className="flex items-center gap-3 p-4 rounded-2xl border border-(--surface-border) bg-(--surface-bg) mb-4 shadow-(--card-shadow)">
        <div className="relative flex-1">
          <SearchOutlined
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
            style={{ color: "var(--app-muted)" }}
          />
          <input
            type="text"
            placeholder="Cerca location..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-(--surface-border) bg-(--surface-bg-2) outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
            style={{ color: "var(--app-text)" }}
          />
        </div>

        {search && (
          <button
            onClick={() => { setSearch(""); setPage(1); }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 cursor-pointer"
            style={{
              color: "#a855f7",
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            Azzera
          </button>
        )}
      </section>

      {!loading && !error && (
        <p className="text-sm mb-6" style={{ color: "var(--app-muted)" }}>
          <span className="font-bold" style={{ color: "var(--app-text)" }}>{totalCount}</span>{" "}
          location{totalCount === 1 ? "" : "s"} trovate
        </p>
      )}

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={loadLocations} />}

      {!loading && !error && (
        <>
          <section className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1100px]:grid-cols-4 gap-4">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </section>

          <div className="mt-10 flex justify-center">
            <Pagination
              current={page}
              total={totalPages * 20}
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
