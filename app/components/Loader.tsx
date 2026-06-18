export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      <div className="portal-loader">
        <div className="portal-ring portal-ring-1" />
        <div className="portal-ring portal-ring-2" />
        <div className="portal-ring portal-ring-3" />
        <div className="portal-core" />
      </div>
      <p
        className="text-sm font-medium animate-pulse"
        style={{ color: "var(--app-muted)" }}
      >
        Caricamento dal multiverso…
      </p>
    </div>
  );
}
