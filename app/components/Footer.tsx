import { Link } from "react-router";
import { RocketOutlined, GithubOutlined, HeartFilled } from "@ant-design/icons";

const sections = [
  {
    title: "Esplora",
    links: [
      { label: "Personaggi", to: "/characters" },
      { label: "Episodi",    to: "/episodes" },
      { label: "Locations",  to: "/locations" },
      { label: "Preferiti",  to: "/favorites" },
    ],
  },
  {
    title: "Tecnologie",
    links: [
      { label: "React Router v7", href: "https://reactrouter.com" },
      { label: "Tailwind CSS",    href: "https://tailwindcss.com" },
      { label: "Ant Design",      href: "https://ant.design" },
      { label: "Rick & Morty API",href: "https://rickandmortyapi.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="mt-20 border-t border-(--surface-border)"
      style={{ background: "var(--surface-bg)" }}
    >
      <div className="max-w-350 mx-auto px-6 py-12">
        <div className="grid grid-cols-1 min-[600px]:grid-cols-[1fr_auto_auto] gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="no-underline inline-flex items-center gap-3 mb-4">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                <RocketOutlined />
              </span>
              <span className="font-black text-base" style={{ color: "var(--app-text)" }}>
                Rick &amp; Morty Explorer
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--app-muted)" }}>
              Esplora personaggi, episodi e locations dell&apos;universo di Rick and Morty
              attraverso l&apos;API pubblica della serie.
            </p>
          </div>

          {/* Nav sections */}
          {sections.map((s) => (
            <div key={s.title}>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--app-muted)" }}
              >
                {s.title}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {s.links.map((l) => (
                  <li key={l.label}>
                    {"to" in l ? (
                      <Link
                        to={l.to}
                        className="text-sm no-underline transition-colors hover:underline"
                        style={{ color: "var(--app-muted)" }}
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm no-underline transition-colors hover:underline"
                        style={{ color: "var(--app-muted)" }}
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t border-(--surface-border) flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ color: "var(--app-muted)" }}
        >
          <span>
            Fatto con{" "}
            <HeartFilled style={{ color: "#ef4444", fontSize: 11 }} />{" "}
            usando React &amp; Rick and Morty API
          </span>
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline"
            style={{ color: "var(--app-muted)" }}
          >
            rickandmortyapi.com
          </a>
        </div>
      </div>
    </footer>
  );
}
