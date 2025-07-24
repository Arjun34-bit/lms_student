import { c as createComponent, d as renderComponent, f as renderTemplate } from '../../chunks/astro/server_Batihp0E.mjs';
import 'kleur/colors';
import { r as registerSchema, $ as $$Auth } from '../../chunks/auth_BQTa5xpx.mjs';
import { useSSRContext, ref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { b as authRegisterApi } from '../../chunks/authQueries_DkoB0nJb.mjs';
import { useRouter } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';

const _sfc_main = {
  __name: 'Register',
  setup(__props, { expose: __expose }) {
  __expose();

const router = useRouter();
const submitError = ref("");

const onSubmit = async (values) => {
  submitError.value = "";
  try {
    const data = await authRegisterApi(values);
    if (data) {
      router.push("/auth/login");
    }
  } catch (err) {
    submitError.value = err?.response?.data
      ? err.response.data?.message || "Something went wrong."
      : "Unexpected error occurred.";
  }
};

const __returned__ = { router, submitError, onSubmit, ref, get Form() { return Form }, get Field() { return Field }, get ErrorMessage() { return ErrorMessage }, get registerSchema() { return registerSchema }, get authRegisterApi() { return authRegisterApi }, get useRouter() { return useRouter } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-orange-200 p-8 rounded shadow-lg w-full max-w-md" }, _attrs))}><h1 class="text-xl font-bold mb-4 text-center">Register</h1>`);
  _push(ssrRenderComponent($setup["Form"], {
    onSubmit: $setup.onSubmit,
    "validation-schema": $setup.registerSchema,
    class: "space-y-4"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div${
          _scopeId
        }><label class="block text-sm mb-1"${
          _scopeId
        }>Enter your Name:</label>`);
        _push(ssrRenderComponent($setup["Field"], {
          name: "name",
          type: "text",
          class: "input",
          placeholder: "Your Name"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent($setup["ErrorMessage"], {
          name: "name",
          class: "text-red-500 text-sm mt-1"
        }, null, _parent, _scopeId));
        _push(`</div><div${
          _scopeId
        }><label class="block text-sm mb-1"${
          _scopeId
        }>Enter your Email:</label>`);
        _push(ssrRenderComponent($setup["Field"], {
          name: "email",
          type: "email",
          class: "input",
          placeholder: "you@example.com"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent($setup["ErrorMessage"], {
          name: "email",
          class: "text-red-500 text-sm mt-1"
        }, null, _parent, _scopeId));
        _push(`</div><div${
          _scopeId
        }><label class="block text-sm mb-1"${
          _scopeId
        }>Enter your Password:</label>`);
        _push(ssrRenderComponent($setup["Field"], {
          name: "password",
          type: "password",
          class: "input",
          placeholder: "••••••••"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent($setup["ErrorMessage"], {
          name: "password",
          class: "text-red-500 text-sm mt-1"
        }, null, _parent, _scopeId));
        _push(`</div>`);
        if ($setup.submitError) {
          _push(`<div class="text-red-600 text-sm"${
            _scopeId
          }>${
            ssrInterpolate($setup.submitError)
          }</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="btn cursor-pointer"${
          _scopeId
        }>Create Account</button><div class="text-sm text-center mt-4"${
          _scopeId
        }> Already have an account? <a href="/auth/login" class="text-blue-600 underline ml-1"${
          _scopeId
        }>Login</a></div>`);
      } else {
        return [
          createVNode("div", null, [
            createVNode("label", { class: "block text-sm mb-1" }, "Enter your Name:"),
            createVNode($setup["Field"], {
              name: "name",
              type: "text",
              class: "input",
              placeholder: "Your Name"
            }),
            createVNode($setup["ErrorMessage"], {
              name: "name",
              class: "text-red-500 text-sm mt-1"
            })
          ]),
          createVNode("div", null, [
            createVNode("label", { class: "block text-sm mb-1" }, "Enter your Email:"),
            createVNode($setup["Field"], {
              name: "email",
              type: "email",
              class: "input",
              placeholder: "you@example.com"
            }),
            createVNode($setup["ErrorMessage"], {
              name: "email",
              class: "text-red-500 text-sm mt-1"
            })
          ]),
          createVNode("div", null, [
            createVNode("label", { class: "block text-sm mb-1" }, "Enter your Password:"),
            createVNode($setup["Field"], {
              name: "password",
              type: "password",
              class: "input",
              placeholder: "••••••••"
            }),
            createVNode($setup["ErrorMessage"], {
              name: "password",
              class: "text-red-500 text-sm mt-1"
            })
          ]),
          ($setup.submitError)
            ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-red-600 text-sm"
              }, toDisplayString($setup.submitError), 1))
            : createCommentVNode("", true),
          createVNode("button", {
            type: "submit",
            class: "btn cursor-pointer"
          }, "Create Account"),
          createVNode("div", { class: "text-sm text-center mt-4" }, [
            createTextVNode(" Already have an account? "),
            createVNode("a", {
              href: "/auth/login",
              class: "text-blue-600 underline ml-1"
            }, "Login")
          ])
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const RegisterForm = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$Auth, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RegisterForm", RegisterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/auth/Register.vue", "client:component-export": "default" })} ` })}`;
}, "C:/Users/USER/lms_student/src/pages/auth/register.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/auth/register.astro";
const $$url = "/auth/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
