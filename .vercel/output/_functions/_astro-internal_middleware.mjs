import { d as defineMiddleware, s as sequence } from './chunks/index_BqxM5f1F.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BU8szlQv.mjs';
import 'kleur/colors';
import './chunks/astro/server_BhpNIqto.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(
  async ({ request, redirect }, next) => {
    const cookie = request.headers.get("cookie") || "";
    const token = cookie.match(/auth_token=([^;]+)/)?.[1];
    const protectedRoutes = [
      "/profile",
      "/order-checkout/",
      "/courses/my-courses",
      "/live-classes"
    ];
    const pathname = new URL(request.url).pathname;
    const isProtected = protectedRoutes.some(
      (route) => pathname.startsWith(route)
    );
    if (isProtected && !token) {
      return redirect("/auth/login");
    }
    return next();
  }
);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
