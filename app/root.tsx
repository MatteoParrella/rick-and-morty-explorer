import {
  isRouteErrorResponse,
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ConfigProvider, theme as antdTheme } from "antd";

import type { Route } from "./+types/root";
import "antd/dist/reset.css";
import "./app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FavoritesProvider } from "./FavoritesContext";
import { ThemeProvider, useTheme } from "./ThemeContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#16a34a",
          borderRadius: 8,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        },
      }}
    >
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </FavoritesProvider>
    </ConfigProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  const details =
    isRouteErrorResponse(error)
      ? error.statusText
      : error instanceof Error
      ? error.message
      : "Errore sconosciuto";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24 text-center"
      style={{ background: "var(--app-bg)" }}
    >
      {/* Glow orb */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: is404 ? "#22c55e" : "#ef4444" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-md">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black text-white"
          style={{
            background: is404
              ? "linear-gradient(135deg, #22c55e, #16a34a)"
              : "linear-gradient(135deg, #ef4444, #dc2626)",
            boxShadow: is404
              ? "0 20px 40px rgba(34,197,94,0.3)"
              : "0 20px 40px rgba(239,68,68,0.3)",
          }}
        >
          {is404 ? "404" : "!"}
        </div>

        <div>
          <h1
            className="text-3xl font-black mb-2"
            style={{ color: "var(--app-text)" }}
          >
            {is404 ? "Dimensione inesistente" : "Qualcosa è andato storto"}
          </h1>
          <p className="text-base" style={{ color: "var(--app-muted)" }}>
            {is404
              ? "Questa pagina non esiste in nessuna dimensione conosciuta."
              : details}
          </p>
        </div>

        <Link to="/">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: is404
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #ef4444, #dc2626)",
            }}
          >
            Torna alla Home
          </button>
        </Link>
      </div>
    </main>
  );
}
