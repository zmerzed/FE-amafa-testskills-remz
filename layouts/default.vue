<script setup lang="ts">
import logo from '@/assets/logo.png';
import { ref } from 'vue';
const drawer = ref(true);

const { logout } = useAuth();

const loading = ref(false);
const handleLogout = async () => {
  loading.value = true;
  await logout();
  navigateTo('/login');
};
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" permanent>
      <v-list-item nav class="w-full text-center mt-5">
        <h3 class="font-title-3 text-center">Exam</h3>
      </v-list-item>

      <v-list density="compact" nav :disabled="loading" class="pa-4">
        <v-list-item to="/" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        <v-list-item to="/persons" prepend-icon="mdi-account" title="Persons" value="persons"></v-list-item>
        <v-list-item to="/contacts" prepend-icon="mdi-account" title="Contacts" value="contacts"></v-list-item>

    
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-layout>
</template>

<style lang="scss" scoped>
.settings-list .v-list-group__items .v-list-item {
  padding-inline-start: 32px !important;
}

.v-main {
  padding-left: 256px;
}
</style>
