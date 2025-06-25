<script>
  import CourseCard from './CourseCard.vue';

  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript.',
      instructor: 'John Doe',
      price: 19.99,
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Deep dive into modern JavaScript concepts and frameworks.',
      instructor: 'Jane Smith',
      price: 29.99,
    },
    {
      id: 3,
      title: 'Vue.js for Beginners',
      description: 'Get started with the Vue.js framework.',
      instructor: 'Alice Johnson',
      price: 24.99,
    },
    {
      id: 4,
      title: 'Svelte.js Fundamentals',
      description: 'Understand the core concepts of Svelte.js.',
      instructor: 'Bob Williams',
      price: 24.99,
    },
  ];
</script>

<div class="course-list">
  {#each courses as course (course.id)}
    <CourseCard {course} />
  {/each}
</div>

<style>
  .course-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
</style>