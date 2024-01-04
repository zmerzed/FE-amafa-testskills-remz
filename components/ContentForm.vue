<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    type?: 'terms_of_service' | 'privacy';
  }>(),
  {
    title: 'Terms of Service',
    type: 'terms_of_service',
  }
);

const { validations } = useValidation();
const route = useRoute();
const router = useRouter();

const { data, error } = await useApi(`/settings/pages/${props.type}`, {
  method: 'GET',
});

const form = ref({
  content: data.value?.data?.content || "<p></p>",
  type: props.type,
});

const loading = ref(false);
const contentErrors = ref();

const rules = {
  content: {
    required: validations.required('Content'),
  },
};
const v$ = useVuelidate(rules, form, { $autoDirty: true });
const handleUpdate = async () => {
  if (!(await v$.value.$validate())) return;
  loading.value = true;
  const { data, error } = await useApi(`/settings/pages`, {
    method: 'POST',
    body: {
      ...form.value,
    },
  });
  loading.value = false;
  if (error.value) {
    contentErrors.value = error.value;

    return;
  }

  isEditing.value = false;
};

const errors = computed(() => {
  return Object.keys(form.value).reduce((prev, curr) => {
    prev[curr] = v$.value[curr]?.$errors[0]?.$message || contentErrors.value?.data?.errors?.[curr]?.[0];

    return prev;
  }, {});
});
const isEditing = ref(false);
</script>

<template>
  <v-container fluid>
    <v-form @submit.prevent="handleUpdate">
      <v-card width="100%" max-width="800px" min-height="500px" class="pa-5 custom-card" flat>
        <v-card-title class="mb-10 d-flex align-items-center">
          <h5 class="mb-2 font-title-3">{{ title }}</h5>
          <div class="d-flex align-center ml-auto">
            <v-btn
              prepend-icon="mdi-pencil"
              rounded="xl"
              elevation="0"
              color="tertiary"
              :loading="loading"
              v-if="!isEditing"
              @click="isEditing = !isEditing"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="isEditing"
              rounded="xl"
              elevation="0"
              :disabled="loading"
              prepend-icon="mdi-cancel"
              @click="
                isEditing = !isEditing;
                resetFields();
              "
              class="mr-2"
            >
              Cancel
            </v-btn>
            <v-btn
              v-if="isEditing"
              rounded="xl"
              elevation="0"
              color="primary"
              type="submit"
              :loading="loading"
              prepend-icon="mdi-content-save"
            >
              Save
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>
              <ClientOnly>
                <CustomEditor ref="termsRef" :read-only="!isEditing" v-model="form.content" />
              </ClientOnly>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
