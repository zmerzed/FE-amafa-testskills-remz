<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits(['emitMultiSelect']);

const mainProps = defineProps({
  btnLabel: { type: String, default: '' },
  items: { type: Array, default: [] }
});

const fav = ref();
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

const filter = () => {
    console.log('save')
    menu.value = false
    emits('emitMultiSelect', {filter_type: 'status', data: mainProps.items})
}
</script>

<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn density="compact" tonal class="ml-1" icon="mdi-menu-down" variant="text" v-bind="props"></v-btn>
      </template>

      <v-card min-width="300">
        <div class="transaction-status">
          <v-list>
            <v-list-item v-for="(item, index) in items" v-bind:key="index">
              <v-checkbox :label="item.label" v-model="item.selected"></v-checkbox>
            </v-list-item>
          </v-list>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="filter">Filter</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<style scoped>
.v-list .v-list-item__content {
    border: 1px solid !important;
    height: 55px;
}
</style>
