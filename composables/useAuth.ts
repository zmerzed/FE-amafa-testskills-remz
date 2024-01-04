import { useApi } from '@/composables/useApi';
import ApiError from '@/types/ApiError';
import type { Credentials, RegistrationInfo, User } from '@/types/User';
import { UserStore } from '@/stores/user';

export const useAuth = () => {  
  const user = UserStore();

  const config = useRuntimeConfig();
  const apiConfig = config.public;

  async function fetchUser() {
    const { data, error } = await useApi('/auth/me', { method: 'GET' });
    if (!error.value) {
      user.setUser(data.value?.data as User);
    } else {
      user.clearUser();
    }
  }

  async function login(credentials: Credentials) {
    const { data, error } = await useApi('/auth/login', {
      method: 'POST',
      body: credentials,
    });

    if (error.value) {
      throw new ApiError(error.value);
    }

    // const accessToken = useCookie(apiConfig.cookieName);
    // accessToken.value = data.value?.data?.access_token;

    user.setUser(data.value?.data?.user as User);
  }

  async function logout() {
    await useApi('/auth/logout', { method: 'POST' });
    user.clearUser();
    navigateTo('/login');
  }

  async function register(info: RegistrationInfo) {
    const register = await useApi('/auth/register', {
      method: 'POST',
      body: info,
    });

    await fetchUser();

    return register;
  }

  return {login, fetchUser, logout, register};
};
