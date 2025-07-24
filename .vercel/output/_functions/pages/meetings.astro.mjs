import { c as createComponent, a as createAstro, m as maybeRenderHead, d as renderComponent, f as renderTemplate } from '../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
/* empty css                                      */
import { mergeProps, ref, watch, onBeforeUnmount, useSSRContext, reactive, onMounted, computed } from 'vue';
import { io } from 'socket.io-client';
import { g as getItem } from '../chunks/localStorageUtils_xJkj8yAm.mjs';
import { Device } from 'mediasoup-client';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';

let existingConsumerTransport = null;

function createConsumeTransport(
  socket,
  device,
  roomId,
  setConsumerTransport
) {
  if (existingConsumerTransport)
    return Promise.resolve(existingConsumerTransport);
  return new Promise((resolve, reject) => {
    socket.emit("createTransport", { roomId, sender: false }, ({ params }) => {
      if (params?.error) return reject(params.error);

      const transport = device.createRecvTransport(params);
      existingConsumerTransport = transport;

      let alreadyConnected = false;

      transport.on("connect", ({ dtlsParameters }, callback, errback) => {
        if (alreadyConnected) {
          console.warn("Transport connect() already called");
          return;
        }
        alreadyConnected = true;
        if (transport._connectionState === "connected") {
          console.warn("Consumer transport already connected");
          return;
        }

        socket.emit(
          "connectConsumerTransport",
          { roomId, dtlsParameters },
          ({ success, error }) => {
            if (error) {
              console.error("Transport connect failed:", error);
              errback(error);
            } else {
              callback();
            }
          }
        );
      });

      transport.on("connectionstatechange", (state) => {
        if (state === "failed" || state === "closed") {
          console.warn("Consumer transport closed or failed.");
          transport.close();
        }
      });

      resolve(transport);
    });
  });
}

