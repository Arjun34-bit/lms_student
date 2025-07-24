import { c as createComponent, d as renderComponent, f as renderTemplate } from '../../chunks/astro/server_Batihp0E.mjs';
import 'kleur/colors';
import { l as loginSchema, $ as $$Auth } from '../../chunks/auth_BQTa5xpx.mjs';
import { useSSRContext, ref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, withDirectives, vModelCheckbox, openBlock, toDisplayString, createTextVNode } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { c as googleSigninApi, d as authLoginApi } from '../../chunks/authQueries_DkoB0nJb.mjs';
import { s as setItem } from '../../chunks/localStorageUtils_xJkj8yAm.mjs';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { a as auth$1 } from '../../chunks/config_BVgi7ZYL.mjs';
import Cookies from 'js-cookie';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';

// src/firebaseConfig.js

const firebaseConfig = {
  apiKey: "AIzaSyBa_nvuocb7atvfwioFA2LNJMZBkL2rc2w",
  authDomain: "pcc-mobile-app-84266.firebaseapp.com",
  projectId: "pcc-mobile-app-84266",
  storageBucket: "pcc-mobile-app-84266.appspot.com",
  messagingSenderId: "30873318956",
  appId: "1:30873318956:web:35aae1bc2cc6c97ac18389",
  measurementId: "G-1572PJXEVT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle Google Sign-In
const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Returns user details
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// const router = useRouter();


const _sfc_main = {
  __name: 'Login',
  setup(__props, { expose: __expose }) {
  __expose();

const loading = ref(false);
const submitError = ref("");
const remember = ref(false);

const goToPhoneLogin = () => {
  window.location.href = "/auth/phone-signon";
};

const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: 30,
    path: "/",
    secure: true,
    sameSite: "Strict",
  });
};

const onSubmit = async (values) => {
  submitError.value = "";
  console.log("Submitted values:", values);
  try {
    loading.value = true;
    const response = await authLoginApi(values);
    if (response?.data?.access_token && response?.data?.user) {
      setItem("token", response?.data?.access_token);
      setItem("user", response?.data?.user);
      setCookie("token", response?.data?.access_token);
      setTimeout(() => (window.location.href = "/"), 2000);
    }
    loading.value = false;
  } catch (err) {
    loading.value = false;
    submitError.value = err?.response?.data
      ? err.response.data?.message || "Something went wrong."
      : "Unexpected error occurred.";
  }
};

let signingIn = false;

const handleGoogleLogin = async () => {
  console.log("Google");
  if (signingIn) return;
  signingIn = true;
  try {
    await signOut(auth$1);
    const userCredential = await signInWithGoogle();
    const idToken = await userCredential.getIdToken();
    const loginResponse = await googleSigninApi(idToken);
    if (loginResponse?.data?.access_token && loginResponse?.data?.user) {
      setItem("token", loginResponse?.data?.access_token);
      setItem("user", loginResponse?.data?.user);
      setTimeout(() => (window.location.href = "/"), 2000);
    }
  } catch (err) {
    console.log(err);
    submitError.value = err?.response?.data
      ? err.response.data?.message || "Something went wrong."
      : "Unexpected error occurred.";
  }
};

const handleFacebookLogin = () => {};

