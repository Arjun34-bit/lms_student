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
import { getAllCourseApi } from "../../api/queries/courseQueries";

const error = ref(null);

const categories = [
  { id: "cat1", name: "Development" },
  { id: "cat2", name: "Design" },
  { id: "cat3", name: "Marketing" },
  { id: "cat4", name: "AI & ML" },
  { id: "cat5", name: "Cybersecurity" },
];

const activeCategory = ref(categories[0].id);
const courses = ref([]);
const loading = ref(false);

const fetchCourses = async () => {
  loading.value = true;
  try {
    const res = await getAllCourseApi();
    console.log(res);
    // const json = await res.json();

    courses.value = res?.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    courses.value = [];
  } finally {
    loading.value = false;
  }
};

const selectCategory = (id) => {
  activeCategory.value = id;
  fetchCourses(id);
};

onMounted(() => {
  fetchCourses();
});
</script>
