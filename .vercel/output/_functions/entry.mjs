import { r as renderers } from './chunks/_@astro-renderers_DqP8FkpL.mjs';
import { c as createExports } from './chunks/entrypoint_C_jc5zqe.mjs';
import { manifest } from './manifest_OPD4RC7v.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/auth/login.astro.mjs');
const _page2 = () => import('./pages/auth/phone-signon.astro.mjs');
const _page3 = () => import('./pages/auth/register.astro.mjs');
const _page4 = () => import('./pages/course-program/_courseid_.astro.mjs');
const _page5 = () => import('./pages/courses/my-courses.astro.mjs');
const _page6 = () => import('./pages/courses/_courseid_.astro.mjs');
const _page7 = () => import('./pages/courses.astro.mjs');
const _page8 = () => import('./pages/live-classes.astro.mjs');
const _page9 = () => import('./pages/meetings.astro.mjs');
const _page10 = () => import('./pages/order-checkout/_courseid_.astro.mjs');
const _page11 = () => import('./pages/profile.astro.mjs');
const _page12 = () => import('./pages/student/verified.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/auth/login.astro", _page1],
    ["src/pages/auth/phone-signon.astro", _page2],
    ["src/pages/auth/register.astro", _page3],
    ["src/pages/course-program/[courseId].astro", _page4],
    ["src/pages/courses/my-courses.astro", _page5],
    ["src/pages/courses/[courseId].astro", _page6],
    ["src/pages/courses/index.astro", _page7],
    ["src/pages/live-classes/index.astro", _page8],
    ["src/pages/meetings/index.astro", _page9],
    ["src/pages/order-checkout/[courseId].astro", _page10],
    ["src/pages/profile/index.astro", _page11],
    ["src/pages/student/verified.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "6a3b08c7-d24b-4430-a53e-84c1f9402cf8",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
