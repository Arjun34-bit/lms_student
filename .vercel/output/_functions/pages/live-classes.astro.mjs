import { c as createComponent, b as renderHead, d as renderComponent, r as renderScript, f as renderTemplate } from '../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
/* empty css                                      */
import { p as push, e as ensure_array_like, b as attr, c as escape_html, a as pop } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';
import { N as NavBar } from '../chunks/NavBar_DVVXKwPL.mjs';

function SideBar($$payload, $$props) {
	push();

	let menuItems = [
		{
			name: "Dashboard",
			icon: "🏠",
			page: "dashboard"
		},
		{ name: "Classes", icon: "📚", page: "classes" },
		{
			name: "Assignments",
			icon: "📝",
			page: "assignments"
		},
		{
			name: "Settings",
			icon: "⚙️",
			page: "settings"
		}
	];

	const each_array = ensure_array_like(menuItems);

	$$payload.out += `<aside class="bg-gray-900 text-white w-64 min-h-screen p-4 shadow-lg"><nav class="flex flex-col gap-4 mt-8"><!--[-->`;

	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let item = each_array[$$index];

		$$payload.out += `<a${attr('href', `?page=${item.page}`)} class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition"><span class="text-xl">${escape_html(item.icon)}</span> <span class="text-sm">${escape_html(item.name)}</span></a>`;
	}

	$$payload.out += `<!--]--></nav></aside>`;
	pop();
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><title>Let's Learn | LiveClasses</title>${renderHead()}</head> <body class="h-screen overflow-hidden flex flex-col"> <div class="flex-shrink-0"> <!-- <StatusBar 
        name="John Doe" 
        avatar="https://i.pravatar.cc/40" 
        client:load 
      /> --> ${renderComponent($$result, "NavBar", NavBar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/miscellenous/NavBar.svelte", "client:component-export": "default" })} <div class="sm:hidden flex justify-end px-4 py-2 bg-gray-800"> <button id="toggleSidebar" class="text-white focus:outline-none text-2xl">
☰
</button> </div> </div> <div class="flex flex-1 overflow-hidden"> <div id="sidebar" class="bg-gray-900 text-white w-64 flex-shrink-0 transition-transform duration-300 ease-in-out -translate-x-full sm:translate-x-0"> ${renderComponent($$result, "SideBar", SideBar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/miscellenous/SideBar.svelte", "client:component-export": "default" })} </div> <main class="flex-1 overflow-y-auto bg-gray-100 p-4"> ${renderComponent($$result, "RouteView", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/lms_student/src/router/clientRender/RouteView.vue", "client:component-export": "default" })} </main> </div> ${renderScript($$result, "C:/Users/USER/lms_student/src/pages/live-classes/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/USER/lms_student/src/pages/live-classes/index.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/live-classes/index.astro";
const $$url = "/live-classes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
