<template>
  <div v-if="lecture">
    <h2 class="text-2xl font-bold mb-4">
      {{ lecture.title || props?.defaultData?.title }}
    </h2>
    <div v-if="videoUrl">
      <VideoPlayer
        :videoUrl="videoUrl"
        type="lecture"
        @updatePosition="handleVideoPosition"
      />
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <span
      ><i class="pi pi-spin pi-spinner" style="font-size: 4rem; color: blue"></i
    ></span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import VideoPlayer from "../../mediaPlayer/VideoPlayer.vue";

import { useStore } from "@nanostores/vue";
import { timeStamp, updateKey } from "../../../store/courseStore";

const $timeStamp = useStore(timeStamp);

const props = defineProps({
  lecture: Object,
  defaultData: Object,
});

const videoUrl = computed(() => {
  return props.lecture?.videoUrl
    ? props.lecture.videoUrl
    : props?.defaultData?.videoUrl;
});

console.log($timeStamp.value);

const handleVideoPosition = (pos) => {
  updateKey("videoId", props?.lecture.value?.id);
  updateKey("pos", pos);
};
</script>
