<template>
  <div class="max-w-8xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
    <img
      :src="course?.thumbnailUrl || thumbnailSrc"
      alt="Course Thumbnail"
      class="w-full h-64 object-cover rounded-xl mb-6"
    />

    <h1 class="text-3xl font-semibold text-gray-800 mb-2">
      {{ course?.title }}
    </h1>

    <div class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4">
      <p><strong>Level:</strong> {{ course.level }}</p>
      <p><strong>Language:</strong> {{ course.language?.name }}</p>
      <p><strong>Category:</strong> {{ course.category?.name }}</p>
    </div>

    <p class="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">
      {{ course.description }}
    </p>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6"
    >
      <p><strong>Start Date:</strong> {{ formatDate(course.startDate) }}</p>
      <p><strong>End Date:</strong> {{ formatDate(course.endDate) }}</p>
      <p><strong>Price:</strong> ₹{{ course.price }}</p>
      <p><strong>Department:</strong> {{ course.department?.name }}</p>
      <p><strong>Subject:</strong> {{ course.subject?.name }}</p>
    </div>

    <div class="flex justify-center items-center">
      <p v-if="userDetails" role="button">
        <button
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded w-48 hover:bg-blue-700 text-sm disabled:opacity-50 cursor-pointer"
          @click.stop="buyCourse(course.id)"
        >
          {{ loading ? "Processing..." : "Enroll Now" }}
        </button>
      </p>

      <p v-else role="button">
        <button
          class="px-4 py-1 bg-gray-300 text-gray-800 rounded w-fit hover:bg-gray-400 text-sm"
          @click.stop="redirectToLogin"
        >
          log in to Enroll
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchImageApi } from "../../api/queries/commonQueries";
import {
  getCourseByIdApi,
  buyCourseApi,
} from "../../api/queries/courseQueries";
import { getItem } from "../../utils/localStorageUtils";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const course = ref({});
const userDetails = ref("");
const thumbnailSrc = ref("");
const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
    userDetails.value = getItem("user");
    const res = await getCourseByIdApi(props.courseId);
    course.value = res?.data?.data?.course;

    if (course.value.thumbnailId) {
      thumbnailSrc.value = await fetchImageApi(course.value.thumbnailId);
    } else {
      thumbnailSrc.value = defaultThumbnail;
    }
  } catch (err) {
    console.error("Failed to load course detail", err);
  }
});

const buyCourse = async (courseId) => {
  window.location.href = `/order-checkout/${courseId}`;
};
</script>
