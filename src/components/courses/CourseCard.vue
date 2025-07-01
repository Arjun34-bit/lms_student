<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden w-full flex flex-col sm:flex-row"
  >
    <!-- Thumbnail -->
    <img
      :src="thumbnailSrc"
      alt="Course Thumbnail"
      class="w-full sm:w-40 h-40 object-cover"
    />

    <!-- Course Content -->
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-1">{{ course.title }}</h2>
        <p class="text-sm text-gray-500 mb-1">Level: {{ course.level }}</p>
        <p class="text-sm text-gray-600 mb-1 line-clamp-3">
          {{ course.description }}
        </p>

        <!-- Department & Category -->
        <div class="text-xs text-gray-500 mt-2">
          <p>
            Department:
            <span class="font-medium">{{ depName || "N/A" }}</span>
          </p>
          <p>
            Subject:
            <span class="font-medium">{{ catName || "N/A" }}</span>
          </p>
        </div>
      </div>

      <!-- Price & Enroll Button -->
      <div class="mt-4 flex items-center justify-between">
        <p class="text-blue-600 font-bold text-sm">₹{{ course.price }}</p>
        <button
          class="px-4 py-1 bg-blue-600 text-white rounded w-fit hover:bg-blue-700 text-sm"
          @click="buyCourse(course.id)"
        >
          Enroll Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  fetchDepartmentsApi,
  fetchImageApi,
  fetchSubjectsApi,
} from "../../api/queries/commonQueries";
import { buyCourseApi } from "../../api/queries/courseQueries";

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const thumbnailSrc = ref("");
const defaultThumbnail = "https://via.placeholder.com/150?text=Course+Image";
const depName = ref("");
const catName = ref("");
const loading = ref(false);

onMounted(async () => {
  try {
    const departmentsRes = await fetchDepartmentsApi();
    const department = departmentsRes?.data?.find(
      (d) => d.id === props.course.departmentId
    );
    depName.value = department?.name || "Unknown";

    // const subjectDataRes = await fetchSubjectsApi();
    // const category = subjectDataRes?.data?.find(
    //   (c) => c.id === props.course.subjectId
    // );
    catName.value = category?.name || "Unknown";
  } catch (err) {
    console.error("Failed to fetch department or category:", err);
  }
});

onMounted(async () => {
  if (props.course?.thumbnailId) {
    try {
      const imageBlob = await fetchImageApi(props.course.thumbnailId);
      thumbnailSrc.value = imageBlob;
    } catch (error) {
      console.error("Error loading image", error);
      thumbnailSrc.value = defaultThumbnail;
    }
  } else {
    thumbnailSrc.value = defaultThumbnail;
  }
});

const buyCourse = async (courseId) => {
  try {
    loading.value = true;
    const res = await buyCourseApi(courseId);
    console.log(res);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
    alert(error?.response?.data?.message || "Failed to enroll course");
  }
};
</script>
