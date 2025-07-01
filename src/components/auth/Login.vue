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
      <hr />
      <div class="mt-2 flex justify-center items center gap-2">
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow transform transition duration-200 hover:scale-105"
          @click="handleGoogleLogin"
        >
          <i class="pi pi-google text-xl text-red-600"></i>
        </button>

        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow transform transition duration-200 hover:scale-105"
          @click="handleFacebookLogin"
        >
          <i class="pi pi-facebook text-xl text-blue-600"></i>
        </button>
      </div>
      <div class="flex flex-col items-center mt-2">
        <span class="text-center">OR</span>
        <span @click="goToPhoneLogin" class="cursor-pointer font-semibold mt-2"
          >Login With Phone Number</span
        >
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { loginSchema } from "./schema/auth";
import { authLoginApi, googleSigninApi } from "../../api/queries/authQueries";
// import { useRouter } from "vue-router";
import { setItem } from "../../utils/localStorageUtils.js";
import { signInWithGoogle } from "../../config/firebaseConfig.js";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";

// const router = useRouter();

const loading = ref(false);
const submitError = ref("");
const remember = ref(false);

const goToPhoneLogin = () => {
  window.location.href = "/auth/phone-signon";
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
