import { c as createComponent, a as createAstro, d as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_C4bnNtuO.mjs';
/* empty css                                         */
import { useSSRContext, ref, computed, onMounted, mergeProps } from 'vue';
import { a as getCourseByIdApi, b as fetchImageApi, i as buyCourseApi } from '../../chunks/courseQueries_BEXyJw61.mjs';
import { g as getItem } from '../../chunks/localStorageUtils_xJkj8yAm.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';

const apiBaseUrl = undefined                                   ;
const verifyURL = `${apiBaseUrl}/common/verify-payment`;
const razorpayKey = undefined                                      ;

const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";


const _sfc_main = {
  __name: 'Order',
  props: {
  courseId: {
    type: String,
    required: true,
  },
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const course = ref({});
const userDetails = ref("");
const thumbnailSrc = ref("");
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

const __returned__ = { props, course, userDetails, thumbnailSrc, defaultThumbnail, coupon, couponApplied, couponCode, discount, loading, total, backNavigation, formatDate, applyCoupon, confirmOrder, ref, onMounted, computed, get fetchImageApi() { return fetchImageApi }, get buyCourseApi() { return buyCourseApi }, get getCourseByIdApi() { return getCourseByIdApi }, get razorpayKey() { return razorpayKey }, get verifyURL() { return verifyURL }, get getItem() { return getItem } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white p-6" }, _attrs))
  }><div class="flex justify-around items-center text-lg font-bold"></div><div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"><div class="md:col-span-2"><span class="flex gap-2 text-lg font-bold"><button class="cursor-pointer"><i class="pi pi-arrow-left text-lg"></i></button><p>Your Orders</p></span><div class="bg-blue-50 rounded-xl p-4"><div class="flex justify-between items-start border-b border-gray-200 py-4"><div><img${
    ssrRenderAttr("src", $setup.course?.thumbnailUrl || $setup.defaultThumbnail)
  } class="w-28 h-20 object-cover rounded mr-4" alt="Course thumbnail"><h3 class="text-lg font-semibold text-gray-900">${
    ssrInterpolate($setup.course.title)
  }</h3></div><div class="flex-1"><ul class="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1"><li><strong>Level:</strong> ${
    ssrInterpolate($setup.course.level)
  }</li><li><strong>Language:</strong> ${
    ssrInterpolate($setup.course.language?.name)
  }</li><li><strong>Category:</strong> ${
    ssrInterpolate($setup.course.category?.name)
  }</li><li><strong>Department:</strong> ${
    ssrInterpolate($setup.course.department?.name)
  }</li><li><strong>Subject:</strong> ${
    ssrInterpolate($setup.course.subject?.name)
  }</li><li><strong>Start:</strong> ${
    ssrInterpolate($setup.formatDate($setup.course.startDate))
  }</li><li><strong>End:</strong> ${
    ssrInterpolate($setup.formatDate($setup.course.endDate))
  }</li></ul></div><p class="text-right font-semibold whitespace-nowrap text-gray-800"> ₹${
    ssrInterpolate($setup.course.price)
  }</p></div></div><div class="mt-6 flex items-center gap-4"><input${
    ssrRenderAttr("value", $setup.coupon)
  } placeholder="Got a coupon? Enter here" class="flex-1 border border-gray-300 rounded-md px-4 py-2"><button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"> Apply </button>`);
  if ($setup.couponApplied) {
    _push(`<span class="text-green-600">Coupon applied!</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div><span class="flex gap-2 text-lg font-bold"><p>Summary</p></span><div class="bg-blue-100 p-6 rounded-t-xl h-fit"><div class="space-y-2 text-sm text-gray-700"><div class="flex justify-between"><span>${
    ssrInterpolate($setup.course.title)
  }</span><span>₹${
    ssrInterpolate($setup.course.price)
  }</span></div><hr><div class="flex justify-between"><span>Subtotal</span><span>₹${
    ssrInterpolate($setup.course.price)
  }</span></div>`);
  if ($setup.discount > 0) {
    _push(`<div class="flex justify-between text-green-700"><span>Coupon <strong>${
      ssrInterpolate($setup.couponCode)
    }</strong></span><span>- ₹${
      ssrInterpolate($setup.discount)
    }</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<hr><div class="flex justify-between font-semibold text-lg"><span>Total</span><span>₹${
    ssrInterpolate($setup.total)
  }</span></div></div></div><button class="w-full bg-blue-600 text-white py-3 rounded-b-xl text-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"${
    (ssrIncludeBooleanAttr($setup.loading)) ? " disabled" : ""
  }>${
    ssrInterpolate($setup.loading ? "Processing..." : "Confirm & Enroll")
  }</button></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/checkout/Order.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Order = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$courseId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$courseId;
  const { courseId } = Astro2.params;
  if (!courseId) {
    throw new Error("Missing courseId in URL");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Let's Learn Student" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Order", Order, { "courseId": courseId, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/checkout/Order.vue", "client:component-export": "default" })} </main> ` })}`;
}, "C:/Users/USER/lms_student/src/pages/order-checkout/[courseId].astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/order-checkout/[courseId].astro";
const $$url = "/order-checkout/[courseId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$courseId,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
