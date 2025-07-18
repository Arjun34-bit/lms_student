<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <span
      ><i class="pi pi-spin pi-spinner" style="font-size: 4rem; color: blue"></i
    ></span>
  </div>
  <div
    v-else="!loading"
    class="flex flex-col lg:flex-row justify-around items-start gap-6"
  >
    <div class="w-full lg:w-[65%] p-6 bg-white rounded-2xl shadow-md mt-6">
      <img
        :src="course?.thumbnailUrl || thumbnailSrc"
        alt="Course Thumbnail"
        class="w-full h-64 object-cover rounded-xl mb-6"
      />

      <h1 class="text-3xl font-semibold text-gray-800 mb-2">
        {{ course?.title?.toUpperCase() }}
      </h1>

      <p class="text-2xl font-bold text-green-500">
        {{ course?.price ? "₹" + course?.price : "-" }}
      </p>

      <div class="flex gap-1">
        <span class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4">
          <p>
            <strong>Duration:</strong>
            {{ course?.duration ? course?.duration : "0" }} hours
          </p>
        </span>
        <p>|</p>
        <span class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4">
          <p><strong>Lectures:</strong>{{}}</p>
        </span>
      </div>

      <div class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4">
        <p><strong>Level:</strong> {{ course.level }}</p>
        <p><strong>Language:</strong> {{ course.language?.name }}</p>
        <p><strong>Category:</strong> {{ course.category?.name }}</p>
      </div>

      <p class="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">
        {{ course.description }}
      </p>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6 bg-gray-100 p-4 rounded-lg shadow-lg"
      >
        <p><strong>Start Date:</strong> {{ formatDate(course.startDate) }}</p>
        <p><strong>End Date:</strong> {{ formatDate(course.endDate) }}</p>
        <p><strong>Department:</strong> {{ course.department?.name }}</p>
        <p><strong>Subject:</strong> {{ course.subject?.name }}</p>
      </div>

      <span class="font-bold text-lg">Course Curriculam</span>
      <div
        v-if="course.CourseLession"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6"
      >
        <div
          v-for="(lesson, index) in course.CourseLession"
          :key="index"
          class="bg-gray-100 rounded-lg p-3 shadow-sm"
        >
          <p
            class="font-medium text-base text-gray-800 flex justify-between items-center gap-2"
          >
            <i class="pi pi-caret-right" style="color: blue"></i>
            <span>{{ index + 1 }}. {{ lesson.lectureName }}</span>
            <span class="text-green-600 text-sm font-semibold mr-0"
              >FREE DEMO</span
            >
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="course?.CourseLession.length !== 0"
      class="w-full lg:w-[35%] p-6 bg-white border rounded-2xl shadow-md mt-6 flex flex-col items-center justify-between"
    >
      <div
        v-if="course.videoUrl"
        class="w-full h-60 bg-gray-200 rounded-lg mb-6 flex items-center justify-center"
      >
        <VideoPlayer :videoUrl="course.videoUrl" :type="demo" />
      </div>

      <div>
        <button
          v-if="userDetails"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded w-48 hover:bg-blue-700 text-sm disabled:opacity-50 cursor-pointer"
          @click.stop="buyCourse(course.id)"
        >
          {{ loading ? "Processing..." : "Enroll Now" }}
        </button>

        <button
          v-else
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded w-48 hover:bg-gray-400 text-sm"
          @click.stop="redirectToLogin"
        >
          Log in to Enroll
        </button>
      </div>
    </div>
    <div
      v-else="course?.CourseLession.length === 0"
      class="w-full lg:w-[35%] p-6 bg-white border rounded-2xl shadow-md mt-6 flex flex-col items-center justify-between"
    >
      <span>No Lectures Alloted Yet</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchImageApi } from "../../api/queries/commonQueries";
import { getCourseByIdApi } from "../../api/queries/courseQueries";
import { getItem } from "../../utils/localStorageUtils";

import VideoPlayer from "../mediaPlayer/VideoPlayer.vue";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const startVideo = ref(false);

const loading = ref(true);

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
    loading.value = false;
  } catch (err) {
    alert("Failed to load course detail");
    console.error("Failed to load course detail", err);
    loading.value = false;
  }
});

console.log(course);

const buyCourse = async (courseId) => {
  window.location.href = `/order-checkout/${courseId}`;
};
</script>
