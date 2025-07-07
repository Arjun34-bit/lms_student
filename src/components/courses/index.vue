<template>
  <div class="max-w-5xl mx-auto p-4">
    <div class="flex gap-4 border-b mb-4">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="[
          'py-2 px-4 font-semibold',
          activeCategory === category.id
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-600',
        ]"
        @click="selectCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="flex justify-between items-center mb-4">
      <div class="text-gray-600">Page {{ pageNumber }} of {{ totalPages }}</div>
      <div class="space-x-2">
        <button
          class="px-3 py-1 border rounded text-sm"
          :disabled="pageNumber === 1"
          @click="changePage(pageNumber - 1)"
        >
          Prev
        </button>
        <button
          class="px-3 py-1 border rounded text-sm"
          :disabled="pageNumber === totalPages"
          @click="changePage(pageNumber + 1)"
        >
          Next
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div
      v-else
      class="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]"
    >
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CourseCard from "./CourseCard.vue";
import {
  getAllCourseApi,
  getCourseByCategoryApi,
} from "../../api/queries/courseQueries";
import { fetchAllCategoriesApi } from "../../api/queries/commonQueries";

const error = ref(null);

const categories = ref([]);

const activeCategory = ref();
const courses = ref([]);
const loading = ref(false);
const pageNumber = ref(1);
const limit = ref(10);
const totalPages = ref(1);

onMounted(async () => {
  try {
    const data = await fetchAllCategoriesApi();
    categories.value = data?.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});

const fetchCourses = async () => {
  loading.value = true;
  try {
    const res = await getAllCourseApi();

    courses.value = res?.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    courses.value = [];
  } finally {
    loading.value = false;
  }
};

const selectCategory = async (id) => {
  activeCategory.value = id;
  courses.value = "";
  const res = await getCourseByCategoryApi(id);
  courses.value = res?.data?.data?.courses;
};

onMounted(() => {
  fetchCourses();
});
</script>
