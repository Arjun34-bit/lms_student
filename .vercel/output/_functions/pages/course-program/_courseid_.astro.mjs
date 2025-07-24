import { c as createComponent, a as createAstro, m as maybeRenderHead, d as renderComponent, f as renderTemplate } from '../../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
/* empty css                                         */
import { c as escape_html, i as store_get, u as unsubscribe_stores } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';
import { atom } from 'nanostores';
import { mergeProps, computed, useSSRContext, ref, onMounted } from 'vue';
import { V as VideoPlayer } from '../../chunks/VideoPlayer_BcT9TL-y.mjs';
import { useStore } from '@nanostores/vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { g as getItem } from '../../chunks/localStorageUtils_xJkj8yAm.mjs';
import { a as api } from '../../chunks/client_DCbe-m4L.mjs';

const courseTitle = atom("");
atom("");
const timeStamp = atom({
  token: "",
  courseId: "",
  lessionId: "",
  videoId: "",
  pos: "",
});

function setCourseTitle(title) {
  courseTitle.set(title);
}

function updateKey$1(key, value) {
  timeStamp.set({
    ...timeStamp.get(),
    [key]: value,
  });
}

function ToggleBar($$payload) {
	var $$store_subs;

	$$payload.out += `<nav class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-md"><div class="max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 items-center gap-3"><div class="flex items-center"><button class="text-sm px-2 py-1 font-semibold bg-white rounded-lg text-black-800:text-white cursor-pointer"><i class="pi pi-arrow-left"></i><span class="ml-2">Back</span></button></div> <div class="flex items-center"><span class="text-xl font-bold text-gray-800 dark:text-white">${escape_html(store_get($$store_subs ??= {}, '$courseTitle', courseTitle))}</span></div> <div class="md:hidden flex items-center"><button aria-label="Toggle Menu" class="text-gray-700 dark:text-gray-300 focus:outline-none"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">`;

	{
		$$payload.out += '<!--[-->';
		$$payload.out += `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
	}

	$$payload.out += `<!--]--></svg></button></div></div></div> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--></nav>`;
	if ($$store_subs) unsubscribe_stores($$store_subs);
}

const _sfc_main$4 = {
  __name: 'VideoView',
  props: {
  lecture: Object,
  defaultData: Object,
},
  setup(__props, { expose: __expose }) {
  __expose();

const $timeStamp = useStore(timeStamp);

const props = __props;

const videoUrl = computed(() => {
  return props.lecture?.videoUrl
    ? props.lecture.videoUrl
    : props?.defaultData?.videoUrl;
});

console.log($timeStamp.value);

const handleVideoPosition = (pos) => {
  updateKey$1("videoId", props?.lecture.value?.id);
  updateKey$1("pos", pos);
};

const __returned__ = { $timeStamp, props, videoUrl, handleVideoPosition, computed, VideoPlayer, get useStore() { return useStore }, get timeStamp() { return timeStamp }, get updateKey() { return updateKey$1 } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.lecture) {
    _push(`<div${
      ssrRenderAttrs(_attrs)
    }><h2 class="text-2xl font-bold mb-4">${
      ssrInterpolate($props.lecture.title || $setup.props?.defaultData?.title)
    }</h2>`);
    if ($setup.videoUrl) {
      _push(`<div>`);
      _push(ssrRenderComponent($setup["VideoPlayer"], {
        videoUrl: $setup.videoUrl,
        type: "lecture",
        onUpdatePosition: $setup.handleVideoPosition
      }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<div${
      ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-screen" }, _attrs))
    }><span><i class="pi pi-spin pi-spinner" style="${
      ssrRenderStyle({"font-size":"4rem","color":"blue"})
    }"></i></span></div>`);
  }
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/course-view/module/VideoView.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};
const VideoView = /*#__PURE__*/_export_sfc(_sfc_main$4, [['ssrRender',_sfc_ssrRender$4]]);

const _sfc_main$3 = {};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-pulse space-y-4 p-4 bg-white rounded-md shadow-md" }, _attrs))}><div class="h-6 bg-gray-100 rounded w-3/4"></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/fallbackUI/Card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const CardSkeleton = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3]]);

const isLoading = atom(false);

function setIsLoading(value) {
  isLoading.set(value);
}

function updateKey(key, value) {
  timeStamp.set({
    ...timeStamp.get(),
    [key]: value,
  });
}

// import { updateKey } from "../../../store/courseStore.js";


