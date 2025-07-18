<template>
  <div class="mt-6 w-full">
    <div class="flex border-b dark:border-gray-700">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="py-2 px-4 text-sm font-medium border-b-2 transition-all duration-200"
        :class="[
          activeTab === tab
            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
            : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div class="mt-4">
      <div v-if="activeTab === 'Notes'">
        <textarea
          v-model="notes"
          placeholder="Write your notes here..."
          rows="6"
          class="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div v-else-if="activeTab === 'Summary'">
        <p class="text-gray-700 dark:text-gray-300">
          {{ summary ? summary : defaultDescription }}
        </p>
      </div>

      <div v-else-if="activeTab === 'Q&A'">
        <p class="text-gray-500 dark:text-gray-400 italic">Coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  lecture: Object,
  defaultDescription: String,
});

const tabs = ["Notes", "Summary", "Q&A"];
const activeTab = ref("Notes");

const notes = ref("");
const summary = ref(props.lecture?.description);
</script>
