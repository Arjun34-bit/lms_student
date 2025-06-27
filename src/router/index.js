import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth/login",
    component: () => import("@/components/auth/Login.vue"),
  },
  {
    path: "/auth/register",
    component: () => import("@/components/auth/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
