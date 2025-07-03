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
      <!-- Student Count Display -->
      <div
        class="absolute top-4 left-4 text-white bg-black p-2 rounded-lg shadow-md"
      >
        Count: {{ viewerCount }}
      </div>
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
import { getItem } from "../../utils/localStorageUtils.js";
import { sharedState } from "../../store/store";
import { reactive } from "vue";
import { Device } from "mediasoup-client";

export default {
  name: "MeetView",
  setup() {
    const myVideo = ref(null);
    const stream = ref(null);
    const cameraEnabled = ref(false);
    const micEnabled = ref(false);

    const socket = ref(null);
    const viewerCount = ref(0);

    const producers = reactive({
      camera: null,
      audio: null,
    });

    const initialized = ref(false);

    let rtpCapabilities = null;
    const rtpCapabilities1 = ref(null);

    const newDevice = ref(null);
    let producerTransport = null;

    const classId = sharedState.meetingId || getItem("meetingId");
    const userName = sharedState.userName || getItem("userName");

    onMounted(() => {
      if (!classId || !userName) {
        alert(
          "Missing meeting ID or username. Please go back and join properly."
        );
        return;
      }
      console.log("Initializing Socket.IO connection");

      console.log(import.meta.env.PUBLIC_MEDIASOUP_SOCKET_URL);

      socket.value = io(import.meta.env.PUBLIC_MEDIASOUP_SOCKET_URL);

      console.log("Socket.IO instance created:", socket.value);

      socket.value.on("connection-success", (data) => {
        console.log("Received connection-success:", data);

        //Joining Room
        socket.value.emit(
          "join-room",
          { roomId: classId, userName: userName, role: "student" },
          (data) => {
            if (data?.error) {
              console.error("Join room error:", data.message);
              alert(data.message);
              return;
            }

            console.log("Join room response:", data);
            if (data?.rtpCapabilities) {
              rtpCapabilities = data.rtpCapabilities;
            } else {
              console.error("Failed to get RTP Capabilities");
            }
          }
        );

        //getting joined user information
        socket.value.on("user-joined", ({ message, userName }) => {
          console.log(message);
          console.log(`${userName} joined`);
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

    const createDevice = async (rtpCapabilities) => {
      if (!rtpCapabilities) {
        console.log("Cannot create device: rtpCapabilities is null");
        alert("Please get Router RTP Capabilities first!");
        return;
      }

      try {
        console.log(
          "Creating mediasoup Device with rtpCapabilities:",
          rtpCapabilities
        );

        const device = new Device();
        await device.load({ routerRtpCapabilities: rtpCapabilities });
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

            producerTransport = transport;

            transport.on(
              "connect",
              async ({ dtlsParameters }, callback, errback) => {
                try {
                  socket.value.emit("connectProducerTransport", {
                    roomId: classId,
                    dtlsParameters,
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
                      label: appData?.label || "",
                    },
                    ({ id, error }) => {
                      if (error) {
                        console.error("Produce error:", error);
                        errback(error);
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
          const videoTrack = mediaStream.getVideoTracks()[0];
          const videoProducer = await producerTransport.produce({
            track: videoTrack,
            encodings: [
              { rid: "r0", maxBitrate: 100000, scalabilityMode: "S1T3" },
              { rid: "r1", maxBitrate: 300000, scalabilityMode: "S1T3" },
              { rid: "r2", maxBitrate: 900000, scalabilityMode: "S1T3" },
            ],
            codecOptions: { videoGoogleStartBitrate: 1000 },
            appData: { label: "camera" },
          });
          producers.camera = videoProducer;
          console.log("Created camera video producer:", videoProducer);
          videoProducer.on("trackended", () => {
            console.log("Camera video track ended");
            stopCamera();
          });
          videoProducer.on("transportclose", () =>
            console.log("Camera video transport closed")
          );
        }

        if (type === "audio" && mediaStream && !producers.audio) {
          const audioTrack = mediaStream.getAudioTracks()[0];
          const audioProducer = await producerTransport.produce({
            track: audioTrack,
            appData: { label: "audio" },
          });
          producers.audio = audioProducer;
          console.log("Created audio producer:", audioProducer);
          audioProducer.on("trackended", () => {
            console.log("Audio track ended");
            stopAudio();
          });
          audioProducer.on("transportclose", () =>
            console.log("Audio transport closed")
          );
        }
      } catch (error) {
        console.error("Error producing media:", error);
        alert("Failed to produce media: " + error.message);
      }
    };

    const startMedia = async () => {
      try {
        stream.value = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        // Play the local video
        if (myVideo.value) {
          myVideo.value.srcObject = stream.value;
          await myVideo.value.play();
        }

        // Enable UI flags
        cameraEnabled.value = true;
        micEnabled.value = false;

        // Call mediasoup connection functions
        await connectSendTransport("camera", stream.value);
        // await connectSendTransport("audio", stream.value);
      } catch (err) {
        console.error("Media access error:", err);
        alert("Could not access camera/microphone.");
      }
    };

    const toggleCamera = () => {
      if (!stream.value) return startMedia();
      const videoTrack = stream.value.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      cameraEnabled.value = videoTrack.enabled;
    };

    const toggleMic = () => {
      if (!stream.value) return startMedia();
      const audioTrack = stream.value.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      micEnabled.value = audioTrack.enabled;
    };

    const endCall = () => {
      if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
        stream.value = null;
        cameraEnabled.value = false;
        micEnabled.value = false;

        socket.emit("leave-room", {
          roomId: classId,
          userName: "student",
        });

        setTimeout(() => {
          window.location.href("/live-classes?page=classes");
        }, 1500);
      }
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
