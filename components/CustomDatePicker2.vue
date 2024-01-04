<script setup lang="ts">
import 'flatpickr/dist/flatpickr.css';
import flatPickr from 'vue-flatpickr-component';

withDefaults(
  defineProps<{
    modelValue: DateValue;
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

const hidePicker = (e: MouseEvent) => {
  e.stopPropagation();
};
</script>

<template>
  <div class="w-full">
    <div class="input-group d-flex">
      <flat-pickr
        @on-change="emits('update:modelValue', $event)"
        :placeholder="placeholder"
        :config="{ wrap: true }"
        class="form-control"
        :disabled="disabled"
        ref="datePickerWrap"
      >
      </flat-pickr>
      <div class="input-group-append d-flex">
        <button class="pl-1" type="button" title="Toggle" data-toggle>Toggle</button>
        <button class="pr-1" type="button" title="Clear" data-clear>Clear</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flatpickr-input {
  height: 100%;
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #000;
  background-color: transparent;
  cursor: pointer;
}
</style>
