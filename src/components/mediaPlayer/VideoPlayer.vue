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
import { ref, onMounted, onBeforeUnmount } from "vue";
import "video.js/dist/video-js.css";
import throttle from "lodash.throttle";

const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
  start: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
});

const videoRef = ref(null);
const player = ref(null);

const emit = defineEmits(["updatePosition"]);

const emitPosition = throttle(() => {
  if (player.value) {
    const time = player.value.currentTime();
    emit("updatePosition", time);
  }
}, 10000);

onMounted(async () => {
  const videojs = (await import("video.js")).default;
  const httpSourceSelector = await import("videojs-http-source-selector");

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

  player.value.ready(() => {
    if (typeof player.value.httpSourceSelector === "function") {
      player.value.httpSourceSelector({ default: "auto" });
    }

    player.value.on("timeupdate", emitPosition);

    player.value.on("pause", () => {
      emit("updatePosition", player.value.currentTime());
    });

    player.value.on("ended", () => {
      emit("updatePosition", player.value.currentTime());
    });
  });
});

onBeforeUnmount(() => {
  if (player.value) {
    if (props.type === "lecture") {
      getCurrentTime();
    }
    player.value.off("timeupdate", emitPosition);
    player.value.dispose();
  }
});
</script>

<style scoped>
.media-player {
  width: 100%;
}

.video-js .vjs-playback-rate {
  display: block !important;
}
</style>
