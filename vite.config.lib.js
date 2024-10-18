import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// @deprecated, pls use rollup to build library

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'lib2',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, "src/index.js"),
      name: "Vue3InfiniteLoading",
      // the proper extensions will be added
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
    }
  }
})
