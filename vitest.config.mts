/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    onConsoleLog(log) {
      // Silence errors caught by React error boundaries
      // (Workaround for https://github.com/facebook/react/issues/15069 )
      if (
        log.includes(
          "React will try to recreate this component tree from scratch using the error boundary you provided",
        )
      )
        return false;
      if (log.includes("handled: ")) return false;
      if (log.includes("ignore-console")) return false;
    },
  },
});
