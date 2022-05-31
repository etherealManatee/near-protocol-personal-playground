import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import * as path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  define: {
    global: {},
  },
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
