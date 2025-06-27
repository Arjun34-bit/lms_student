<template>
  <div class="bg-blue-300 p-8 rounded shadow-lg w-full max-w-md">
    <h1 class="text-xl font-bold mb-4 text-center">Login Form</h1>

    <Form @submit="onSubmit" :validation-schema="loginSchema" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">Enter your Email:</label>
        <Field
          name="email"
          type="email"
          class="input"
          placeholder="you@example.com"
        />
        <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm mb-1">Enter your Password:</label>
        <Field
          name="password"
          type="password"
          class="input"
          placeholder="Enter Your Password"
        />
        <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="remember" />
        <label>Remember me</label>
      </div>

      <div v-if="submitError" class="text-red-600 text-sm">
        {{ submitError }}
      </div>

      <button type="submit" class="btn cursor-pointer">
        {{ loading ? "LogginIn...." : "Login" }}
      </button>

      <div class="text-sm text-center mt-2">
        <a href="/auth/forgot-password" class="text-blue-600 underline"
          >Forget Password</a
        >
      </div>

      <div class="text-sm text-center mt-4">
        Don't have an account?
        <a href="/auth/register" class="text-blue-600 underline ml-1"
          >Sign Up</a
        >
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { loginSchema } from "./schema/auth";
import { authLoginApi } from "../../api/queries/authQueries";
// import { useRouter } from "vue-router";
import { setItem } from "../../utils/localStorageUtils.js";

// const router = useRouter();

const loading = ref(false);
const submitError = ref("");
const remember = ref(false);

const onSubmit = async (values) => {
  submitError.value = "";
  console.log("Submitted values:", values);
  try {
    loading.value = true;
    const response = await authLoginApi(values);
    if (response?.data?.access_token && response?.data?.user) {
      setItem("token", response?.data?.access_token);
      setItem("user", response?.data?.user);
      setTimeout(() => (window.location.href = "/"), 2000);
    }
    loading.value = false;
  } catch (err) {
    loading.value = false;
    submitError.value = err?.response?.data
      ? err.response.data?.message || "Something went wrong."
      : "Unexpected error occurred.";
  }
};
</script>
