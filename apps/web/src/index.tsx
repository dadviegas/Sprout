import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@sprout/ui/styles/tokens.css";
import "@sprout/ui/styles/components.css";
import "@sprout/ui/styles/kids.css";
import "@sprout/ui/styles/diversao.css";
import "@sprout/ui/styles/teia.css";
import { App } from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import { loadTheme } from "./nav";

// Theme lives on <html> (not on a div inside the React tree) so toggling it
// repaints the WHOLE document at once — app, portals, scrollbars. Set before
// the first render to avoid a flash; Root keeps it in sync (see App.tsx).
document.documentElement.dataset.palette = "sprout";
document.documentElement.dataset.theme = loadTheme();

// Offline mode: register the service worker (public/sw.js) in PRODUCTION only
// — caching the dev server would mask live edits behind stale bundles. The
// relative URL resolves against the page, so the same line serves "/" locally
// and "/Sprout/" on GitHub Pages.
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // Offline mode is a bonus, never a blocker (e.g. http:// without TLS).
    });
  });
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
