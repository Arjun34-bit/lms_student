<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden w-full flex flex-col sm:flex-row"
    @click="goToCourseDetails(course?.id)"
  >
    <!-- Thumbnail -->
    <img
      :src="thumbnailSrc"
      alt="Course Thumbnail"
      class="w-full sm:w-40 h-40 object-cover"
    />

    <!-- Course Content -->
    <div class="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-1">{{ course.title }}</h2>
        <p class="text-sm text-gray-500 mb-1">Level: {{ course.level }}</p>
        <p class="text-sm text-gray-600 mb-1 line-clamp-3">
          {{ course.description }}
        </p>

        <!-- Department & Category -->
        <div class="text-xs text-gray-500 mt-2">
          <p>
            Department:
            <span class="font-medium">{{ depName || "N/A" }}</span>
          </p>
          <p>
            Subject:
            <span class="font-medium">{{ catName || "N/A" }}</span>
          </p>
        </div>
      </div>

      <!-- Price & Enroll Button -->
      <div class="mt-4 flex items-center justify-between">
        <p class="text-blue-600 font-bold text-sm">₹{{ course.price }}</p>
        <p v-if="userDetails" role="button">
          <button
            :disabled="loading"
            class="px-4 py-1 bg-blue-600 text-white rounded w-fit hover:bg-blue-700 text-sm disabled:opacity-50 cursor-pointer"
            @click.stop="buyCourse(course.id)"
          >
            {{ loading ? "Processing..." : "Enroll Now" }}
          </button>
        </p>

        <p v-else role="button">
          <button
            class="px-4 py-1 bg-gray-300 text-gray-800 rounded w-fit hover:bg-gray-400 text-sm"
            @click.stop="redirectToLogin"
          >
            log in to Enroll
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  fetchDepartmentsApi,
  fetchImageApi,
  fetchSubjectsApi,
} from "../../api/queries/commonQueries";
import { buyCourseApi } from "../../api/queries/courseQueries";
import { getItem } from "../../utils/localStorageUtils";
import { razorpayKey, verifyURL } from "../../constants/constants";

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const thumbnailSrc = ref("");
const defaultThumbnail = "https://via.placeholder.com/150?text=Course+Image";
const depName = ref("");
const catName = ref("");
const userDetails = ref("");
const loading = ref(false);

const redirectToLogin = () => {
  window.location.href = "/auth/login";
};

onMounted(async () => {
  try {
    userDetails.value = getItem("user");

    const departmentsRes = await fetchDepartmentsApi();
    const department = departmentsRes?.data?.find(
      (d) => d.id === props.course.departmentId
    );
    depName.value = department?.name || "Unknown";

    // const subjectDataRes = await fetchSubjectsApi();
    // const category = subjectDataRes?.data?.find(
    //   (c) => c.id === props.course.subjectId
    // );
    catName.value = category?.name || "Unknown";
  } catch (err) {
    console.error("Failed to fetch department or category:", err);
  }
});

onMounted(async () => {
  if (props.course?.thumbnailId) {
    try {
      const imageBlob = await fetchImageApi(props.course.thumbnailId);
      thumbnailSrc.value = imageBlob;
    } catch (error) {
      console.error("Error loading image", error);
      thumbnailSrc.value = defaultThumbnail;
    }
  } else {
    thumbnailSrc.value = defaultThumbnail;
  }
});

const goToCourseDetails = (courseId) => {
  window.location.href = `/courses/${courseId}`;
};

const buyCourse = async (courseId) => {
  loading.value = true;

  try {
    const response = await buyCourseApi(courseId);
    const { order, courseBuy } = response?.data;

    if (!order?.id || !courseBuy?.id) {
      throw new Error("Invalid response from server. Cannot proceed.");
    }

    const razorpayOptions = {
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: "PCC",
      description: "Course Enrollment",
      order_id: order.id,

      handler: async ({ razorpay_payment_id, razorpay_order_id }) => {
        try {
          await fetch(verifyURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
            }),
          });

          alert("✅ Payment successful! You are now enrolled in the course.");
          window.location.reload();
        } catch (verificationError) {
          console.error("Payment verification failed:", verificationError);
          alert("❌ Payment was processed, but verification failed.");
        }
      },

      prefill: {
        name: userDetails.value?.name || "Student",
        email: userDetails.value?.email || "student@example.com",
      },

      theme: {
        color: "#3B82F6",
      },
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error("Failed to initiate course enrollment:", error);
    alert(
      error?.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    loading.value = false;
  }
};
</script>
