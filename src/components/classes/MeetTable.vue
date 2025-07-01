<template>
  <div class="mt-8 overflow-x-auto">
    <table class="min-w-full bg-white border rounded-md">
      <thead>
        <tr class="bg-gray-100 text-left text-sm font-medium text-gray-600">
          <th class="px-4 py-2 border-b">#</th>
          <th class="px-4 py-2 border-b">Name</th>
          <th class="px-4 py-2 border-b">Date & Time</th>
          <th class="px-4 py-2 border-b">Lecture</th>
          <th class="px-4 py-2 border-b">Join</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr
          v-for="(entry, index) in data"
          :key="index"
          class="text-sm text-gray-700 hover:bg-gray-50"
        >
          <td class="px-4 py-2 border-b">{{ index + 1 }}</td>
          <td class="px-4 py-2 border-b">{{ entry.name }}</td>
          <td class="px-4 py-2 border-b">{{ entry.classID }}</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ClassTable",
};
</script>
