// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Ensures correct path resolution for assets when deployed
  build: {
    outDir: "dist", // Output directory for build
  },
});
