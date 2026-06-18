import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftOutlined, GlobalOutlined, TeamOutlined, CompassOutlined } from "@ant-design/icons";

import { getLocationById, getMultipleFromUrls } from "../api/rickAndMortyApi";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FavoriteButton from "../components/FavoriteButton";

export function meta({ params }: { params: { id?: string } }) {
  return [{ title: `Location #${params.id ?? ""} | Rick and Morty Explorer` }];
}

export default function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState<any>(null);
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadLocation() {
    try {
      setLoading(true);
      setError("");
      const locationData = await getLocationById(id);
      setLocation(locationData);
      if (locationData.residents.length > 0) {
        const residentsData = await getMultipleFromUrls(locationData.residents);
        setResidents(residentsData);
      } else {
        setResidents([]);
      }
    } catch {
      setError("Errore nel caricamento della location.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadLocation(); }, [id]);

  if (loading) return <Loader />;
  if (error) return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <ErrorMessage message={error} onRetry={loadLocation} />
    </main>
  );
  if (!location) return null;

  const infoCards = [
    { label: "Tipo", value: location.type, icon: <CompassOutlined />, color: "#6366f1" },
    { label: "Dimensione", value: location.dimension, icon: <GlobalOutlined />, color: "#a855f7" },
    { label: "Residenti", value: String(residents.length), icon: <TeamOutlined />, color: "#22c55e" },
  ];

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      {/* Back */}
      <Link
        to="/locations"
        className="inline-flex items-center gap-2 text-sm font-semibold mb-8 no-underline transition-colors"
        style={{ color: "var(--app-muted)" }}
      >
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center border border-(--surface-border) bg-(--surface-bg) hover:bg-(--surface-bg-2) transition-colors"
          style={{ color: "#a855f7" }}
        >
          <ArrowLeftOutlined />
        </span>
        Torna alle locations
      </Link>

      {/* ── Hero ── */}
      <section className="mb-12">
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(99,102,241,0.05), var(--surface-bg))",
            borderColor: "rgba(168,85,247,0.2)",
          }}
        >
          {/* Type badge */}
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{
              background: "rgba(99,102,241,0.1)",
              color: "#6366f1",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            {location.type}
          </span>

          <h1 className="text-4xl font-black mb-8 leading-tight" style={{ color: "var(--app-text)" }}>
            {location.name}
          </h1>

          {/* Info cards */}
          <div className="grid grid-cols-1 min-[500px]:grid-cols-3 gap-4 mb-6">
            {infoCards.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 p-4 rounded-xl border border-(--surface-border) bg-(--surface-bg)/60"
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}18`, color: c.color }}
                >
                  {c.icon}
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: "var(--app-muted)" }}>
                    {c.label}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "var(--app-text)" }}>
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <FavoriteButton type="locations" item={location} />
        </div>
      </section>

      {/* ── Residents ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "var(--app-text)" }}>
            Residenti della location
          </h2>
          {residents.length > 0 && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}
            >
              {residents.length}
            </span>
          )}
        </div>

        {residents.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center border border-(--surface-border)"
            style={{ background: "var(--surface-bg)" }}
          >
            <div className="text-4xl mb-3 opacity-30">
              <GlobalOutlined />
            </div>
            <p className="text-sm" style={{ color: "var(--app-muted)" }}>
              Nessun residente disponibile per questa location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 min-[560px]:grid-cols-3 min-[800px]:grid-cols-4 min-[1100px]:grid-cols-5 gap-4">
            {residents.map((resident) => (
              <CharacterCard key={resident.id} character={resident} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
