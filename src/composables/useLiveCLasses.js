import { ref, onMounted } from "vue";
import { getAllLiveClasses } from "../api/queries/classesQueries";

export function useLiveClasses() {
  const liveClasses = ref([]);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchLiveClasses = async () => {
    try {
      isLoading.value = true;
      const response = await getAllLiveClasses();
      liveClasses.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchLiveClasses);

  return {
    liveClasses,
    isLoading,
    error,
    refetch: fetchLiveClasses,
  };
}
