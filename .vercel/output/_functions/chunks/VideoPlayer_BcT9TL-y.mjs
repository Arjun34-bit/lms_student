import { mergeProps, ref, onMounted, onBeforeUnmount, useSSRContext } from 'vue';
/* empty css                              */
import throttle from 'lodash.throttle';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper_pcqpp-6-.mjs';

const _sfc_main = {
  __name: 'VideoPlayer',
  props: {
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
},
  emits: ["updatePosition"],
  setup(__props, { expose: __expose, emit: __emit }) {
  __expose();

const props = __props;

const videoRef = ref(null);
const player = ref(null);

const emit = __emit;

const emitPosition = throttle(() => {
  if (player.value) {
    const time = player.value.currentTime();
    emit("updatePosition", time);
  }
}, 10000);

onMounted(async () => {
  const videojs = (await import('video.js')).default;
  await import('videojs-http-source-selector');

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

const __returned__ = { props, videoRef, player, emit, emitPosition, ref, onMounted, onBeforeUnmount, get throttle() { return throttle } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "media-player" }, _attrs))} data-v-3df84606><video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered rounded-lg shadow-lg w-full" controls preload="auto" data-v-3df84606></video></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/mediaPlayer/VideoPlayer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const VideoPlayer = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-3df84606"]]);

export { VideoPlayer as V };
