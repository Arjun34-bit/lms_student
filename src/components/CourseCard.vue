<template>
  <div class="course-card">
    <h3>{{ course.title }}</h3>
    <p>{{ course.description }}</p>
    <p><strong>Instructor:</strong> {{ course.instructor }}</p>
    <p><strong>Price:</strong> ${{ course.price }}</p>
    <button @click="enroll">Enroll Now</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.id === 'number' &&
        typeof value.title === 'string' &&
        typeof value.instructor === 'string' &&
        typeof value.price === 'number'
      );
    },
  },
});

const enroll = () => {
  alert(`You have enrolled in ${props.course.title}!`);
};
</script>

<style scoped>
.course-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h3 {
  color: #333;
}

p {
  color: #666;
}

button {
  background-color: #a435f0;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #8e2ad6;
}
</style>