const _sfc_main$2 = {
  __name: 'LectureModule',
  props: {
  lectures: Object,
  videos: Array,
  selectedLecture: Object,
},
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {
  __expose();

const props = __props;

const emit = __emit;

const $loading = useStore(isLoading);
const expandedLessons = ref(new Set());

const lessions = ref(props?.lectures);
const videos = ref(props?.videos);

const toggleLesson = (id) => {
  updateKey("lessionId", id);
  if (expandedLessons.value.has(id)) {
    expandedLessons.value.delete(id);
  } else {
    expandedLessons.value.add(id);
  }
};

const handleVideo = (id) => {
  for (const lesson of videos.value) {
    const video = lesson.Videos.find((v) => v.id === id);
    if (video) {
      emit("select", video);
      return;
    }
    return null;
  }
};

onMounted(() => {
  updateKey("lessionId", lessions.value[0]?.id);
});

const __returned__ = { props, emit, $loading, expandedLessons, lessions, videos, toggleLesson, handleVideo, onMounted, ref, CardSkeleton, get isLoading() { return isLoading }, get useStore() { return useStore }, get updateKey() { return updateKey } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 class="text-lg font-semibold mb-4 text-gray-200">Lectures</h2>`);
  if ($setup.$loading) {
    _push(`<div class="text-gray-400 italic">`);
    _push(ssrRenderComponent($setup["CardSkeleton"], null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<div><ul class="space-y-2"><!--[-->`);
    ssrRenderList($setup.lessions, (lesson) => {
      _push(`<li class="border border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800"><button class="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-800 dark:text-gray-200 focus:outline-none">${
        ssrInterpolate(lesson.lectureName)
      } <svg class="${
        ssrRenderClass([
                'w-5 h-5 transform transition-transform',
                $setup.expandedLessons.has(lesson.id) ? 'rotate-180' : '',
              ])
      }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if ($setup.expandedLessons.has(lesson.id)) {
        _push(`<div class="px-4 pb-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"><ul class="space-y-2 mt-2"><!--[-->`);
        ssrRenderList(lesson.Videos || [], (sub) => {
          _push(`<li class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition flex justify-between items-center"><p>${ssrInterpolate(sub.title)}</p><i class="pi pi-lock"></i></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    });
    _push(`<!--]--></ul></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/course-view/module/LectureModule.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};
const LectureModule = /*#__PURE__*/_export_sfc(_sfc_main$2, [['ssrRender',_sfc_ssrRender$2]]);

const _sfc_main$1 = {
  __name: 'LectureTabs',
  props: {
  lecture: Object,
  defaultDescription: String,
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const tabs = ["Notes", "Summary", "Q&A"];
const activeTab = ref("Notes");

const notes = ref("");
const summary = ref(props.lecture?.description);

const __returned__ = { props, tabs, activeTab, notes, summary, ref };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-6 w-full" }, _attrs))}><div class="flex border-b dark:border-gray-700"><!--[-->`);
  ssrRenderList($setup.tabs, (tab) => {
    _push(`<button class="${
      ssrRenderClass([[
          $setup.activeTab === tab
            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
            : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500',
        ], "py-2 px-4 text-sm font-medium border-b-2 transition-all duration-200"])
    }">${
      ssrInterpolate(tab)
    }</button>`);
  });
  _push(`<!--]--></div><div class="mt-4">`);
  if ($setup.activeTab === 'Notes') {
    _push(`<div><textarea placeholder="Write your notes here..." rows="6" class="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white">${ssrInterpolate($setup.notes)}</textarea></div>`);
  } else if ($setup.activeTab === 'Summary') {
    _push(`<div><p class="text-gray-700 dark:text-gray-300">${ssrInterpolate($setup.summary ? $setup.summary : $props.defaultDescription)}</p></div>`);
  } else if ($setup.activeTab === 'Q&A') {
    _push(`<div><p class="text-gray-500 dark:text-gray-400 italic">Coming soon...</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/course-view/module/LectureTabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const LectureTabs = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const apiBaseUrl = undefined                                   ;
const token = getItem("token");
const getEnrolledCourseById = async (id) => {
  try {
    const data = await api.get(
      `${apiBaseUrl}/student/enrolled-course/single`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      },
      {
        courseId: id
      }
    );
    return data?.data?.data;
  } catch (error) {
    console.log(error);
    throw new Error("Course Fetching Failed");
  }
};

const _sfc_main = {
  __name: 'CourseView',
  props: {
  courseId: {
    type: String,
    required: true,
  },
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const course = ref(null);
const defaultData = ref(null);
const selectedLecture = ref(null);

const setSelectedLecture = (lecture) => {
  selectedLecture.value = lecture ? lecture : defaultData;
};

onMounted(() => {
  setSelectedLecture(null);
});

onMounted(async () => {
  try {
    setIsLoading(true);
    course.value = await getEnrolledCourseById(props?.courseId);
    defaultData.value = course.value?.lessons[0]?.Videos[0];
    updateKey("courseId", course.value?.course?.id);
    setCourseTitle(course?.value?.course?.title);
  } catch (error) {
    console.error("Failed to load course:", error);
  } finally {
    setIsLoading(false);
  }
});

const __returned__ = { props, course, defaultData, selectedLecture, setSelectedLecture, ref, onMounted, VideoView, LectureModule, LectureTabs, get getEnrolledCourseById() { return getEnrolledCourseById }, get setCourseTitle() { return setCourseTitle }, get setIsLoading() { return setIsLoading }, get updateKey() { return updateKey } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row min-h-screen" }, _attrs))}><aside class="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 border-r dark:border-gray-700">`);
  if ($setup.course?.course?.CourseLession) {
    _push(ssrRenderComponent($setup["LectureModule"], {
      lectures: $setup.course?.course?.CourseLession,
      videos: $setup.course?.lessons,
      selectedLecture: $setup.selectedLecture,
      onSelect: $setup.setSelectedLecture
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</aside><main class="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">`);
  _push(ssrRenderComponent($setup["VideoView"], {
    lecture: $setup.selectedLecture,
    defaultData: $setup.defaultData
  }, null, _parent));
  _push(ssrRenderComponent($setup["LectureTabs"], {
    lecture: $setup.selectedLecture,
    defaultDescription: $setup.defaultData?.description
  }, null, _parent));
  _push(`</main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/course-view/CourseView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const CourseView = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$courseId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$courseId;
  const { courseId } = Astro2.params;
  if (!courseId) {
    throw new Error("Missing courseId in URL");
  }
  return renderTemplate`${maybeRenderHead()}<main> ${renderComponent($$result, "ToggleBar", ToggleBar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/miscellenous/ToggleBar.svelte", "client:component-export": "default" })} ${renderComponent($$result, "CourseView", CourseView, { "courseId": courseId, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/course-view/CourseView.vue", "client:component-export": "default" })} </main>`;
}, "C:/Users/USER/lms_student/src/pages/course-program/[courseId].astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/course-program/[courseId].astro";
const $$url = "/course-program/[courseId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$courseId,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
