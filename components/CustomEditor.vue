<script setup lang="ts">
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { onMounted, ref } from 'vue';
const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    readOnly?: boolean;
    editorToolbar?: [];
    editorOptions?: [];
  }>(),
  {
    placeholder: '',
    readOnly: false,
    editorToolbar: () => [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

      [{ align: [] }],

      ['clean'],
    ],
  }
);

const emits = defineEmits<{
  (e: 'update:model-value', value: string): void;
}>();

const editor = ref();
const quill = ref();
onMounted(() => {
  quill.value = new Quill(editor.value, {
    placeholder: props.placeholder,
    theme: 'snow',
    modules: {
      toolbar: props.editorToolbar,
    },
  });

  quill.value.on('text-change', () => {
    emits('update:model-value', quill.value.root.innerHTML === '<p><br></p>' ? '' : quill.value.root.innerHTML);
  });

  quill.value.root.innerHTML = props.modelValue;
});
</script>
<template>
  <div ref="editor" class="relative w-full h-auto"></div>
</template>

<style lang="scss" scoped>
:deep(.ql-editor) {
  background-color: #ffffff !important;
  height: 500px;
}
</style>
