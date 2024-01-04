import { User } from '~/types/User';

export const useDeleteUser = () => {
  const deleteLoading = ref(false);
  const showConfirmDelete = ref(false);
  const selectedUser = ref<User>();
  const handleDelete = async (id?: string, cb?: () => void) => {
    deleteLoading.value = true;
    const { data, error } = await useApi(`/users/${id || selectedUser.value?.id}`, {
      method: 'DELETE',
      params: { include: 'business' },
    });

    if (error.value) {
      // TODO: Throw an error
    }
    deleteLoading.value = false;
    showConfirmDelete.value = false;
    cb && cb();
  };

  return {
    deleteLoading,
    showConfirmDelete,
    selectedUser,
    handleDelete,
  };
};
