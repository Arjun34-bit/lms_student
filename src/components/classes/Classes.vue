<template>
  <div class="w-full max-w-5xl px-4 py-4 bg-white shadow rounded-lg mb-4">
    <Form
      @submit="handleSubmit"
      class="flex flex-col md:flex-row gap-4 items-stretch md:items-end"
    >
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <Field
          name="name"
          as="input"
          type="text"
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
        <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Class ID</label
        >
        <Field
          name="classID"
          as="input"
          type="text"
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter class ID"
        />
        <ErrorMessage name="classID" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="mt-2 md:mt-0">
        <button
          type="submit"
          class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          @click="joinMeeting()"
        >
          Join Meet
        </button>
      </div>
    </Form>
  </div>
  <ClassTable :data="joinedList" />
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ClassTable from "./MeetTable.vue";
import { sharedState } from "../../store/store";

export default {
  name: "LiveClass",
  components: {
    Form,
    Field,
    ErrorMessage,
    ClassTable,
  },
  data() {
    return {
      joinedList: [],
    };
  },
  methods: {
    handleSubmit(values, { resetForm }) {
      this.joinedList.push({ name: values.name, classID: values.classID });

      sharedState.userName = values.name;
      sharedState.meetingId = values.classID;

      resetForm();
    },
  },

  function joinMeeting(){
  }

};
</script>
