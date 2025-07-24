import { c as createComponent, a as createAstro, b as renderHead, d as renderComponent, f as renderTemplate } from '../../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
/* empty css                                         */
import { f as fallback, c as escape_html, d as bind_props } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DqP8FkpL.mjs';
/* empty css                                       */

function Verified($$payload, $$props) {
	let message = fallback($$props['message'], "Verification complete!");

	$$payload.out += `<div class="verified svelte-loixjm" style="text-align: center; margin-top: 3rem;"><div class="icon svelte-loixjm">✅</div> <h1>Verification Successful</h1> <p>${escape_html(message)}</p> <div style="text-align: center; margin-top: 2rem;"><a href="/auth/login" style="text-decoration: underline;">Return to LoginPage</a></div></div>`;
	bind_props($$props, { message });
}

const $$Astro = createAstro();
const prerender = false;
const $$Verified = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Verified;
  const { request } = Astro2;
  const url = new URL(request.url);
  const message = url.searchParams.get("message") || "No message provided.";
  return renderTemplate`<html lang="en"> <head><title>Verification</title><meta charset="UTF-8">${renderHead()}</head> <body class="flex justify-center items-center h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 animate-bgFade transition-all duration-1000"> ${renderComponent($$result, "Verified", Verified, { "message": message })} </body></html>`;
}, "C:/Users/USER/lms_student/src/pages/student/verified.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/student/verified.astro";
const $$url = "/student/verified";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Verified,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
