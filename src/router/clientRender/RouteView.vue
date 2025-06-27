<template>
  <component :is="currentComponent" />
</template>

<script>
import { ref, computed, onMounted } from 'vue';

import Dashboard from '../../components/dashboard/DashBoard.vue';
import Classes from '../../components/classes/Classes.vue';
// import Assignments from '../../components/assignments/Assignments.vue';
// import Settings from '../../components/settings/Settings.vue';

export default {
  name: 'RouteView',
  setup() {
    const pageParam = ref(getPageFromURL());

    function getPageFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('page') || 'dashboard';
    }

    const currentComponent = computed(() => {
      switch (pageParam.value) {
        case 'classes':
          return Classes;
        case 'assignments':
          return {
            template: '<div>Assignments Component (placeholder)</div>',
          };
        case 'settings':
          return {
            template: '<div>Settings Component (placeholder)</div>',
          };
        case 'dashboard':
        default:
          return Dashboard;
      }
    });

    const handlePopState = () => {
      pageParam.value = getPageFromURL();
    };

    onMounted(() => {
      window.addEventListener('popstate', handlePopState);
    });

    return { currentComponent };
  },
};
</script>
