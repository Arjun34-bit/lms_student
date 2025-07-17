import { defineMiddleware } from "astro:middleware";
import type { MiddlewareNext } from "astro";

export const onRequest = defineMiddleware(
  async ({ request, redirect }, next: MiddlewareNext) => {
    const cookie = request.headers.get("cookie") || "";
    const token = cookie.match(/auth_token=([^;]+)/)?.[1];

    const protectedRoutes: string[] = [
      "/profile",
      "/order-checkout/",
      "/courses/my-courses",
      "/live-classes",
    ];

    const pathname = new URL(request.url).pathname;

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected && !token) {
      return redirect("/auth/login");
    }

    return next();
  }
);
