<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
const { validations } = useValidation();

// const emits = defineEmits<{
//   (e: 'load-page'): void;
// }>();
const emits = defineEmits(['load-page'])

const props = withDefaults(
  defineProps<{
    open?: boolean;
    person?: {
      id?: number;
      name: string;
      contacts: Array;
    };
    isCreating?: boolean;
    error?: string;
  }>(),
  {
    open: false,
    isCreating: false,
    error: '',
  }
);

const showDialog = ref(false);

const form = ref({
  id: props.person?.id,
  name: props.person?.name,
  contacts: props.person?.contacts ?? []
});

const resetFields = () => {
  Object.keys(form.value).forEach((key) => {
    form.value[key] = props.person[key];
  });
};

const loading = ref(false);
const userErrors = ref();

let rules = {
  name: {
    required: validations.required('Name'),
  }
};
if (props.isCreating) {

}

const v$ = useVuelidate(rules, form, { $autoDirty: true });
const handleUpdate = async () => {
  if (!(await v$.value.$validate())) return;
  loading.value = true;
  console.log('form', form.value)
  const { data, error } = await useApi(props.isCreating ? '/persons' : `/persons/${props.person.id}/`, {
    method: form.value.id ? 'PUT' : 'POST',
    body: form.value,
  });

  loading.value = false;

  if (error.value) {
    userErrors.value = error.value;

    return;
  } else {
    emits('load-page');
  }

  if (props.isCreating) {
    showDialog.value = false;
  }

  isEditing.value = false;
};

const errors = computed(() => {
  return Object.keys(form.value).reduce((prev, curr) => {
    prev[curr] = v$.value[curr]?.$errors[0]?.$message || userErrors.value?.data?.errors?.[curr]?.[0];

    return prev;
  }, {});
});

const isEditing = ref(false);

const fullNameRef = ref();
watch([showDialog, isEditing], () => {
  if (showDialog.value || isEditing.value) {
    setTimeout(() => {
      fullNameRef.value.focus();
    }, 300);
  }
});

function addContact() {
  form.value.contacts.push({name:null})
}
</script>

<template>
  <div>
    <v-dialog v-model="showDialog" persistent width="600">
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="isCreating"
          prepend-icon="mdi-account-plus"
          rounded="md"
          elevation="0"
          color="primary"
          size="large"
          v-bind="props"
        >
          Add Person
        </v-btn>
        <v-btn v-else class="ma-1" icon="mdi-eye" color="primary" rounded="xl" flat size="x-small" v-bind="props" />
      </template>
      <v-card>
        <v-card-title>
          <div class="d-flex">
            <span class="text-h5">{{ isCreating ? 'Add new person' : 'Edit Person' }}</span>
            <v-spacer />
            <v-btn
              class="ma-1"
              icon="mdi-close"
              color="grey"
              rounded="xl"
              flat
              size="x-small"
              @click="showDialog = false"
            />
          </div>
        </v-card-title>
        <v-form @submit.prevent="handleUpdate">
          <v-card-text>
            <v-container fluid>
              <v-alert type="error" v-if="error">User not found</v-alert>

              <v-card class="custom-card" flat>
                <v-card-text>

                  <v-row no-gutters style="gap: 12px">
                    <v-col>
                      <v-text-field
                        ref="fullNameRef"
                        label="Name"
                        variant="outlined"
                        color="primary"
                        class="mb-2"
                        rounded="xl"
                        v-model="form.name"
                        :readonly="loading"
                        :disabled="!isEditing && !isCreating"
                        :error-messages="errors.name"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card class="custom-card" flat>
                <v-card-text>
                    <div class="d-flex pl-8 pt-8">
                      <h4 >Contacts</h4>
                      <v-btn class="ml-auto"
                      prepend-icon="mdi-plus"
                      rounded="xl"
                      elevation="0"
                      :disabled="!isEditing && !isCreating"
                      color="transparent" @click="addContact">Add</v-btn>
                    </div>
                  <v-row no-gutters style="gap: 12px" v-for="(contact, index) in form.contacts" :key="index">
                    <v-col>
                      <v-text-field
                        label="Name"
                        variant="outlined"
                        color="primary"
                        class="mb-2"
                        rounded="xl"
                        v-model="contact.name"
                        :readonly="loading"
                        :disabled="!isEditing && !isCreating"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              prepend-icon="mdi-pencil"
              rounded="xl"
              elevation="0"
              color="tertiary"
              :loading="loading"
              v-if="!isEditing && !isCreating"
              @click="isEditing = !isEditing"
            >
              Edit
            </v-btn>
            <v-btn
              v-if="isEditing && !isCreating"
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

            <v-spacer></v-spacer>

            <v-btn color="blue-darken-1" variant="text" @click="showDialog = false"> Close </v-btn>
            <v-btn
              v-if="isEditing && !isCreating"
              rounded="xl"
              elevation="0"
              color="primary"
              type="submit"
              :loading="loading"
              prepend-icon="mdi-content-save"
            >
              Save
            </v-btn>
            <v-btn
              v-if="isCreating"
              rounded="xl"
              elevation="0"
              color="primary"
              type="submit"
              :loading="loading"
              prepend-icon="mdi-account-plus"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
