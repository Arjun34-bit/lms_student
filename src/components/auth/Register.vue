<template>
  <div class="bg-gray-300 p-8 rounded shadow-lg w-full max-w-md">
    <h1 class="text-xl font-bold mb-4 text-center">Register</h1>

    <Form
      @submit="onSubmit"
      :validation-schema="registerSchema"
      class="space-y-4"
    >
      <div class="w-full p-3 border border-blue-500 rounded-lg relative">
        <label
          class="block text-sm mb-1 absolute top-[-14px] bg-gray-300 w-fit p-1"
          >Name:</label
        >
        <Field name="name" type="text" class="input" placeholder="Your Name" />
      </div>
      <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />

      <div class="w-full p-3 border border-blue-500 rounded-lg relative">
        <label
          class="block text-sm mb-1 absolute top-[-14px] bg-gray-300 w-fit p-1"
        >
          Email:</label
        >
        <Field
          name="email"
          type="email"
          class="input"
          placeholder="you@example.com"
        />
      </div>
      <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />

      <div class="w-full p-3 border border-blue-500 rounded-lg relative mt-3">
        <label
          class="block text-sm mb-1 absolute top-[-14px] bg-gray-300 w-fit p-1"
          >Password:</label
        >
        <Field
          name="password"
          type="password"
          class="input"
          placeholder="Enter Your Password"
        />
      </div>
      <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />

      <div v-if="submitError" class="text-red-600 text-sm">
        {{ submitError }}
      </div>

      <button type="submit" class="btn cursor-pointer">Create Account</button>

      <div class="text-sm text-center mt-4">
        Already have an account?
        <a href="/auth/login" class="text-blue-600 underline ml-1">Login</a>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { registerSchema } from "./schema/auth";
import { authRegisterApi } from "../../api/queries/authQueries";
import { useRouter } from "vue-router";

const router = useRouter();
const submitError = ref("");

const onSubmit = async (values) => {
  submitError.value = "";
  try {
    const data = await authRegisterApi(values);
    if (data) {
      router.push("/auth/login");
    }
  } catch (err) {
    submitError.value = err?.response?.data
      ? err.response.data?.message || "Something went wrong."
      : "Unexpected error occurred.";
  }
};
</script>
