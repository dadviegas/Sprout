import { Component, type ErrorInfo, type ReactNode } from "react";

/* Keeps a runtime error from blanking the whole screen — shows a friendly
   message and a reset that clears saved state. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Sprout error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="sprout-root"
          data-palette="sprout"
          style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}
        >
          <div style={{ maxWidth: 420 }}>
            <div style={{ fontSize: "3em" }}>🌱</div>
            <h1 style={{ fontFamily: "var(--font-display)" }}>Ups! Algo correu mal.</h1>
            <p style={{ color: "var(--ink-2)" }}>Vamos recomeçar do início.</p>
            <button
              className="pill"
              onClick={() => {
                try {
                  localStorage.removeItem("sprout.nav.v2");
                } catch {
                  /* ignore */
                }
                location.reload();
              }}
            >
              Recomeçar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
