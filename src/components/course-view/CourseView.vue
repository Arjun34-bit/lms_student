<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- Sidebar with lectures -->
    <aside
      class="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 border-r dark:border-gray-700"
    >
      <LectureModule
        :lectures="course.lectures"
        :selectedLecture="selectedLecture"
        @select="setSelectedLecture"
      />
    </aside>

    <!-- Main Video Section -->
    <main
      class="flex-1 p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <VideoView :lecture="selectedLecture" />
      <LectureTabs />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VideoView from "./module/VideoView.vue";
import LectureModule from "./module/LectureModule.vue";
import LectureTabs from "./module/LectureTabs.vue";
import { getCourseByIdApi } from "../../api/queries/courseQueries";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const getCourse = ref(null);

const course = ref({
  title: "Introduction to Web Development",
  lectures: [],
});

const selectedLecture = ref(null);

const setSelectedLecture = (lecture) => {
  selectedLecture.value = lecture;
};

onMounted(async () => {
  // Dummy data instead of API
  const dummyLectures = [
    {
      id: 1,
      title: "Welcome to the Course",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "HTML Basics",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      title: "CSS Fundamentals",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  getCourse = await getCourseByIdApi(props?.courseId);

  course.value.lectures = dummyLectures;
  selectedLecture.value = dummyLectures[0];
});
</script>
