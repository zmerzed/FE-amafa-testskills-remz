import { defineStore } from 'pinia';
import { User } from '@/types/User';

export const UserStore = defineStore('user', () => {
  const user = ref({});
  const isLoggedIn = computed(() => user.value?.id !== undefined);

  const setUser = (data: User) => (user.value = data);
  const getUser = computed(() => user.value);
  const clearUser = () => (user.value = {});

  return { user, isLoggedIn, setUser, getUser, clearUser };
}, {
  persist: {
    afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$id}'`)
    }
  }
});
