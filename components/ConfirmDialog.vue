<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    loading?: boolean;
  }>(),
  {
    title: 'Info title',
    description: 'Lorem ipsum dolor sit amet consectetur. Acarcu lectus dignissim. Auctor dolor sit arcu ac id.',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    loading: false,
  }
);

const emits = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emits('update:model-value', $event)" width="500">
    <v-card width="100%" max-width="500">
      <v-card-title class="d-flex flex-column align-center py-0">
        <div class="icon--warning mb-6">
          <v-icon size="50px" icon="mdi-information" rounded="true" flat> </v-icon>
        </div>

        <h3 class="font-headline">
          {{ title }}
        </h3>
      </v-card-title>
      <v-card-text class="font-body text-center pt-2 pb-0">
        {{ description }}
      </v-card-text>
      <v-card-actions class="mt-8 pa-0">
        <v-row>
          <v-col>
            <v-btn
              :disabled="loading"
              width="100%"
              rounded="xl"
              size="large"
              color="primary"
              variant="outlined"
              @click="emits('cancel')"
              >{{ cancelText }}</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              :loading="loading"
              width="100%"
              rounded="xl"
              size="large"
              color="primary"
              variant="flat"
              @click="emits('confirm')"
              >{{ confirmText }}</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.v-card {
  padding: 40px;
}

.icon--warning {
  background-color: #e9f3ff;
  border-radius: 100px;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
