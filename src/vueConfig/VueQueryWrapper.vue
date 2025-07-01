<!-- src/components/QueryClientWrapper.vue
<template>
  <QueryClientProvider :client="client">
    <slot />
  </QueryClientProvider>
</template>

<script setup>
import {
  QueryClient,
  QueryClientProvider,
  VUE_QUERY_CLIENT,
} from "@tanstack/vue-query";

import { provide } from "vue";

const client = new QueryClient();

// Provide manually (required in Astro)
provide(VUE_QUERY_CLIENT, client);
</script> -->
