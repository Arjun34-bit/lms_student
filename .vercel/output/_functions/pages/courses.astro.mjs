import { c as createComponent, d as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Batihp0E.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DR1EsV0j.mjs';
/* empty css                                      */
import { useSSRContext, ref, onMounted, mergeProps } from 'vue';
import { f as fetchDepartmentsApi, c as fetchSubjectsApi, d as fetchAllCategoriesApi, e as getAllCourseApi, h as getCourseByCategoryApi } from '../chunks/courseQueries_BEXyJw61.mjs';
import { g as getItem } from '../chunks/localStorageUtils_xJkj8yAm.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';

const defaultThumbnail =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

const _sfc_main$1 = {
  __name: 'CourseCard',
  props: {
  course: {
    type: Object,
    required: true,
  },
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const thumbnailSrc = ref("");
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

const goToCourseDetails = (courseId) => {
  window.location.href = `/courses/${courseId}`;
};

const __returned__ = { props, thumbnailSrc, defaultThumbnail, depName, catName, userDetails, loading, redirectToLogin, goToCourseDetails, ref, onMounted, get fetchDepartmentsApi() { return fetchDepartmentsApi }, get fetchSubjectsApi() { return fetchSubjectsApi }, get getItem() { return getItem } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "bg-white shadow-md rounded-lg overflow-hidden w-full flex flex-col sm:flex-row" }, _attrs))
  }><img${
    ssrRenderAttr("src", $props.course?.thumbnailUrl || $setup.defaultThumbnail)
  } alt="Course Thumbnail" class="w-full sm:w-40 h-40 object-cover"><div class="p-4 flex-1 flex flex-col justify-between"><div><h2 class="text-xl font-semibold mb-1">${
    ssrInterpolate($props.course.title)
  }</h2><p class="text-sm text-gray-500 mb-1">Level: ${
    ssrInterpolate($props.course.level)
  }</p><p class="text-sm text-gray-600 mb-1 line-clamp-3">${
    ssrInterpolate($props.course.description)
  }</p><div class="text-xs text-gray-500 mt-2"><p> Department: <span class="font-medium">${
    ssrInterpolate($setup.depName || "N/A")
  }</span></p><p> Subject: <span class="font-medium">${
    ssrInterpolate($setup.catName || "N/A")
  }</span></p></div></div><div class="mt-4 flex items-center justify-between"><p class="text-blue-600 font-bold text-sm">₹${
    ssrInterpolate($props.course.price)
  }</p></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/courses/CourseCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const CourseCard = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const _sfc_main = {
  __name: 'index',
  setup(__props, { expose: __expose }) {
  __expose();

const error = ref(null);

const categories = ref([]);

const activeCategory = ref();
const courses = ref([]);
const loading = ref(false);
const pageNumber = ref(1);
const limit = ref(10);
const totalPages = ref(1);

onMounted(async () => {
  try {
    const data = await fetchAllCategoriesApi();
    categories.value = data?.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});

const fetchCourses = async () => {
  loading.value = true;
  try {
    const res = await getAllCourseApi();

    courses.value = res?.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    courses.value = [];
  } finally {
    loading.value = false;
  }
};

const selectCategory = async (id) => {
  activeCategory.value = id;
  courses.value = "";
  const res = await getCourseByCategoryApi(id);
  courses.value = res?.data?.data?.courses;
};

onMounted(() => {
  fetchCourses();
});

const __returned__ = { error, categories, activeCategory, courses, loading, pageNumber, limit, totalPages, fetchCourses, selectCategory, ref, onMounted, CourseCard, get getAllCourseApi() { return getAllCourseApi }, get getCourseByCategoryApi() { return getCourseByCategoryApi }, get fetchAllCategoriesApi() { return fetchAllCategoriesApi } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto p-4" }, _attrs))}><div class="flex gap-4 border-b mb-4"><!--[-->`);
  ssrRenderList($setup.categories, (category) => {
    _push(`<button class="${
      ssrRenderClass([
          'py-2 px-4 font-semibold',
          $setup.activeCategory === category.id
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-600',
        ])
    }">${
      ssrInterpolate(category.name)
    }</button>`);
  });
  _push(`<!--]--></div><div class="flex justify-between items-center mb-4"><div class="text-gray-600">Page ${
    ssrInterpolate($setup.pageNumber)
  } of ${
    ssrInterpolate($setup.totalPages)
  }</div><div class="space-x-2"><button class="px-3 py-1 border rounded text-sm"${
    (ssrIncludeBooleanAttr($setup.pageNumber === 1)) ? " disabled" : ""
  }> Prev </button><button class="px-3 py-1 border rounded text-sm"${
    (ssrIncludeBooleanAttr($setup.pageNumber === $setup.totalPages)) ? " disabled" : ""
  }> Next </button></div></div>`);
  if ($setup.loading) {
    _push(`<div class="text-center text-gray-500">Loading...</div>`);
  } else {
    _push(`<div class="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]"><!--[-->`);
    ssrRenderList($setup.courses, (course) => {
      _push(ssrRenderComponent($setup["CourseCard"], {
        key: course.id,
        course: course
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/courses/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const CoursePage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Let's Learn Student" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- <VueQueryWrapper client:load>           For using useQuery Hook --> ${renderComponent($$result2, "CoursePage", CoursePage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/courses/index.vue", "client:component-export": "default" })} <!-- </VueQueryWrapper> --> </main> ` })}`;
}, "C:/Users/USER/lms_student/src/pages/courses/index.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/courses/index.astro";
const $$url = "/courses";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
