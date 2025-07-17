<template>
  <div v-if="lecture">
    <h2 class="text-2xl font-bold mb-4">{{ lecture.title }}</h2>
    <!-- <video class="w-full rounded shadow border dark:border-gray-600" controls>
      <source :src="lecture.videoUrl" type="video/mp4" />
      Your browser does not support the video tag.
    </video> -->
    <VideoPlayer :videoUrl="lecture.videoUrl" />
  </div>
  <div v-else>
    <p>Loading lecture...</p>
  </div>
</template>

<script setup>
import VideoPlayer from "../../mediaPlayer/VideoPlayer.vue";

const props = defineProps({
  lecture: Object,
});

console.log("Videos", props?.lecture);
</script>
