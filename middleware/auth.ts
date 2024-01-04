import { UserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = UserStore();

  if (!user.isLoggedIn) {
    //return navigateTo('/login', { replace: true });
  }
});
