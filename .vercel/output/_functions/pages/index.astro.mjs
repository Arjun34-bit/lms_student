import { c as createComponent, f as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BhpNIqto.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C4bnNtuO.mjs';
import 'clsx';
/* empty css                                      */
import { e as ensure_array_like, g as attr_style, b as attr, h as attr_class, s as stringify, c as escape_html } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DqP8FkpL.mjs';

const $$CourseList = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- ---
// src/pages/courses.astro
import CourseCard from '../components/CourseCard.vue';

const courses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript.',
    instructor: 'John Doe',
    price: 19.99,
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into modern JavaScript concepts and frameworks.',
    instructor: 'Jane Smith',
    price: 29.99,
  },
  {
    id: 3,
    title: 'Vue.js for Beginners',
    description: 'Get started with the Vue.js framework.',
    instructor: 'Alice Johnson',
    price: 24.99,
  },
  {
    id: 4,
    title: 'Svelte.js Fundamentals',
    description: 'Understand the core concepts of Svelte.js.',
    instructor: 'Bob Williams',
    price: 24.99,
  },
];
---

<section class="max-w-7xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6 text-center">Tech Courses</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {courses.map(course => (
      <CourseCard course={course} client:load key={course.id} />
    ))}
  </div>
</section> -->`;
}, "C:/Users/USER/lms_student/src/components/CourseList.astro", void 0);

function Carousel($$payload) {
	let current = 0;

	const images = [
		'https://img-c.udemycdn.com/notices/web_carousel_slide/image/bedc6aeb-62a6-48d1-a8c3-187c075b1fe4.jpg',
		'https://img-c.udemycdn.com/notices/web_carousel_slide/image/7e010ca8-97a0-486c-87e1-2eb7bdcacc28.png'
	];
	const each_array = ensure_array_like(images);
	const each_array_1 = ensure_array_like(images);

	$$payload.out += `<div class="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl shadow-lg mt-4"><div class="flex transition-transform duration-500"${attr_style(`transform: translateX(-${stringify(current * 100)}%)`)}><!--[-->`;

	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let img = each_array[$$index];

		$$payload.out += `<img${attr('src', img)} alt="" class="w-full flex-shrink-0 object-cover h-64 md:h-96"/>`;
	}

	$$payload.out += `<!--]--></div> <button class="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow" aria-label="Previous slide">‹</button> <button class="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow" aria-label="Next slide">›</button> <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2"><!--[-->`;

	for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
		each_array_1[index];

		$$payload.out += `<button${attr('aria-label', `Go to slide ${index + 1}`)}${attr_class('w-3 h-3 rounded-full transition-all', undefined, {
			'bg-blue-600': current === index,
			'bg-gray-300': current !== index
		})}></button>`;
	}

	$$payload.out += `<!--]--></div></div>`;
}

function Features($$payload) {
	const cards = [
		{
			title: 'Courses',
			subtitle: 'Gain Practical Experience',
			bg: 'bg-green-200',
			icon: '📚'
		},
		{
			title: 'Mentorships',
			subtitle: 'Guidance From Top Instructors',
			bg: 'bg-orange-200',
			icon: '👨‍🏫'
		},
		{
			title: 'Live Classes',
			subtitle: 'Learn By Interacting',
			bg: 'bg-blue-200',
			icon: '💼'
		},
		{
			title: 'Practice',
			subtitle: 'Refine Skills Daily',
			bg: 'bg-purple-200',
			icon: '⌨️'
		},
		{
			title: 'Assignments',
			subtitle: 'Battle For Excellence',
			bg: 'bg-yellow-200',
			icon: '🏆'
		},
		{
			title: 'More',
			subtitle: '',
			bg: 'bg-pink-200',
			icon: '➕'
		}
	];

	const each_array = ensure_array_like(cards);

	$$payload.out += `<div class="bg-white min-h-screen px-6 py-12"><div class="max-w-6xl mx-auto mb-12"><h1 class="text-4xl font-bold text-gray-900"><span class="text-blue-700">Unlock</span> Your Career</h1> <p class="text-gray-600 mt-4 text-lg max-w-xl">Explore opportunities from across the globe to grow, showcase skills, gain CV points &amp; get hired by your dream company.</p> <div class="inline-flex items-center bg-indigo-100 px-4 py-2 rounded-full mt-6 shadow-sm"><span class="text-xl mr-2">💎</span> <span class="text-sm font-semibold text-indigo-800">Get 1000 CV points on your first assignment</span></div></div> <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"><!--[-->`;

	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let card = each_array[$$index];

		$$payload.out += `<div${attr_class(`rounded-2xl p-6 flex items-center justify-between shadow-md ${card.bg}`)}><div><h3 class="text-xl font-semibold text-gray-900">${escape_html(card.title)}</h3> `;

		if (card.subtitle) {
			$$payload.out += '<!--[-->';
			$$payload.out += `<p class="text-sm text-gray-700 mt-1">${escape_html(card.subtitle)}</p>`;
		} else {
			$$payload.out += '<!--[!-->';
		}

		$$payload.out += `<!--]--></div> <div class="text-4xl">${escape_html(card.icon)}</div></div>`;
	}

	$$payload.out += `<!--]--></div></div>`;
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Let's Learn Student" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- <h1>Welcome to PCC Student!</h1> --> ${renderComponent($$result2, "Carousel", Carousel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/lms_student/src/miscellenous/Carousel.svelte", "client:component-export": "default" })} <!-- <p>Explore our courses:</p> --> ${renderComponent($$result2, "CourseList", $$CourseList, {})} <!-- Features  --> ${renderComponent($$result2, "Features", Features, {})} </main> ` })}`;
}, "C:/Users/USER/lms_student/src/pages/index.astro", void 0);

const $$file = "C:/Users/USER/lms_student/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
