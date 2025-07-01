//stoing variabke to pass it across the vue componenets

import { reactive } from "vue";

export const sharedState = reactive({
  meetingId: "",
  userName: "",
});
