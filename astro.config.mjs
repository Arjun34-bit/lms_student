// @ts-check
import { defineConfig } from "astro/config";
import nodeAdapter from "@astrojs/node";

import vue from "@astrojs/vue";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: nodeAdapter({ mode: "standalone" }),
  integrations: [vue(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
