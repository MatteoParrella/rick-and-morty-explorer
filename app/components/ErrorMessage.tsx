import { ExclamationCircleOutlined, ReloadOutlined } from "@ant-design/icons";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-10 text-center border"
      style={{
        background: "rgba(239,68,68,0.04)",
        borderColor: "rgba(239,68,68,0.2)",
      }}
    >
      <span className="text-4xl" style={{ color: "rgba(239,68,68,0.5)" }}>
        <ExclamationCircleOutlined />
      </span>
      <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
          style={{ background: "#ef4444" }}
        >
          <ReloadOutlined />
          Riprova
        </button>
      )}
    </div>
  );
}
