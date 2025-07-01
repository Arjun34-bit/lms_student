<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
    <div id="recaptcha-container"></div>
    <h2 class="text-xl font-semibold text-center mb-4">
      Login or Register with Phone Number
    </h2>

    <Form @submit="onSubmit" :validation-schema="phoneLoginSchema">
      <div class="flex gap-2 mb-4">
        <div class="w-1/3">
          <label class="block text-sm font-medium mb-1">Country</label>
          <Field as="select" name="country" class="w-full p-2 border rounded">
            <option disabled value="">--</option>
            <option value="IN">IN 🇮🇳</option>
            <option value="US">US 🇺🇸</option>
            <option value="UK">UK 🇬🇧</option>
          </Field>
          <ErrorMessage name="country" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Phone Input -->
        <div class="w-2/3">
          <label class="block text-sm font-medium mb-1">Phone Number</label>
          <Field
            name="phone"
            placeholder="9876543210"
            class="w-full p-2 border rounded"
          />
          <ErrorMessage name="phone" class="text-red-500 text-sm mt-1" />
        </div>
      </div>

      <!-- Send OTP Button -->
      <div class="text-center">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send OTP
        </button>
      </div>
    </Form>
    <div
      v-if="showOtpModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h3 class="text-lg font-bold mb-4 text-center">Enter OTP</h3>
        <input
          v-model="otp"
          type="text"
          maxlength="6"
          class="w-full p-2 border rounded mb-4 text-center"
          placeholder="Enter 6-digit code"
        />
        <div class="flex justify-between">
          <button
            @click="verifyOtp"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>
          <button
            @click="showOtpModal = false"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { phoneLoginSchema } from "./schema/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/config";
import { authLoginWithPhoneApi } from "../../api/queries/authQueries";

const showOtpModal = ref(false);
const otp = ref("");
const verificationId = ref(null);

const onSubmit = async (values) => {
  const fullPhone = `+91${values.phone}`;

  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      await window.recaptchaVerifier.render();
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      fullPhone,
      appVerifier
    );

    verificationId.value = confirmationResult;

    window.confirmationResult = confirmationResult;
    showOtpModal.value = true;
  } catch (error) {
    console.error("OTP Send Failed:", error);
    alert("Failed to send OTP");
  }
};

const verifyOtp = async () => {
  try {
    const credential = await verificationId.value.confirm(otp.value);
    const idToken = credential.user.getIdToken();

    const response = await authLoginWithPhoneApi(idToken);
    if (response?.data?.access_token && response?.data?.user) {
      setItem("token", response?.data?.access_token);
      setItem("user", response?.data?.user);
      setTimeout(() => (window.location.href = "/"), 2000);
    }
    console.log("Phone Auth Successful:", user);
    alert("OTP Verified! Login successful.");
    showOtpModal.value = false;
  } catch (err) {
    alert("Invalid OTP");
    console.error("OTP Verification Error:", err);
  }
};
</script>
