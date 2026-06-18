import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  StarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { getCharacters, getEpisodes, getLocations } from "../api/rickAndMortyApi";

export function meta() {
  return [
    { title: "Rick and Morty Explorer" },
    { name: "description", content: "Web app React per esplorare Rick and Morty API" },
  ];
}

type ApiCounts = { characters: number; episodes: number; locations: number };

export default function Home() {
  const [counts, setCounts] = useState<ApiCounts | null>(null);

  useEffect(() => {
    Promise.all([getCharacters(1), getEpisodes(1), getLocations(1)])
      .then(([chars, eps, locs]) => {
        setCounts({
          characters: chars.info.count,
          episodes: eps.info.count,
          locations: locs.info.count,
        });
      })
      .catch(() => {});
  }, []);

  const fmt = (n: number) => n.toLocaleString("it-IT");
  const placeholder = "—";

  const stats = [
    { value: counts ? fmt(counts.characters) : placeholder, label: "Personaggi", icon: <UserOutlined /> },
    { value: counts ? fmt(counts.episodes)   : placeholder, label: "Episodi",    icon: <VideoCameraOutlined /> },
    { value: counts ? fmt(counts.locations)  : placeholder, label: "Locations",  icon: <EnvironmentOutlined /> },
    { value: "7",                                           label: "Stagioni",   icon: <StarOutlined /> },
  ];

  const features = [
    {
      icon: <UserOutlined />,
      title: "Personaggi",
      desc: "Cerca e filtra i personaggi per nome, status e genere. Ogni scheda include episodi collegati.",
      to: "/characters",
      color: "from-green-500 to-emerald-600",
      glow: "rgba(34,197,94,0.2)",
      badge: counts ? fmt(counts.characters) : placeholder,
    },
    {
      icon: <VideoCameraOutlined />,
      title: "Episodi",
      desc: "Esplora tutti gli episodi delle 7 stagioni, filtra per stagione e scopri i personaggi di ogni puntata.",
      to: "/episodes",
      color: "from-blue-500 to-cyan-600",
      glow: "rgba(59,130,246,0.2)",
      badge: counts ? fmt(counts.episodes) : placeholder,
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Locations",
      desc: "Pianeti, dimensioni e luoghi del multiverso. Esplora ogni location con i residenti collegati.",
      to: "/locations",
      color: "from-purple-500 to-violet-600",
      glow: "rgba(168,85,247,0.2)",
      badge: counts ? fmt(counts.locations) : placeholder,
    },
    {
      icon: <HeartOutlined />,
      title: "Preferiti",
      desc: "Salva personaggi, episodi e locations preferite. Dati memorizzati nel browser in LocalStorage.",
      to: "/favorites",
      color: "from-rose-500 to-pink-600",
      glow: "rgba(244,63,94,0.2)",
      badge: "∞",
    },
  ];

  return (
    <main className="max-w-350 mx-auto px-6 py-10">
      {/* ── Hero ── */}
      <section
        className="relative rounded-3xl overflow-hidden mb-14 px-8 py-20 text-center"
        style={{ background: "var(--hero-gradient)" }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow orbs */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #22c55e, transparent 70%)" }}
        />
        <div
          className="absolute top-10 right-20 w-48 h-48 rounded-full opacity-5 blur-2xl pointer-events-none"
          style={{ background: "#3b82f6" }}
        />

        <div className="relative z-10">
          {/* Logo orb */}
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl text-white shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 20px 60px rgba(34,197,94,0.4)",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <RocketOutlined />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <ThunderboltOutlined />
            Powered by Rick and Morty API
          </div>

          <h1 className="text-5xl min-[800px]:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            Rick &amp; Morty
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(90deg, #4ade80, #22c55e, #86efac)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Explorer
            </span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Esplora l&apos;intero universo di Rick and Morty: personaggi, episodi e dimensioni
            attraverso l&apos;API ufficiale. Costruito con React, React Router, Tailwind CSS e Ant Design.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/characters">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  boxShadow: "0 8px 24px rgba(34,197,94,0.35)",
                }}
              >
                <UserOutlined />
                Esplora personaggi
                <ArrowRightOutlined className="text-xs" />
              </button>
            </Link>

            <Link to="/episodes">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white/90 text-sm bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5">
                <VideoCameraOutlined />
                Vedi episodi
              </button>
            </Link>

            <Link to="/locations">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white/90 text-sm bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5">
                <EnvironmentOutlined />
                Locations
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="grid grid-cols-2 min-[600px]:grid-cols-4 gap-4 mb-14">
        {stats.map((stat) => (
          <div key={stat.label} className="pro-card text-center px-4 py-6">
            <div className="text-2xl mb-2" style={{ color: "var(--green-primary)" }}>
              {stat.icon}
            </div>
            <div
              className="text-3xl font-black transition-all duration-300"
              style={{ color: counts ? "var(--app-text)" : "var(--app-muted)" }}
            >
              {stat.value}
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--app-muted)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── Feature Cards ── */}
      <section>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--app-text)" }}>
          Cosa puoi esplorare
        </h2>
        <p className="text-base mb-8" style={{ color: "var(--app-muted)" }}>
          Naviga attraverso le sezioni dell&apos;universo di Rick and Morty
        </p>

        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[900px]:grid-cols-4 gap-5">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="no-underline group">
              <div
                className="pro-card h-full p-6 flex flex-col gap-4"
                style={{ "--glow": f.glow } as React.CSSProperties}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${f.color} text-white text-xl flex items-center justify-center shadow-lg`}
                  >
                    {f.icon}
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full bg-linear-to-r ${f.color} text-white opacity-90`}
                  >
                    {f.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: "var(--app-text)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--app-muted)" }}>
                    {f.desc}
                  </p>
                </div>

                <div
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: "var(--green-primary)" }}
                >
                  Esplora
                  <ArrowRightOutlined className="text-xs" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-16" />
    </main>
  );
}
