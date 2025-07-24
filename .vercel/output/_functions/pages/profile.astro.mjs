import { c as createComponent, d as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Batihp0E.mjs';
import 'kleur/colors';
/* empty css                                      */
import { useSSRContext, ref, onMounted, mergeProps, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList } from 'vue';
import { useForm, Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { s as setItem, g as getItem } from '../chunks/localStorageUtils_xJkj8yAm.mjs';
import { g as getUserProfileApi, u as updateUserProfileApi } from '../chunks/authQueries_DkoB0nJb.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
import { $ as $$Layout } from '../chunks/Layout_DR1EsV0j.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';

const _sfc_main = {
  __name: 'Profile',
  setup(__props, { expose: __expose }) {
  __expose();

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

const __returned__ = { loading, successMessage, errorMessage, editableFields, schema, originalValues, setFieldValue, values, fetchUserProfile, onSubmit, ref, onMounted, get Form() { return Form }, get Field() { return Field }, get useForm() { return useForm }, get yup() { return yup }, get getItem() { return getItem }, get setItem() { return setItem }, get getUserProfileApi() { return getUserProfileApi }, get updateUserProfileApi() { return updateUserProfileApi } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6" }, _attrs))}><h2 class="text-2xl font-bold text-gray-800 border-b pb-4"> Student Profile </h2>`);
  _push(ssrRenderComponent($setup["Form"], {
    onSubmit: $setup.onSubmit,
    "validation-schema": $setup.schema
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<!--[-->`);
        ssrRenderList($setup.editableFields, (field) => {
          _push(`<div class="mb-6"${
            _scopeId
          }><label class="text-sm font-semibold text-gray-600 block mb-1"${
            _scopeId
          }>${
            ssrInterpolate(field.label)
          }</label>`);
          _push(ssrRenderComponent($setup["Field"], {
            name: field.name
          }, {
            default: withCtx(({ field: f, errors }, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<input${
                  ssrRenderAttrs(mergeProps({ ref_for: true }, f, {
                    placeholder: $setup.originalValues[field.name] || '—',
                    class: "w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }))
                }${
                  _scopeId
                }><p class="text-red-500 text-sm mt-1"${
                  _scopeId
                }>${
                  ssrInterpolate(errors[0])
                }</p>`);
              } else {
                return [
                  createVNode("input", mergeProps({ ref_for: true }, f, {
                    placeholder: $setup.originalValues[field.name] || '—',
                    class: "w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }), null, 16, ["placeholder"]),
                  createVNode("p", { class: "text-red-500 text-sm mt-1" }, toDisplayString(errors[0]), 1)
                ]
              }
            }),
            _: 2
          }, _parent, _scopeId));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if ($setup.successMessage) {
          _push(`<div class="text-green-600 text-sm text-center"${
            _scopeId
          }>${
            ssrInterpolate($setup.successMessage)
          }</div>`);
        } else {
          _push(`<!---->`);
        }
        if ($setup.errorMessage) {
          _push(`<div class="text-red-600 text-sm text-center"${
            _scopeId
          }>${
            ssrInterpolate($setup.errorMessage)
          }</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="w-full p-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"${
          _scopeId
        }>${
          ssrInterpolate($setup.loading ? "Updating..." : "Update")
        }</button>`);
      } else {
        return [
          (openBlock(), createBlock(Fragment, null, renderList($setup.editableFields, (field) => {
            return createVNode("div", {
              key: field.name,
              class: "mb-6"
            }, [
              createVNode("label", { class: "text-sm font-semibold text-gray-600 block mb-1" }, toDisplayString(field.label), 1),
              createVNode($setup["Field"], {
                name: field.name
              }, {
                default: withCtx(({ field: f, errors }) => [
                  createVNode("input", mergeProps({ ref_for: true }, f, {
                    placeholder: $setup.originalValues[field.name] || '—',
                    class: "w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }), null, 16, ["placeholder"]),
                  createVNode("p", { class: "text-red-500 text-sm mt-1" }, toDisplayString(errors[0]), 1)
                ]),
                _: 2
              }, 1032, ["name"])
            ])
          }), 64)),
          ($setup.successMessage)
            ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-green-600 text-sm text-center"
              }, toDisplayString($setup.successMessage), 1))
            : createCommentVNode("", true),
          ($setup.errorMessage)
            ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-red-600 text-sm text-center"
              }, toDisplayString($setup.errorMessage), 1))
            : createCommentVNode("", true),
          createVNode("button", {
            type: "submit",
            class: "w-full p-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
          }, toDisplayString($setup.loading ? "Updating..." : "Update"), 1)
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/profile/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Profile = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Let's Learn Student" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- <ProtectedRoute> --> ${renderComponent($$result2, "Profile", Profile, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/profile/Profile.vue", "client:component-export": "default" })} <!-- </ProtectedRoute> --> </main> ` })}`;
}, "C:/Users/USER/lms_student/src/pages/profile/index.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/profile/index.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
