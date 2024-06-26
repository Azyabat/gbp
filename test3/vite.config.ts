import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["effector/babel-plugin", { addLoc: true }]],
        // Use .babelrc files
        babelrc: true,
      },
    }),
  ],
});
