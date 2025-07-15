<template>
  <div class="media-player">
    <video
      id="video-player"
      ref="videoRef"
      class="video-js vjs-default-skin vjs-big-play-centered rounded-lg shadow-lg w-full"
      controls
      preload="auto"
    ></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

// Props
const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
  start: {
    type: Boolean,
    default: false,
  },
});

const videoRef = ref(null);
const player = ref(null);

const previewImg =
  "https://media.istockphoto.com/id/1459068091/vector/red-color-round-seal-sticker-in-word-preview-on-white-background.jpg";

onMounted(() => {
  player.value = videojs(videoRef.value, {
    controls: true,
    autoplay: false,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: props.videoUrl,
        type: "video/mp4",
      },
    ],
    playbackRates: [0.5, 1, 1.5, 2],
  });

  // if (props.start) {
  //   player.value.play()
  // }
  player.value.ready(() => {
    if (typeof player.value.httpSourceSelector === "function") {
      player.value.httpSourceSelector({
        default: "auto",
      });
    }
  });
});

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose();
  }
});

// Optional: react to prop changes
watch(
  () => props.videoUrl,
  (newUrl) => {
    if (player.value) {
      player.value.src({ src: newUrl, type: "video/mp4" });
    }
  }
);
</script>

<style scoped>
.media-player {
  width: 100%;
}

.video-js .vjs-playback-rate {
  display: block !important;
}
</style>
