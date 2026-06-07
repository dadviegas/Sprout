import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@sprout/ui/styles/tokens.css";
import "@sprout/ui/styles/components.css";
import "@sprout/ui/styles/kids.css";
import "@sprout/ui/styles/diversao.css";
import "@sprout/ui/styles/teia.css";
import { App } from "./App";
import { ErrorBoundary } from "./ErrorBoundary";

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
