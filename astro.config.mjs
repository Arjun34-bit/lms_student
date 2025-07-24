// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import vue from "@astrojs/vue";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   adapter: nodeAdapter({ mode: "standalone" }),
//   integrations: [vue(), svelte()],
//   vite: {
//     plugins: [tailwindcss()],
//   },
// });

export default defineConfig({
  output: "server",
  adapter: vercel({}),
  integrations: [vue(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
