// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import vue from "@astrojs/vue";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [vue(), svelte()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    },
  },
});
