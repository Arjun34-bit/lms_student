<template>
  <div
    class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6"
  >
    <h2 class="text-2xl font-bold text-gray-800 border-b pb-4">
      Student Profile
    </h2>

    <Form @submit="onSubmit" :validation-schema="schema">
      <div v-for="field in editableFields" :key="field.name" class="mb-6">
        <label class="text-sm font-semibold text-gray-600 block mb-1">
          {{ field.label }}
        </label>

        <Field :name="field.name" v-slot="{ field: f, errors }">
          <input
            v-bind="f"
            :placeholder="originalValues[field.name] || '—'"
            class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
        </Field>
      </div>

      <div v-if="successMessage" class="text-green-600 text-sm text-center">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="text-red-600 text-sm text-center">
        {{ errorMessage }}
      </div>

      <button
        type="submit"
        class="w-full p-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
      >
        {{ loading ? "Updating..." : "Update" }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form, Field, useForm } from "vee-validate";
import * as yup from "yup";
import { getItem, setItem } from "../../utils/localStorageUtils";
import {
  getUserProfileApi,
  updateUserProfileApi,
} from "../../api/queries/authQueries";

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const editableFields = [
  { name: "name", label: "Full Name" },
  { name: "email", label: "Email Address" },
  { name: "phoneNumber", label: "Phone Number" },
];

const schema = yup.object({
  name: yup.string(),
  email: yup.string(),
  phoneNumber: yup.string(),
});

const originalValues = ref({
  name: "",
  email: "",
  phoneNumber: "",
});

const { setFieldValue, values } = useForm({
  validationSchema: schema,
});

const fetchUserProfile = async () => {
  try {
    const response = await getUserProfileApi();
    const userData = response?.data;
    setItem("user", userData);

    if (userData) {
      editableFields.forEach(({ name }) => {
        originalValues.value[name] = userData[name] || "";
        setFieldValue(name, userData[name] || "");
      });
    }
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
  }
};

onMounted(async () => {
  await fetchUserProfile();
});

const onSubmit = async (formValues) => {
  successMessage.value = "";
  errorMessage.value = "";
  loading.value = true;

  try {
    let hasChanges = false;
    const fullPayload = {};

    for (const key in formValues) {
      fullPayload[key] = formValues[key];

      if (formValues[key] !== originalValues.value[key]) {
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      successMessage.value = "No changes to update.";
      loading.value = false;
      return;
    }

    const updated = { ...originalValues.value, ...fullPayload };
    originalValues.value = updated;

    await updateUserProfileApi(fullPayload);

    successMessage.value = "Profile updated successfully!";

    await fetchUserProfile();
  } catch (err) {
    errorMessage.value =
      err?.response?.data?.message || "Failed to update profile.";
  } finally {
    loading.value = false;
  }
};
</script>
