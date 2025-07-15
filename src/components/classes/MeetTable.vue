<template>
  <div class="mt-8 overflow-x-auto">
    <table class="min-w-full bg-white border rounded-md">
      <thead>
        <tr class="bg-gray-100 text-left text-sm font-medium text-gray-600">
          <th class="px-4 py-2 border-b">#</th>
          <th class="px-4 py-2 border-b">Meet Title</th>
          <th class="px-4 py-2 border-b">Course Title</th>
          <th class="px-4 py-2 border-b">Start Time</th>
          <th class="px-4 py-2 border-b">End Time</th>
          <th class="px-4 py-2 border-b">Join</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(live, index) in liveClasses"
          :key="live?.id"
          class="text-sm text-gray-700 hover:bg-gray-50"
        >
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ live.title }}</td>
          <td class="px-4 py-2">{{ live.course?.title || "-" }}</td>
          <td class="px-4 py-2">{{ formatDate(live.startTime) }}</td>
          <td class="px-4 py-2">{{ formatDate(live.endTime) }}</td>
          <td>
            <button
              v-if="checkIfLiveClass(live.startTime, live.endTime)"
              <!--
              @click="joinLiveClass(live.id)"
              --
            >
              class="bg-blue-500 text-white px-4 py-1 rounded-md" > Join
            </button>

            <span v-else class="text-black font-bold px-4 py-1 rounded-md">
              Soon...
            </span>
          </td>
        </tr>
      </tbody>
    </table>
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
console.log(liveClasses);
</script>
