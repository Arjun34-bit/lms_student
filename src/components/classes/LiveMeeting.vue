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
import { ref } from "vue";
import { sharedState } from "../../store/store";

export default {
  name: "MeetView",
  setup() {
    const myVideo = ref(null);
    const stream = ref(null);
    const cameraEnabled = ref(false);
    const micEnabled = ref(false);

    const socket = ref(null);
    const viewerCount = ref(0);
    const rtpCapabilities = ref(null);
    const classId = sharedState.classID;
    const userName = sharedState.userName;
    console.log(sharedState.userName);

    onMounted(() => {
      console.log("Initializing Socket.IO connection");

      socket.value = io(import.meta.env.MEDIASOUP_SOCKET_URL); // from env file

      console.log("Socket.IO instance created:", socket.value);

      socket.value.on("connection-success", (data) => {
        console.log("Received connection-success:", data);

        //Joining Room
        socket.value.emit(
          "join-room",
          { roomId: classId, userName: userName, role: "student" },
          (data) => {
            console.log("Join room response:", data);
            if (data?.rtpCapabilities) {
              rtpCapabilities.value = data.rtpCapabilities;
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

    const startMedia = async () => {
      try {
        stream.value = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (myVideo.value) {
          myVideo.value.srcObject = stream.value;
        }

        cameraEnabled.value = true;
        micEnabled.value = true;
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
      }
    };

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
