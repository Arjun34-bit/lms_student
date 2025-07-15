<template>
  <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="(live, index) in liveClasses"
      :key="live?.id"
      class="bg-white border shadow rounded-lg p-4 flex flex-col justify-between min-h-[250px]"
    >
      <div>
        <h2 class="text-lg font-semibold text-gray-800">
          {{ live.title || "Untitled Meet" }}
        </h2>
        <p class="text-sm text-gray-600 mt-1">
          <span class="font-medium">Course:</span>
          {{ live.course?.title || "-" }}
        </p>

        <div class="mt-2 text-sm text-gray-600">
          <p>
            <span class="font-medium">Start:</span>
            {{ formatDate(live.startTime) }}
          </p>
          <p>
            <span class="font-medium">End:</span>
            {{ formatDate(live.endTime) }}
          </p>
        </div>
      </div>

      <div class="mt-4">
        <button
          v-if="checkIfLiveClass(live.startTime, live.endTime)"
          @click="joinLiveClass(live.id)"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Join
        </button>
        <span
          v-else
          class="block text-center text-gray-500 font-semibold border border-gray-300 rounded-md py-2"
        >
          Soon...
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLiveClasses } from "../../composables/useLiveCLasses";
import {
  checkIfLiveClass,
  formatDate,
  getStatusColor,
} from "../../helper/custom";

const { liveClasses, isLoading } = useLiveClasses();

const joinLiveClass = (id) => {
  console.log("Joining class with ID:", id);
};
</script>
