import { ref } from 'vue';
export const useFetchUser = () => {
  const route = useRoute();

  const user = ref({});
  const getUser = async () => {
    const { data } = await useApi(`/users/${route.params.id}`, {
      method: 'GET',
      params: {},
    });
    user.value = data.value.data;
  };

  return {
    user,
    getUser,
  };
};
