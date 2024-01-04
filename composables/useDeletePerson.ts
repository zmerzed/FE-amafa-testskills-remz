import { User } from '~/types/User';

export const useDeletePerson = () => {
  const deleteLoading = ref(false);
  const showConfirmDelete = ref(false);
  const selectedPerson = ref();
  const handleDelete = async (id?: string, cb?: () => void) => {
    deleteLoading.value = true;
    console.log('selectedPerson', selectedPerson.value)
    const { data, error } = await useApi(`/persons/${id || selectedPerson.value?.id}`, {
      method: 'DELETE',
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
    selectedPerson,
    handleDelete,
  };
};