function consumeMedia(
  socket,
  device,
  roomId,
  producerId,
  recvTransport,
  setConsumer
) {
  return new Promise((resolve, reject) => {
    socket.emit(
      "consumeMedia",
      {
        roomId,
        rtpCapabilities: device.rtpCapabilities,
        producerId,
      },
      async ({ params }) => {
        if (!params || params.error) {
          const errMsg = params?.error || "Error during media consumption";
          return reject(new Error(errMsg));
        }

        try {
          const consumer = await recvTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          setConsumer(consumer);
          const stream = new MediaStream([consumer.track]);
          resolve({ consumer, stream });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

const setConsumer = (val) => {
};
const setConsumerTransport = (val) => {
};

const getStreamProducer = async (
  socket,
  device,
  classId,
  producerId
) => {
  try {
    const transport = await createConsumeTransport(
      socket,
      device,
      classId,
      setConsumerTransport
    );

    const { consumer, stream } = await consumeMedia(
      socket,
      device,
      classId,
      producerId,
      transport,
      setConsumer
    );

    return stream;
  } catch (error) {
    console.error("Error handling producer", producerId, error);
    return null;
  }
};

const resumeStream = async (socket, classId, producerId) => {
  try {
    socket.emit(
      "resumePausedConsumers",
      { roomId: classId, producerId },
      ({ success }) => {
        console.log(success ? "Consumer resumed" : "Failed to resume consumer");
      }
    );
  } catch (error) {
    console.error("Error consumer resume", producerId, error);
    return null;
  }
};

const _sfc_main$1 = {
  __name: 'Members',
  props: {
  videoProducerId: String,
  audioProducerId: String,
  socket: Object,
  classId: String,
  device: Object,
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

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

const __returned__ = { props, videoRef, audioRef, usedProducerIds, handleProducerStream, loadedProducers, onBeforeUnmount, ref, watch, get getStreamProducer() { return getStreamProducer }, get resumeStream() { return resumeStream } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-black h-32 w-full rounded-lg shadow-md overflow-hidden relative" }, _attrs))}><video class="w-full h-full object-cover" autoplay playsinline muted></video><audio autoplay playsinline></audio></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/classes/Members.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Members = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  __name: "LiveMeeting",
  setup(__props, { expose: __expose }) {
    __expose();
    const fallLoading = ref(true);
    const stream = ref(null);
    const myVideo = ref(null);
    const screenRef = ref(null);
    const cameraEnabled = ref(false);
    const micEnabled = ref(false);
    const socket = ref(null);
    const viewerCount = ref(0);
    const producers = reactive({
      camera: null,
      audio: null
    });
    const initialized = ref(false);
    let rtpCapabilities = null;
    const rtpCapabilities1 = ref(null);
    const newDevice = ref(null);
    let producerTransport = null;
    const remoteProducers = ref([]);
    const classId = getItem("meetingId");
    const userName = getItem("userName");
    onMounted(() => {
      if (!classId || !userName) {
        alert("Missing meeting ID or username. Please go back and join properly.");
        return;
      }
      console.log("Initializing Socket.IO connection");
      console.log(undefined                                           );
      socket.value = io(undefined                                           );
      console.log("Socket.IO instance created:", socket.value);
      const handleUserCount = ({ roomId, userCount }) => {
        console.log("User count updated:", userCount);
        viewerCount.value = userCount;
      };
      socket.value.on("room-user-count", handleUserCount);
      socket.value.on("connection-success", (data) => {
        console.log("Received connection-success:", data);
        socket.value.emit(
          "join-room",
          { roomId: classId, userName, role: "student" },
          (data2) => {
            if (data2?.error) {
              console.error("Join room error:", data2.message);
              alert(data2.message);
              return;
            }
            console.log("Join room response:", data2);
            if (data2?.rtpCapabilities) {
              rtpCapabilities = data2.rtpCapabilities;
            } else {
              console.error("Failed to get RTP Capabilities");
            }
          }
        );
        socket.value.on("user-joined", ({ message, userName: userName2 }) => {
          console.log(message);
          console.log(`${userName2} joined`);
        });
      });
    });
    const getRouterRtpCapabilities = async () => {
      console.log("Emitting getRouterRtpCapabilities");
      const data = await new Promise((resolve) => {
        socket.value.emit(
          "getRouterRtpCapabilities",
          { roomId: classId.value },
          (response) => {
            resolve(response);
          }
        );
      });
      console.log("Received routerRtpCapabilities:", data);
      rtpCapabilities = data.routerRtpCapabilities;
      return data?.routerRtpCapabilities;
    };
    const createDevice = async (rtpCapabilities2) => {
      if (!rtpCapabilities2) {
        console.log("Cannot create device: rtpCapabilities is null");
        alert("Please get Router RTP Capabilities first!");
        return;
      }
      try {
        console.log(
          "Creating mediasoup Device with rtpCapabilities:",
          rtpCapabilities2
        );
        const device = new Device();
        await device.load({ routerRtpCapabilities: rtpCapabilities2 });
        console.log("Device loaded successfully:", device);
        newDevice.value = device;
        return device;
      } catch (error) {
        console.error("Error creating device:", error);
        if (error.name === "UnsupportedError") {
          console.error("Browser not supported");
        }
        alert("Failed to create device");
      }
    };
    const createSendTransport = async (device) => {
      if (!device) {
        console.warn("Device not initialized. Cannot create transport.");
        alert("Please create a Device first!");
        return;
      }
      try {
        console.log("Requesting send transport creation...");
        socket.value.emit(
          "createTransport",
          { roomId: classId, sender: true },
          ({ params, error }) => {
            if (error || !params) {
              console.error("Transport creation failed:", error);
              alert("Failed to create send transport.");
              return;
            }
            const transport = device.createSendTransport(params);
            console.log("Send transport created:", transport);
            fallLoading.value = false;
            producerTransport = transport;
            transport.on(
              "connect",
              async ({ dtlsParameters }, callback, errback) => {
                try {
                  socket.value.emit("connectProducerTransport", {
                    roomId: classId,
                    dtlsParameters
                  });
                  console.log("connectProducerTransport sent");
                  callback();
                } catch (err) {
                  console.error("connectProducerTransport failed:", err);
                  errback(err);
                }
              }
            );
            transport.on(
              "produce",
              async ({ kind, rtpParameters, appData }, callback, errback) => {
                try {
                  socket.value.emit(
                    "transport-produce",
                    {
                      roomId: classId,
                      kind,
                      rtpParameters,
                      label: appData?.label || ""
                    },
                    ({ id, error: error2 }) => {
                      if (error2) {
                        console.error("Produce error:", error2);
                        errback(error2);
                        return;
                      }
                      console.log("Producer created with ID:", id);
                      callback({ id });
                    }
                  );
                } catch (err) {
                  console.error("Error in transport-produce:", err);
                  errback(err);
                }
              }
            );
          }
        );
      } catch (err) {
        console.error("createSendTransport error:", err);
        alert("Unexpected error while creating send transport.");
      }
    };
    const connectSendTransport = async (type, mediaStream) => {
      if (!producerTransport) {
        alert("Please create a Send Transport first!");
        return;
      }
      try {
        if (type === "camera" && mediaStream && !producers.camera) {
          const videoProducer = await producerTransport.produce({
            track: mediaStream,
            encodings: [
              { rid: "r0", maxBitrate: 1e5, scalabilityMode: "S1T3" },
              { rid: "r1", maxBitrate: 3e5, scalabilityMode: "S1T3" },
              { rid: "r2", maxBitrate: 9e5, scalabilityMode: "S1T3" }
            ],
            codecOptions: { videoGoogleStartBitrate: 1e3 },
            appData: { label: "camera" }
          });
          producers.camera = videoProducer;
          console.log("Created camera video producer:", videoProducer);
          videoProducer.on("trackended", () => {
            console.log("Camera video track ended");
            stopCamera();
          });
          videoProducer.on(
            "transportclose",
            () => console.log("Camera video transport closed")
          );
        }
        if (type === "audio" && mediaStream && !producers.audio) {
          const audioProducer = await producerTransport.produce({
            track: mediaStream,
            appData: { label: "audio" }
          });
          producers.audio = audioProducer;
          console.log("Created audio producer:", audioProducer);
          audioProducer.on("trackended", () => {
            console.log("Audio track ended");
            stopAudio();
          });
          audioProducer.on(
            "transportclose",
            () => console.log("Audio transport closed")
          );
        }
      } catch (error) {
        console.error("Error producing media:", error);
        alert("Failed to produce media: " + error.message);
      }
    };
    const startMedia = async ({ video = false, audio = false } = {}) => {
      try {
        stream.value = await navigator.mediaDevices.getUserMedia({ video, audio });
        if (myVideo.value && video) {
          myVideo.value.srcObject = stream.value;
          await myVideo.value.play();
        }
        if (video) {
          const videoTrack = stream.value.getVideoTracks()[0];
          if (videoTrack) {
            cameraEnabled.value = true;
            await connectSendTransport("camera", videoTrack);
          }
        }
        if (audio) {
          const audioTrack = stream.value.getAudioTracks()[0];
          if (audioTrack) {
            micEnabled.value = true;
            await connectSendTransport("audio", audioTrack);
          }
        }
      } catch (err) {
        console.error("Error producing media:", err);
        alert("Could not access camera/microphone.");
      }
    };
    const toggleCamera = async () => {
      if (!stream.value) {
        await startMedia({ video: true, audio: false });
        return;
      }
      const videoTrack = stream.value.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      cameraEnabled.value = videoTrack.enabled;
    };
    const toggleMic = async () => {
      if (!stream.value) {
        await startMedia({ video: false, audio: true });
        return;
      }
      const audioTrack = stream.value.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      micEnabled.value = audioTrack.enabled;
    };
    const endCall = () => {
      console.log("end call");
      if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
        stream.value = null;
        cameraEnabled.value = false;
        micEnabled.value = false;
      }
      socket.value.emit("leave-room", {
        roomId: classId,
        userName: "student"
      });
      setTimeout(() => {
        window.location.href("/live-classes?page=classes");
      });
    };
    const startLiveClass = async () => {
      try {
        rtpCapabilities1.value = await getRouterRtpCapabilities();
        console.log(rtpCapabilities1.value);
        const dev = await createDevice(rtpCapabilities);
        await createSendTransport(dev);
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    onMounted(() => {
      if (socket.value && !initialized.value) {
        initialized.value = true;
        startLiveClass();
      }
    });
    watch(rtpCapabilities, (newSocket) => {
      if (newSocket && !initialized.value) {
        initialized.value = true;
        startLiveClass();
      }
    });
    const handleNewProducer = async (data) => {
      console.log("New producer available", data);
      remoteProducers.value.some(
        (p) => p.producerId === data.producerId
      );
      if (data?.label === "screen") {
        const stream2 = await getStreamProducer(
          socket.value,
          newDevice.value,
          classId,
          data.producerId
        );
        if (screenRef.value && stream2) {
          screenRef.value.srcObject = stream2;
          screenRef.value.play().catch((err) => console.warn("Autoplay failed:", err));
        }
        await resumeStream(socket.value, classId, data.producerId);
        return;
      }
      const existingIndex = remoteProducers.value.findIndex(
        (p) => p.peerId === data?.peerId
      );
      if (existingIndex !== -1) {
        const existing = remoteProducers.value[existingIndex];
        if (data?.label === "audio") {
          existing.audioProducerId = data?.producerId;
        } else if (data?.label === "camera") {
          existing.videoProducerId = data?.producerId;
        }
        remoteProducers.value[existingIndex] = { ...existing };
      } else {
        remoteProducers.value.push({
          peerId: data.peerId,
          roomId: data.roomId,
          videoProducerId: data?.label === "camera" ? data.producerId : void 0,
          audioProducerId: data?.label === "audio" ? data.producerId : void 0,
          socket: socket.value,
          device: newDevice.value
        });
      }
      console.log("Updated remote producers:", remoteProducers.value);
    };
    onMounted(() => {
      if (!socket.value) return;
      socket.value.on("new-producer", handleNewProducer);
    });
    onBeforeUnmount(() => {
      if (!socket.value) return;
      socket.value.off("new-producer", handleNewProducer);
    });
    onMounted(() => {
      socket.value.on("user-left", handleUserLeft);
    });
    onBeforeUnmount(() => {
      socket.value.off("user-left", handleUserLeft);
    });
    const handleUserLeft = ({ producerIds, userName: userName2 }) => {
      console.log(`${userName2} left the room. Removing producers...`, producerIds);
      remoteProducers.value = remoteProducers.value.filter(
        (p) => !producerIds.includes(p.producerId)
      );
    };
    const __returned__ = { fallLoading, stream, myVideo, screenRef, cameraEnabled, micEnabled, socket, viewerCount, producers, initialized, get rtpCapabilities() {
      return rtpCapabilities;
    }, set rtpCapabilities(v) {
      rtpCapabilities = v;
    }, rtpCapabilities1, newDevice, get producerTransport() {
      return producerTransport;
    }, set producerTransport(v) {
      producerTransport = v;
    }, remoteProducers, classId, userName, getRouterRtpCapabilities, createDevice, createSendTransport, connectSendTransport, startMedia, toggleCamera, toggleMic, endCall, startLiveClass, handleNewProducer, handleUserLeft, ref, onMounted, watch, onBeforeUnmount, get io() {
      return io;
    }, get getItem() {
      return getItem;
    }, reactive, get Device() {
      return Device;
    }, Members, computed, get getStreamProducer() {
      return getStreamProducer;
    }, get resumeStream() {
      return resumeStream;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.fallLoading) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 gap-3" }, _attrs))} data-v-60b9bc46><i class="pi pi-spin pi-cog" style="${ssrRenderStyle({ "font-size": "4rem", "color": "white" })}" data-v-60b9bc46></i><span class="text-white text-lg" data-v-60b9bc46>Letting You In....</span></div>`);
  } else {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-between items-center p-5" }, _attrs))} data-v-60b9bc46><div class="p-4 w-full flex flex-col items-center gap-6" data-v-60b9bc46><div class="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg" data-v-60b9bc46><video class="w-full h-full object-cover" autoplay muted playsinline data-v-60b9bc46></video><video class="absolute bottom-4 right-4 w-40 h-28 rounded-lg object-cover border-2 border-white shadow-md" autoplay muted playsinline data-v-60b9bc46></video><div class="absolute top-4 left-4 text-white bg-black p-2 rounded-lg shadow-md" data-v-60b9bc46> Count: ${ssrInterpolate($setup.viewerCount)}</div></div><div class="flex gap-4" data-v-60b9bc46><button class="${ssrRenderClass([$setup.cameraEnabled ? "bg-green-600" : "bg-gray-700", "text-white px-4 py-2 rounded hover:bg-green-700 transition"])}" data-v-60b9bc46>${ssrInterpolate($setup.cameraEnabled ? "Camera On" : "Camera Off")}</button><button class="${ssrRenderClass([$setup.micEnabled ? "bg-green-600" : "bg-gray-700", "text-white px-4 py-2 rounded hover:bg-green-700 transition"])}" data-v-60b9bc46>${ssrInterpolate($setup.micEnabled ? "Mic On" : "Mic Off")}</button><button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition" data-v-60b9bc46> End Call </button></div></div><div class="w-1/3" data-v-60b9bc46><div class="grid grid-cols-1 sm:grid-cols-2 gap-3" data-v-60b9bc46><!--[-->`);
    ssrRenderList($setup.remoteProducers, (producer, index) => {
      _push(ssrRenderComponent($setup["Members"], {
        key: producer.videoProducerId || index,
        videoProducerId: producer.videoProducerId,
        audioProducerId: producer.audioProducerId,
        socket: $setup.socket,
        device: $setup.newDevice,
        classId: producer.roomId
      }, null, _parent));
    });
    _push(`<!--]--></div></div></div>`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/classes/LiveMeeting.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LiveMeeting = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-60b9bc46"]]);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { id } = Astro2.params;
  return renderTemplate`${maybeRenderHead()}<main> ${renderComponent($$result, "LiveMeeting", LiveMeeting, { "client:load": true, "meetingId": id, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/classes/LiveMeeting.vue", "client:component-export": "default" })} </main>`;
}, "C:/Users/USER/lms_student/src/pages/meetings/index.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/meetings/index.astro";
const $$url = "/meetings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
