<template>
  <div class="min-h-screen bg-white p-6">
    <div class="flex justify-around items-center text-lg font-bold"></div>
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <span class="flex gap-2 text-lg font-bold">
          <button @click="backNavigation" class="cursor-pointer">
            <i class="pi pi-arrow-left text-lg"></i>
          </button>
          <p>Your Orders</p>
        </span>
        <div class="bg-blue-50 rounded-xl p-4">
          <div
            class="flex justify-between items-start border-b border-gray-200 py-4"
          >
            <div>
              <img
                :src="course?.thumbnailUrl || defaultThumbnail"
                class="w-28 h-20 object-cover rounded mr-4"
                alt="Course thumbnail"
              />
              <h3 class="text-lg font-semibold text-gray-900">
                {{ course.title }}
              </h3>
            </div>

            <div class="flex-1">
              <ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1">
                <li><strong>Level:</strong> {{ course.level }}</li>
                <li><strong>Language:</strong> {{ course.language?.name }}</li>
                <li><strong>Category:</strong> {{ course.category?.name }}</li>
                <li>
                  <strong>Department:</strong> {{ course.department?.name }}
                </li>
                <li><strong>Subject:</strong> {{ course.subject?.name }}</li>
                <li>
                  <strong>Start:</strong> {{ formatDate(course.startDate) }}
                </li>
                <li><strong>End:</strong> {{ formatDate(course.endDate) }}</li>
              </ul>
            </div>
            <p class="text-right font-semibold whitespace-nowrap text-gray-800">
              ₹{{ course.price }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex items-center gap-4">
          <input
            v-model="coupon"
            placeholder="Got a coupon? Enter here"
            class="flex-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            @click="applyCoupon"
          >
            Apply
          </button>
          <span v-if="couponApplied" class="text-green-600"
            >Coupon applied!</span
          >
        </div>
      </div>


      <div>
        <span class="flex gap-2 text-lg font-bold">
          <p>Summary</p>
        </span>
        <div class="bg-blue-100 p-6 rounded-t-xl h-fit">
          <div class="space-y-2 text-sm text-gray-700">
            <div class="flex justify-between">
              <span>{{ course.title }}</span>
              <span>₹{{ course.price }}</span>
            </div>

            <hr />

            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>₹{{ course.price }}</span>
            </div>

            <div
              v-if="discount > 0"
              class="flex justify-between text-green-700"
            >
              <span
                >Coupon <strong>{{ couponCode }}</strong></span
              >
              <span>- ₹{{ discount }}</span>
            </div>

            <hr />

            <div class="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{{ total }}</span>
            </div>
          </div>
        </div>
        <button
          class="w-full bg-blue-600 text-white py-3 rounded-b-xl text-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="confirmOrder(course?.id)"
          :disabled="loading"
        >
          {{ loading ? "Processing..." : "Confirm & Enroll" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { fetchImageApi,buyCourseApi } from "../../api/queries/commonQueries";
import {
  getCourseByIdApi,
} from "../../api/queries/courseQueries";
import { razorpayKey, verifyURL } from "../../constants/constants";
import { getItem } from "../../utils/localStorageUtils";

const props = defineProps({
  courseId: {
    type: String,
    required: true,
  },
});

const course = ref({});
const userDetails = ref("");
const thumbnailSrc = ref("");
const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const coupon = ref("");
const couponApplied = ref(false);
const couponCode = ref("");
const discount = ref(0);
const loading = ref(false);

const total = computed(() =>
  Math.max(0, (course.value.price || 0) - discount.value)
);

const backNavigation = () => {
  window.location.href = `/courses/${props?.courseId}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

onMounted(async () => {
  try {
    userDetails.value = getItem("user");
    const res = await getCourseByIdApi(props.courseId);
    course.value = res?.data?.data?.course;

    if (course.value.thumbnailId) {
      thumbnailSrc.value = await fetchImageApi(course.value.thumbnailId);
    }
  } catch (err) {
    console.error("Course loading failed:", err);
    alert("Failed to load course details.");
  }
});

const applyCoupon = () => {
  if (coupon.value.toLowerCase() === "discount") {
    discount.value = 19;
    couponCode.value = "DISCOUNT";
    couponApplied.value = true;
  } else {
    discount.value = 0;
    couponCode.value = "";
    couponApplied.value = false;
    alert("Invalid coupon code.");
  }
};

const confirmOrder = async (courseId) => {
  loading.value = true;

  try {
    const response = await buyCourseApi(courseId);
    const { order, courseBuy } = response?.data;

    if (!order?.id || !courseBuy?.id) {
      throw new Error("Invalid server response.");
    }

    const razorpay = new window.Razorpay({
      key: razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: "PCC",
      description: "Course Enrollment",
      order_id: order.id,
      prefill: {
        name: userDetails.value.name,
        email: userDetails.value.email,
      },
      theme: { color: "#3B82F6" },
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

          alert("✅ Payment successful!");
          setTimeout(() => {
            window.location.href = "/courses/my-courses";
          }, 1000);
        } catch (err) {
          console.error("Verification failed:", err);
          alert("❌ Payment done but verification failed.");
        }
      },
    });

    razorpay.open();
  } catch (err) {
    console.error("Payment init failed:", err);
    alert("Failed to initiate payment. Try again.");
  } finally {
    loading.value = false;
  }
};
</script>
