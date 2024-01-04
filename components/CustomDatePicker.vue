<script setup lang="ts">
import { DateValue, PanelType, PickerType, Valuetype } from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

withDefaults(
  defineProps<{
    modelValue: DateValue;
    pickerType?: PickerType;
    valueType?: Valuetype;
    panelType?: PanelType;
    disabled?: boolean;
    errors?: string;
    placeholder?: string;
  }>(),
  {
    pickerType: 'date',
    valueType: '',
    panelType: 'date',
    disabled: false,
    errors: '',
    placeholder: '',
  }
);

const emits = defineEmits<{ (e: 'update:modelValue', value: DateValue): void }>();
</script>

<template>
  <div class="w-full">
    <date-picker
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :panel-type="panelType"
      :picker-type="pickerType"
      @change="emits('update:modelValue', $event)"
      class="mb-1"
    ></date-picker>
    <v-messages class="pl-4" :active="true" color="error" :messages="[errors]"></v-messages>
  </div>
</template>

<style lang="scss" scoped>
:deep(.mx-datepicker) {
  width: 100% !important;
  * {
    font-family: 'Poppins' !important;
    font-size: 16px !important;
  }

  input {
    height: 56px !important;
    border-color: #e5e5e5;
    box-shadow: none;
    border-radius: 16px;
  }
}

.v-messages {
  opacity: 1 !important;
}
</style>
