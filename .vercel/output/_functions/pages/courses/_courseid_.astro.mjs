import { c as createComponent, a as createAstro, d as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_C4bnNtuO.mjs';
/* empty css                                         */
import { useSSRContext, ref, onMounted, mergeProps } from 'vue';
import { useRoute } from 'vue-router';
import { a as getCourseByIdApi, b as fetchImageApi } from '../../chunks/courseQueries_BEXyJw61.mjs';
import { g as getItem } from '../../chunks/localStorageUtils_xJkj8yAm.mjs';
import { V as VideoPlayer } from '../../chunks/VideoPlayer_BcT9TL-y.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';

const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";


const _sfc_main = {
  __name: 'CoursePage',
  props: {
  courseId: {
    type: String,
    required: true,
  },
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const startVideo = ref(false);

const loading = ref(true);

const route = useRoute();
const course = ref({});
const userDetails = ref("");
const thumbnailSrc = ref("");
const formatDate = (dateStr) => {
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
    } else {
      thumbnailSrc.value = defaultThumbnail;
    }
    loading.value = false;
  } catch (err) {
    alert("Failed to load course detail");
    console.error("Failed to load course detail", err);
    loading.value = false;
  }
});

console.log(course);

const buyCourse = async (courseId) => {
  window.location.href = `/order-checkout/${courseId}`;
};

const __returned__ = { props, startVideo, loading, route, course, userDetails, thumbnailSrc, defaultThumbnail, formatDate, buyCourse, onMounted, ref, get useRoute() { return useRoute }, get fetchImageApi() { return fetchImageApi }, get getCourseByIdApi() { return getCourseByIdApi }, get getItem() { return getItem }, VideoPlayer };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.loading) {
    _push(`<div${
      ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-screen" }, _attrs))
    }><span><i class="pi pi-spin pi-spinner" style="${
      ssrRenderStyle({"font-size":"4rem","color":"blue"})
    }"></i></span></div>`);
  } else {
    _push(`<div${
      ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row justify-around items-start gap-6" }, _attrs))
    }><div class="w-full lg:w-[65%] p-6 bg-white rounded-2xl shadow-md mt-6"><img${
      ssrRenderAttr("src", $setup.course?.thumbnailUrl || $setup.thumbnailSrc)
    } alt="Course Thumbnail" class="w-full h-64 object-cover rounded-xl mb-6"><h1 class="text-3xl font-semibold text-gray-800 mb-2">${
      ssrInterpolate($setup.course?.title?.toUpperCase())
    }</h1><p class="text-2xl font-bold text-green-500">${
      ssrInterpolate($setup.course?.price ? "₹" + $setup.course?.price : "-")
    }</p><div class="flex gap-1"><span class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4"><p><strong>Duration:</strong> ${
      ssrInterpolate($setup.course?.duration ? $setup.course?.duration : "0")
    } hours </p></span><p>|</p><span class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4"><p><strong>Lectures:</strong>${
      ssrInterpolate()
    }</p></span></div><div class="text-sm text-gray-600 mb-4 flex flex-wrap gap-4"><p><strong>Level:</strong> ${
      ssrInterpolate($setup.course.level)
    }</p><p><strong>Language:</strong> ${
      ssrInterpolate($setup.course.language?.name)
    }</p><p><strong>Category:</strong> ${
      ssrInterpolate($setup.course.category?.name)
    }</p></div><p class="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">${
      ssrInterpolate($setup.course.description)
    }</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6 bg-gray-100 p-4 rounded-lg shadow-lg"><p><strong>Start Date:</strong> ${
      ssrInterpolate($setup.formatDate($setup.course.startDate))
    }</p><p><strong>End Date:</strong> ${
      ssrInterpolate($setup.formatDate($setup.course.endDate))
    }</p><p><strong>Department:</strong> ${
      ssrInterpolate($setup.course.department?.name)
    }</p><p><strong>Subject:</strong> ${
      ssrInterpolate($setup.course.subject?.name)
    }</p></div><span class="font-bold text-lg">Course Curriculam</span>`);
    if ($setup.course.CourseLession) {
      _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6"><!--[-->`);
      ssrRenderList($setup.course.CourseLession, (lesson, index) => {
        _push(`<div class="bg-gray-100 rounded-lg p-3 shadow-sm"><p class="font-medium text-base text-gray-800 flex justify-between items-center gap-2"><i class="pi pi-caret-right" style="${
          ssrRenderStyle({"color":"blue"})
        }"></i><span>${
          ssrInterpolate(index + 1)
        }. ${
          ssrInterpolate(lesson.lectureName)
        }</span><span class="text-green-600 text-sm font-semibold mr-0">FREE DEMO</span></p></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
    if ($setup.course?.CourseLession.length !== 0) {
      _push(`<div class="w-full lg:w-[35%] p-6 bg-white border rounded-2xl shadow-md mt-6 flex flex-col items-center justify-between">`);
      if ($setup.course.videoUrl) {
        _push(`<div class="w-full h-60 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">`);
        _push(ssrRenderComponent($setup["VideoPlayer"], {
          videoUrl: $setup.course.videoUrl,
          type: _ctx.demo
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div>`);
      if ($setup.userDetails) {
        _push(`<button${
          (ssrIncludeBooleanAttr($setup.loading)) ? " disabled" : ""
        } class="px-4 py-2 bg-blue-600 text-white rounded w-48 hover:bg-blue-700 text-sm disabled:opacity-50 cursor-pointer">${
          ssrInterpolate($setup.loading ? "Processing..." : "Enroll Now")
        }</button>`);
      } else {
        _push(`<button class="px-4 py-2 bg-gray-300 text-gray-800 rounded w-48 hover:bg-gray-400 text-sm"> Log in to Enroll </button>`);
      }
      _push(`</div></div>`);
    } else {
      _push(`<div class="w-full lg:w-[35%] p-6 bg-white border rounded-2xl shadow-md mt-6 flex flex-col items-center justify-between"><span>No Lectures Alloted Yet</span></div>`);
    }
    _push(`</div>`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/courses/CoursePage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const CourseDetailPage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$courseId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$courseId;
  const { courseId } = Astro2.params;
  if (!courseId) {
    throw new Error("Missing courseId in URL");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PCC Student" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- <VueQueryWrapper client:load>           For using useQuery Hook --> ${renderComponent($$result2, "CourseDetailPage", CourseDetailPage, { "courseId": courseId, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/courses/CoursePage.vue", "client:component-export": "default" })} <!-- </VueQueryWrapper> --> </main> ` })}`;
}, "C:/Users/USER/lms_student/src/pages/courses/[courseId].astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/courses/[courseId].astro";
const $$url = "/courses/[courseId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$courseId,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
