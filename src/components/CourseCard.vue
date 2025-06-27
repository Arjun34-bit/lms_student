<template>
  <div class="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col">
    <!-- Image Section -->
    <img
      :src="course.image || 'https://codemithra.com/wp-content/uploads/2024/07/What-is-a-Full-Stack-Developer-jpg.webp'"
      alt="Course Image"
      class="h-48 w-full object-cover"
    />

    <!-- Bottom Info Box -->
    <div class="p-4 flex flex-col justify-between flex-grow bg-gray-50">
      <!-- Title -->
      <h3 class="text-lg font-bold text-blue-700 mb-2">{{ course.title }}</h3>

      <!-- Details -->
      <p class="text-sm text-gray-600 mb-1 line-clamp-2">{{ course.description }}</p>
      <div class="flex justify-start items-center gap-5 mb-4 mt-2">
        <span class="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded">
          <strong>Instructor:</strong> {{ course.instructor }}
        </span>
        <span class="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded">
          <strong>Price:</strong> ${{ course.price }}
        </span>
      </div>

      

      <!-- Enroll Button -->
      <button
        @click="enroll"
        class="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full text-sm"
      >
        Enroll Now
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(["course"]);

const enroll = () => {
  alert(`You have enrolled in ${course.title}!`);
};
</script>

<style scoped>
/* Optionally limit description lines using tailwind line-clamp plugin */
</style>
