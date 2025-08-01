<template>
  <div class="bg-gray-300 p-8 shadow-lg w-full max-w-md rounded-t-lg">
    <h1 class="headings text-xl font-bold mb-4 text-center">Login</h1>

    <Form @submit="onSubmit" :validation-schema="loginSchema" class="space-y-4">
      <div class="w-full p-3 border border-blue-500 rounded-lg relative">
        <label
          class="block text-sm mb-1 absolute top-[-14px] bg-gray-300 w-fit p-1"
        >
          {{ emailMeta.touched && emailError ? emailError : "Email:" }}</label
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

  <div class="mt-2 flex justify-center items center gap-2">
    <button
      type="button"
      class="w-full h-10 flex items-center justify-center bg-gray-400 shadow transform transition duration-200 hover:scale-105"
      @click="handleGoogleLogin"
    >
      <i class="pi pi-google text-xl text-blue-600"></i>
    </button>
  </div>
  <div class="flex flex-col items-center mt-2">
    <span class="text-center">OR</span>
    <span
      @click="goToPhoneLogin"
      class="w-full cursor-pointer text-center text-white font-semibold mt-2 bg-blue-500 py-2 px-3 rounded-b-lg"
      >Login via Phone</span
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage, useField } from "vee-validate";
import { loginSchema } from "./schema/auth";
import { authLoginApi, googleSigninApi } from "../../api/queries/authQueries";
// import { useRouter } from "vue-router";
import { setItem } from "../../utils/localStorageUtils.js";
import { signInWithGoogle } from "../../config/firebaseConfig.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";

import Cookies from "js-cookie";

// const router = useRouter();

const loading = ref(false);
const submitError = ref("");
const remember = ref(false);

const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
} = useField("email");

const goToPhoneLogin = () => {
  window.location.href = "/auth/phone-signon";
};

const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: 30,
    path: "/",
    secure: true,
    sameSite: "Strict",
  });
};

const onSubmit = async (values) => {
  submitError.value = "";
  console.log("Submitted values:", values);
  try {
    loading.value = true;
    const response = await authLoginApi(values);
    if (response?.data?.access_token && response?.data?.user) {
      setItem("token", response?.data?.access_token);
      setItem("user", response?.data?.user);
      setCookie("token", response?.data?.access_token);
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

let signingIn = false;

const handleGoogleLogin = async () => {
  console.log("Google");
  if (signingIn) return;
  signingIn = true;
  try {
    await signOut(auth);
    const userCredential = await signInWithGoogle();
    const idToken = await userCredential.getIdToken();
    const loginResponse = await googleSigninApi(idToken);
    if (loginResponse?.data?.access_token && loginResponse?.data?.user) {
      setItem("token", loginResponse?.data?.access_token);
      setItem("user", loginResponse?.data?.user);
      setTimeout(() => (window.location.href = "/"), 2000);
    }
  } catch (err) {
    console.log(err);
    submitError.value = err?.response?.data
      ? err.response.data?.message || "Something went wrong."
      : "Unexpected error occurred.";
  }
};

const handleFacebookLogin = () => {};
</script>
