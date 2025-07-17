<template>
  <div>
    <h2 class="text-lg font-semibold mb-4 text-gray-200">Lectures</h2>

    <div v-if="$loading" class="text-gray-400 italic">
      <CardSkeleton />
    </div>

    <div v-else>
      <ul class="space-y-2">
        <li
          v-for="lesson in lessions"
          :key="lesson.id"
          class="border border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800"
          @:click="toggleTopics()"
        >
          <button
            class="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-800 dark:text-gray-200 focus:outline-none"
            @click="toggleLesson(lesson.id)"
          >
            {{ lesson.lectureName }}
            <svg
              :class="[
                'w-5 h-5 transform transition-transform',
                expandedLessons.has(lesson.id) ? 'rotate-180' : '',
              ]"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <Transition name="accordion">
            <div
              v-if="expandedLessons.has(lesson.id)"
              class="px-4 pb-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
            >
              <ul class="space-y-2 mt-2">
                <li
                  v-for="sub in lesson.Videos || []"
                  :key="sub.id"
                  @click="handleVideo(sub.id)"
                  class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {{ sub.title }}
                </li>
              </ul>
            </div>
          </Transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CardSkeleton from "../../../fallbackUI/Card.vue";
import { isLoading } from "../../../store/loader.js";
import { useStore } from "@nanostores/vue";

const props = defineProps({
  lectures: Object,
  videos: Array,
  selectedLecture: Object,
});

const emit = defineEmits(["select"]);

const $loading = useStore(isLoading);
const expandedLessons = ref(new Set());

const lessions = ref(props?.lectures);
const videos = ref(props?.videos);
console.log(videos);

const toggleLesson = (id) => {
  if (expandedLessons.value.has(id)) {
    expandedLessons.value.delete(id);
  } else {
    expandedLessons.value.add(id);
  }
};

const handleVideo = (id) => {
  console.log("id", id);
  for (const lesson of videos.value) {
    const video = lesson.Videos.find((v) => v.id === id);
    if (video) {
      console.log(video);
      emit("select", video);
      return;
    }
    return null;
  }
};

// onMounted(() => {
//   if (lessions.length !== 0) {
//   }
// });
</script>