const __returned__ = { loading, submitError, remember, goToPhoneLogin, setCookie, onSubmit, get signingIn() { return signingIn }, set signingIn(v) { signingIn = v; }, handleGoogleLogin, handleFacebookLogin, ref, get Form() { return Form }, get Field() { return Field }, get ErrorMessage() { return ErrorMessage }, get loginSchema() { return loginSchema }, get authLoginApi() { return authLoginApi }, get googleSigninApi() { return googleSigninApi }, get setItem() { return setItem }, get signInWithGoogle() { return signInWithGoogle }, get signOut() { return signOut }, get auth() { return auth$1 }, get Cookies() { return Cookies } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-blue-300 p-8 rounded shadow-lg w-full max-w-md" }, _attrs))}><h1 class="text-xl font-bold mb-4 text-center">Login Form</h1>`);
  _push(ssrRenderComponent($setup["Form"], {
    onSubmit: $setup.onSubmit,
    "validation-schema": $setup.loginSchema,
    class: "space-y-4"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div${
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
          placeholder: "Enter Your Password"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent($setup["ErrorMessage"], {
          name: "password",
          class: "text-red-500 text-sm mt-1"
        }, null, _parent, _scopeId));
        _push(`</div><div class="flex items-center gap-2"${
          _scopeId
        }><input type="checkbox"${
          (ssrIncludeBooleanAttr((Array.isArray($setup.remember))
            ? ssrLooseContain($setup.remember, null)
            : $setup.remember)) ? " checked" : ""
        }${
          _scopeId
        }><label${
          _scopeId
        }>Remember me</label></div>`);
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
        }>${
          ssrInterpolate($setup.loading ? "LogginIn...." : "Login")
        }</button><div class="text-sm text-center mt-2"${
          _scopeId
        }><a href="/auth/forgot-password" class="text-blue-600 underline"${
          _scopeId
        }>Forget Password</a></div><div class="text-sm text-center mt-4"${
          _scopeId
        }> Don&#39;t have an account? <a href="/auth/register" class="text-blue-600 underline ml-1"${
          _scopeId
        }>Sign Up</a></div><hr${
          _scopeId
        }><div class="mt-2 flex justify-center items center gap-2"${
          _scopeId
        }><button type="button" class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow transform transition duration-200 hover:scale-105"${
          _scopeId
        }><i class="pi pi-google text-xl text-red-600"${
          _scopeId
        }></i></button><button type="button" class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow transform transition duration-200 hover:scale-105"${
          _scopeId
        }><i class="pi pi-facebook text-xl text-blue-600"${
          _scopeId
        }></i></button></div><div class="flex flex-col items-center mt-2"${
          _scopeId
        }><span class="text-center"${
          _scopeId
        }>OR</span><span class="cursor-pointer font-semibold mt-2 bg-gray-200 py-2 px-3 rounded-md"${
          _scopeId
        }>Login via Phone</span></div>`);
      } else {
        return [
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
              placeholder: "Enter Your Password"
            }),
            createVNode($setup["ErrorMessage"], {
              name: "password",
              class: "text-red-500 text-sm mt-1"
            })
          ]),
          createVNode("div", { class: "flex items-center gap-2" }, [
            withDirectives(createVNode("input", {
              type: "checkbox",
              "onUpdate:modelValue": $event => (($setup.remember) = $event)
            }, null, 8, ["onUpdate:modelValue"]), [
              [vModelCheckbox, $setup.remember]
            ]),
            createVNode("label", null, "Remember me")
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
          }, toDisplayString($setup.loading ? "LogginIn...." : "Login"), 1),
          createVNode("div", { class: "text-sm text-center mt-2" }, [
            createVNode("a", {
              href: "/auth/forgot-password",
              class: "text-blue-600 underline"
            }, "Forget Password")
          ]),
          createVNode("div", { class: "text-sm text-center mt-4" }, [
            createTextVNode(" Don't have an account? "),
            createVNode("a", {
              href: "/auth/register",
              class: "text-blue-600 underline ml-1"
            }, "Sign Up")
          ]),
          createVNode("hr"),
          createVNode("div", { class: "mt-2 flex justify-center items center gap-2" }, [
            createVNode("button", {
              type: "button",
              class: "w-10 h-10 flex items-center justify-center bg-white rounded-full shadow transform transition duration-200 hover:scale-105",
              onClick: $setup.handleGoogleLogin
            }, [
              createVNode("i", { class: "pi pi-google text-xl text-red-600" })
            ]),
            createVNode("button", {
              type: "button",
              class: "w-10 h-10 flex items-center justify-center bg-white rounded-full shadow transform transition duration-200 hover:scale-105",
              onClick: $setup.handleFacebookLogin
            }, [
              createVNode("i", { class: "pi pi-facebook text-xl text-blue-600" })
            ])
          ]),
          createVNode("div", { class: "flex flex-col items-center mt-2" }, [
            createVNode("span", { class: "text-center" }, "OR"),
            createVNode("span", {
              onClick: $setup.goToPhoneLogin,
              class: "cursor-pointer font-semibold mt-2 bg-gray-200 py-2 px-3 rounded-md"
            }, "Login via Phone")
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const LoginForm = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$Auth, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/auth/Login.vue", "client:component-export": "default" })} ` })}`;
}, "C:/Users/USER/lms_student/src/pages/auth/login.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
