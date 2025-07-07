<template>
  <div
    class="bg-black h-32 w-full rounded-lg shadow-md overflow-hidden relative"
  >
    <video
      class="w-full h-full object-cover"
      autoplay
      playsinline
      muted
      ref="videoRef"
    ></video>

    <audio ref="audioRef" autoplay playsinline></audio>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { getStreamProducer, resumeStream } from "../../helper/streamConsumer";

const props = defineProps({
  videoProducerId: String,
  audioProducerId: String,
  socket: Object,
  classId: String,
  device: Object,
});

console.log(props);

const videoRef = ref(null);
const audioRef = ref(null);
const usedProducerIds = ref(new Set());

async function handleProducerStream(producerId, mediaType) {
  try {
    if (!producerId || usedProducerIds.value.has(producerId)) return;
    const stream = await getStreamProducer(
      props.socket,
      props.device,
      props.classId,
      producerId
    );

    if (stream) {
      usedProducerIds.value.add(producerId);
      if (mediaType === "video" && videoRef.value) {
        videoRef.value.srcObject = stream;
        videoRef.value
          .play()
          .catch((err) => console.warn("Autoplay failed:", err));
      } else if (mediaType === "audio") {
        const audioEl = new Audio();
        audioEl.srcObject = stream;
        audioEl.autoplay = true;
        audioRef.value = audioEl;
      }

      await resumeStream(props.socket, props.classId, producerId);
    }

    // await resumeStream(props.socket, props.classId, producerId);

    return { producerId, stream };
  } catch (error) {
    console.error("Error handling producer", producerId, error);
    return null;
  }
}

const loadedProducers = ref(new Set());

// Watching for new video producer
watch(
  () => props.videoProducerId,
  (id) => {
    if (id && !loadedProducers.value.has(id)) {
      handleProducerStream(id, "video");
    }
  },
  { immediate: true }
);

// Watching for new audio producer
watch(
  () => props.audioProducerId,
  (id) => {
    if (id && !loadedProducers.value.has(id)) {
      handleProducerStream(id, "audio");
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (videoRef.value?.srcObject) {
    videoRef.value.srcObject.getTracks().forEach((t) => t.stop());
  }
  if (audioRef.value?.srcObject) {
    audioRef.value.srcObject.getTracks().forEach((t) => t.stop());
  }
});

// watch(
//   () => props.producerId,
//   async (id) => {
//     if (!id || newProducers.value.has(id)) return;

//     const result = await handleProducers(id);
//     if (result) {
//       newProducers.value.add(id);
//     }
//   },
//   { immediate: true }
// );
</script>
