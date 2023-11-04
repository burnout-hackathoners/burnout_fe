import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        widgets: "index.html",
      },
      output: {
        format: "iife",
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === "main" ? "main.js" : "[name].[hash].js",
      },
    },
  },
});
