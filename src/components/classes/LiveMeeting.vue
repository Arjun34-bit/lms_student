<template>
  <div class="p-4 w-full flex flex-col items-center gap-6">
    <!-- Video Call Container -->
    <div
      class="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg"
    >
      <!-- Teacher's Stream Placeholder -->
      <video
        class="w-full h-full object-cover"
        autoplay
        muted
        playsinline
      ></video>

      <!-- Your Camera Stream (small PiP style) -->
      <video
        ref="myVideo"
        class="absolute bottom-4 right-4 w-40 h-28 rounded-lg object-cover border-2 border-white shadow-md"
        autoplay
        muted
        playsinline
      ></video>

      <!-- Remote Streams -->
      <div
        id="remote-streams"
        class="absolute top-4 left-4 flex gap-2 flex-wrap"
      ></div>
    </div>

    <!-- Control Buttons -->
    <div class="flex gap-4">
      <button
        @click="toggleCamera"
        :class="cameraEnabled ? 'bg-green-600' : 'bg-gray-700'"
        class="text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {{ cameraEnabled ? "Camera On" : "Camera Off" }}
      </button>

      <button
        @click="toggleMic"
        :class="micEnabled ? 'bg-green-600' : 'bg-gray-700'"
        class="text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {{ micEnabled ? "Mic On" : "Mic Off" }}
      </button>

      <button
        @click="endCall"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        End Call
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { io } from "socket.io-client";
import { Device } from "mediasoup-client";

export default {
  name: "MeetView",
  setup() {
    const myVideo = ref(null);
    const cameraEnabled = ref(false);
    const micEnabled = ref(false);
    const stream = ref(null);
    const socket = ref(null);
    const device = ref(null);
    const consumerTransport = ref(null);
    const producerTransport = ref(null);
    const producers = ref([]);

    const classId = "room-xyz"; // replace with dynamic value
    const userName = "student-abc"; // replace with dynamic value

    const createDevice = async (rtpCapabilities) => {
      const dev = new Device();
      await dev.load({ routerRtpCapabilities: rtpCapabilities });
      device.value = dev;
    };

    const createRecvTransport = () => {
      return new Promise((resolve, reject) => {
        socket.value.emit(
          "createTransport",
          { roomId: classId, sender: false },
          async ({ params }) => {
            if (params.error) return reject(params.error);

            const transport = device.value.createRecvTransport(params);

            transport.on("connect", ({ dtlsParameters }, callback, errback) => {
              socket.value.emit(
                "connectConsumerTransport",
                { roomId: classId, dtlsParameters },
                ({ error }) => {
                  if (error) return errback(error);
                  callback();
                }
              );
            });

            consumerTransport.value = transport;
            resolve(transport);
          }
        );
      });
    };

    const consumeStream = async (producerId) => {
      const transport =
        consumerTransport.value || (await createRecvTransport());

      socket.value.emit(
        "consumeMedia",
        {
          roomId: classId,
          rtpCapabilities: device.value.rtpCapabilities,
          producerId,
        },
        async ({ params }) => {
          if (!params || params.error) return;

          const consumer = await transport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          const stream = new MediaStream([consumer.track]);

          const video = document.createElement("video");
          video.srcObject = stream;
          video.autoplay = true;
          video.playsInline = true;
          video.className = "w-40 h-28 rounded border-2 border-white";
          document.getElementById("remote-streams").appendChild(video);
        }
      );
    };

    const startStream = async () => {
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      myVideo.value.srcObject = stream.value;
      cameraEnabled.value = true;
      micEnabled.value = true;

      // TODO: add producer code to publish own stream here if needed
    };

    const toggleCamera = () => {
      if (!stream.value) return startStream();
      const videoTrack = stream.value.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      cameraEnabled.value = videoTrack.enabled;
    };

    const toggleMic = () => {
      if (!stream.value) return;
      const audioTrack = stream.value.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      micEnabled.value = audioTrack.enabled;
    };

    const endCall = () => {
      stream.value?.getTracks().forEach((track) => track.stop());
      stream.value = null;
      cameraEnabled.value = false;
      micEnabled.value = false;
    };

    onMounted(() => {
      socket.value = io(import.meta.env.PUBLIC_MEDIASOUP_SOCKET_URL);

      socket.value.on("connection-success", async ({ rtpCapabilities }) => {
        await createDevice(rtpCapabilities);
      });

      socket.value.emit("join-room", {
        roomId: classId,
        userName,
        role: "student",
      });

      socket.value.on("new-producer", async ({ producerId }) => {
        await consumeStream(producerId);
      });
    });

    return {
      myVideo,
      cameraEnabled,
      micEnabled,
      toggleCamera,
      toggleMic,
      endCall,
    };
  },
};
</script>

<style scoped>
video {
  background-color: black;
}
</style>
