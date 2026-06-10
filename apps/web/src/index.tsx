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
