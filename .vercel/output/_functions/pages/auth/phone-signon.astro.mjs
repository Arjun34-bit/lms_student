import { c as createComponent, d as renderComponent, f as renderTemplate } from '../../chunks/astro/server_Batihp0E.mjs';
import 'kleur/colors';
import { p as phoneLoginSchema, $ as $$Auth } from '../../chunks/auth_BQTa5xpx.mjs';
import { useSSRContext, ref, mergeProps, withCtx, createVNode } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { a as auth } from '../../chunks/config_BVgi7ZYL.mjs';
import { a as authLoginWithPhoneApi } from '../../chunks/authQueries_DkoB0nJb.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';

const _sfc_main = {
  __name: 'PhoneLoginForm',
  setup(__props, { expose: __expose }) {
  __expose();

const showOtpModal = ref(false);
const otp = ref("");
const verificationId = ref(null);

const onSubmit = async (values) => {
  const fullPhone = `+91${values.phone}`;

  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      await window.recaptchaVerifier.render();
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      fullPhone,
      appVerifier
    );

    verificationId.value = confirmationResult;

    window.confirmationResult = confirmationResult;
    showOtpModal.value = true;
  } catch (error) {
    console.error("OTP Send Failed:", error);
    alert("Failed to send OTP");
  }
};

const verifyOtp = async () => {
  try {
    const credential = await verificationId.value.confirm(otp.value);
    const idToken = credential.user.getIdToken();

    const response = await authLoginWithPhoneApi(idToken);
    if (response?.data?.access_token && response?.data?.user) {
      setItem("token", response?.data?.access_token);
      setItem("user", response?.data?.user);
      setTimeout(() => (window.location.href = "/"), 2000);
    }
    console.log("Phone Auth Successful:", user);
    alert("OTP Verified! Login successful.");
    showOtpModal.value = false;
  } catch (err) {
    alert("Invalid OTP");
    console.error("OTP Verification Error:", err);
  }
};

const __returned__ = { showOtpModal, otp, verificationId, onSubmit, verifyOtp, ref, get Form() { return Form }, get Field() { return Field }, get ErrorMessage() { return ErrorMessage }, get phoneLoginSchema() { return phoneLoginSchema }, get RecaptchaVerifier() { return RecaptchaVerifier }, get signInWithPhoneNumber() { return signInWithPhoneNumber }, get auth() { return auth }, get authLoginWithPhoneApi() { return authLoginWithPhoneApi } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto bg-white p-6 rounded shadow mt-10" }, _attrs))}><div id="recaptcha-container"></div><h2 class="text-xl font-semibold text-center mb-4"> Login or Register with Phone Number </h2>`);
  _push(ssrRenderComponent($setup["Form"], {
    onSubmit: $setup.onSubmit,
    "validation-schema": $setup.phoneLoginSchema
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div class="flex gap-2 mb-4"${
          _scopeId
        }><div class="w-1/3"${
          _scopeId
        }><label class="block text-sm font-medium mb-1"${
          _scopeId
        }>Country</label>`);
        _push(ssrRenderComponent($setup["Field"], {
          as: "select",
          name: "country",
          class: "w-full p-2 border rounded"
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<option disabled value=""${
                _scopeId
              }>--</option><option value="IN"${
                _scopeId
              }>IN 🇮🇳</option><option value="US"${
                _scopeId
              }>US 🇺🇸</option><option value="UK"${
                _scopeId
              }>UK 🇬🇧</option>`);
            } else {
              return [
                createVNode("option", {
                  disabled: "",
                  value: ""
                }, "--"),
                createVNode("option", { value: "IN" }, "IN 🇮🇳"),
                createVNode("option", { value: "US" }, "US 🇺🇸"),
                createVNode("option", { value: "UK" }, "UK 🇬🇧")
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
        _push(ssrRenderComponent($setup["ErrorMessage"], {
          name: "country",
          class: "text-red-500 text-sm mt-1"
        }, null, _parent, _scopeId));
        _push(`</div><div class="w-2/3"${
          _scopeId
        }><label class="block text-sm font-medium mb-1"${
          _scopeId
        }>Phone Number</label>`);
        _push(ssrRenderComponent($setup["Field"], {
          name: "phone",
          placeholder: "9876543210",
          class: "w-full p-2 border rounded"
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent($setup["ErrorMessage"], {
          name: "phone",
          class: "text-red-500 text-sm mt-1"
        }, null, _parent, _scopeId));
        _push(`</div></div><div class="text-center"${
          _scopeId
        }><button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"${
          _scopeId
        }> Send OTP </button></div>`);
      } else {
        return [
          createVNode("div", { class: "flex gap-2 mb-4" }, [
            createVNode("div", { class: "w-1/3" }, [
              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Country"),
              createVNode($setup["Field"], {
                as: "select",
                name: "country",
                class: "w-full p-2 border rounded"
              }, {
                default: withCtx(() => [
                  createVNode("option", {
                    disabled: "",
                    value: ""
                  }, "--"),
                  createVNode("option", { value: "IN" }, "IN 🇮🇳"),
                  createVNode("option", { value: "US" }, "US 🇺🇸"),
                  createVNode("option", { value: "UK" }, "UK 🇬🇧")
                ]),
                _: 1
              }),
              createVNode($setup["ErrorMessage"], {
                name: "country",
                class: "text-red-500 text-sm mt-1"
              })
            ]),
            createVNode("div", { class: "w-2/3" }, [
              createVNode("label", { class: "block text-sm font-medium mb-1" }, "Phone Number"),
              createVNode($setup["Field"], {
                name: "phone",
                placeholder: "9876543210",
                class: "w-full p-2 border rounded"
              }),
              createVNode($setup["ErrorMessage"], {
                name: "phone",
                class: "text-red-500 text-sm mt-1"
              })
            ])
          ]),
          createVNode("div", { class: "text-center" }, [
            createVNode("button", {
              type: "submit",
              class: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            }, " Send OTP ")
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
  if ($setup.showOtpModal) {
    _push(`<div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"><h3 class="text-lg font-bold mb-4 text-center">Enter OTP</h3><input${ssrRenderAttr("value", $setup.otp)} type="text" maxlength="6" class="w-full p-2 border rounded mb-4 text-center" placeholder="Enter 6-digit code"><div class="flex justify-between"><button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"> Verify OTP </button><button class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"> Cancel </button></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/auth/PhoneLoginForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const PhoneLoginForm = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const prerender = false;
const $$PhoneSignon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$Auth, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PhoneLoginForm", PhoneLoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/components/auth/PhoneLoginForm.vue", "client:component-export": "default" })} ` })}`;
}, "C:/Users/USER/lms_student/src/pages/auth/phone-signon.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/auth/phone-signon.astro";
const $$url = "/auth/phone-signon";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PhoneSignon,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
