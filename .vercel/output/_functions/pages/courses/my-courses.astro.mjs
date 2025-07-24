import { c as createComponent, d as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
/* empty css                                         */
import { $ as $$Layout } from '../../chunks/Layout_C4bnNtuO.mjs';
import { useSSRContext, ref, onMounted, mergeProps } from 'vue';
import { g as getEnrolledCourse, f as fetchDepartmentsApi } from '../../chunks/courseQueries_BEXyJw61.mjs';
import { g as getItem } from '../../chunks/localStorageUtils_xJkj8yAm.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';

const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";


const _sfc_main = {
  __name: 'myCourse',
  setup(__props, { expose: __expose }) {
  __expose();

const userDetails = ref(null);
const courses = ref([]);
const departmentNames = ref({});
const subjectNames = ref({});
const thumbnails = ref({});
const loading = ref(true);
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

onMounted(async () => {
  try {
    userDetails.value = getItem("user");
    if (!userDetails.value) return;

    const res = await getEnrolledCourse();
    courses.value = res?.data?.enrolledCourse || [];

    if (!courses.value.length) return;

    const depIds = [
      ...new Set(courses.value.map((c) => c.course.departmentId)),
    ];

    const departmentsRes = await fetchDepartmentsApi();
    departmentsRes?.data?.forEach((dep) => {
      if (depIds.includes(dep.id)) {
        departmentNames.value[dep.id] = dep.name;
      }
    });
  } catch (err) {
    console.error("Error loading My Courses page:", err);
  } finally {
    loading.value = false;
  }
});

const goTo = (courseId) => {
  window.location.href = `/course-program/${courseId}`;
};

const __returned__ = { userDetails, courses, departmentNames, subjectNames, thumbnails, loading, defaultThumbnail, formatDate, goTo, ref, onMounted, get fetchDepartmentsApi() { return fetchDepartmentsApi }, get getEnrolledCourse() { return getEnrolledCourse }, get getItem() { return getItem } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-2xl font-bold mb-4">My Enrolled Courses</h1>`);
  if ($setup.loading) {
    _push(`<div class="text-gray-500">Loading your courses...</div>`);
  } else if ($setup.courses.length) {
    _push(`<div class="grid gap-6 max-w-2xl"><!--[-->`);
    ssrRenderList($setup.courses, (enrolled, index) => {
      _push(`<div class="w-120 bg-white shadow-lg rounded-xl overflow-hidden"><img${
        ssrRenderAttr("src", enrolled.course.thumbnailUrl || $setup.defaultThumbnail)
      } alt="Course Thumbnail" class="w-full h-52 object-cover"><div class="p-4"><h2 class="text-xl font-semibold mb-1">${
        ssrInterpolate(enrolled.course.title)
      }</h2><p class="text-sm text-gray-600 mb-1">${
        ssrInterpolate(enrolled.course.level)
      }</p><div class="text-sm text-gray-700 space-y-1 mt-2"><p><span class="font-medium">Department:</span> ${
        ssrInterpolate($setup.departmentNames[enrolled.course.departmentId] || "Loading...")
      }</p><p><span class="font-medium">Subject:</span> ${
        ssrInterpolate($setup.subjectNames[enrolled.course.subjectId] || "Loading...")
      }</p><p><span class="font-medium">Start:</span> ${
        ssrInterpolate($setup.formatDate(enrolled.course.startDate))
      }</p><p><span class="font-medium">End:</span> ${
        ssrInterpolate($setup.formatDate(enrolled.course.endDate))
      }</p></div><p class="mt-3 font-bold text-blue-600 text-base"> ₹${
        ssrInterpolate(enrolled.course.price)
      }</p></div><div class=""><button class="bg-blue-300 w-full p-3 text-lg font-semibold cursor-pointer hover:scale-110 transition-transform duration-300"><i class="pi pi-caret-right" style="${
        ssrRenderStyle({"color":"blue"})
      }"></i>Start Watching </button></div></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<div class="text-gray-500"> You have not enrolled in any courses yet. </div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/courses/myCourse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const MyCoursePage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$MyCourses = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PCC Student" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "MyCoursePage", MyCoursePage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/courses/myCourse.vue", "client:component-export": "default" })} </main> ` })}`;
}, "C:/Users/USER/lms_student/src/pages/courses/my-courses.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/courses/my-courses.astro";
const $$url = "/courses/my-courses";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MyCourses,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
