import { UserStore } from '@/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const user = UserStore();

  if (user.isLoggedIn) {
    return navigateTo('/', { replace: true });
  }
});
