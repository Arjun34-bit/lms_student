import 'clsx';
import { p as push, a as pop } from './_@astro-renderers_DqP8FkpL.mjs';
import './authQueries_DkoB0nJb.mjs';

function NavBar($$payload, $$props) {
	push();

	$$payload.out += `<nav class="bg-white border-b border-gray-200 px-4 py-3 md:px-16 md:py-6 shadow-sm"><div class="flex items-center justify-between"><button type="button" class="text-xl font-bold text-blue-600 cursor-pointer">PerfectCoachingCenter</button>  <div class="hidden md:flex items-center gap-4 flex-1 justify-end"><input type="text" placeholder="Search..." class="border rounded-lg px-3 py-1 w-64 focus:outline-none focus:ring focus:ring-blue-300"/> <div class="flex items-center gap-3"><button type="button" class="cursor-pointer">Courses</button> <span>Pricing</span> `;

	{
		$$payload.out += '<!--[!-->';
		$$payload.out += `<span></span>`;
	}

	$$payload.out += `<!--]--></div> `;

	{
		$$payload.out += '<!--[!-->';
		$$payload.out += `<button class="text-gray-700 px-4 py-1.5 rounded-lg border border-blue-400 hover:text-blue-600 cursor-pointer">Login</button> <button class="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 cursor-pointer">Register</button>`;
	}

	$$payload.out += `<!--]--></div> <button class="md:hidden"><svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">`;

	{
		$$payload.out += '<!--[-->';
		$$payload.out += `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
	}

	$$payload.out += `<!--]--></svg></button></div> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--></nav>`;
	pop();
}

export { NavBar as N };
