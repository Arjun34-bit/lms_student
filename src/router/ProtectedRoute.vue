<script setup>
import { onMounted } from "vue";
import { getItem } from "../utils/localStorageUtils";

onMounted(() => {
  const token = getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
});
</script>

<template>
  <slot />
</template>
