<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Lectures</h2>
    <ul class="space-y-2">
      <li
        v-for="lecture in lectures"
        :key="lecture.id"
        @click="$emit('select', lecture)"
        :class="[
          'p-2 rounded cursor-pointer',
          selectedLecture?.id === lecture.id
            ? 'bg-blue-600 text-white'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200',
        ]"
      >
        {{ lecture.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  lectures: Array,
  selectedLecture: Object,
});
</script>
