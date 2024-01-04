<script lang="ts" setup>
import { computed, PropType } from 'vue';

const emits = defineEmits<{
  (e: 'change-page', value: number): void;
  (e: 'sort-page', value: String): void;
  (e: 'multi-filter', value: any): void;
}>();

interface TableField {
  key: string;
  label: string;
  format?: Function;
  hidden?: boolean;
  header?: boolean;
  sortable?: boolean;
}

interface TableItem {
  id: number;
  [key: string]: unknown;
}

interface TablePagination {
  currentPage: number;
  totalPages: number;
}

const props = defineProps({
  fields: { type: Array as PropType<TableField[]>, default: () => [] },
  items: { type: Array as PropType<TableItem[]>, default: () => [] },
  caption: { type: String, default: null },
  pagination: { type: Object as PropType<TablePagination>, default: null },
  loading: { type: Boolean, default: false },
});

const displayedFields = computed(() => props.fields.filter((i) => !i.hidden));

const displayedFieldKeys = computed(() => {
  return Object.entries(displayedFields.value).map(([_key, value]) => value.key);
});

const cellElement = (key: string) => {
  const field = props.fields.find((f) => f.key === key);
  return field && field.header ? 'th' : 'td';
};

const format = (item: TableItem, key: string) => {
  const field = props.fields.find((f) => f.key === key);
  return field && field.format ? field.format(item[key]) : item[key];
};

const sortOrder = ref('');
const sort = (key: string) => {
  const order = sortOrder.value;
  sortOrder.value = order === '' || order === '-' ? '+' : '-';
  emits('sort-page', `${sortOrder.value.replace(/\+/g, '')}${key}`);
};

const multiSelect = (filter: any) => {
  console.log('test', filter)
  emits('multi-filter', filter)
}
</script>

<template>
  <div>
    <v-table>
      <caption v-if="!!$slots.caption || caption">
        <slot name="caption">{{ caption }}</slot>
      </caption>
      <colgroup>
        <template v-for="field in displayedFields" :key="field.key">
          <slot :name="`col(${field.key})`">
            <col />
          </slot>
        </template>
      </colgroup>
      <thead>
        <tr>
          <th v-for="field in displayedFields">
            <slot :name="`head(${field.key})`" :field="field">
              <div class="d-flex" v-if="!field.multi_select">
                <div>
                  {{ field.label }}
                </div>
                <v-btn
                  v-if="field.sortable"
                  density="compact"
                  tonal
                  class="ml-1"
                  icon="mdi-sort"
                  variant="text"
                  @click="sort(field.key)"
                />
              </div>
              <div class="d-flex" v-if="field.multi_select">
                <div>
                  {{ field.label }}
                </div>
                <ButtonPopCheckList :btnLabel="field.label" :items="field.items" @emit-multi-select="multiSelect"/>
              </div>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="displayedFields.length">
            <v-progress-linear indeterminate color="primary" />
          </td>
        </tr>
        <tr v-else v-for="item in items" :key="item.id">
          <template v-for="key in displayedFieldKeys">
            <Component :is="cellElement(key as string)">
              <slot
                :name="`cell(${key})`"
                :value="format(item, (key as string))"
                :item="item"
                :format="(k: string) => format(item, k)"
              >
                {{ format(item, key as string) }}
              </slot>
            </Component>
          </template>
        </tr>
      </tbody>
    </v-table>

    <v-pagination
      v-if="props.pagination && props.loading === false"
      color="primary"
      :model-value="props.pagination?.currentPage"
      :length="props.pagination?.totalPages"
      rounded="circle"
      @update:model-value="emits('change-page', $event)"
      :total-visible="8"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.v-pagination__list) {
  justify-content: flex-end;
}
</style>
