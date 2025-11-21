import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@store": path.resolve(__dirname, "src/store"),
      "@component": path.resolve(__dirname, "src/component"),
      "@component-UI": path.resolve(__dirname, "src/component/UI"),
      "@types": path.resolve(__dirname, "src/types.d.ts"),
    },
  },
});
