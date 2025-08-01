<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Enrolled Courses</h1>

    <div v-if="loading" class="text-gray-500">Loading your courses...</div>

    <div v-else-if="courses.length" class="grid gap-6 max-w-2xl">
      <div
        v-for="(enrolled, index) in courses"
        :key="index"
        class="w-120 bg-white shadow-lg rounded-xl overflow-hidden"
      >
        <img
          :src="enrolled.course.thumbnailUrl || defaultThumbnail"
          alt="Course Thumbnail"
          class="w-full h-52 object-cover"
        />

        <div class="p-4">
          <h2 class="text-xl font-semibold mb-1">
            {{ enrolled.course.title }}
          </h2>
          <p class="text-sm text-gray-600 mb-1">
            {{ enrolled.course.level }}
          </p>

          <div class="text-sm text-gray-700 space-y-1 mt-2">
            <p>
              <span class="font-medium">Department:</span>
              {{
                departmentNames[enrolled.course.departmentId] || "Loading..."
              }}
            </p>
            <p>
              <span class="font-medium">Subject:</span>
              {{ subjectNames[enrolled.course.subjectId] || "Loading..." }}
            </p>
            <p>
              <span class="font-medium">Start:</span>
              {{ formatDate(enrolled.course.startDate) }}
            </p>
            <p>
              <span class="font-medium">End:</span>
              {{ formatDate(enrolled.course.endDate) }}
            </p>
          </div>

          <p class="mt-3 font-bold text-blue-600 text-base">
            ₹{{ enrolled.course.price }}
          </p>
        </div>
        <div class="">
          <button
            class="bg-blue-300 w-full p-3 text-lg font-semibold cursor-pointer hover:scale-110 transition-transform duration-300"
            @click="goTo(enrolled?.course?.id)"
          >
            <i class="pi pi-caret-right" style="color: blue"></i>Start Watching
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500">
      You have not enrolled in any courses yet.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchDepartmentsApi } from "../../api/queries/commonQueries";
import { getEnrolledCourse } from "../../api/queries/courseQueries";
import { getItem } from "../../utils/localStorageUtils";

const userDetails = ref(null);
const courses = ref([]);
const departmentNames = ref({});
const subjectNames = ref({});
const thumbnails = ref({});
const loading = ref(true);
const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

onMounted(async () => {
  try {
    userDetails.value = getItem("user");
    if (!userDetails.value) return;

    const res = await getEnrolledCourse();
    courses.value = res?.data?.enrolledCourse || [];

    if (!courses.value.length) return;

    const depIds = [
      ...new Set(courses.value.map((c) => c.course.departmentId)),
    ];

    const departmentsRes = await fetchDepartmentsApi();
    departmentsRes?.data?.forEach((dep) => {
      if (depIds.includes(dep.id)) {
        departmentNames.value[dep.id] = dep.name;
      }
    });
  } catch (err) {
    console.error("Error loading My Courses page:", err);
  } finally {
    loading.value = false;
  }
});

const goTo = (courseId) => {
  window.location.href = `/course-program/${courseId}`;
};
</script>
