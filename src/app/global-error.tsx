"use client";

/**
 * Remplace toute l’arborescence en cas d’erreur à la racine.
 * Doit définir `<html>` et `<body>` (sans layout parent).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          maxWidth: "28rem",
          margin: "0 auto",
          lineHeight: 1.5,
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          Erreur / خطأ / Error
        </h1>
        <p style={{ color: "#555", marginTop: "0.75rem" }}>
          {process.env.NODE_ENV === "development" ? error.message : null}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1.5rem",
            padding: "0.6rem 1.2rem",
            borderRadius: "9999px",
            border: "none",
            background: "#0F1B2D",
            color: "#faf8f5",
            cursor: "pointer",
          }}
        >
          Réessayer / إعادة المحاولة / Retry
        </button>
      </body>
    </html>
  );
}
