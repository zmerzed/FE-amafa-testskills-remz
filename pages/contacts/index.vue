<script setup lang="ts">
import ApiError from '@/types/ApiError';
import dayjs from 'dayjs';
import { ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

const list = ref([]);
const meta = ref({});

const page = ref(1);
const search = ref('');
const sortedBy = ref('-created_at');
const loading = ref(false);

const loadUserList = async () => {
  loading.value = true;
  const { data, error } = await useApi('/contacts', {
    method: 'GET',
    params: { page },
  });

  if (error.value) {
    throw new ApiError(error.value);
  }

  list.value = data.value?.data ?? [];
  meta.value = data.value?.meta;
  loading.value = false;
};

onMounted(async () => {
  do {
    await loadUserList();
  } while (meta.value === undefined);
});

watch([page, search, sortedBy], () => {
  if (search.value.length > 1) {
    page.value = 1;
  }
  loadUserList();
});

const { deleteLoading, showConfirmDelete, handleDelete, selectedContact } = useDeleteContact();

const fields = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name' },
  { key: 'person', label: 'Contact Person', sortable: false },
  { key: 'actions', label: '' },
];
</script>
<template>
  <v-container fluid>
    <v-card class="pa-4">
      <v-card-title class="d-flex align-center">
        <h2 class="mb-4">Contacts</h2>
      </v-card-title>
      <v-card-text>
        <SimpleTable
          :items="list"
          :fields="fields"
          :pagination="{ currentPage: meta?.current_page, totalPages: meta?.last_page }"
          :loading="loading"
          @change-page="page = $event"
          @sort-page="
            sortedBy = $event;
            page = 1;
          "
        >
          <template #cell(full_name)="{ value, item }">
            <strong>{{ value }}</strong>
          </template>
          <template #cell(person)="{ value, item }">
            <strong>{{ item.person.name }}</strong>
          </template>
          <template #cell(actions)="{ item }">
            <div class="d-flex">
              <ContactDetailDialog :contact="item" @load-page="loadUserList()" />
              <v-btn
                class="ma-1"
                icon="mdi-delete"
                color="error"
                rounded="xl"
                flat
                size="x-small"
                @click="
                  selectedContact = item;
                  showConfirmDelete = true;
                "
              />
            </div>
          </template>
        </SimpleTable>
      </v-card-text>
    </v-card>

    <ConfirmDialog
      v-model="showConfirmDelete"
      title="Delete Contact"
      description="This action cannot be undone"
      :loading="deleteLoading"
      @confirm="handleDelete(undefined, () => loadUserList())"
      @cancel="showConfirmDelete = false"
    />
  </v-container>
</template>
