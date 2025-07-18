<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <aside
      class="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 border-r dark:border-gray-700"
    >
      <LectureModule
        v-if="course?.course?.CourseLession"
        :lectures="course?.course?.CourseLession"
        :videos="course?.lessons"
        :selectedLecture="selectedLecture"
        @select="setSelectedLecture"
      />
    </aside>

    <main
      class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <VideoView :lecture="selectedLecture" :defaultData="defaultData" />
      <LectureTabs
        :lecture="selectedLecture"
        :defaultDescription="defaultData?.description"
      />
    </main>
  </div>
</template>

<script setup>
import "../../styles/global.css";
import { ref, onMounted } from "vue";
import VideoView from "./module/VideoView.vue";
import LectureModule from "./module/LectureModule.vue";
import LectureTabs from "./module/LectureTabs.vue";
import { getEnrolledCourseById } from "../../api/queries/enrolledCourse";
import { setCourseTitle } from "../../store/courseStore.js";
import { setIsLoading } from "../../store/loader.js";
import { updateKey } from "../../helper/custom.js";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const course = ref(null);
const defaultData = ref(null);
const selectedLecture = ref(null);

const setSelectedLecture = (lecture) => {
  selectedLecture.value = lecture ? lecture : defaultData;
};

onMounted(() => {
  setSelectedLecture(null);
});

onMounted(async () => {
  try {
    setIsLoading(true);
    course.value = await getEnrolledCourseById(props?.courseId);
    defaultData.value = course.value?.lessons[0]?.Videos[0];
    updateKey("courseId", course.value?.course?.id);
    setCourseTitle(course?.value?.course?.title);
  } catch (error) {
    console.error("Failed to load course:", error);
  } finally {
    setIsLoading(false);
  }
});
</script>

<style scoped></style>
