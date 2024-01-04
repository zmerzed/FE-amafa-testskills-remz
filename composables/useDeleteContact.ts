import { User } from '~/types/User';

export const useDeleteContact = () => {
  const deleteLoading = ref(false);
  const showConfirmDelete = ref(false);
  const selectedContact = ref();
  const handleDelete = async (id?: string, cb?: () => void) => {
    deleteLoading.value = true;
    console.log('selectedContact', selectedContact.value)
    const { data, error } = await useApi(`/contacts/${id || selectedContact.value?.id}`, {
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
    selectedContact,
    handleDelete,
  };
};
