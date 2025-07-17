<template>
  <div class="bg-white p-8 rounded shadow-lg w-full max-w-3xl">
    <h1 class="text-xl font-bold mb-4 text-center">Join Live Class</h1>
    <Form
      @submit="onSubmit"
      :validation-schema="joinSchema"
      class="space-y-4 flex justify-between items-center gap-2"
    >
      <div>
        <label class="block text-sm mb-1">Your Name</label>
        <Field
          name="name"
          type="text"
          :value="user?.name || ''"
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          placeholder="Enter your name"
        />
        <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm mb-1">Class ID</label>
        <Field
          name="classID"
          type="text"
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter class ID"
        />
        <ErrorMessage name="classID" class="text-red-500 text-sm mt-1" />
      </div>

      <!-- <div v-if="submitError" class="text-red-600 text-sm">
        {{ submitError }}
      </div> -->

      <button
        type="submit"
        class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition w-1/3"
      >
        {{ loading ? "Joining..." : "Join Meet" }}
      </button>
    </Form>
  </div>

  <MeetingCard />
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { joinSchema } from "./schema/classes";
import ClassTable from "./MeetTable.vue";
import { getItem, setItem } from "../../utils/localStorageUtils";
// import { sharedState } from "../../store/store";
import MeetingCard from "./MeetingCard.vue";

const loading = ref(false);
const submitError = ref("");

const { handleSubmit } = useForm({
  // validationSchema: joinSchema,
});

const user = getItem("user");

const onSubmit = (values, { resetForm }) => {
  submitError.value = "";
  console.log("hello");
  try {
    loading.value = true;

    // Update shared state
    // sharedState.userName = values.name;
    // sharedState.meetingId = values.classID;

    // Persist to localStorage
    setItem("userName", values.name);
    setItem("meetingId", values.classID);

    // Redirect after storing
    window.location.href = "/meetings";

    resetForm();
  } catch (err) {
    submitError.value = "Failed to join meeting. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
