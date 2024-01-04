<script lang="ts" setup>
import defaultProfileImg from '@/assets/img/default-profile.png';

const props = defineProps<{
  avatar?: {
    url: string;
    thumb_url: string;
  };
  size?: string;
  tile?: boolean;
  name?: string;
}>();

const size = computed(() => props.size ?? '30px');
const src = computed(() => {
  return props.avatar ? props.avatar.thumb_url ?? props.avatar.url : defaultProfileImg;
});
</script>

<template>
  <v-tooltip :text="name">
    <template #activator="{ props }">
      <v-avatar :size="size" v-bind="props">
        <v-img :src="src"/>
      </v-avatar>
    </template>
  </v-tooltip>
</template>

<style scoped></style>
