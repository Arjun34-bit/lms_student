<template>
  <div class="max-w-8xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
    <img
      :src="thumbnailSrc"
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

    <button
      class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
      @click="buyCourse(course.id)"
    >
      Enroll Now
    </button>
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

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const course = ref({});
const thumbnailSrc = ref("");
const defaultThumbnail =
  "https://via.placeholder.com/600x300?text=Course+Image";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
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
  try {
    await buyCourseApi(courseId);
    alert("Enrolled Successfully!");
  } catch (error) {
    alert(error?.response?.data?.message || "Enrollment failed.");
  }
};
</script>
