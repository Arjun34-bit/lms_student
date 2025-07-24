import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_Batihp0E.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_CXXPGB-h.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_Vn-vcDSL.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/USER/lms_student/","cacheDir":"file:///C:/Users/USER/lms_student/node_modules/.astro/","outDir":"file:///C:/Users/USER/lms_student/dist/","srcDir":"file:///C:/Users/USER/lms_student/src/","publicDir":"file:///C:/Users/USER/lms_student/public/","buildClientDir":"file:///C:/Users/USER/lms_student/dist/client/","buildServerDir":"file:///C:/Users/USER/lms_student/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/login.astro","pathname":"/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/auth/phone-signon","isIndex":false,"type":"page","pattern":"^\\/auth\\/phone-signon\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"phone-signon","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/phone-signon.astro","pathname":"/auth/phone-signon","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/auth/register","isIndex":false,"type":"page","pattern":"^\\/auth\\/register\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/register.astro","pathname":"/auth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"},{"type":"external","src":"/_astro/_courseId_.DnL16J4o.css"}],"routeData":{"route":"/course-program/[courseid]","isIndex":false,"type":"page","pattern":"^\\/course-program\\/([^/]+?)\\/?$","segments":[[{"content":"course-program","dynamic":false,"spread":false}],[{"content":"courseId","dynamic":true,"spread":false}]],"params":["courseId"],"component":"src/pages/course-program/[courseId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/courses/my-courses","isIndex":false,"type":"page","pattern":"^\\/courses\\/my-courses\\/?$","segments":[[{"content":"courses","dynamic":false,"spread":false}],[{"content":"my-courses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/courses/my-courses.astro","pathname":"/courses/my-courses","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"},{"type":"external","src":"/_astro/_courseId_.DnL16J4o.css"}],"routeData":{"route":"/courses/[courseid]","isIndex":false,"type":"page","pattern":"^\\/courses\\/([^/]+?)\\/?$","segments":[[{"content":"courses","dynamic":false,"spread":false}],[{"content":"courseId","dynamic":true,"spread":false}]],"params":["courseId"],"component":"src/pages/courses/[courseId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/courses","isIndex":true,"type":"page","pattern":"^\\/courses\\/?$","segments":[[{"content":"courses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/courses/index.astro","pathname":"/courses","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/live-classes","isIndex":true,"type":"page","pattern":"^\\/live-classes\\/?$","segments":[[{"content":"live-classes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/live-classes/index.astro","pathname":"/live-classes","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"},{"type":"inline","content":"video[data-v-60b9bc46]{background-color:#000}\n"}],"routeData":{"route":"/meetings","isIndex":true,"type":"page","pattern":"^\\/meetings\\/?$","segments":[[{"content":"meetings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/meetings/index.astro","pathname":"/meetings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/order-checkout/[courseid]","isIndex":false,"type":"page","pattern":"^\\/order-checkout\\/([^/]+?)\\/?$","segments":[[{"content":"order-checkout","dynamic":false,"spread":false}],[{"content":"courseId","dynamic":true,"spread":false}]],"params":["courseId"],"component":"src/pages/order-checkout/[courseId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/profile","isIndex":true,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile/index.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"},{"type":"inline","content":".verified.svelte-loixjm{animation:svelte-loixjm-fadeInUp 1s ease-out forwards;opacity:0;transform:translateY(20px)}@keyframes svelte-loixjm-fadeInUp{to{opacity:1;transform:translateY(0)}}.icon.svelte-loixjm{font-size:4rem;color:green}\n"}],"routeData":{"route":"/student/verified","isIndex":false,"type":"page","pattern":"^\\/student\\/verified\\/?$","segments":[[{"content":"student","dynamic":false,"spread":false}],[{"content":"verified","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/student/verified.astro","pathname":"/student/verified","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_courseId_.2MYdhnDW.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/USER/lms_student/src/pages/live-classes/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/student/verified.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/courses/[courseId].astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/courses/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/courses/my-courses.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/order-checkout/[courseId].astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/profile/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/auth/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/auth/phone-signon.astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/lms_student/src/pages/auth/register.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/auth/phone-signon@_@astro":"pages/auth/phone-signon.astro.mjs","\u0000@astro-page:src/pages/auth/register@_@astro":"pages/auth/register.astro.mjs","\u0000@astro-page:src/pages/courses/my-courses@_@astro":"pages/courses/my-courses.astro.mjs","\u0000@astro-page:src/pages/courses/[courseId]@_@astro":"pages/courses/_courseid_.astro.mjs","\u0000@astro-page:src/pages/live-classes/index@_@astro":"pages/live-classes.astro.mjs","\u0000@astro-page:src/pages/profile/index@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/student/verified@_@astro":"pages/student/verified.astro.mjs","\u0000@astro-page:src/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/pages/courses/index@_@astro":"pages/courses.astro.mjs","\u0000@astro-page:src/pages/order-checkout/[courseId]@_@astro":"pages/order-checkout/_courseid_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/meetings/index@_@astro":"pages/meetings.astro.mjs","\u0000@astro-page:src/pages/course-program/[courseId]@_@astro":"pages/course-program/_courseid_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/USER/lms_student/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DyD8GWoC.mjs","\u0000@astrojs-manifest":"manifest_fbhmqWqX.mjs","C:/Users/USER/lms_student/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.BuSA3jUZ.js","C:/Users/USER/lms_student/src/components/auth/PhoneLoginForm.vue":"_astro/PhoneLoginForm.DbpILFnL.js","C:/Users/USER/lms_student/src/components/auth/Register.vue":"_astro/Register.GihYt6uv.js","C:/Users/USER/lms_student/src/components/courses/myCourse.vue":"_astro/myCourse.DpxqbB09.js","C:/Users/USER/lms_student/src/components/courses/CoursePage.vue":"_astro/CoursePage.B7F7Bvjd.js","C:/Users/USER/lms_student/src/miscellenous/SideBar.svelte":"_astro/SideBar.CWaZBcah.js","C:/Users/USER/lms_student/src/components/profile/Profile.vue":"_astro/Profile.eQzGB8rx.js","C:/Users/USER/lms_student/src/pages/live-classes/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BZF_cvPQ.js","C:/Users/USER/lms_student/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CpCSbQq-.js","C:/Users/USER/lms_student/src/components/courses/index.vue":"_astro/index.C4ZB_OTe.js","C:/Users/USER/lms_student/src/components/checkout/Order.vue":"_astro/Order.C3VehHDv.js","@astrojs/svelte/client.js":"_astro/client.svelte.DUuSwdJE.js","C:/Users/USER/lms_student/src/components/auth/Login.vue":"_astro/Login.BBweQfOs.js","C:/Users/USER/lms_student/src/miscellenous/NavBar.svelte":"_astro/NavBar.ClIpSr5B.js","@astrojs/vue/client.js":"_astro/client.BRXBJ24x.js","C:/Users/USER/lms_student/src/miscellenous/Carousel.svelte":"_astro/Carousel.B31WGvBx.js","C:/Users/USER/lms_student/src/components/course-view/CourseView.vue":"_astro/CourseView.BUdsA_Tz.js","C:/Users/USER/lms_student/src/router/clientRender/RouteView.vue":"_astro/RouteView.AR72gne9.js","C:/Users/USER/lms_student/src/miscellenous/ToggleBar.svelte":"_astro/ToggleBar.oTRGpfjt.js","C:/Users/USER/lms_student/node_modules/video.js/dist/video.es.js":"_astro/video.es.JJtOQPmY.js","C:/Users/USER/lms_student/node_modules/videojs-http-source-selector/dist/videojs-http-source-selector.es.js":"_astro/videojs-http-source-selector.es.DSg6uvzn.js","C:/Users/USER/lms_student/src/components/classes/LiveMeeting.vue":"_astro/LiveMeeting.Cks-qEEk.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/USER/lms_student/src/pages/live-classes/index.astro?astro&type=script&index=0&lang.ts","document.getElementById(\"toggleSidebar\");document.getElementById(\"sidebar\");"],["C:/Users/USER/lms_student/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"course-banner\");e&&e.classList.remove(\"hidden\")});"]],"assets":["/_astro/primeicons.DMOk5skT.eot","/_astro/primeicons.C6QP2o4f.woff2","/_astro/primeicons.WjwUDZjB.woff","/_astro/primeicons.MpK4pl85.ttf","/_astro/primeicons.Dr5RGzOO.svg","/_astro/_courseId_.2MYdhnDW.css","/_astro/_courseId_.DnL16J4o.css","/favicon.svg","/_astro/attributes.DhJO9S2q.js","/_astro/auth.z8zRmViH.js","/_astro/authQueries.BcGoVAi4.js","/_astro/Carousel.B31WGvBx.js","/_astro/client.BRXBJ24x.js","/_astro/client.D6J25A0q.js","/_astro/client.svelte.DUuSwdJE.js","/_astro/config.CyDGhkV7.js","/_astro/CoursePage.B7F7Bvjd.js","/_astro/courseQueries._IkP52RI.js","/_astro/courseStore._GKmWtHz.js","/_astro/CourseView.BUdsA_Tz.js","/_astro/custom.CNYEwjHG.js","/_astro/each.CZcw8N-A.js","/_astro/if.Of6ofoy6.js","/_astro/index.C4ZB_OTe.js","/_astro/index.CA_U3Cia.css","/_astro/index.CzCXCN60.js","/_astro/index.esm.Chc3UFwl.js","/_astro/Layout.astro_astro_type_script_index_1_lang.BuSA3jUZ.js","/_astro/legacy.EXlpXrTY.js","/_astro/lifecycle.BCK6FfV9.js","/_astro/LiveMeeting.Cks-qEEk.js","/_astro/localStorageUtils.BuRq4_r3.js","/_astro/Login.BBweQfOs.js","/_astro/myCourse.DpxqbB09.js","/_astro/NavBar.ClIpSr5B.js","/_astro/Order.C3VehHDv.js","/_astro/PhoneLoginForm.DbpILFnL.js","/_astro/Profile.eQzGB8rx.js","/_astro/Register.GihYt6uv.js","/_astro/render.CYfolAOp.js","/_astro/RouteView.AR72gne9.js","/_astro/runtime-core.esm-bundler.BJGitzCl.js","/_astro/runtime-dom.esm-bundler.Cz-NaV3a.js","/_astro/SideBar.CWaZBcah.js","/_astro/template.BvyfSGDP.js","/_astro/ToggleBar.oTRGpfjt.js","/_astro/video.es.JJtOQPmY.js","/_astro/videojs-http-source-selector.es.DSg6uvzn.js","/_astro/VideoPlayer.B8r7HkVE.js","/_astro/vue-router.rSLn8AWk.js","/_astro/_commonjsHelpers.D6-XlEtG.js","/_astro/_plugin-vue_export-helper.DlAUqK2U.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"L6Gk0hO+nTZMvIChuwLTNSIb/yiCIPL7PejwrcD9A1k="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
